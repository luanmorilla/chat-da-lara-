"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { ChatAction, ChatButton, ChatState, ChatStep } from "@/types/chat";
import { buildMessageFromStep, generateMessageId } from "@/utils/chat/chatHelpers";

/* =====================================================
   CHAT LARA - MOTOR DE CONVERSA (useChatEngine)
===================================================== */

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, userName: action.payload };

    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };

    case "SET_TYPING":
      return { ...state, isTyping: action.payload };

    case "GOTO_STEP":
      return { ...state, currentStepId: action.payload };

    case "FINISH":
      return { ...state, isFinished: true };

    case "RESTORE_STATE":
      return action.payload;

    default:
      return state;
  }
}

export function useChatEngine(conversation: ChatStep[]) {
  const firstStepId = conversation[0]?.id ?? "";

  const initialState: ChatState = {
    userName: null,
    currentStepId: firstStepId,
    messages: [],
    isTyping: false,
    isFinished: false,
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Evita processar o mesmo step duas vezes (ex: por re-render do React)
  const processedStepRef = useRef<string | null>(null);

  const getStepById = useCallback(
    (id: string): ChatStep | undefined =>
      conversation.find((step) => step.id === id),
    [conversation]
  );

  const getVariables = useCallback((): Record<string, string> => {
    return {
      name: state.userName ?? "",
      o_a: "o", // padrão; pode virar seleção de gênero futuramente
    };
  }, [state.userName]);

  /* -----------------------------------------------
     Processa automaticamente os steps do tipo:
     message, image, video, system, buttons, audio.

     O step "input-name" é especial: não gera mensagem
     automática, é renderizado direto pelo componente
     de input (baseado no currentStepId).
  ----------------------------------------------- */
  useEffect(() => {
    const step = getStepById(state.currentStepId);
    if (!step) return;
    if (processedStepRef.current === step.id) return;

    if (step.type === "input-name") {
      processedStepRef.current = step.id;
      return;
    }

    processedStepRef.current = step.id;

    const isWaitingAudio =
      step.type === "audio" && step.advanceOnPlaybackEnd !== false;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const typingDuration = step.showTyping ? step.typingDuration ?? 1000 : 0;
    const initialDelay = step.delay ?? 0;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms);
        timers.push(t);
      });

    const run = async () => {
      if (initialDelay > 0) {
        await wait(initialDelay);
        if (cancelled) return;
      }

      if (typingDuration > 0) {
        dispatch({ type: "SET_TYPING", payload: true });
        await wait(typingDuration);
        if (cancelled) return;
        dispatch({ type: "SET_TYPING", payload: false });
      }

      const message = buildMessageFromStep(step, getVariables());
      dispatch({ type: "ADD_MESSAGE", payload: message });

      // Botões: espera o clique do usuário, não avança sozinho.
      if (step.type === "buttons") return;

      // Áudio aguardando reprodução: espera o onEnded do <audio>.
      if (isWaitingAudio) return;

      if (!step.next) {
        dispatch({ type: "FINISH" });
        return;
      }

      dispatch({ type: "GOTO_STEP", payload: step.next });
    };

    run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [state.currentStepId, getStepById, getVariables]);

  /* -----------------------------------------------
     Ações públicas — chamadas pelos componentes
  ----------------------------------------------- */

  /** Chamado pelo componente de input quando o usuário envia o nome. */
  const submitName = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;

      const step = getStepById(state.currentStepId);
      if (!step || step.type !== "input-name") return;

      dispatch({ type: "SET_NAME", payload: trimmed });

      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          id: generateMessageId(),
          stepId: step.id,
          type: "input-name",
          content: trimmed,
          from: "user",
          timestamp: Date.now(),
        },
      });

      if (step.next) {
        dispatch({ type: "GOTO_STEP", payload: step.next });
      } else {
        dispatch({ type: "FINISH" });
      }
    },
    [getStepById, state.currentStepId]
  );

  /** Chamado pelo componente de botões quando o usuário clica em um. */
  const clickButton = useCallback(
    (button: ChatButton) => {
      const step = getStepById(state.currentStepId);
      if (!step || step.type !== "buttons") return;

      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          id: generateMessageId(),
          stepId: step.id,
          type: "buttons",
          content: `${button.emoji ?? ""} ${button.label}`.trim(),
          from: "user",
          timestamp: Date.now(),
        },
      });

      dispatch({ type: "GOTO_STEP", payload: button.next });
    },
    [getStepById, state.currentStepId]
  );

  /** Chamado pelo componente de áudio quando o <audio> disparar onEnded. */
  const notifyAudioEnded = useCallback(
    (stepId: string) => {
      const step = getStepById(stepId);
      if (!step || step.type !== "audio") return;

      if (step.next) {
        dispatch({ type: "GOTO_STEP", payload: step.next });
      } else {
        dispatch({ type: "FINISH" });
      }
    },
    [getStepById]
  );
  const goToStep = useCallback((stepId: string) => {
    processedStepRef.current = null;
    dispatch({
      type: "GOTO_STEP",
      payload: stepId,
    });
  }, []);
  return {
    state,
    submitName,
    clickButton,
    notifyAudioEnded,
    goToStep,
  };
}
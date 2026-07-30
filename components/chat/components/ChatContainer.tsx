"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChatStep } from "@/types/chat";
import { useChatEngine } from "@/hooks/chat/useChatEngine";
import { useExitIntent } from "@/hooks/chat/useExitIntent";
import { useChatProgress } from "@/hooks/chat/useChatProgress";
import ChatHeader from "@/components/header/components/ChatHeader";
import MessageBubble from "@/components/messages/bubbles/MessageBubble";
import TypingIndicator from "@/components/typing/components/TypingIndicator";
import ExitIntentModal from "@/components/modal/components/ExitIntentModal";
import ProgressBar from "@/components/progress/components/ProgressBar";

interface ChatContainerProps {
  conversation: ChatStep[];
  botName: string;
  avatarSrc: string;
}

/* Estilos estáticos (não dependem de state/props) ficam fora do
   componente pra não serem recriados a cada render */
const SEND_BUTTON_STYLE: React.CSSProperties = {
  width: 46,
  height: 46,
  background: "linear-gradient(135deg, var(--primary), var(--secondary))",
  boxShadow: "0 4px 16px rgba(255, 46, 136, 0.35)",
};

export default function ChatContainer({
  conversation,
  botName,
  avatarSrc,
}: ChatContainerProps) {
  const { state, submitName, clickButton, notifyAudioEnded } =
    useChatEngine(conversation);

  const { showExitModal, closeExitModal } = useExitIntent(
    state.messages.length > 0
  );

  const progress = useChatProgress(
    conversation,
    state.currentStepId,
    state.isFinished
  );

  const [nameValue, setNameValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  /* Evita rodar .find() no array inteiro em todo re-render;
     só recalcula quando o passo atual ou a conversa mudam */
  const currentStep = useMemo(
    () => conversation.find((s) => s.id === state.currentStepId),
    [conversation, state.currentStepId]
  );

  const showNameInput = currentStep?.type === "input-name";

  /* Scroll: primeira renderização vai direto (sem animação),
     as próximas usam "smooth" — evita um scroll "saltado"
     estranho quando o chat carrega com histórico restaurado */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: isFirstRender.current ? "auto" : "smooth",
    });
    isFirstRender.current = false;
  }, [state.messages, state.isTyping]);

  const handleSubmitName = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = nameValue.trim();
      if (!trimmed) return;
      submitName(trimmed);
      setNameValue("");
    },
    [nameValue, submitName]
  );

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNameValue(e.target.value);
    },
    []
  );

  return (
    <div className="flex flex-col h-dvh w-full max-w-[520px] mx-auto overflow-hidden">
      <ChatHeader name={botName} avatarSrc={avatarSrc} isTyping={state.isTyping} />
      <ProgressBar progress={progress} />

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-3">
        {state.messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onButtonClick={clickButton}
            onAudioEnded={notifyAudioEnded}
          />
        ))}

        {state.isTyping && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {showNameInput && currentStep?.type === "input-name" && (
        <form
          onSubmit={handleSubmitName}
          className="flex items-center gap-2 px-4 py-3 safe-bottom fade-in"
          style={{
            borderTop: "1px solid var(--border-soft)",
            background: "var(--background-secondary)",
          }}
        >
          <div
            className="flex-1 flex items-center px-4 py-1"
            style={{
              background: "var(--background-card)",
              border: "1px solid var(--border)",
              borderRadius: "999px",
            }}
          >
            <input
              type="text"
              autoFocus
              value={nameValue}
              onChange={handleNameChange}
              placeholder={currentStep.placeholder ?? "Digite seu nome"}
              className="flex-1 bg-transparent py-2.5 text-base outline-none touch-manipulation"
              style={{ color: "var(--text)" }}
            />
          </div>

          <button
            type="submit"
            disabled={!nameValue.trim()}
            aria-label={currentStep.buttonLabel ?? "Enviar"}
            className="shrink-0 flex items-center justify-center rounded-full active:scale-90 transition-transform touch-manipulation disabled:opacity-40"
            style={SEND_BUTTON_STYLE}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      )}

      {showExitModal && (
        <ExitIntentModal
          userName={state.userName}
          avatarSrc={avatarSrc}
          onStay={closeExitModal}
        />
      )}
    </div>
  );
}
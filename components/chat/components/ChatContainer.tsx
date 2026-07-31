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

const SEND_BUTTON_STYLE: React.CSSProperties = {
  width: 46,
  height: 46,
  background: "linear-gradient(135deg, var(--primary), var(--secondary))",
  boxShadow:
    "0 6px 20px rgba(255, 46, 136, 0.38), inset 0 1px 0 rgba(255,255,255,0.22)",
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

  const currentStep = useMemo(
    () => conversation.find((s) => s.id === state.currentStepId),
    [conversation, state.currentStepId]
  );

  const showNameInput = currentStep?.type === "input-name";

  /* Agrupa mensagens consecutivas do mesmo remetente:
     só a primeira de cada grupo recebe o rabinho do balão */
  const groupedMessages = useMemo(
    () =>
      state.messages.map((message, index) => ({
        message,
        isFirstInGroup:
          index === 0 || state.messages[index - 1].from !== message.from,
      })),
    [state.messages]
  );

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
    <div
      className="relative flex flex-col h-dvh w-full max-w-[520px] mx-auto overflow-hidden"
      style={{
        backgroundColor: "var(--background)",
        backgroundImage: `
          radial-gradient(ellipse 900px 600px at 15% -10%, rgba(255, 46, 136, 0.10), transparent 60%),
          radial-gradient(ellipse 800px 700px at 100% 20%, rgba(168, 85, 247, 0.09), transparent 55%),
          radial-gradient(ellipse 1000px 800px at 50% 120%, rgba(255, 46, 136, 0.06), transparent 60%)
        `,
      }}
    >
      <ChatHeader name={botName} avatarSrc={avatarSrc} isTyping={state.isTyping} />
      <ProgressBar progress={progress} />

      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 flex flex-col gap-2.5">
        {groupedMessages.map(({ message, isFirstInGroup }) => (
          <MessageBubble
            key={message.id}
            message={message}
            isFirstInGroup={isFirstInGroup}
            onButtonClick={clickButton}
            onAudioEnded={notifyAudioEnded}
          />
        ))}

        {state.isTyping && (
          <div className="flex justify-start mt-1">
            <TypingIndicator />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {showNameInput && currentStep?.type === "input-name" && (
        <form
          onSubmit={handleSubmitName}
          className="flex items-center gap-2.5 px-5 pt-3 safe-bottom fade-in relative z-10"
          style={{
            borderTop: "1px solid var(--border-soft)",
            background:
              "linear-gradient(180deg, var(--background-secondary), var(--background))",
            boxShadow: "0 -8px 24px rgba(0, 0, 0, 0.28)",
          }}
        >
          <div
            className="input-pill flex-1 flex items-center px-4 py-1"
            style={{
              background: "var(--background-card)",
              border: "1px solid var(--border)",
              borderRadius: "999px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <input
              type="text"
              autoFocus
              value={nameValue}
              onChange={handleNameChange}
              placeholder={currentStep.placeholder ?? "Digite seu nome"}
              className="flex-1 bg-transparent py-2.5 text-base outline-none touch-manipulation placeholder:text-[var(--text-faint)]"
              style={{ color: "var(--text)" }}
            />
          </div>

          <button
            type="submit"
            disabled={!nameValue.trim()}
            aria-label={currentStep.buttonLabel ?? "Enviar"}
            className="btn-shine shrink-0 flex items-center justify-center rounded-full active:scale-90 transition-transform duration-150 touch-manipulation disabled:opacity-40 disabled:pointer-events-none"
            style={SEND_BUTTON_STYLE}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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
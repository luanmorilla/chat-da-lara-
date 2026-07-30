"use client";

import { useEffect, useRef, useState } from "react";
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

  const currentStep = conversation.find((s) => s.id === state.currentStepId);
  const showNameInput = currentStep?.type === "input-name";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages, state.isTyping]);

  function handleSubmitName(e: React.FormEvent) {
    e.preventDefault();
    if (!nameValue.trim()) return;
    submitName(nameValue);
    setNameValue("");
  }

  return (
    <div className="flex flex-col h-dvh w-full max-w-[520px] mx-auto overflow-hidden">
      <ChatHeader name={botName} avatarSrc={avatarSrc} isTyping={state.isTyping} />
      <ProgressBar progress={progress} />

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
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
          className="flex items-center gap-2 p-3 safe-bottom"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <input
            type="text"
            autoFocus
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            placeholder={currentStep.placeholder ?? "Digite seu nome"}
            className="flex-1 px-4 py-3 rounded-full text-base outline-none touch-manipulation"
            style={{
              background: "var(--background-card)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-full font-medium text-[14px] active:scale-95 transition-transform touch-manipulation"
            style={{ background: "var(--primary)", color: "#fff" }}
          >
            {currentStep.buttonLabel ?? "Enviar"}
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
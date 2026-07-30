import { memo, useCallback, useMemo } from "react";
import { ChatButton, ChatMessage } from "@/types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
  isFirstInGroup: boolean;
  onButtonClick: (button: ChatButton) => void;
  onAudioEnded: (stepId: string) => void;
}

const MEDIA_RADIUS = "var(--radius) var(--radius) var(--radius) 4px";
const MEDIA_SHADOW = "var(--shadow-md)";

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MessageBubbleComponent({
  message,
  isFirstInGroup,
  onButtonClick,
  onAudioEnded,
}: MessageBubbleProps) {
  const isUser = message.from === "user";

  const textBubbleStyle = useMemo<React.CSSProperties>(() => {
    const tailRadius = isUser
      ? "var(--radius) var(--radius) 4px var(--radius)"
      : "var(--radius) var(--radius) var(--radius) 4px";
    const roundedRadius = "var(--radius)";

    return {
      background: isUser
        ? "linear-gradient(135deg, var(--primary), var(--primary-soft))"
        : "linear-gradient(180deg, var(--background-elevated), var(--background-card))",
      color: isUser ? "#fff" : "var(--text)",
      border: isUser ? "none" : "1px solid var(--border-soft)",
      borderRadius: isFirstInGroup ? tailRadius : roundedRadius,
      boxShadow: isUser
        ? "0 8px 22px rgba(255, 46, 136, 0.32), inset 0 1px 0 rgba(255,255,255,0.16)"
        : "var(--shadow-sm)",
    };
  }, [isUser, isFirstInGroup]);

  const tailClass = isFirstInGroup
    ? isUser
      ? "bubble-tail-user"
      : "bubble-tail-bot"
    : "";

  const handleAudioEnded = useCallback(() => {
    onAudioEnded(message.stepId);
  }, [onAudioEnded, message.stepId]);

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
      style={{ marginTop: isFirstInGroup ? 12 : 2 }}
    >
      <div
        className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}
        style={{ maxWidth: "78%" }}
      >
        {message.content && (
          <div
            className={`px-4 py-2.5 text-[14.5px] leading-relaxed tracking-[-0.01em] bubble-pop ${tailClass}`}
            style={textBubbleStyle}
          >
            {message.content}
            <span
              className="block text-right mt-1 text-[10.5px] font-medium opacity-70 tabular-nums"
              style={{ color: isUser ? "rgba(255,255,255,.85)" : "var(--text-muted)" }}
            >
              {formatTime(message.timestamp)}
            </span>
          </div>
        )}

        {message.type === "image" && message.media?.src && (
          <div
            className="relative overflow-hidden bubble-pop"
            style={{
              borderRadius: MEDIA_RADIUS,
              border: "1px solid var(--border-soft)",
              boxShadow: MEDIA_SHADOW,
            }}
          >
            <img
              src={message.media.src}
              alt=""
              loading="lazy"
              className={`block max-w-full transition-transform duration-300 ${
                message.media.blurred ? "blur-xl scale-105" : ""
              }`}
            />
          </div>
        )}

        {message.type === "video" && message.media?.src && (
          <div
            className="relative overflow-hidden bubble-pop"
            style={{
              borderRadius: MEDIA_RADIUS,
              border: "1px solid var(--border-soft)",
              boxShadow: MEDIA_SHADOW,
            }}
          >
            <video
              src={message.media.src}
              poster={message.media.thumbnail}
              controls
              playsInline
              preload="metadata"
              className={`block max-w-full transition-transform duration-300 ${
                message.media.blurred ? "blur-xl scale-105" : ""
              }`}
            />
          </div>
        )}

        {message.type === "audio" && message.media?.src && (
          <div
            className="px-4 py-3 bubble-pop flex flex-col gap-2 min-w-[220px]"
            style={{
              background: "linear-gradient(180deg, var(--background-elevated), var(--background-card))",
              border: "1px solid var(--border-soft)",
              borderRadius: MEDIA_RADIUS,
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              className="flex items-center gap-1.5 text-[12px] font-semibold tracking-tight"
              style={{ color: "var(--secondary-soft)" }}
            >
              <span aria-hidden>🎤</span>
              <span>Mensagem de voz</span>
            </div>
            <audio
              src={message.media.src}
              controls
              preload="metadata"
              onEnded={handleAudioEnded}
              className="w-full h-9"
            />
          </div>
        )}

        {message.type === "buttons" && message.buttons && (
          <div className="flex flex-col gap-2 w-full">
            {message.buttons.map((button) => (
              <ChatButtonItem key={button.id} button={button} onClick={onButtonClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ChatButtonItemProps {
  button: ChatButton;
  onClick: (button: ChatButton) => void;
}

function ChatButtonItem({ button, onClick }: ChatButtonItemProps) {
  const isCta = Boolean(button.href);

  const handleClick = useCallback(() => {
    if (button.href) {
      window.open(button.href, "_blank", "noopener,noreferrer");
    }
    onClick(button);
  }, [button, onClick]);

  const style = useMemo<React.CSSProperties>(
    () => ({
      background:
        button.variant === "secondary"
          ? "transparent"
          : isCta
          ? "linear-gradient(135deg, var(--primary), var(--secondary))"
          : "var(--primary)",
      color: "#fff",
      border:
        button.variant === "secondary" ? "1px solid var(--border)" : "none",
      boxShadow: isCta
        ? "0 8px 24px rgba(255, 46, 136, 0.32), inset 0 1px 0 rgba(255,255,255,0.2)"
        : button.variant === "secondary"
        ? "none"
        : "0 4px 14px rgba(255, 46, 136, 0.25)",
    }),
    [button.variant, isCta]
  );

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-3 text-[14px] font-medium rounded-full transition-all duration-150 active:scale-95 text-left touch-manipulation hover:brightness-[1.07] hover:-translate-y-px ${
        isCta ? "btn-shine btn-cta font-semibold" : ""
      }`}
      style={style}
    >
      {button.emoji ? `${button.emoji} ` : ""}
      {button.label}
    </button>
  );
}

const MessageBubble = memo(MessageBubbleComponent);
export default MessageBubble;
import { ChatButton, ChatMessage } from "@/types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
  onButtonClick: (button: ChatButton) => void;
  onAudioEnded: (stepId: string) => void;
}

export default function MessageBubble({
  message,
  onButtonClick,
  onAudioEnded,
}: MessageBubbleProps) {
  const isUser = message.from === "user";

  const bubbleBase =
    "max-w-[78%] px-4 py-2.5 text-[14.5px] leading-relaxed bubble-pop shadow-sm";

  const bubbleStyle: React.CSSProperties = {
    background: isUser ? "var(--primary)" : "var(--background-card)",
    color: isUser ? "#fff" : "var(--text)",
    border: isUser ? "none" : "1px solid var(--border)",
    borderRadius: isUser
      ? "var(--radius) var(--radius) 4px var(--radius)"
      : "var(--radius) var(--radius) var(--radius) 4px",
    boxShadow: isUser
      ? "0 4px 14px rgba(255, 46, 136, 0.18)"
      : "0 2px 10px rgba(0, 0, 0, 0.25)",
  };

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="flex flex-col gap-2 items-start" style={{ maxWidth: "78%" }}>
        {/* Texto */}
        {message.content && (
          <div className={bubbleBase} style={bubbleStyle}>
            {message.content}
          </div>
        )}

        {/* Imagem */}
        {message.type === "image" && message.media?.src && (
          <img
            src={message.media.src}
            alt=""
            className={`max-w-full bubble-pop ${
              message.media.blurred ? "blur-xl scale-105" : ""
            }`}
            style={{
              borderRadius: "var(--radius) var(--radius) var(--radius) 4px",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
            }}
          />
        )}

        {/* Vídeo */}
        {message.type === "video" && message.media?.src && (
          <video
            src={message.media.src}
            poster={message.media.thumbnail}
            controls
            playsInline
            className={`max-w-full bubble-pop ${
              message.media.blurred ? "blur-xl scale-105" : ""
            }`}
            style={{
              borderRadius: "var(--radius) var(--radius) var(--radius) 4px",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
            }}
          />
        )}

        {/* Áudio */}
        {message.type === "audio" && message.media?.src && (
          <div
            className="px-4 py-3 bubble-pop flex flex-col gap-2 min-w-[220px]"
            style={{
              background: "var(--background-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius) var(--radius) var(--radius) 4px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              className="flex items-center gap-1.5 text-[12px] font-medium"
              style={{ color: "var(--secondary)" }}
            >
              <span>🎤</span>
              <span>Mensagem de voz</span>
            </div>
            <audio
              src={message.media.src}
              controls
              onEnded={() => onAudioEnded(message.stepId)}
              className="w-full h-9"
            />
          </div>
        )}

        {/* Botões */}
        {message.type === "buttons" && message.buttons && (
          <div className="flex flex-col gap-2 w-full">
            {message.buttons.map((button) => {
              const isCta = Boolean(button.href);

              return (
                <button
                  key={button.id}
                  onClick={() => {
                    if (button.href) {
                      window.open(button.href, "_blank", "noopener,noreferrer");
                    }
                    onButtonClick(button);
                  }}
                  className={`px-4 py-3 text-[14px] font-medium rounded-full transition-transform active:scale-95 text-left touch-manipulation ${
                    isCta ? "btn-shine btn-cta font-semibold" : ""
                  }`}
                  style={{
                    background:
                      button.variant === "secondary"
                        ? "transparent"
                        : isCta
                        ? "linear-gradient(135deg, var(--primary), var(--secondary))"
                        : "var(--primary)",
                    color: "#fff",
                    border:
                      button.variant === "secondary"
                        ? "1px solid var(--border)"
                        : "none",
                  }}
                >
                  {button.emoji ? `${button.emoji} ` : ""}
                  {button.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
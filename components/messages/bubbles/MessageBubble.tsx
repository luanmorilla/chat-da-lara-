import { memo, useCallback, useMemo } from "react";
import { ChatButton, ChatMessage } from "@/types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
  onButtonClick: (button: ChatButton) => void;
  onAudioEnded: (stepId: string) => void;
}

/* Estilos que não dependem de props ficam fora do componente,
   assim não são recriados a cada render */
const MEDIA_RADIUS = "var(--radius) var(--radius) var(--radius) 4px";
const MEDIA_SHADOW = "0 4px 20px rgba(0, 0, 0, 0.35)";

function MessageBubbleComponent({
  message,
  onButtonClick,
  onAudioEnded,
}: MessageBubbleProps) {
  const isUser = message.from === "user";

  /* Estilo da bolha de texto: só recalcula se mudar quem enviou
     (isUser é a única variável que ele usa) */
  const textBubbleStyle = useMemo<React.CSSProperties>(
    () => ({
      background: isUser
        ? "linear-gradient(135deg, var(--primary), #FF5FA3)"
        : "var(--background-card)",
      color: isUser ? "#fff" : "var(--text)",
      border: isUser ? "none" : "1px solid var(--border-soft)",
      borderRadius: isUser
        ? "var(--radius) var(--radius) 4px var(--radius)"
        : "var(--radius) var(--radius) var(--radius) 4px",
      boxShadow: isUser
        ? "0 6px 18px rgba(255, 46, 136, 0.28)"
        : "0 4px 16px rgba(0, 0, 0, 0.35)",
    }),
    [isUser]
  );

  const handleAudioEnded = useCallback(() => {
    onAudioEnded(message.stepId);
  }, [onAudioEnded, message.stepId]);

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}
        style={{ maxWidth: "78%" }}
      >
        {/* Texto */}
        {message.content && (
          <div
            className="px-4 py-2.5 text-[14.5px] leading-relaxed bubble-pop"
            style={textBubbleStyle}
          >
            {message.content}
          </div>
        )}

        {/* Imagem */}
        {message.type === "image" && message.media?.src && (
          <img
            src={message.media.src}
            alt=""
            loading="lazy"
            className={`max-w-full bubble-pop ${
              message.media.blurred ? "blur-xl scale-105" : ""
            }`}
            style={{
              borderRadius: MEDIA_RADIUS,
              border: "1px solid var(--border-soft)",
              boxShadow: MEDIA_SHADOW,
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
            preload="metadata"
            className={`max-w-full bubble-pop ${
              message.media.blurred ? "blur-xl scale-105" : ""
            }`}
            style={{
              borderRadius: MEDIA_RADIUS,
              border: "1px solid var(--border-soft)",
              boxShadow: MEDIA_SHADOW,
            }}
          />
        )}

        {/* Áudio */}
        {message.type === "audio" && message.media?.src && (
          <div
            className="px-4 py-3 bubble-pop flex flex-col gap-2 min-w-[220px]"
            style={{
              background: "var(--background-card)",
              border: "1px solid var(--border-soft)",
              borderRadius: MEDIA_RADIUS,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
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
              preload="metadata"
              onEnded={handleAudioEnded}
              className="w-full h-9"
            />
          </div>
        )}

        {/* Botões */}
        {message.type === "buttons" && message.buttons && (
          <div className="flex flex-col gap-2 w-full">
            {message.buttons.map((button) => (
              <ChatButtonItem
                key={button.id}
                button={button}
                onClick={onButtonClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* Botão extraído em componente próprio: evita recriar a função
   onClick (com closure de "button") toda vez que MessageBubble
   renderiza, e evita recalcular o isCta de novo por botão */
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
    }),
    [button.variant, isCta]
  );

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-3 text-[14px] font-medium rounded-full transition-transform active:scale-95 text-left touch-manipulation ${
        isCta ? "btn-shine btn-cta font-semibold" : ""
      }`}
      style={style}
    >
      {button.emoji ? `${button.emoji} ` : ""}
      {button.label}
    </button>
  );
}

/* memo: a lista de mensagens no ChatContainer cresce a cada nova
   mensagem — sem isso, TODAS as bolhas antigas re-renderizam
   de novo a cada mensagem nova adicionada ao array */
const MessageBubble = memo(MessageBubbleComponent);
export default MessageBubble;
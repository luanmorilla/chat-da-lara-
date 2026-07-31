import Avatar from "@/components/common/Avatar";

interface ChatHeaderProps {
  name: string;
  avatarSrc: string;
  isTyping: boolean;
}

export default function ChatHeader({ name, avatarSrc, isTyping }: ChatHeaderProps) {
  return (
    <header
      className="flex items-center gap-2.5 px-3 pt-4 pb-3 sticky top-0 z-20 glass safe-top"
      style={{
        borderBottom: "1px solid var(--border-soft)",
        boxShadow: "0 4px 24px rgba(0,0,0,.38)",
      }}
    >
      <button
        aria-label="Voltar"
        className="p-2 rounded-full transition-all duration-150 active:scale-90 hover:bg-white/[0.06]"
        style={{ color: "var(--text-secondary)" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="pulse-ring rounded-full shrink-0">
        <Avatar src={avatarSrc} alt={name} online />
      </div>

      <div className="flex flex-col leading-tight gap-0.5 flex-1 min-w-0">
        <span
          className="font-semibold text-[16px] font-heading truncate"
          style={{ color: "var(--text)", letterSpacing: "0.1px" }}
        >
          {name}
        </span>
        <span
          className="text-[12.5px] font-medium transition-colors duration-300 flex items-center gap-1.5"
          style={{ color: isTyping ? "var(--primary)" : "var(--success)" }}
        >
          {!isTyping && (
            <span
              className="inline-block rounded-full"
              style={{
                width: 6,
                height: 6,
                background: "var(--success)",
                boxShadow: "0 0 6px rgba(37, 211, 102, 0.7)",
              }}
            />
          )}
          {isTyping ? "digitando..." : "online agora"}
        </span>
      </div>

      <div className="flex items-center gap-0.5">
        <button
          aria-label="Chamada de vídeo"
          className="p-2 rounded-full transition-all duration-150 active:scale-90 hover:bg-white/[0.06]"
          style={{ color: "var(--text-secondary)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </button>
        <button
          aria-label="Chamada de voz"
          className="p-2 rounded-full transition-all duration-150 active:scale-90 hover:bg-white/[0.06]"
          style={{ color: "var(--text-secondary)" }}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
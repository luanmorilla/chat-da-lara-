import Avatar from "@/components/common/Avatar";

interface ChatHeaderProps {
  name: string;
  avatarSrc: string;
  isTyping: boolean;
}

export default function ChatHeader({ name, avatarSrc, isTyping }: ChatHeaderProps) {
  return (
    <header
      className="flex items-center gap-3 px-4 pt-4 pb-3 sticky top-0 z-20 glass safe-top"
      style={{
        borderBottom: "1px solid var(--border-soft)",
        boxShadow: "0 4px 20px rgba(0,0,0,.35)",
      }}
    >
      <div className="pulse-ring rounded-full">
        <Avatar src={avatarSrc} alt={name} online />
      </div>

      <div className="flex flex-col leading-tight gap-0.5">
        <span
          className="font-semibold text-[16px] font-heading"
          style={{ color: "var(--text)", letterSpacing: "0.2px" }}
        >
          {name}
        </span>
        <span
          className="text-[12.5px] font-medium transition-colors duration-300 flex items-center gap-1"
          style={{ color: isTyping ? "var(--primary)" : "var(--success)" }}
        >
          {!isTyping && (
            <span
              className="inline-block rounded-full"
              style={{ width: 6, height: 6, background: "var(--success)" }}
            />
          )}
          {isTyping ? "digitando..." : "online agora"}
        </span>
      </div>
    </header>
  );
}
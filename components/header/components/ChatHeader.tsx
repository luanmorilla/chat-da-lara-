import Avatar from "@/components/common/Avatar";

interface ChatHeaderProps {
  name: string;
  avatarSrc: string;
  isTyping: boolean;
}

export default function ChatHeader({ name, avatarSrc, isTyping }: ChatHeaderProps) {
  return (
    <header
      className="flex items-center gap-3 px-4 pb-3 sticky top-0 z-20 glass safe-top"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="pulse-ring rounded-full">
        <Avatar src={avatarSrc} alt={name} online />
      </div>

      <div className="flex flex-col leading-tight">
        <span className="font-semibold text-[15px]" style={{ color: "var(--text)" }}>
          {name}
        </span>
        <span
          className="text-[12px] transition-colors duration-300"
          style={{ color: isTyping ? "var(--primary)" : "var(--success)" }}
        >
          {isTyping ? "digitando..." : "online agora"}
        </span>
      </div>
    </header>
  );
}
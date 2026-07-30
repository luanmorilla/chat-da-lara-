import Avatar from "@/components/common/Avatar";

interface ExitIntentModalProps {
  userName: string | null;
  avatarSrc: string;
  onStay: () => void;
}

export default function ExitIntentModal({
  userName,
  avatarSrc,
  onStay,
}: ExitIntentModalProps) {
  const name = userName ? `, ${userName}` : "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5 fade-in"
      style={{ background: "rgba(0,0,0,.75)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="w-full max-w-[380px] p-7 flex flex-col items-center text-center gap-4 scale"
        style={{
          background: "var(--background-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          boxShadow: "0 24px 70px rgba(0,0,0,.5)",
        }}
      >
        <Avatar src={avatarSrc} alt="Lara" size={68} online />

        <div className="flex flex-col gap-2">
          <h2
            className="text-[18px] font-semibold"
            style={{ color: "var(--text)" }}
          >
            Espera{name} 😭
          </h2>
          <p
            className="text-[14px] leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Vai embora assim, bem no meio da nossa conversa? Fica mais um
            pouquinho comigo, eu prometo que vale a pena ❤️
          </p>
        </div>

        <button
          onClick={onStay}
          className="w-full py-3.5 rounded-full font-semibold text-[14.5px] active:scale-95 transition-transform btn-shine touch-manipulation"
          style={{
            background: "linear-gradient(135deg, var(--primary), var(--secondary))",
            color: "#fff",
            boxShadow: "0 8px 24px rgba(255, 46, 136, 0.3)",
          }}
        >
          Quero ficar 🥰
        </button>
      </div>
    </div>
  );
}
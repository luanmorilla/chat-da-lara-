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
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, rgba(255,46,136,0.10), rgba(0,0,0,.82) 70%)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div
        className="relative w-full max-w-[380px] p-7 flex flex-col items-center text-center gap-4 scale overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, var(--background-elevated), var(--background-card))",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg), 0 0 60px rgba(255, 46, 136, 0.08)",
        }}
      >
        <div
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[220px] h-[220px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,46,136,0.18), transparent 70%)",
          }}
        />

        <div className="pulse-ring rounded-full relative">
          <Avatar src={avatarSrc} alt="Lara" size={68} online />
        </div>

        <div className="flex flex-col gap-2 relative">
          <h2
            className="text-[18px] font-semibold font-heading"
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
          className="relative w-full py-3.5 rounded-full font-semibold text-[14.5px] active:scale-95 transition-all duration-150 btn-shine btn-cta touch-manipulation hover:brightness-[1.06]"
          style={{
            background: "linear-gradient(135deg, var(--primary), var(--secondary))",
            color: "#fff",
            boxShadow:
              "0 10px 28px rgba(255, 46, 136, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          Quero ficar 🥰
        </button>
      </div>
    </div>
  );
}
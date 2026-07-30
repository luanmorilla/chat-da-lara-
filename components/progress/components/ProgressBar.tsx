interface ProgressBarProps {
  progress: number; // 0 a 100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div
      className="relative w-full h-[4px] overflow-hidden z-10 shrink-0"
      style={{
        background: "var(--background-elevated)",
        borderBottom: "1px solid var(--border-soft)",
      }}
    >
      <div
        className="h-full transition-all duration-500 ease-out gradient progress-shine"
        style={{
          width: `${Math.max(progress, 3)}%`,
          boxShadow: "0 0 12px rgba(255, 46, 136, 0.5)",
        }}
      />
    </div>
  );
}
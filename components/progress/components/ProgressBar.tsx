interface ProgressBarProps {
    progress: number; // 0 a 100
  }
  
  export default function ProgressBar({ progress }: ProgressBarProps) {
    return (
      <div
        className="w-full h-[3px] overflow-hidden"
        style={{ background: "var(--border)" }}
      >
        <div
          className="h-full transition-all duration-500 ease-out gradient progress-shine"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }
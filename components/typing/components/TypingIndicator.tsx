export default function TypingIndicator() {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-4 py-3 w-fit bubble-pop"
      style={{
        background:
          "linear-gradient(180deg, var(--background-elevated), var(--background-card))",
        border: "1px solid var(--border-soft)",
        borderRadius: "var(--radius) var(--radius) var(--radius) 4px",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full animate-bounce"
          style={{
            background:
              "linear-gradient(135deg, var(--secondary-soft), var(--secondary))",
            animationDelay: `${i * 0.15}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
}
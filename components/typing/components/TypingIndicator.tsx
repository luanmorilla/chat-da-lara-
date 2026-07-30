export default function TypingIndicator() {
    return (
      <div
        className="inline-flex items-center gap-1 px-4 py-3 rounded-2xl w-fit"
        style={{ background: "var(--background-card)", borderRadius: "var(--radius)" }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              background: "var(--text-muted)",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    );
  }
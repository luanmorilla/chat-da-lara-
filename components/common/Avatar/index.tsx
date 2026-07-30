interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  online?: boolean;
}

export default function Avatar({ src, alt, size = 44, online }: AvatarProps) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full object-cover w-full h-full"
        style={{
          border: "1.5px solid var(--border)",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)",
        }}
      />
      {online && (
        <span
          className="absolute bottom-0 right-0 rounded-full border-2"
          style={{
            width: size * 0.28,
            height: size * 0.28,
            background: "var(--success)",
            borderColor: "var(--background)",
            boxShadow: "0 0 6px rgba(37, 211, 102, 0.7)",
          }}
        />
      )}
    </div>
  );
}
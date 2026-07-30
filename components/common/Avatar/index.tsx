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
          className="rounded-full object-cover w-full h-full border border-[var(--border)]"
          style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.35)" }}
        />
        {online && (
          <span
            className="absolute bottom-0 right-0 rounded-full border-2"
            style={{
              width: size * 0.28,
              height: size * 0.28,
              background: "var(--success)",
              borderColor: "var(--background)",
            }}
          />
        )}
      </div>
    );
  }
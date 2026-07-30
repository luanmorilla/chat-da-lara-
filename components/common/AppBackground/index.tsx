export default function AppBackground() {
    return (
      <div
        aria-hidden="true"
        className="
          fixed
          inset-0
          -z-10
          overflow-hidden
          bg-[var(--background)]
        "
      >
        {/* Glow principal - canto superior direito */}
        <div
          className="
            absolute
            -top-40
            -right-40
            h-[500px]
            w-[500px]
            rounded-full
            blur-[120px]
            opacity-30
          "
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 70%)",
          }}
        />
  
        {/* Glow secundário - canto inferior esquerdo */}
        <div
          className="
            absolute
            -bottom-40
            -left-40
            h-[450px]
            w-[450px]
            rounded-full
            blur-[130px]
            opacity-20
          "
          style={{
            background:
              "radial-gradient(circle, var(--secondary), transparent 70%)",
          }}
        />
  
        {/* Glow central sutil - dá profundidade atrás do chat */}
        <div
          className="
            absolute
            top-1/2
            left-1/2
            h-[600px]
            w-[600px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[160px]
            opacity-10
          "
          style={{
            background:
              "radial-gradient(circle, var(--primary), transparent 75%)",
          }}
        />
  
        {/* Textura de ruído sutil (profundidade) */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.03]
            mix-blend-overlay
          "
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
  
        {/* Vinheta nas bordas - foca a atenção no centro */}
        <div
          className="
            absolute
            inset-0
            pointer-events-none
          "
          style={{
            background:
              "radial-gradient(circle at center, transparent 40%, var(--background) 100%)",
          }}
        />
      </div>
    );
  }
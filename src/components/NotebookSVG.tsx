interface NotebookSVGProps {
  className?: string;
}

/**
 * Decorative SVG layer for the notebook: paper shape, holes, tape, leaves.
 * Sits behind the typed letter content.
 */
export default function NotebookSVG({ className }: NotebookSVGProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 760"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf6ec" />
          <stop offset="55%" stopColor="#f3e9d4" />
          <stop offset="100%" stopColor="#e9dcbe" />
        </linearGradient>
        <radialGradient id="paperShade" cx="50%" cy="42%" r="62%">
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(80,60,40,0.18)" />
        </radialGradient>
        <linearGradient id="tapeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(217,154,176,0.55)" />
          <stop offset="50%" stopColor="rgba(230,194,207,0.7)" />
          <stop offset="100%" stopColor="rgba(217,154,176,0.5)" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="8" result="off" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.55" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Soft drop shadow plate */}
      <path
        d="M70 70 Q66 60 80 58 L540 50 Q554 50 552 64 L560 700 Q562 714 548 716 L92 722 Q78 722 78 708 Z"
        fill="rgba(0,0,0,0.45)"
        filter="url(#softShadow)"
        opacity="0.7"
      />

      {/* Paper body — slightly irregular organic shape */}
      <path
        d="M64 60 Q60 52 74 50 L536 44 Q550 44 549 58 L556 694 Q558 708 544 710 L88 716 Q74 716 74 702 Z"
        fill="url(#paperGrad)"
      />
      <path
        d="M64 60 Q60 52 74 50 L536 44 Q550 44 549 58 L556 694 Q558 708 544 710 L88 716 Q74 716 74 702 Z"
        fill="url(#paperShade)"
      />

      {/* Subtle ruled lines */}
      <g stroke="rgba(122,31,51,0.08)" strokeWidth="1">
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={i}
            x1="120"
            y1={180 + i * 32}
            x2="528"
            y2={182 + i * 32}
          />
        ))}
      </g>

      {/* Margin line (red) */}
      <line
        x1="118"
        y1="64"
        x2="116"
        y2="706"
        stroke="rgba(122,31,51,0.28)"
        strokeWidth="1.4"
        strokeDasharray="2 5"
      />

      {/* Notebook holes */}
      <g fill="#3a2a22" opacity="0.55">
        {[120, 230, 340, 450, 560].map((y) => (
          <circle key={y} cx="92" cy={y} r="8" />
        ))}
      </g>
      <g fill="rgba(0,0,0,0.35)">
        {[120, 230, 340, 450, 560].map((y) => (
          <circle key={y} cx="92" cy={y} r="5" />
        ))}
      </g>

      {/* Tape near top */}
      <g transform="rotate(-4 300 70)" opacity="0.92">
        <rect
          x="220"
          y="40"
          width="180"
          height="46"
          rx="3"
          fill="url(#tapeGrad)"
        />
        <rect
          x="220"
          y="40"
          width="180"
          height="46"
          rx="3"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
        />
        {/* tape edge curls */}
        <path d="M220 44 L214 58 L220 86 Z" fill="rgba(217,154,176,0.4)" />
        <path d="M400 44 L406 58 L400 86 Z" fill="rgba(217,154,176,0.4)" />
      </g>

      {/* Decorative leaves (bottom-right) */}
      <g transform="translate(440 620) rotate(18)" opacity="0.55">
        <path
          d="M0 0 C 10 -30, 44 -28, 52 -2 C 40 10, 14 12, 0 0 Z"
          fill="#5e6b3f"
        />
        <path
          d="M6 -2 C 18 -16, 34 -16, 44 -4"
          fill="none"
          stroke="#3f4a28"
          strokeWidth="1.2"
        />
        <path
          d="M40 4 C 60 -14, 88 -8, 86 16 C 70 26, 48 22, 40 4 Z"
          fill="#6d7a4a"
        />
        <path
          d="M44 6 C 58 -2, 72 -2, 80 10"
          fill="none"
          stroke="#46522c"
          strokeWidth="1.2"
        />
      </g>

      {/* Small leaf top-left near tape */}
      <g transform="translate(150 120) rotate(-22)" opacity="0.4">
        <path
          d="M0 0 C 8 -20, 30 -18, 34 -2 C 26 6, 10 8, 0 0 Z"
          fill="#5e6b3f"
        />
        <path d="M4 -1 C 12 -12, 24 -12, 30 -4" fill="none" stroke="#3f4a28" strokeWidth="1" />
      </g>
    </svg>
  );
}

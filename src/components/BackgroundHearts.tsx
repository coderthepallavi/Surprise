import { useMemo } from 'react';

interface HeartConfig {
  left: number;
  top: number;
  size: number;
  opacity: number;
  blur: number;
  duration: number;
  delay: number;
  drift: number;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function HeartShape({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 21s-7.5-4.9-10-9.6C.6 8.4 2 5 5.2 5c2 0 3.4 1.3 4.1 2.6.7-1.3 2.1-2.6 4.1-2.6C16.6 5 18 8.4 16.6 11.4 14.1 16.1 12 21 12 21z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function BackgroundHearts() {
  const hearts = useMemo<HeartConfig[]>(() => {
    const rand = seededRandom(42);
    const count = 26;
    return Array.from({ length: count }, () => {
      const size = 6 + rand() * 22;
      return {
        left: rand() * 100,
        top: rand() * 100,
        size,
        opacity: 0.04 + rand() * 0.09,
        blur: rand() > 0.6 ? 1 + rand() * 2.5 : 0,
        duration: 28 + rand() * 36,
        delay: -rand() * 40,
        drift: (rand() - 0.5) * 30,
      };
    });
  }, []);

  return (
    <div
      className="bg-hearts pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Radial glow behind main content */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 48%, rgba(122,31,51,0.22) 0%, rgba(94,26,42,0.10) 35%, transparent 70%)',
        }}
      />
      {/* Floating hearts */}
      {hearts.map((h, i) => (
        <div
          key={i}
          className="absolute text-rose-300"
          style={{
            left: `${h.left}%`,
            top: `${h.top}%`,
            opacity: h.opacity,
            filter: h.blur ? `blur(${h.blur}px)` : undefined,
            animation: `bg-float ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
            // CSS variables consumed by the keyframes
            ['--drift' as string]: `${h.drift}px`,
          }}
        >
          <HeartShape size={h.size} />
        </div>
      ))}
      <style>{`
        @keyframes bg-float {
          0%   { transform: translate(0, 0) rotate(0deg); }
          50%  { transform: translate(var(--drift), -26px) rotate(8deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}

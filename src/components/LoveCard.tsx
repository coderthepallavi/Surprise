import { useState, type KeyboardEvent } from 'react';
import type { CardData } from '@/content';

interface LoveCardProps {
  card: CardData;
  index: number;
  revealed: boolean;
}

interface Burst {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  tx: number;
  ty: number;
}

export default function LoveCard({ card, index, revealed }: LoveCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);

  const toggle = () => {
    setFlipped((f) => {
      const next = !f;
      if (next) {
        const newBursts: Burst[] = Array.from({ length: 10 }, (_, i) => {
          const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.4;
          return {
            id: Date.now() + i,
            x: 50 + (Math.random() - 0.5) * 60,
            y: 50 + (Math.random() - 0.5) * 60,
            size: 8 + Math.random() * 10,
            delay: Math.random() * 120,
            tx: Math.cos(angle) * (40 + Math.random() * 40),
            ty: Math.sin(angle) * (40 + Math.random() * 40),
          };
        });
        setBursts(newBursts);
        window.setTimeout(() => setBursts([]), 1100);
      }
      return next;
    });
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className="flip-card h-full w-full"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed
          ? 'translateY(0) scale(1)'
          : 'translateY(28px) scale(0.94)',
        transition:
          'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
        transitionDelay: `${index * 220}ms`,
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`${card.title} — ${card.hint}`}
        aria-pressed={flipped}
        onClick={toggle}
        onKeyDown={handleKey}
        className="group relative block h-full w-full cursor-pointer rounded-[1.25rem] outline-none focus-visible:ring-2 focus-visible:ring-rose-300/60"
        style={{ minHeight: 0 }}
      >
        {/* Heart burst layer */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {bursts.map((b) => (
            <span
              key={b.id}
              className="absolute text-rose-300"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                animation: `burst-fly 0.9s ease-out forwards`,
                animationDelay: `${b.delay}ms`,
                opacity: 0,
                ['--bx' as string]: `${b.tx}px`,
                ['--by' as string]: `${b.ty}px`,
              }}
            >
              <svg width={b.size} height={b.size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 21s-7.5-4.9-10-9.6C.6 8.4 2 5 5.2 5c2 0 3.4 1.3 4.1 2.6.7-1.3 2.1-2.6 4.1-2.6C16.6 5 18 8.4 16.6 11.4 14.1 16.1 12 21 12 21z" />
              </svg>
            </span>
          ))}
        </div>

        <div className={`flip-inner ${flipped ? 'is-flipped' : ''}`}>
          {/* FRONT */}
          <div className="flip-face bg-ink-700/80 backdrop-blur-sm border border-rose-300/10 shadow-card">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                <h3 className="font-serif text-2xl font-light tracking-wide text-ivory-50 drop-shadow">
                  {card.title}
                </h3>
                <p className="mt-2 font-hand text-lg text-rose-200/80">
                  {card.hint}
                </p>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className="flip-face flip-back bg-gradient-to-br from-burgundy-600/90 to-ink-800/95 border border-rose-300/20 shadow-card">
            <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <div className="absolute inset-3 rounded-xl border border-rose-200/10" />
              <p className="relative font-hand text-xl leading-relaxed text-ivory-100 sm:text-2xl">
                {card.message}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes burst-fly {
          0%   { transform: translate(-50%,-50%) scale(0.4); opacity: 0; }
          25%  { opacity: 0.9; }
          100% { transform: translate(calc(-50% + var(--bx, 0px)), calc(-50% + var(--by, -40px))) scale(0.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

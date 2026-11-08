import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { experienceData } from '@/content';

interface HeartRevealScreenProps {
  active: boolean;
  onRepeat: () => void;
}

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
}

export default function HeartRevealScreen({ active, onRepeat }: HeartRevealScreenProps) {
  const [clicked, setClicked] = useState(false);
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ripple, setRipple] = useState(0);
  const idRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setClicked(false);
      setShowLine1(false);
      setShowLine2(false);
      setShowRepeat(false);
      setParticles([]);
      setRipple(0);
    }
  }, [active]);

  const handleHeart = () => {
    if (clicked) return;
    setClicked(true);
    setRipple((r) => r + 1);

    const burst: Particle[] = Array.from({ length: 14 }, () => ({
      id: idRef.current++,
      angle: Math.random() * Math.PI * 2,
      distance: 70 + Math.random() * 70,
      size: 10 + Math.random() * 14,
      duration: 900 + Math.random() * 600,
    }));
    setParticles(burst);
    window.setTimeout(() => setParticles([]), 1600);

    window.setTimeout(() => setShowLine1(true), 480);
    window.setTimeout(() => setShowLine2(true), 1500);
    window.setTimeout(() => setShowRepeat(true), 3200);
  };

  const reduced = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      className="screen"
      data-state={active ? 'active' : 'exit'}
      aria-label="One last thing"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Background glow intensifies on click */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 'min(70vw, 420px)',
            height: 'min(70vw, 420px)',
            background:
              'radial-gradient(circle, rgba(122,31,51,0.35) 0%, rgba(94,26,42,0.12) 45%, transparent 70%)',
            opacity: clicked ? 1 : 0.6,
            transition: 'opacity 1.2s ease',
          }}
        />

        {/* Ripple */}
        {ripple > 0 && (
          <span
            key={ripple}
            className="ripple-layer pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-rose-300/40"
            style={{ animation: 'ripple-out 1.1s ease-out forwards' }}
          />
        )}

        {/* Heart button */}
        <button
          type="button"
          onClick={handleHeart}
          aria-label="Tap the heart"
          className="relative z-10 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-rose-300/60"
          style={{
            width: 'clamp(120px, 26vw, 170px)',
            height: 'clamp(120px, 26vw, 170px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: clicked ? 'default' : 'pointer',
          }}
        >
          <div
            className={reduced ? '' : 'animate-heartbeat'}
            style={{
              transform: clicked ? 'scale(1.12)' : 'scale(1)',
              filter: clicked
                ? 'drop-shadow(0 0 28px rgba(201,122,147,0.85)) drop-shadow(0 0 14px rgba(217,154,176,0.6))'
                : 'drop-shadow(0 0 18px rgba(201,122,147,0.55))',
              transition: 'transform 0.5s ease, filter 0.6s ease',
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="heartGrad" cx="38%" cy="32%" r="75%">
                  <stop offset="0%" stopColor="#d99ab0" />
                  <stop offset="40%" stopColor="#b15a76" />
                  <stop offset="100%" stopColor="#5e1a2a" />
                </radialGradient>
              </defs>
              <path
                d="M12 21s-7.5-4.9-10-9.6C.6 8.4 2 5 5.2 5c2 0 3.4 1.3 4.1 2.6.7-1.3 2.1-2.6 4.1-2.6C16.6 5 18 8.4 16.6 11.4 14.1 16.1 12 21 12 21z"
                fill="url(#heartGrad)"
              />
              {/* subtle highlight */}
              <path
                d="M7.4 7.2 C 8.6 6.4 10.2 6.6 11 7.8"
                stroke="rgba(255,240,235,0.45)"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </button>

        {/* Burst particles */}
        <div className="heart-burst pointer-events-none absolute left-1/2 top-1/2 z-20">
          {particles.map((p) => {
            const tx = Math.cos(p.angle) * p.distance;
            const ty = Math.sin(p.angle) * p.distance;
            return (
              <span
                key={p.id}
                className="absolute"
                style={{
                  left: 0,
                  top: 0,
                  transform: 'translate(-50%, -50%)',
                  animation: `particle-fly ${p.duration}ms cubic-bezier(0.22,1,0.36,1) forwards`,
                  // pass target via CSS vars
                  ['--tx' as string]: `${tx}px`,
                  ['--ty' as string]: `${ty}px`,
                  opacity: 0,
                }}
              >
                <svg
                  width={p.size}
                  height={p.size}
                  viewBox="0 0 24 24"
                  fill="rgba(217,154,176,0.85)"
                  aria-hidden="true"
                >
                  <path d="M12 21s-7.5-4.9-10-9.6C.6 8.4 2 5 5.2 5c2 0 3.4 1.3 4.1 2.6.7-1.3 2.1-2.6 4.1-2.6C16.6 5 18 8.4 16.6 11.4 14.1 16.1 12 21 12 21z" />
                </svg>
              </span>
            );
          })}
        </div>

        {/* Reveal text */}
        <div className="mt-12 flex flex-col items-center text-center" style={{ minHeight: '5rem' }}>
          <p
            className="font-serif font-light tracking-tight text-ivory-50"
            style={{
              fontSize: 'clamp(1.8rem, 6vw, 3rem)',
              lineHeight: 1.2,
              opacity: showLine1 ? 1 : 0,
              transform: showLine1 ? 'translateY(0)' : 'translateY(14px)',
              filter: showLine1 ? 'blur(0)' : 'blur(6px)',
              transition:
                'opacity 1s ease, transform 1s ease, filter 1s ease',
            }}
          >
            {experienceData.heart.line1}
          </p>
          <p
            className="mt-4 font-hand text-rose-200"
            style={{
              fontSize: 'clamp(1.1rem, 4vw, 1.6rem)',
              opacity: showLine2 ? 1 : 0,
              transform: showLine2 ? 'translateY(0)' : 'translateY(12px)',
              filter: showLine2 ? 'blur(0)' : 'blur(6px)',
              transition:
                'opacity 1.1s ease, transform 1.1s ease, filter 1.1s ease',
            }}
          >
            {experienceData.heart.line2}
          </p>
        </div>

        {/* Repeat button */}
        <button
          type="button"
          onClick={onRepeat}
          aria-label="Repeat from the beginning"
          className="btn-premium mt-10"
          style={{
            opacity: showRepeat ? 1 : 0,
            transform: showRepeat ? 'translateY(0)' : 'translateY(10px)',
            pointerEvents: showRepeat ? 'auto' : 'none',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          <RotateCcw size={18} strokeWidth={1.6} aria-hidden="true" />
          <span>Repeat</span>
        </button>
      </div>

      <style>{`
        @keyframes particle-fly {
          0%   { transform: translate(-50%,-50%) scale(0.5); opacity: 0; }
          20%  { opacity: 0.9; }
          100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.2); opacity: 0; }
        }
        @keyframes ripple-out {
          0%   { transform: translate(-50%,-50%) scale(0.4); opacity: 0.55; }
          100% { transform: translate(-50%,-50%) scale(2.6); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

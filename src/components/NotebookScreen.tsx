import { useEffect, useRef, useState } from 'react';
import { experienceData } from '@/content';
import NotebookSVG from './NotebookSVG';
import NextButton from './NextButton';

interface NotebookScreenProps {
  active: boolean;
  onNext: () => void;
}

export default function NotebookScreen({ active, onNext }: NotebookScreenProps) {
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [paperIn, setPaperIn] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    if (!active) {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      setTyped('');
      setDone(false);
      setShowButton(false);
      setPaperIn(false);
      return;
    }

    const t0 = window.setTimeout(() => setPaperIn(true), 120);
    timersRef.current.push(t0);

    // Typing loop using recursive timeouts (single active chain, easy to clear)
    const full = experienceData.letter;
    let i = 0;
    let cancelled = false;

    const startDelay = window.setTimeout(() => {
      if (cancelled) return;
      const step = () => {
        if (cancelled) return;
        if (i >= full.length) {
          setDone(true);
          const reveal = window.setTimeout(() => setShowButton(true), 700);
          timersRef.current.push(reveal);
          return;
        }
        const ch = full[i];
        i += 1;
        setTyped(full.slice(0, i));
        let delay = 42;
        if (ch === '\n') delay = 320;
        else if ('.!?'.includes(ch)) delay = 360;
        else if (ch === ',') delay = 200;
        else if (ch === ' ') delay = 55;
        const next = window.setTimeout(step, delay);
        timersRef.current.push(next);
      };
      step();
    }, 900);
    timersRef.current.push(startDelay);

    return () => {
      cancelled = true;
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [active]);

  return (
    <section
      className="screen"
      data-state={active ? 'active' : 'exit'}
      aria-label="A letter for you"
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: 'min(92vw, 440px)' }}
      >
        <div
          className="relative w-full"
          style={{
            transform: paperIn ? 'translateY(0) rotate(-2deg)' : 'translateY(26px) rotate(-2deg)',
            opacity: paperIn ? 1 : 0,
            transition:
              'transform 1s cubic-bezier(0.22,1,0.36,1), opacity 1s ease',
          }}
        >
          {/* Notebook SVG */}
          <div className="relative w-full" style={{ aspectRatio: '600 / 760' }}>
            <NotebookSVG className="absolute inset-0 h-full w-full" />

            {/* Typed letter content overlay */}
            <div
              className="absolute"
              style={{
                left: '20%',
                right: '7%',
                top: '20%',
                bottom: '12%',
              }}
            >
              <div
                aria-label="Letter content"
                className="font-hand whitespace-pre-wrap leading-[1.65] text-burgundy-500"
                style={{
                  fontSize: 'clamp(0.95rem, 3.4vw, 1.4rem)',
                  color: '#5e1a2a',
                }}
              >
                {typed}
                {!done && <span className="tw-cursor">&nbsp;</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute"
        style={{
          bottom: 'clamp(1.5rem, 7vh, 3rem)',
          opacity: showButton ? 1 : 0,
          transform: showButton ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
          pointerEvents: showButton ? 'auto' : 'none',
        }}
      >
        <NextButton label="Next" onClick={onNext} visible={showButton} />
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { experienceData } from '@/content';
import NextButton from './NextButton';

interface IntroScreenProps {
  active: boolean;
  onNext: () => void;
}

export default function IntroScreen({ active, onNext }: IntroScreenProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) {
      setPhase(0);
      return;
    }
    const timers = [
      window.setTimeout(() => setPhase(1), 400),
      window.setTimeout(() => setPhase(2), 1500),
      window.setTimeout(() => setPhase(3), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    <section className="screen" data-state={active ? 'active' : 'exit'} aria-label="Introduction">
      <div className="flex flex-col items-center text-center max-w-xl">
        <h1
          className="font-serif font-light tracking-tight text-ivory-50"
          style={{
            fontSize: 'clamp(2.2rem, 7vw, 4.2rem)',
            lineHeight: 1.15,
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(22px)',
            filter: phase >= 1 ? 'blur(0)' : 'blur(8px)',
            transition:
              'opacity 1.2s cubic-bezier(0.22,1,0.36,1), transform 1.2s cubic-bezier(0.22,1,0.36,1), filter 1.2s ease',
          }}
        >
          {experienceData.intro.title}
        </h1>

        <p
          className="mt-6 font-hand text-rose-200"
          style={{
            fontSize: 'clamp(1.4rem, 4.2vw, 2rem)',
            lineHeight: 1.4,
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(18px)',
            filter: phase >= 2 ? 'blur(0)' : 'blur(6px)',
            transition:
              'opacity 1.2s cubic-bezier(0.22,1,0.36,1), transform 1.2s cubic-bezier(0.22,1,0.36,1), filter 1.2s ease',
          }}
        >
          {experienceData.intro.subtitle}
        </p>

        <div
          className="mt-12"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 1s ease, transform 1s ease',
          }}
        >
          <NextButton label="Next" onClick={onNext} visible={phase >= 3} />
        </div>
      </div>
    </section>
  );
}

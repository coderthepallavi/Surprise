import { useEffect, useState } from 'react';
import { experienceData } from '@/content';
import LoveCard from './LoveCard';
import NextButton from './NextButton';

interface AppreciationScreenProps {
  active: boolean;
  onNext: () => void;
}

export default function AppreciationScreen({
  active,
  onNext,
}: AppreciationScreenProps) {
  const [revealed, setRevealed] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!active) {
      setRevealed(false);
      setShowButton(false);
      return;
    }
    const t1 = window.setTimeout(() => setRevealed(true), 250);
    const t2 = window.setTimeout(
      () => setShowButton(true),
      250 + experienceData.cards.length * 220 + 800,
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active]);

  return (
    <section
      className="screen overflow-y-auto py-[clamp(1.5rem,5vh,3rem)]"
      data-state={active ? 'active' : 'exit'}
      aria-label="A few things about you"
    >
      <div className="flex w-full max-w-6xl flex-col items-center">
        <h2
          className="mb-8 text-center font-serif text-xl font-light tracking-[0.18em] uppercase text-rose-200/70 sm:mb-10 sm:text-2xl"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          A few things about you
        </h2>

        <div className="cards-grid grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {experienceData.cards.map((card, i) => (
            <div key={card.title} className="aspect-[3/4] w-full">
              <LoveCard card={card} index={i} revealed={revealed} />
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12">
          <NextButton label="Next" onClick={onNext} visible={showButton} />
        </div>
      </div>
    </section>
  );
}

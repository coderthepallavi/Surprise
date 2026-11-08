import { useCallback, useEffect, useState } from 'react';
import BackgroundHearts from '@/components/BackgroundHearts';
import AmbientMusic from '@/components/AmbientMusic';
import IntroScreen from '@/components/IntroScreen';
import AppreciationScreen from '@/components/AppreciationScreen';
import NotebookScreen from '@/components/NotebookScreen';
import HeartRevealScreen from '@/components/HeartRevealScreen';

const TOTAL = 4;

function App() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [musicRestart, setMusicRestart] = useState(0);

  // Sync hash on mount + when screen changes
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const n = Number(hash);
    if (Number.isInteger(n) && n >= 0 && n < TOTAL) {
      setCurrent(n);
    }
  }, []);

  useEffect(() => {
    if (history.replaceState) {
      history.replaceState(null, '', `#${current}`);
    }
  }, [current]);

  const goTo = useCallback((next: number) => {
    if (next < 0 || next >= TOTAL || animating) return;
    setAnimating(true);
    setCurrent(next);
    window.setTimeout(() => setAnimating(false), 950);
  }, [animating]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-ink-900">
      <BackgroundHearts />

      {/* Vignette for cinematic depth */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      <div className="relative z-10 h-full w-full">
        <IntroScreen
          active={current === 0}
          onNext={() => goTo(1)}
        />
        <AppreciationScreen
          active={current === 1}
          onNext={() => goTo(2)}
        />
        <NotebookScreen
          active={current === 2}
          onNext={() => goTo(3)}
        />
        <HeartRevealScreen active={current === 3} onRepeat={() => {
            setMusicRestart((n) => n + 1);
            goTo(0);
          }} />
      </div>

      <AmbientMusic restartSignal={musicRestart} />
    </main>
  );
}

export default App;
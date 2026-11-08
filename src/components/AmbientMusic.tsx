import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Apna song yahan rakho: public/music/song.mp3
const SONG_SRC = 'music/song.mp3';

interface AmbientMusicProps {
  // Ye number badhne par song shuru se dobara chalta hai (Repeat button ke liye)
  restartSignal?: number;
}

export default function AmbientMusic({ restartSignal = 0 }: AmbientMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const play = async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      await audio.play();
      setPlaying(true);
      return true;
    } catch {
      setPlaying(false);
      return false;
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  // Page khulte hi auto play try karo. Browser block kare to pehle tap/click/key par shuru karo.
  useEffect(() => {
    let started = false;

    const cleanup = () => {
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('touchstart', onInteract);
      window.removeEventListener('keydown', onInteract);
    };

    const onInteract = (e: Event) => {
      if (started) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('.music-toggle')) return;
      void play().then((ok) => {
        if (ok) {
          started = true;
          cleanup();
        }
      });
    };

    void play().then((ok) => {
      if (ok) {
        started = true;
        cleanup();
      }
    });

    window.addEventListener('pointerdown', onInteract);
    window.addEventListener('touchstart', onInteract);
    window.addEventListener('keydown', onInteract);
    return cleanup;
  }, []);

  // Repeat dabane par song starting se
  useEffect(() => {
    if (restartSignal === 0) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void play();
  }, [restartSignal]);

  return (
    <>
      <audio ref={audioRef} src={SONG_SRC} loop preload="auto" />
      <button
        type="button"
        onClick={() => (playing ? pause() : void play())}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        aria-pressed={playing}
        className="music-toggle"
      >
        {playing ? <Volume2 size={17} strokeWidth={1.5} /> : <VolumeX size={17} strokeWidth={1.5} />}
        <span>{playing ? 'Sound on' : 'Play sound'}</span>
      </button>
    </>
  );
}
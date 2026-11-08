import { ChevronRight } from 'lucide-react';

interface NextButtonProps {
  onClick: () => void;
  label?: string;
  visible: boolean;
  delayMs?: number;
  ariaLabel?: string;
}

export default function NextButton({
  onClick,
  label = 'Next',
  visible,
  delayMs = 0,
  ariaLabel,
}: NextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      className="btn-premium"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
        transitionDelay: `${delayMs}ms`,
      }}
    >
      <span>{label}</span>
      <ChevronRight size={18} strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}

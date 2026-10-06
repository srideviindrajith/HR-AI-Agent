import { useEffect, useState } from 'react';

const phases = [
  'Understanding your request...',
  'Checking leave policies...',
  'Verifying eligibility...',
];

export function ThinkingIndicator({ onComplete }: { onComplete: () => void }) {
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    phases.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setCurrentPhase(i);
        }, i * 600)
      );
    });
    timers.push(
      setTimeout(() => {
        onComplete();
      }, phases.length * 600)
    );
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="bg-paper rounded-2xl border border-beige p-8 animate-fade-up">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-warm-orange thinking-dot" style={{ animationDelay: '0s' }} />
          <span className="w-2 h-2 rounded-full bg-warm-orange thinking-dot" style={{ animationDelay: '0.15s' }} />
          <span className="w-2 h-2 rounded-full bg-warm-orange thinking-dot" style={{ animationDelay: '0.3s' }} />
        </div>
        <p className="font-editorial text-base text-charcoal">{phases[currentPhase]}</p>
      </div>

      <div className="space-y-2.5">
        {phases.map((phase, i) => (
          <div
            key={phase}
            className={`flex items-center gap-2.5 text-sm transition-all duration-300 ${
              i <= currentPhase ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i < currentPhase ? 'bg-sage' : i === currentPhase ? 'bg-warm-orange animate-pulse-soft' : 'bg-beige-dark'
              }`}
            />
            <span className={i <= currentPhase ? 'text-charcoal-light' : 'text-charcoal-muted'}>{phase}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

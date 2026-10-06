import { CheckCircle2 } from 'lucide-react';
import type { ParsedRequest } from '../types';

interface Props {
  parsed: ParsedRequest;
}

export function WorkflowProgress({ parsed }: Props) {
  const steps = [
    { label: 'AI Understanding', description: 'Request parsed and structured' },
    { label: 'Policy Check', description: 'Eligibility verified against policy' },
    { label: 'Manager Review', description: `Pending approval from your manager` },
    { label: 'HR Review', description: 'Final compliance check' },
    { label: 'Approved', description: 'Request confirmed' },
  ];

  return (
    <div className="bg-paper rounded-2xl border border-beige p-6 animate-fade-up">
      <h3 className="font-editorial text-lg text-charcoal font-medium mb-1">Request Workflow</h3>
      <p className="text-xs text-charcoal-muted mb-5">{parsed.typeLabel} — {parsed.dates.join(', ')}</p>

      <div className="relative">
        {steps.map((step, i) => {
          const isCompleted = i < 2;
          const isActive = i === 2;
          const isPending = i > 2;

          return (
            <div key={step.label} className="relative flex items-start gap-4 pb-7 last:pb-0">
              {i < steps.length - 1 && (
                <div
                  className={`absolute left-3.5 top-7 bottom-0 w-0.5 ${
                    isCompleted ? 'bg-sage' : 'bg-beige-dark'
                  }`}
                />
              )}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors duration-300 ${
                  isCompleted
                    ? 'bg-sage text-paper'
                    : isActive
                    ? 'bg-warm-orange-muted text-warm-orange-dark border-2 border-warm-orange'
                    : 'bg-beige text-charcoal-muted border border-beige-dark'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <span className="text-xs font-medium">{i + 1}</span>
                )}
              </div>
              <div className="pt-0.5">
                <p
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isPending ? 'text-charcoal-muted' : 'text-charcoal'
                  }`}
                >
                  {step.label}
                  {isActive && (
                    <span className="ml-2 text-xs text-warm-orange-dark font-normal animate-pulse-soft">In progress</span>
                  )}
                </p>
                <p
                  className={`text-xs mt-0.5 transition-colors duration-300 ${
                    isPending ? 'text-charcoal-muted/60' : 'text-charcoal-muted'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

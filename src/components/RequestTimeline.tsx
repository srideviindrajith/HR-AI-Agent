import { Clock, CheckCircle2 } from 'lucide-react';
import type { ActiveRequest } from '../types';

interface Props {
  requests: ActiveRequest[];
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  ai_understanding: { label: 'AI Understanding', color: 'text-warm-orange-dark', bg: 'bg-warm-orange-muted' },
  policy_check: { label: 'Policy Check', color: 'text-warm-orange-dark', bg: 'bg-warm-orange-muted' },
  manager_review: { label: 'Manager Review', color: 'text-sage-dark', bg: 'bg-sage-muted/40' },
  hr_review: { label: 'HR Review', color: 'text-sage-dark', bg: 'bg-sage-muted/40' },
  approved: { label: 'Approved', color: 'text-sage-dark', bg: 'bg-sage-muted/30' },
  rejected: { label: 'Rejected', color: 'text-warm-orange-dark', bg: 'bg-warm-orange-muted' },
};

export function RequestTimeline({ requests }: Props) {
  return (
    <div className="bg-paper rounded-2xl border border-beige p-6 animate-fade-up" style={{ animationDelay: '60ms' }}>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-sage" />
        <h3 className="font-editorial text-lg text-charcoal font-medium">Active Requests</h3>
      </div>

      {requests.length === 0 ? (
        <p className="text-sm text-charcoal-muted italic">No active requests</p>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => {
            const status = statusConfig[req.status];
            return (
              <div key={req.id} className="bg-ivory-deep rounded-xl p-4 hover:bg-beige-light transition-colors duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm text-charcoal">{req.typeLabel}</p>
                    <p className="text-xs text-charcoal-muted mt-0.5">{req.dates.join(', ')}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${status.bg} ${status.color} font-medium`}>
                    {status.label}
                  </span>
                </div>
                <p className="text-xs text-charcoal-muted italic mb-2">"{req.reason}"</p>
                <div className="flex items-center gap-1.5 text-xs text-charcoal-muted">
                  {req.status === 'approved' && <CheckCircle2 className="w-3 h-3 text-sage" />}
                  <span>Submitted {req.submittedDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

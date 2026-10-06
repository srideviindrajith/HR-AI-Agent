import { CheckCircle2 } from 'lucide-react';
import type { ParsedRequest } from '../types';

interface Props {
  parsed: ParsedRequest;
  onNewRequest: () => void;
}

export function SubmittedConfirmation({ parsed, onNewRequest }: Props) {
  return (
    <div className="bg-paper rounded-2xl border border-beige p-8 animate-scale-in text-center">
      <div className="w-16 h-16 rounded-full bg-sage-muted/30 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-8 h-8 text-sage-dark" />
      </div>
      <h3 className="font-editorial text-2xl text-charcoal font-medium mb-2">Request Submitted</h3>
      <p className="text-sm text-charcoal-muted mb-5 max-w-md mx-auto">
        Your {parsed.typeLabel.toLowerCase()} request for {parsed.dates.join(', ')} has been submitted and is now routing through the approval workflow.
      </p>
      <button
        onClick={onNewRequest}
        className="bg-beige text-charcoal-light rounded-xl px-6 py-2.5 text-sm font-medium hover:bg-beige-dark transition-colors duration-200"
      >
        New Request
      </button>
    </div>
  );
}

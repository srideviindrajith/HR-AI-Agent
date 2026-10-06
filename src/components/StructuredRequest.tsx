import { Calendar, FileCheck, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import type { ParsedRequest } from '../types';

interface Props {
  parsed: ParsedRequest;
  eligibility: { eligible: boolean; message: string };
  policyTitle: string;
  onSubmit: () => void;
  onCancel: () => void;
}

export function StructuredRequest({ parsed, eligibility, policyTitle, onSubmit, onCancel }: Props) {
  return (
    <div className="bg-paper rounded-2xl border border-beige p-6 animate-scale-in">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-sage/20 flex items-center justify-center">
          <FileCheck className="w-3.5 h-3.5 text-sage-dark" />
        </div>
        <div>
          <h3 className="font-editorial text-lg text-charcoal font-medium">Structured Request</h3>
          <p className="text-xs text-charcoal-muted">AI has converted your message into a formal request</p>
        </div>
      </div>

      <div className="bg-ivory-deep rounded-xl p-1 mb-5">
        <div className="bg-paper rounded-lg p-4 border border-beige">
          <p className="text-xs uppercase tracking-wider text-charcoal-muted mb-2">Your original message</p>
          <p className="text-sm text-charcoal-light italic">"{parsed.rawInput}"</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <RequestField icon={<FileCheck className="w-3.5 h-3.5" />} label="Request Type" value={parsed.typeLabel} />
        <RequestField icon={<Calendar className="w-3.5 h-3.5" />} label="Dates" value={parsed.dates.join(', ')} />
        <RequestField icon={<ShieldCheck className="w-3.5 h-3.5" />} label="Policy Reference" value={policyTitle} />
        <RequestField icon={<FileCheck className="w-3.5 h-3.5" />} label="Reason" value={parsed.reason} />
      </div>

      <div className={`rounded-xl p-4 mb-5 ${eligibility.eligible ? 'bg-sage-muted/25' : 'bg-warm-orange-muted'}`}>
        <div className="flex items-start gap-2.5">
          {eligibility.eligible ? (
            <CheckCircle2 className="w-4 h-4 text-sage-dark flex-shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-4 h-4 text-warm-orange-dark flex-shrink-0 mt-0.5" />
          )}
          <div>
            <p className={`text-sm font-medium ${eligibility.eligible ? 'text-sage-dark' : 'text-warm-orange-dark'}`}>
              {eligibility.eligible ? 'Eligible' : 'Not Eligible'}
            </p>
            <p className="text-xs text-charcoal-light mt-0.5">{eligibility.message}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onSubmit}
          disabled={!eligibility.eligible}
          className="flex-1 bg-charcoal text-paper rounded-xl py-3 text-sm font-medium hover:bg-sage-dark transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit Request
        </button>
        <button
          onClick={onCancel}
          className="px-5 bg-beige text-charcoal-light rounded-xl py-3 text-sm font-medium hover:bg-beige-dark transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function RequestField({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-ivory-deep rounded-xl p-3">
      <div className="flex items-center gap-1.5 text-sage mb-1.5">
        {icon}
        <p className="text-xs uppercase tracking-wider text-charcoal-muted">{label}</p>
      </div>
      <p className="text-sm text-charcoal font-medium">{value}</p>
    </div>
  );
}

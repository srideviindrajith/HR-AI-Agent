import { FileText, RefreshCw } from 'lucide-react';
import type { PolicyDocument } from '../types';

interface Props {
  policy: PolicyDocument | null;
}

export function PolicyContext({ policy }: Props) {
  if (!policy) {
    return (
      <div className="bg-paper rounded-2xl border border-beige p-6 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-sage" />
          <h3 className="font-editorial text-lg text-charcoal font-medium">Policy Reference</h3>
        </div>
        <p className="text-sm text-charcoal-muted">
          Ask a question about leave, remote work, or time off. The relevant policy will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-paper rounded-2xl border border-beige p-6 animate-scale-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-sage" />
          <h3 className="font-editorial text-lg text-charcoal font-medium">Policy Reference</h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-sage-muted/30 text-sage-dark font-medium">
          Relevant
        </span>
      </div>

      <div className="bg-ivory-deep rounded-xl p-4 border-l-2 border-sage">
        <p className="font-editorial text-base text-charcoal font-medium mb-1">{policy.title}</p>
        <p className="text-xs text-charcoal-muted mb-3">{policy.section}</p>
        <p className="text-sm text-charcoal-light leading-relaxed">{policy.relevantExcerpt}</p>
      </div>

      <div className="flex items-center gap-1.5 mt-3 text-xs text-charcoal-muted">
        <RefreshCw className="w-3 h-3" />
        <span>Updated {policy.updatedDate}</span>
      </div>
    </div>
  );
}

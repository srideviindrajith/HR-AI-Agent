import { ArrowRight, Check } from 'lucide-react';

const enterpriseFeatures = [
  'Multiple AI agents',
  'Custom HR workflows',
  'Email integration',
  'Internal automation',
  'Priority support',
];

export function EnterpriseCTA() {
  return (
    <div className="bg-paper rounded-2xl border border-beige p-6 animate-fade-up" style={{ animationDelay: '180ms' }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-warm-orange-dark mb-1">PhoenixAI Studio</p>
          <h3 className="font-editorial text-xl text-charcoal font-medium">AI Enterprise Agent</h3>
        </div>
        <div className="text-right">
          <p className="font-editorial text-2xl text-charcoal font-medium">
            ₹59,999
          </p>
          <p className="text-xs text-charcoal-muted">per year</p>
        </div>
      </div>

      <div className="space-y-2 mb-5">
        {enterpriseFeatures.map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-sm text-charcoal-light">
            <Check className="w-3.5 h-3.5 text-sage flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button className="w-full bg-charcoal text-paper rounded-xl py-3 text-sm font-medium hover:bg-sage-dark transition-colors duration-200 flex items-center justify-center gap-2 group">
        Experience HR AI
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>
    </div>
  );
}

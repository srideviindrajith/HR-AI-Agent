import { useState } from 'react';
import { Send, Mic, Sparkles } from 'lucide-react';

interface Props {
  onSubmit: (input: string) => void;
  disabled: boolean;
}

const examplePrompts = [
  'Can I take leave next Friday?',
  'I need to work from home next Friday because I have an appointment.',
  'I am feeling unwell and need sick leave tomorrow.',
];

export function AIInput({ onSubmit, disabled }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  const handleExample = (prompt: string) => {
    if (!disabled) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="bg-paper rounded-2xl border border-beige p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-warm-orange" />
        <p className="text-xs uppercase tracking-wider text-charcoal-muted">Ask in your own words</p>
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            disabled={disabled}
            placeholder="Type naturally — e.g. 'I need to take leave next Friday for a family event'"
            rows={2}
            className="w-full bg-ivory-deep rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-charcoal-muted/60 border border-transparent focus:border-sage focus:outline-none resize-none transition-colors duration-200 scrollbar-thin disabled:opacity-50"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="w-10 h-10 rounded-xl bg-charcoal text-paper flex items-center justify-center hover:bg-sage-dark transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
        <button
          className="w-10 h-10 rounded-xl bg-beige text-charcoal-muted flex items-center justify-center hover:bg-beige-dark transition-colors duration-200 flex-shrink-0"
          title="Voice input"
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>

      {!disabled && (
        <div className="flex flex-wrap gap-2 mt-3">
          {examplePrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleExample(prompt)}
              className="text-xs px-3 py-1.5 rounded-full bg-ivory-deep text-charcoal-muted hover:bg-beige hover:text-charcoal-light transition-colors duration-200 border border-beige"
            >
              {prompt.length > 40 ? prompt.slice(0, 40) + '...' : prompt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

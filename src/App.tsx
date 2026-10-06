'use client';

import { useState } from 'react';
import { Sparkles, Workflow } from 'lucide-react';
import { EmployeeProfile } from './components/EmployeeProfile';
import { RequestTimeline } from './components/RequestTimeline';
import { PolicyContext } from './components/PolicyContext';
import { AIInput } from './components/AIInput';
import { ThinkingIndicator } from './components/ThinkingIndicator';
import { StructuredRequest } from './components/StructuredRequest';
import { WorkflowProgress } from './components/WorkflowProgress';
import { EnterpriseCTA } from './components/EnterpriseCTA';
import { SubmittedConfirmation } from './components/SubmittedConfirmation';
import { employee, activeRequests, policyDocuments } from './data';
import { parseRequest, findRelevantPolicy, checkEligibility } from './nlu';
import type { ParsedRequest, PolicyDocument } from './types';

type Stage = 'idle' | 'thinking' | 'structured' | 'submitted';

export default function App() {
  const [stage, setStage] = useState<Stage>('idle');
  const [parsed, setParsed] = useState<ParsedRequest | null>(null);
  const [policy, setPolicy] = useState<PolicyDocument | null>(null);
  const [submittedParsed, setSubmittedParsed] = useState<ParsedRequest | null>(null);

  const handleSubmit = (input: string) => {
    const result = parseRequest(input);
    const relevantPolicy = findRelevantPolicy(result.type, policyDocuments);
    setParsed(result);
    setPolicy(relevantPolicy);
    setStage('thinking');
  };

  const handleThinkingComplete = () => {
    setStage('structured');
  };

  const handleConfirmSubmit = () => {
    if (parsed) {
      setSubmittedParsed(parsed);
      setStage('submitted');
    }
  };

  const handleCancel = () => {
    setStage('idle');
    setParsed(null);
    setPolicy(null);
  };

  const handleNewRequest = () => {
    setStage('idle');
    setParsed(null);
    setPolicy(null);
    setSubmittedParsed(null);
  };

  const balanceForType = () => {
    const balanceMap: Record<string, string> = {
      annual_leave: 'Annual Leave',
      sick_leave: 'Sick Leave',
      remote_work: 'Remote Work',
      work_from_home: 'Remote Work',
      comp_off: 'Comp Off',
    };
    const balanceName = parsed ? balanceMap[parsed.type] : '';
    const balance = employee.leaveBalances.find((b) => b.type === balanceName);
    return balance ? balance.available : 0;
  };

  const eligibility = parsed ? checkEligibility(parsed.type, balanceForType()) : { eligible: false, message: '' };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="border-b border-beige bg-paper/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-charcoal flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-warm-orange" />
            </div>
            <div>
              <p className="font-editorial text-lg text-charcoal font-medium leading-none">PhoenixAI</p>
              <p className="text-xs text-charcoal-muted mt-0.5">Studio</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm text-charcoal-muted">HR AI Agent</span>
            <div className="h-4 w-px bg-beige-dark" />
            <span className="text-xs text-sage-dark bg-sage-muted/30 px-3 py-1 rounded-full">Enterprise</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-10">
        {/* Hero intro */}
        <div className="mb-8 lg:mb-10">
          <p className="text-xs uppercase tracking-widest text-warm-orange-dark mb-3">Future Digital Workplace</p>
          <h1 className="font-editorial text-3xl lg:text-4xl text-charcoal font-medium leading-tight max-w-2xl">
            Your AI-powered HR companion for the modern workplace
          </h1>
          <p className="text-charcoal-muted mt-3 max-w-xl text-sm lg:text-base leading-relaxed">
            Speak naturally. The AI understands your request, checks policies, and routes it through the right approval workflow — no forms, no friction.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {/* Left column — Employee & Requests */}
          <div className="space-y-5 lg:space-y-6">
            <EmployeeProfile employee={employee} />
            <RequestTimeline requests={activeRequests} />
          </div>

          {/* Center column — AI interaction */}
          <div className="space-y-5 lg:space-y-6">
            <AIInput onSubmit={handleSubmit} disabled={stage === 'thinking'} />

            {stage === 'thinking' && (
              <ThinkingIndicator onComplete={handleThinkingComplete} />
            )}

            {stage === 'structured' && parsed && (
              <StructuredRequest
                parsed={parsed}
                eligibility={eligibility}
                policyTitle={policy?.title || 'General Policy'}
                onSubmit={handleConfirmSubmit}
                onCancel={handleCancel}
              />
            )}

            {stage === 'submitted' && submittedParsed && (
              <SubmittedConfirmation parsed={submittedParsed} onNewRequest={handleNewRequest} />
            )}

            {stage === 'idle' && (
              <div className="bg-paper rounded-2xl border border-beige p-8 animate-fade text-center">
                <Workflow className="w-10 h-10 text-sage-muted mx-auto mb-3" />
                <h3 className="font-editorial text-lg text-charcoal font-medium mb-1">How it works</h3>
                <p className="text-sm text-charcoal-muted max-w-xs mx-auto leading-relaxed">
                  Type your request above in plain language. The AI will understand it, check policies, and create a structured request for you.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {['AI Understanding', 'Policy Check', 'Manager Review', 'HR Review', 'Approved'].map((step) => (
                    <span key={step} className="text-xs px-2.5 py-1 rounded-full bg-ivory-deep text-charcoal-muted flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column — Policy & Enterprise */}
          <div className="space-y-5 lg:space-y-6">
            <PolicyContext policy={policy} />
            {stage === 'submitted' && submittedParsed && <WorkflowProgress parsed={submittedParsed} />}
            <EnterpriseCTA />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-beige mt-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-charcoal-muted">
            PhoenixAI Studio — HR AI Agent · The future of employee operations
          </p>
          <p className="text-xs text-charcoal-muted">Demo workspace · Demo data only</p>
        </div>
      </footer>
    </div>
  );
}

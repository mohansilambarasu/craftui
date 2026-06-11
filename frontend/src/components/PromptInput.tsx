import { useRef, useEffect } from 'react';
import { Sparkles, Square, Wand2, AlertTriangle } from 'lucide-react';
import { PROMPT_TEMPLATES } from '../lib/templates';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: (prompt: string) => void;
  onEnhance: (prompt: string) => void;
  isGenerating: boolean;
  onStop: () => void;
}

const TIPS = [
  { good: true, text: 'a dark navbar with logo, 5 nav links, and user avatar dropdown' },
  { good: true, text: 'a pricing card with three tiers and a highlighted pro plan' },
  { good: true, text: 'a stats dashboard with 4 KPI cards showing revenue and growth' },
  { good: false, text: 'avoid numbered requirements, props interfaces, or multi-file requests' },
];

export function PromptInput({
  prompt,
  setPrompt,
  onGenerate,
  onEnhance,
  isGenerating,
  onStop,
}: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isTooLong = prompt.length > 300;
  const isComplex = /requirements:|deliverables:|props:|interface:|folder structure|App\.jsx|\.tsx|import |export /i.test(prompt);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onGenerate(prompt);
    }
  };

  return (
    <section
      id="prompt-section"
      style={{
        background: '#F7F2EA',
        borderTop: '1px solid rgba(96,116,86,0.15)',
        borderBottom: '1px solid rgba(96,116,86,0.15)',
      }}
      className="w-full px-4 py-10 sm:px-6 sm:py-12"
    >
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: 'rgba(42,31,31,0.35)' }}
          >
            Step 01 — Describe
          </div>
          <h2
            className="font-black mb-2 text-2xl sm:text-[28px]"
            style={{ color: '#2A1F1F', letterSpacing: '-1px' }}
          >
            What do you want to build?
          </h2>
          <p className="text-sm" style={{ color: 'rgba(42,31,31,0.45)' }}>
            Describe your component in plain English. Keep it visual and concise.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">

          <div>
            <div
              className="rounded-xl mb-4 transition-all"
              style={{
                background: '#EEE0CC',
                border: `1.5px solid ${isTooLong || isComplex ? '#BA6A4C' : '#607456'}`,
                padding: '14px 16px',
              }}
            >
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe the component you want to build..."
                rows={3}
                className="w-full bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed"
                style={{ color: '#2A1F1F', caretColor: '#607456' }}
              />
              <div
                className="flex flex-col gap-3 pt-3 mt-2 sm:flex-row sm:items-center sm:justify-between"
                style={{ borderTop: '1px solid rgba(96,116,86,0.15)' }}
              >
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-xs font-mono" style={{ color: 'rgba(42,31,31,0.25)' }}>
                    ⌘ + Enter to generate
                  </span>
                  {prompt.length > 0 && (
                    <span
                      className="text-xs font-mono"
                      style={{ color: isTooLong ? '#BA6A4C' : 'rgba(42,31,31,0.2)' }}
                    >
                      {prompt.length} chars
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                  <button
                    onClick={() => onEnhance(prompt)}
                    disabled={!prompt.trim() || isGenerating}
                    className="flex min-h-10 items-center justify-center gap-1.5 text-xs font-medium transition-all disabled:cursor-not-allowed disabled:opacity-30 sm:min-h-0"
                    style={{
                      background: 'rgba(96,116,86,0.1)',
                      border: '1px solid rgba(96,116,86,0.25)',
                      color: '#607456',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <Wand2 size={11} />
                    Enhance
                  </button>
                  {isGenerating ? (
                    <button
                      onClick={onStop}
                      className="flex min-h-10 items-center justify-center gap-1.5 text-xs font-bold transition-all sm:min-h-0"
                      style={{
                        background: 'rgba(123,37,37,0.08)',
                        border: '1px solid rgba(123,37,37,0.2)',
                        color: '#7B2525',
                        padding: '5px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      <Square size={11} />
                      Stop
                    </button>
                  ) : (
                    <button
                      onClick={() => onGenerate(prompt)}
                      disabled={!prompt.trim()}
                      className="flex min-h-10 items-center justify-center gap-1.5 text-xs font-bold transition-all disabled:cursor-not-allowed disabled:opacity-30 sm:min-h-0"
                      style={{
                        background: '#607456',
                        border: 'none',
                        color: '#EEE0CC',
                        padding: '5px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#506346')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#607456')}
                    >
                      <Sparkles size={11} />
                      Generate
                    </button>
                  )}
                </div>
              </div>
            </div>

            {(isTooLong || isComplex) && (
              <div
                className="flex items-start gap-3 rounded-xl mb-4 p-3"
                style={{
                  background: 'rgba(186,106,76,0.08)',
                  border: '1px solid rgba(186,106,76,0.2)',
                }}
              >
                <AlertTriangle size={13} style={{ color: '#BA6A4C', marginTop: '1px', flexShrink: 0 }} />
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: '#BA6A4C' }}>
                    Prompt may be too complex
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(186,106,76,0.8)' }}>
                    CraftUI works best with short visual descriptions under 300 characters. Try: <em>"a dark navbar with logo, nav links, and user avatar"</em>
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {PROMPT_TEMPLATES.map((template) => (
                <button
                  key={template.label}
                  onClick={() => setPrompt(template.prompt)}
                  className="flex min-h-10 items-center justify-center gap-1.5 text-xs font-medium transition-all sm:min-h-0 sm:justify-start"
                  style={{
                    background: '#EEE0CC',
                    border: '1px solid rgba(96,116,86,0.2)',
                    color: 'rgba(42,31,31,0.5)',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#ddd5bf';
                    e.currentTarget.style.color = '#2A1F1F';
                    e.currentTarget.style.borderColor = 'rgba(96,116,86,0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#EEE0CC';
                    e.currentTarget.style.color = 'rgba(42,31,31,0.5)';
                    e.currentTarget.style.borderColor = 'rgba(96,116,86,0.2)';
                  }}
                >
                  <span>{template.icon}</span>
                  {template.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div
              className="rounded-xl p-4"
              style={{
                background: '#EEE0CC',
                border: '1px solid rgba(96,116,86,0.15)',
              }}
            >
              <div
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: 'rgba(42,31,31,0.35)' }}
              >
                💡 Prompt tips
              </div>
              <div className="flex flex-col gap-1.5">
                {TIPS.map((tip, i) => (
                  <p
                    key={i}
                    className="text-xs leading-relaxed"
                    style={{ color: tip.good ? 'rgba(42,31,31,0.55)' : 'rgba(42,31,31,0.3)' }}
                  >
                    <span className="mr-1.5">{tip.good ? '✅' : '❌'}</span>
                    {tip.text}
                  </p>
                ))}
              </div>
            </div>

            <div
              className="rounded-xl p-4"
              style={{
                background: '#EEE0CC',
                border: '1px solid rgba(96,116,86,0.15)',
              }}
            >
              <div
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: 'rgba(42,31,31,0.35)' }}
              >
                🕐 How it works
              </div>
              <div className="flex flex-col gap-2">
                {[
                  'Describe what you want to see',
                  'AI generates React and Tailwind code',
                  'Preview renders live in the browser',
                  'Copy or download the .tsx file',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: '#607456',
                        color: '#EEE0CC',
                        fontSize: '9px',
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(42,31,31,0.5)' }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

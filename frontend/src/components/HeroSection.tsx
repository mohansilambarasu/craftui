import { HeroBackground } from './HeroBackground';

export function HeroSection() {
  const scrollToPrompt = () => {
    document.getElementById('prompt-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: '#EEE0CC', minHeight: 'calc(100vh - 56px)' }}
    >
      <HeroBackground />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(96,116,86,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(96,116,86,0.08) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div
        className="absolute top-16 left-8 pointer-events-none hidden lg:block"
        style={{
          background: '#F7F2EA',
          border: '1px solid rgba(96,116,86,0.2)',
          borderRadius: '10px',
          padding: '10px 14px',
          boxShadow: '0 2px 12px rgba(42,31,31,0.06)',
        }}
      >
        <div className="text-xs mb-1" style={{ color: 'rgba(42,31,31,0.35)' }}>Last generated</div>
        <div className="text-xs font-semibold" style={{ color: '#2A1F1F' }}>Pricing card · 2s ago</div>
      </div>

      <div
        className="absolute bottom-24 right-8 pointer-events-none hidden lg:block"
        style={{
          background: '#F7F2EA',
          border: '1px solid rgba(96,116,86,0.2)',
          borderRadius: '10px',
          padding: '10px 14px',
          boxShadow: '0 2px 12px rgba(42,31,31,0.06)',
        }}
      >
        <div className="text-xs mb-1" style={{ color: 'rgba(42,31,31,0.35)' }}>Powered by</div>
        <div className="text-xs font-semibold" style={{ color: '#2A1F1F' }}>Groq llama-3.3-70b</div>
      </div>

      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{ minHeight: 'calc(100vh - 56px)' }}
      >
        <div
          className="inline-flex items-center gap-2 mb-6"
          style={{
            border: '1.5px solid rgba(96,116,86,0.3)',
            borderRadius: '20px',
            padding: '5px 14px',
            background: 'rgba(96,116,86,0.06)',
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#607456' }} />
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: '#607456' }}
          >
            AI Component Studio
          </span>
        </div>

        <h1
          className="font-black mb-4"
          style={{
            fontSize: 'clamp(40px, 7vw, 72px)',
            lineHeight: 1.0,
            letterSpacing: '-3px',
            color: '#2A1F1F',
            maxWidth: '700px',
          }}
        >
          Describe it.<br />
          <em style={{ color: '#BA6A4C', fontStyle: 'italic' }}>We build it.</em>
        </h1>

        <p
          className="mb-10"
          style={{
            fontSize: '15px',
            color: 'rgba(42,31,31,0.5)',
            lineHeight: 1.7,
            maxWidth: '400px',
          }}
        >
          Turn plain English into production-ready React and Tailwind components with live preview. Free, instant, no signup.
        </p>

        <div className="flex items-center gap-3 mb-12">
          <button
            onClick={scrollToPrompt}
            className="flex items-center gap-2 font-bold transition-all"
            style={{
              background: '#607456',
              color: '#EEE0CC',
              fontSize: '13px',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#506346')}
            onMouseLeave={e => (e.currentTarget.style.background = '#607456')}
          >
            Start building ↓
          </button>
        </div>

        <div className="flex items-center gap-8">
          {[
            { num: 'Free', label: 'Powered by Groq' },
            { num: 'Live', label: 'Instant preview' },
            { num: 'Download', label: 'ready in seconds' },
            { num: 'Open', label: 'Source on GitHub' },
          ].map((stat, i, arr) => (
            <div key={stat.num} className="flex items-center gap-8">
              <div className="text-center">
                <div
                  className="font-black"
                  style={{ fontSize: '18px', color: '#2A1F1F', letterSpacing: '-0.5px' }}
                >
                  {stat.num}
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(42,31,31,0.35)' }}>
                  {stat.label}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width: '1px', height: '32px', background: 'rgba(42,31,31,0.1)' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest"
        style={{ color: 'rgba(42,31,31,0.2)' }}
      >
        ↓ scroll to start building
      </div>
    </section>
  );
}
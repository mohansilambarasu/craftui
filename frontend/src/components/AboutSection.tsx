function CoffeeCup() {
  return (
    <div className="w-full max-w-xs justify-self-center lg:max-w-none" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#EEE0CC', borderRadius: '16px', border: '1px solid rgba(96,116,86,0.15)', padding: '28px 24px', gap: '16px' }}>

      <div style={{ position: 'relative', width: '100px', height: '110px' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
          {[
            { height: '16px', delay: '0s' },
            { height: '20px', delay: '0.3s' },
            { height: '14px', delay: '0.6s' },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                width: '3px',
                height: s.height,
                borderRadius: '2px',
                background: 'rgba(96,116,86,0.4)',
                animation: `steam 1.8s ease-in-out ${s.delay} infinite`,
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '100px',
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          <div style={{ position: 'absolute', bottom: '62px', left: '50%', transform: 'translateX(-50%)', width: '76px', height: '8px', background: '#506346', borderRadius: '4px' }} />
          <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', width: '68px', height: '54px', background: '#607456', borderRadius: '4px 4px 12px 12px' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '14px', background: '#BA6A4C', borderRadius: '0 0 12px 12px' }} />
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%) rotate(-15deg)', width: '8px', height: '20px', background: 'rgba(238,224,204,0.15)', borderRadius: '4px' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '22px', right: '8px', width: '18px', height: '22px', border: '5px solid #506346', borderLeft: 'none', borderRadius: '0 10px 10px 0' }} />
          <div style={{ position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)', width: '88px', height: '10px', background: '#506346', borderRadius: '50%' }} />
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#2A1F1F', letterSpacing: '-0.3px', marginBottom: '6px', lineHeight: 1.3 }}>
          Have a project in mind?<br />Let's grab a coffee.
        </div>
        <div style={{ fontSize: '10px', color: 'rgba(42,31,31,0.45)', lineHeight: 1.6 }}>
          Always open to discussing new ideas, collaborations, and opportunities.
        </div>
      </div>

      <a
        href="mailto:melangku@gmu.edu"
        className="min-h-10 sm:min-h-0"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '10px',
          fontWeight: 700,
          padding: '7px 14px',
          borderRadius: '6px',
          background: '#607456', 
          color: '#EEE0CC',
          textDecoration: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#506346')}
        onMouseLeave={e => (e.currentTarget.style.background = '#607456')}
      >
        Let's chat!
      </a>

      <style>{`
        @keyframes steam {
          0% { transform: translateY(0) scaleY(1); opacity: 0.6; }
          50% { transform: translateY(-8px) scaleY(1.3); opacity: 0.3; }
          100% { transform: translateY(-14px) scaleY(0.8); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-4px); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id="about-section"
      style={{
        background: '#F7F2EA',
        borderTop: '1px solid rgba(96,116,86,0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="w-full"
    >
      <div
        className="px-4 py-10 sm:px-8"
        style={{
          position: 'relative',
          zIndex: 2,
          borderBottom: '1px solid rgba(96,116,86,0.15)',
        }}
      >
        <div className="max-w-7xl mx-auto">

          <div
            className="text-xs font-bold tracking-widest uppercase mb-5"
            style={{ color: '#607456' }}
          >
            About the builder
          </div>

          <div
            className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_240px]"
          >
            <div className="min-w-0">
              <div
                className="inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1 mb-4"
                style={{
                  background: 'rgba(96,116,86,0.08)',
                  border: '1.5px solid rgba(96,116,86,0.2)',
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#607456', animation: 'pulse-dot 2s infinite' }}
                />
                <span className="text-xs font-bold leading-relaxed" style={{ color: '#607456', letterSpacing: '0.3px' }}>
                  Available · July 2026 · F1 OPT
                </span>
              </div>

              <h2
                className="font-black mb-1 text-3xl sm:text-[34px]"
                style={{ color: '#2A1F1F', letterSpacing: '-0.04em', lineHeight: 1.0 }}
              >
                Mohan Silambarasu<br />Elangkumaran
              </h2>
              <p className="text-xs font-semibold mb-4" style={{ color: 'rgba(42,31,31,0.4)', letterSpacing: '0.2px' }}>
                Frontend and AI Engineer · New York, U.S.
              </p>

              <div style={{ borderLeft: '3px solid #BA6A4C', paddingLeft: '14px' }}>
                <p className="text-sm leading-relaxed sm:text-base sm:text-justify" style={{ color: 'rgba(42,31,31,0.55)', lineHeight: 1.65, maxWidth: '600px'}}>
                  I build things that actually work in production. Hungry for the craft, using AI to ship production-level tools. Graduated May 2026 with Academic Excellence Award from George Mason University. Looking for full-time and internship opportunities anywhere across the U.S.
                </p>
              </div>

              <div style={{ width: '100%', height: '1px', background: 'rgba(96,116,86,0.15)', margin: '20px 0' }} />

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { num: '2+', label: 'Software Industry experience' },
                  { num: '4.0 GPA', label: 'MS in Information Technology' },
                  { num: 'F1 OPT', label: 'U.S Work Authorized' },
                  { num: 'Open', label: 'Anywhere in U.S.' },
                ].map((stat) => (
                  <div
                    key={stat.num}
                    className="min-w-0 rounded-lg border border-[rgba(96,116,86,0.15)] p-3 md:border-0 md:border-r md:p-0 md:pr-4 last:md:border-r-0"
                  >
                    <div className="font-black" style={{ fontSize: '22px', color: '#607456', letterSpacing: '-1px' }}>
                      {stat.num}
                    </div>
                    <div className="text-xs font-medium mt-0.5" style={{ color: 'rgba(42,31,31,0.4)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <CoffeeCup />
          </div>

        </div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          background: '#EEE0CC',
          borderBottom: '1px solid rgba(96,116,86,0.15)',
        }}
        className="px-4 py-5 sm:px-8"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
          {[
            { label: 'GitHub ↗', href: 'https://github.com/mohansilambarasu', bg: 'rgba(42,31,31,0.05)', color: '#607456', hoverBg: '#607456', hoverColor: '#EEE0CC', border: '1.5px solid rgba(42,31,31,0.2)' },
            { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/mohan-silambarasu-elangkumaran', bg: 'rgba(42,31,31,0.05)', color: '#607456', hoverBg: '#607456', hoverColor: '#EEE0CC', border: '1.5px solid rgba(42,31,31,0.2)' },
            { label: 'Portfolio ↗', href: 'https://mohansilambarasu.github.io/my-portfolio', bg: 'rgba(42,31,31,0.05)', color: '#607456', hoverBg: '#607456', hoverColor: '#EEE0CC', border: '1.5px solid rgba(42,31,31,0.2)' },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all sm:min-h-0 sm:justify-start"
              style={{ background: btn.bg, color: btn.color, border: btn.border, textDecoration: 'none', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.background = btn.hoverBg , e.currentTarget.style.color = btn.hoverColor)}
              onMouseLeave={e => (e.currentTarget.style.background = btn.bg, e.currentTarget.style.color = btn.color)}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}

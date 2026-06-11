import { useState, useEffect, useRef } from 'react';
import { Monitor, Tablet, Smartphone, Code2, Eye, Copy, Download, Check } from 'lucide-react';
import Editor from '@monaco-editor/react';
import type { PreviewMode, DeviceMode } from '../types';

interface PreviewPanelProps {
  code: string;
  isGenerating: boolean;
}

const DEVICE_WIDTHS: Record<DeviceMode, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 375,
};

function cleanCode(raw: string): string {
  let code = raw.trim();
  code = code.replace(/```[a-z]*\n?/gi, '').replace(/```/g, '');
  code = code.replace(/^import\s+.*$/gm, '');
  code = code.replace(/^export\s+default\s+/gm, '');
  code = code.replace(/^export\s+/gm, '');
  code = code.replace(/function\s+[A-Z][a-zA-Z0-9]*/g, 'function Component');
  return code.trim();
}

function buildPreviewHTML(code: string): string {
  if (!code.trim()) return '';
  const cleaned = cleanCode(code);
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; background: #ffffff; font-family: system-ui, sans-serif; }
    * { box-sizing: border-box; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    ${cleaned}
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Component />);
  </script>
</body>
</html>`.trim();
}

export function PreviewPanel({ code, isGenerating }: PreviewPanelProps) {
  const [mode, setMode] = useState<PreviewMode>('preview');
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [copied, setCopied] = useState(false);
  const [previewHTML, setPreviewHTML] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const iframeWidth = DEVICE_WIDTHS[device];

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!code.trim()) { setPreviewHTML(''); return; }
    debounceRef.current = setTimeout(() => {
      setPreviewHTML(buildPreviewHTML(code));
    }, isGenerating ? 2000 : 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [code, isGenerating]);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = Math.max(280, containerRef.current.clientWidth - 32);
        setScale(Math.min(1, Math.max(0.25, containerWidth / iframeWidth)));
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [iframeWidth]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Component.tsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="preview-section"
      style={{
        background: '#EEE0CC',
        borderTop: '1px solid rgba(96,116,86,0.15)',
      }}
      className="w-full px-4 py-10 sm:px-6 sm:py-12"
    >
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: 'rgba(42,31,31,0.35)' }}
          >
            Step 02 — Preview
          </div>
          <h2
            className="font-black mb-2 text-2xl sm:text-[28px]"
            style={{ color: '#2A1F1F', letterSpacing: '-1px' }}
          >
            Your component, live.
          </h2>
          <p className="text-sm" style={{ color: 'rgba(42,31,31,0.45)' }}>
            See it render instantly. Switch between preview and code. Download when ready.
          </p>
        </div>

        <div
          className="overflow-hidden rounded-xl sm:rounded-2xl"
          style={{
            background: '#F7F2EA',
            border: '1px solid rgba(96,116,86,0.2)',
            boxShadow: '0 4px 24px rgba(42,31,31,0.06)',
          }}
        >
          <div
            className="flex flex-col gap-3 px-3 py-3 sm:px-5 md:flex-row md:items-center md:justify-between"
            style={{
              borderBottom: '1px solid rgba(96,116,86,0.12)',
              background: '#EEE0CC',
            }}
          >
            <div
              className="grid w-full grid-cols-2 gap-1 rounded-lg p-1 sm:w-auto sm:flex"
              style={{ background: 'rgba(96,116,86,0.1)' }}
            >
              {[
                { id: 'preview', icon: <Eye size={12} />, label: 'Preview' },
                { id: 'code', icon: <Code2 size={12} />, label: 'Code' },
              ].map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => setMode(id as PreviewMode)}
                  className="flex min-h-10 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all sm:min-h-0"
                  style={{
                    background: mode === id ? '#F7F2EA' : 'transparent',
                    color: mode === id ? '#2A1F1F' : 'rgba(42,31,31,0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: mode === id ? '0 1px 3px rgba(42,31,31,0.1)' : 'none',
                  }}
                >
                  {icon} {label}
                </button>
              ))}
            </div>

            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between md:w-auto md:justify-end md:gap-3">
              {mode === 'preview' && (
                <div
                  className="grid grid-cols-3 gap-1 rounded-lg p-1 sm:flex"
                  style={{ background: 'rgba(96,116,86,0.1)' }}
                >
                  {([
                    { id: 'desktop', icon: <Monitor size={12} /> },
                    { id: 'tablet', icon: <Tablet size={12} /> },
                    { id: 'mobile', icon: <Smartphone size={12} /> },
                  ] as { id: DeviceMode; icon: React.ReactNode }[]).map(({ id, icon }) => (
                    <button
                      key={id}
                      onClick={() => setDevice(id)}
                      className="flex min-h-10 items-center justify-center rounded-md p-1.5 transition-all sm:min-h-0"
                      style={{
                        background: device === id ? '#607456' : 'transparent',
                        color: device === id ? '#EEE0CC' : 'rgba(42,31,31,0.35)',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              )}

              {code && (
                <div className="grid grid-cols-2 gap-2 sm:flex">
                  <button
                    onClick={handleCopy}
                    className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all sm:min-h-0"
                    style={{
                      background: 'rgba(96,116,86,0.08)',
                      border: '1px solid rgba(96,116,86,0.2)',
                      color: copied ? '#607456' : 'rgba(42,31,31,0.5)',
                      cursor: 'pointer',
                    }}
                  >
                    {copied ? <Check size={11} /> : <Copy size={11} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all sm:min-h-0"
                    style={{
                      background: '#607456',
                      border: 'none',
                      color: '#EEE0CC',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#506346')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#607456')}
                  >
                    <Download size={11} />
                    .tsx
                  </button>
                </div>
              )}
            </div>
          </div>

          <div ref={containerRef} className="relative">
            {mode === 'preview' ? (
              <div
                className="flex items-start justify-center overflow-hidden"
                style={{
                  background: 'rgba(96,116,86,0.04)',
                  padding: '24px 16px',
                  height: 'clamp(360px, 65vh, 520px)',
                }}
              >
                {!code && !isGenerating ? (
                  <div
                    className="flex flex-col items-center justify-center gap-3 text-center"
                    style={{ paddingTop: '80px' }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: 'rgba(96,116,86,0.1)' }}
                    >
                      ✦
                    </div>
                    <p className="text-sm font-medium" style={{ color: 'rgba(42,31,31,0.3)' }}>
                      Your component will appear here
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(42,31,31,0.2)' }}>
                      Describe what you want and click Generate
                    </p>
                  </div>
                ) : isGenerating && !previewHTML ? (
                  <div
                    className="flex flex-col items-center justify-center gap-4"
                    style={{ paddingTop: '80px' }}
                  >
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: '#607456',
                            animation: `bounce 0.6s ease-in-out ${i * 0.15}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-mono" style={{ color: 'rgba(42,31,31,0.35)' }}>
                      Generating component...
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      width: `${iframeWidth}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: 'top center',
                      height: '100%',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <iframe
                      srcDoc={previewHTML}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        borderRadius: '8px',
                        background: '#fff',
                      }}
                      sandbox="allow-scripts"
                      title="Component Preview"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[360px] sm:h-[400px]">
                {code ? (
                  <Editor
                    height="100%"
                    defaultLanguage="typescript"
                    value={code}
                    theme="vs-dark"
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 13,
                      lineHeight: 22,
                      padding: { top: 16, bottom: 16 },
                      scrollBeyondLastLine: false,
                      wordWrap: 'on',
                      fontFamily: 'JetBrains Mono, Fira Code, monospace',
                      fontLigatures: true,
                      renderLineHighlight: 'none',
                      overviewRulerLanes: 0,
                    }}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center h-full"
                    style={{ background: '#1e1e1e' }}
                  >
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
                      No code generated yet
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}

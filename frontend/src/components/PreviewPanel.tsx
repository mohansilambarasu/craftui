import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Tablet, Smartphone, Code2, Eye, Copy, Download, Check } from 'lucide-react';
import Editor from '@monaco-editor/react';
import type { PreviewMode, DeviceMode } from '../types';

interface PreviewPanelProps {
  code: string;
  isGenerating: boolean;
}

const DEVICE_WIDTHS: Record<DeviceMode, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
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

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!code.trim()) { setPreviewHTML(''); return; }
    debounceRef.current = setTimeout(() => {
      setPreviewHTML(buildPreviewHTML(code));
    }, isGenerating ? 2000 : 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [code, isGenerating]);

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
    <div className="flex flex-col h-full bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden">

      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#111111]">
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'preview' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            <Eye size={12} /> Preview
          </button>
          <button
            onClick={() => setMode('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === 'code' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            <Code2 size={12} /> Code
          </button>
        </div>

        <div className="flex items-center gap-3">
          {mode === 'preview' && (
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
              {([
                { id: 'desktop', icon: Monitor },
                { id: 'tablet', icon: Tablet },
                { id: 'mobile', icon: Smartphone },
              ] as { id: DeviceMode; icon: React.ElementType }[]).map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setDevice(id)}
                  className={`p-1.5 rounded-md transition-all ${device === id ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
                >
                  <Icon size={13} />
                </button>
              ))}
            </div>
          )}

          {code && (
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/50 hover:text-white border border-white/10 hover:border-white/20 transition-all"
              >
                {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/50 hover:text-white border border-white/10 hover:border-white/20 transition-all"
              >
                <Download size={12} />
                .tsx
              </motion.button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {mode === 'preview' ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full flex items-start justify-center bg-[#0a0a0a] p-6 overflow-auto"
            >
              {!code && !isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    <Eye size={20} className="text-white/20" />
                  </div>
                  <p className="text-white/20 text-sm">Your component will appear here</p>
                  <p className="text-white/10 text-xs">Describe what you want and click Generate</p>
                </div>
              ) : isGenerating && !previewHTML ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-blue-500"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                  <p className="text-white/30 text-xs font-mono">Generating component...</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full transition-all duration-500 bg-white rounded-xl overflow-hidden shadow-2xl"
                  style={{ maxWidth: DEVICE_WIDTHS[device] }}
                >
                  <iframe
                    srcDoc={previewHTML}
                    className="w-full border-0"
                    style={{ height: '600px' }}
                    sandbox="allow-scripts"
                    title="Component Preview"
                  />
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
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
                <div className="flex items-center justify-center h-full">
                  <p className="text-white/20 text-sm">No code generated yet</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
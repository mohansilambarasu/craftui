import { useState } from 'react';
import { motion } from 'framer-motion';
import { History } from 'lucide-react';
import { Header } from '../components/Header';
import { PromptInput } from '../components/PromptInput';
import { PreviewPanel } from '../components/PreviewPanel';
import { HistorySidebar } from '../components/HistorySidebar';
import { useGenerator } from '../hooks/useGenerator';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function enhancePrompt(prompt: string): Promise<string> {
  const response = await fetch(`${API_URL}/api/enhance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  return data.enhanced || prompt;
}

export function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const {
    prompt,
    setPrompt,
    code,
    isGenerating,
    error,
    history,
    generate,
    stop,
    loadFromHistory,
    clearHistory,
  } = useGenerator();

  const handleEnhance = async (p: string) => {
    if (!p.trim() || isEnhancing) return;
    setIsEnhancing(true);
    try {
      const enhanced = await enhancePrompt(p);
      setPrompt(enhanced);
    } catch {
      // keep original prompt if enhance fails
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">

      <Header />

      <HistorySidebar
        history={history}
        onLoad={loadFromHistory}
        onClear={clearHistory}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Build components with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                AI
              </span>
            </h1>
            <p className="text-white/30 text-sm mt-1">
              Describe any UI component and get production-ready React and Tailwind code instantly
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-sm"
          >
            <History size={15} />
            History
            {history.length > 0 && (
              <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full">
                {history.length}
              </span>
            )}
          </motion.button>
        </div>

        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={generate}
          onEnhance={handleEnhance}
          isGenerating={isGenerating || isEnhancing}
          onStop={stop}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        <div className="h-[650px]">
          <PreviewPanel
            code={code}
            isGenerating={isGenerating}
          />
        </div>

      </main>
    </div>
  );
}
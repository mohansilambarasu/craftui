import { useState } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { PromptInput } from '../components/PromptInput';
import { PreviewPanel } from '../components/PreviewPanel';
import { HistorySidebar } from '../components/HistorySidebar';
import { useGenerator } from '../hooks/useGenerator';
import { AboutSection } from '../components/AboutSection';

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

  const handleGenerate = async (p: string) => {
    await generate(p);
    setTimeout(() => {
      document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

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
    <div className="min-w-0 overflow-x-hidden" style={{ background: '#F7F2EA', minHeight: '100vh' }}>

      <Header
        historyCount={history.length}
        onHistoryClick={() => setSidebarOpen(true)}
      />

      <HistorySidebar
        history={history}
        onLoad={loadFromHistory}
        onClear={clearHistory}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <HeroSection />

      <PromptInput
        prompt={prompt}
        setPrompt={setPrompt}
        onGenerate={handleGenerate}
        onEnhance={handleEnhance}
        isGenerating={isGenerating || isEnhancing}
        onStop={stop}
      />

      {error && (
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 py-4"
          style={{ background: '#fff' }}
        >
          <div
            className="px-4 py-3 rounded-xl text-sm"
            style={{
              background: 'rgba(220,50,50,0.06)',
              border: '1px solid rgba(220,50,50,0.15)',
              color: 'rgba(180,40,40,0.9)',
            }}
          >
            {error}
          </div>
        </div>
      )}

      <PreviewPanel
        code={code}
        isGenerating={isGenerating}
      />

      <AboutSection />

      <footer
        className="text-center px-4 py-7 sm:py-8"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)', background: '#607456' }}
      >
        <p className="text-xs leading-relaxed" style={{ color: '#EEE0CC' }}>
          CraftUI · Built by Mohan · Powered by Groq · Open source on GitHub
        </p>
      </footer>

    </div>
  );
}

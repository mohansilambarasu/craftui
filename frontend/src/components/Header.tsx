import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            Component<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Craft</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-white/40 font-mono">Groq llama-3.3-70b</span>
        </div>

      </div>
    </header>
  );
}
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  { icon: '✅', text: 'a dark navbar with logo, 5 nav links, and user avatar dropdown' },
  { icon: '✅', text: 'a pricing card with three tiers and a highlighted pro plan' },
  { icon: '✅', text: 'a stats dashboard with 4 KPI cards showing revenue and growth' },
  { icon: '❌', text: 'avoid numbered requirements, props interfaces, or multi-file requests' },
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
    <div className="flex flex-col gap-4">

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
        <div className={`relative bg-[#111111] rounded-2xl border transition-colors ${isTooLong || isComplex ? 'border-yellow-500/50' : 'border-white/10 group-focus-within:border-transparent'}`}>
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the component you want to build..."
            rows={3}
            className="w-full bg-transparent text-white placeholder-white/30 text-sm leading-relaxed px-4 pt-4 pb-2 resize-none focus:outline-none font-mono"
          />
          <div className="flex items-center justify-between px-4 pb-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/20 font-mono">⌘ + Enter to generate</span>
              {prompt.length > 0 && (
                <span className={`text-xs font-mono ${isTooLong ? 'text-yellow-400' : 'text-white/20'}`}>
                  {prompt.length} chars
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEnhance(prompt)}
                disabled={!prompt.trim() || isGenerating}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Wand2 size={12} />
                Enhance
              </motion.button>
              {isGenerating ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onStop}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all"
                >
                  <Square size={12} />
                  Stop
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onGenerate(prompt)}
                  disabled={!prompt.trim()}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-400 hover:to-purple-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                >
                  <Sparkles size={12} />
                  Generate
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {(isTooLong || isComplex) && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20"
        >
          <AlertTriangle size={14} className="text-yellow-400 mt-0.5 shrink-0" />
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-yellow-400">Prompt may be too complex</p>
            <p className="text-xs text-white/40 leading-relaxed">
              ComponentCraft works best with short, visual descriptions under 300 characters. Avoid numbered requirements, props interfaces, or multi-file requests. Try something like: <span className="text-white/60 italic">"a dark navbar with logo, nav links, and user avatar"</span>
            </p>
          </div>
        </motion.div>
      )}

      <div className="flex flex-wrap gap-2">
        {PROMPT_TEMPLATES.map((template) => (
          <motion.button
            key={template.label}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPrompt(template.prompt)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/80 hover:border-white/20 transition-all"
          >
            <span>{template.icon}</span>
            {template.label}
          </motion.button>
        ))}
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3">
        <p className="text-xs font-medium text-white/30 mb-2">💡 Prompt tips</p>
        <div className="flex flex-col gap-1.5">
          {TIPS.map((tip, i) => (
            <p key={i} className="text-xs text-white/25 leading-relaxed">
              <span className="mr-1.5">{tip.icon}</span>
              {tip.text}
            </p>
          ))}
        </div>
      </div>

    </div>
  );
}
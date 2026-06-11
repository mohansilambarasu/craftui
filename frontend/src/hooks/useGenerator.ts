import { useState, useRef, useCallback } from 'react';
import type { ComponentHistory } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function useGenerator() {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ComponentHistory[]>([]);
  const abortRef = useRef<(() => void) | null>(null);

  const generate = useCallback(async (inputPrompt: string) => {
    if (!inputPrompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    setCode('');

    let accumulated = '';

    try {
      const response = await fetch(`${API_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputPrompt }),
      });

      if (!response.ok) throw new Error('Generation failed');
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      abortRef.current = () => reader.cancel();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;

          const jsonStr = trimmed.slice(6).trim();
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);
            if (data.error) {
              setError(data.error);
              return;
            }
            if (data.text) {
              accumulated += data.text;
              setCode(accumulated);
            }
            if (data.done) {
              const newEntry: ComponentHistory = {
                id: crypto.randomUUID(),
                prompt: inputPrompt,
                code: accumulated,
                timestamp: new Date(),
              };
              setHistory(prev => [newEntry, ...prev.slice(0, 19)]);
            }
          } catch {
            // skip malformed lines
          }
        }
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsGenerating(false);
      abortRef.current = null;
    }
  }, [isGenerating]);

  const stop = useCallback(() => {
    abortRef.current?.();
    setIsGenerating(false);
  }, []);

  const loadFromHistory = useCallback((item: ComponentHistory) => {
    setPrompt(item.prompt);
    setCode(item.code);
    setError(null);
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  return {
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
  };
}
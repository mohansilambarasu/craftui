import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, Clock, X } from 'lucide-react';
import type { ComponentHistory } from '../types';

interface HistorySidebarProps {
  history: ComponentHistory[];
  onLoad: (item: ComponentHistory) => void;
  onClear: () => void;
  isOpen: boolean;
  onClose: () => void;
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function HistorySidebar({
  history,
  onLoad,
  onClear,
  isOpen,
  onClose,
}: HistorySidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />

          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-[#0d0d0d] border-r border-white/10 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <History size={16} className="text-white/50" />
                <span className="text-sm font-medium text-white">History</span>
                {history.length > 0 && (
                  <span className="text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded-full">
                    {history.length}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    onClick={onClear}
                    className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    title="Clear history"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 px-6 text-center">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <History size={18} className="text-white/20" />
                  </div>
                  <p className="text-white/20 text-sm">No history yet</p>
                  <p className="text-white/10 text-xs">Generated components will appear here</p>
                </div>
              ) : (
                <div className="px-2 flex flex-col gap-1">
                  {history.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 4 }}
                      onClick={() => { onLoad(item); onClose(); }}
                      className="w-full text-left px-3 py-3 rounded-xl hover:bg-white/5 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-white/70 group-hover:text-white transition-colors line-clamp-2 leading-relaxed">
                          {item.prompt}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <Clock size={10} className="text-white/20" />
                        <span className="text-xs text-white/20 font-mono">
                          {timeAgo(item.timestamp)}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
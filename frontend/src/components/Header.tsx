import { History } from 'lucide-react';

interface HeaderProps {
  historyCount: number;
  onHistoryClick: () => void;
}

export function Header({ historyCount, onHistoryClick }: HeaderProps) {
  const scrollToPrompt = () => {
    document.getElementById('prompt-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: '#607456', borderBottom: '1px solid rgba(96,116,86,0.15)' }}
    >
      <div className="max-w-7xl mx-auto px-7 h-14 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-sm font-black"
            style={{ background: '#EEE0CC', color: '#607456' }}
          >
            ✦
          </div>
          <span
            className="text-sm font-black tracking-tight"
            style={{ color: '#EEE0CC', letterSpacing: '-0.3px' }}
          >
            CraftUI
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-7">
          <span
            className="text-md font-medium cursor-pointer transition-colors"
            style={{ color: '#EEE0CC', letterSpacing: '0.3px' }}
            onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(42,31,31,0.4)')}
            onMouseLeave={e => (e.currentTarget.style.color = '#EEE0CC')}
          >
            About the Creator.
          </span>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onHistoryClick}
            className="flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: '#EEE0CC', background: 'transparent', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#2A1F1F')}
            onMouseLeave={e => (e.currentTarget.style.color = '#EEE0CC')}
          >
            <History size={14} />
            {historyCount > 0 && (
              <span className="text-xs font-bold" style={{ color: '#607456' }}>{historyCount}</span>
            )}
          </button>

          <button
            onClick={scrollToPrompt}
            className="text-xs font-bold px-4 py-2 rounded-md transition-all"
            style={{ background: '#EEE0CC', color: '#607456', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#D9CDB5')}
            onMouseLeave={e => (e.currentTarget.style.background = '#EEE0CC')}
          >
            Get started
          </button>
        </div>

      </div>
    </header>
  );
}
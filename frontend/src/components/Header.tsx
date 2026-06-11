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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-7 h-14 flex items-center justify-between gap-3">

        <div className="flex items-center gap-2 min-w-0">
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

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onHistoryClick}
            className="flex min-h-10 items-center gap-1.5 px-2 py-2 text-xs font-medium transition-colors sm:min-h-0 sm:px-1"
            style={{ color: '#EEE0CC', background: 'transparent', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#2A1F1F')}
            onMouseLeave={e => (e.currentTarget.style.color = '#EEE0CC')}
          >
            <History size={14} />
            {historyCount > 0 && (
              <span
                className="min-w-5 rounded-full px-1.5 py-0.5 text-center text-[10px] font-bold"
                style={{ color: '#607456', background: '#EEE0CC' }}
              >
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={scrollToPrompt}
            className="min-h-10 whitespace-nowrap rounded-md px-3 py-2 text-xs font-bold transition-all sm:min-h-0 sm:px-4"
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

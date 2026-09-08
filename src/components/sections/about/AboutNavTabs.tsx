import { useState, useEffect } from 'react';
import { subscribeRafScroll } from '@/src/lib/raf-scroll';

interface TabItem {
  id: string;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'our-edge', label: 'Our Edge' },
  { id: 'responsible-vision', label: 'Responsible Vision' },
  { id: 'press-media', label: 'Press & Media' },
];

export function AboutNavTabs() {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    let lastTab = 'overview';

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const tab of TABS) {
        const el = document.getElementById(tab.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const height = rect.height;
        if (scrollPosition >= top && scrollPosition < top + height) {
          if (tab.id !== lastTab) {
            lastTab = tab.id;
            setActiveTab(tab.id);
          }
          break;
        }
      }
    };

    return subscribeRafScroll(handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveTab(id);
    }
  };

  return (
    <nav className="sticky top-16 z-30 w-full bg-black/85 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center gap-8 md:gap-12 overflow-x-auto py-4 scrollbar-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`relative whitespace-nowrap text-sm tracking-wider font-sans transition-colors duration-200 py-1 cursor-pointer select-none ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

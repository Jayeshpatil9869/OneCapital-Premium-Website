import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { subscribeRafScroll } from '@/src/lib/raf-scroll';

interface Chapter {
  id: string;
  number: string;
  label: string;
}

const CHAPTERS: Chapter[] = [
  { id: 'genesis', number: '01', label: 'GENESIS' },
  { id: 'purpose', number: '02', label: 'PURPOSE' },
  { id: 'values', number: '03', label: 'VALUES' },
];

export function AboutStickyNav() {
  const [activeSection, setActiveSection] = useState<string>('genesis');
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    let lastVisible = false;
    let lastActive = 'genesis';

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.55;
      const nextVisible = scrollY > heroThreshold;
      if (nextVisible !== lastVisible) {
        lastVisible = nextVisible;
        setVisible(nextVisible);
      }

      // Section detection
      const sections = CHAPTERS.map((ch) => document.getElementById(ch.id)).filter(Boolean) as HTMLElement[];
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          const nextActive = CHAPTERS[i].id;
          if (nextActive !== lastActive) {
            lastActive = nextActive;
            setActiveSection(nextActive);
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
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Sticky Rail (Left side) */}
      <AnimatePresence>
        {visible && (
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-6 select-none pointer-events-auto"
            aria-label="Chapter Navigation"
          >
            <div className="flex flex-col gap-1 border-l border-white/[0.08] pl-4 py-1">
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#a8a8a2]/50 mb-3">
                CHAPTERS
              </span>
              {CHAPTERS.map((ch) => {
                const isActive = activeSection === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => scrollToSection(ch.id)}
                    className="group flex items-center gap-3 py-1.5 text-left transition-all duration-300 focus:outline-none"
                  >
                    <span
                      className={`text-[11px] font-mono tracking-wider transition-colors duration-300 ${
                        isActive ? 'text-[#f4f4f0] font-medium' : 'text-[#a8a8a2]/50 group-hover:text-[#a8a8a2]'
                      }`}
                    >
                      {ch.number}
                    </span>
                    <span
                      className={`text-[11px] font-sans tracking-[0.2em] uppercase transition-all duration-300 ${
                        isActive
                          ? 'text-[#f4f4f0] translate-x-1 font-medium'
                          : 'text-[#a8a8a2]/50 group-hover:text-[#d4d4ce] group-hover:translate-x-0.5'
                      }`}
                    >
                      {ch.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-dot"
                        className="w-1.5 h-1.5 rounded-full bg-[#f4f4f0] ml-1"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Horizontal Bar */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 xl:hidden w-[calc(100%-2rem)] max-w-md bg-[#050505]/90 backdrop-blur-md border border-white/[0.08] rounded-full px-4 py-2 flex items-center justify-between shadow-2xl"
          >
            {CHAPTERS.map((ch) => {
              const isActive = activeSection === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => scrollToSection(ch.id)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all ${
                    isActive
                      ? 'bg-white/15 text-[#f4f4f0] font-medium'
                      : 'text-[#a8a8a2]/60 hover:text-[#d4d4ce]'
                  }`}
                >
                  <span>{ch.number}</span>
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

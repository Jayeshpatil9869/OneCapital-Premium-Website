import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Newspaper } from 'lucide-react';

interface PressItem {
  id: string;
  source: string;
  headline: string;
  date: string;
  image: string;
  linkText: string;
}

const PRESS_ITEMS: PressItem[] = [
  {
    id: 'press-1',
    source: 'The Economic Times',
    headline: 'India makes strategic moves to attract global capital: How modern Family Offices are navigating institutional allocations.',
    date: 'February 2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85',
    linkText: 'Read Article',
  },
  {
    id: 'press-2',
    source: 'NDTV Profit',
    headline: 'RBI Monetary Policy Highlights & Yield Curve Shifts: OneCapital Partners on macroeconomic portfolio hedging.',
    date: 'January 2026',
    image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1000&q=85',
    linkText: 'Read Analysis',
  },
  {
    id: 'press-3',
    source: 'Informist Media',
    headline: 'OneCapital Leadership on the rise of private credit, structured debt, and multi-generational wealth succession in India.',
    date: 'December 2025',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1000&q=85',
    linkText: 'Read Coverage',
  },
];

export function AboutPressMedia() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section id="press-media" className="w-full py-24 lg:py-32 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header with Title and Action Links */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-white/60 mb-3 block">
              In The News
            </span>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
              What the press has been saying
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-6 text-xs uppercase tracking-widest font-mono text-white/80"
          >
            <a
              href="#press-media"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors group"
            >
              <span>Explore Press Club</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </a>
            <span className="text-white/20">|</span>
            <a
              href="#press-media"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors group"
            >
              <span>Download Media Kit</span>
              <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* 3-Column News Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {PRESS_ITEMS.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => setActiveSlide(index)}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/30 transition-all duration-300 cursor-pointer"
            >
              {/* Media Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                <img
                  src={item.image}
                  alt={item.headline}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-wider text-white/90">
                  {item.source}
                </div>
              </div>

              {/* Media Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/40 mb-3">
                    <Newspaper className="w-3.5 h-3.5 text-white/60" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white group-hover:text-white/90 transition-colors leading-snug line-clamp-3">
                    {item.headline}
                  </h3>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Carousel / Pagination Dots Indicator */}
        <div className="flex items-center justify-center gap-3 pt-12">
          {PRESS_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                activeSlide === idx
                  ? 'w-8 bg-white'
                  : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

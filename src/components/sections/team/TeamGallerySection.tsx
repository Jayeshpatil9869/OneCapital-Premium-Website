import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/src/lib/motion';
import { cn } from '@/src/lib/utils';
import { TEAM_PAGE } from '@/src/data/team-page';
import { COMPANY } from '@/src/data/company';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface GalleryItem {
  id: string;
  image: string;
  tag: string;
  title: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'office-celebration',
    image: '/images/gallery/office-celebration.jpg',
    tag: 'Headquarters',
    title: 'Pune Headquarters',
    caption: `Collaborative moments from ${COMPANY.brandName}'s Pune headquarters — where advisory, research, and client conversations come together.`,
  },
  {
    id: 'investor-session',
    image: '/images/gallery/investor-session.jpeg',
    tag: 'Investor Session',
    title: 'Investor Session',
    caption: 'A stage conversation on a new beginning, with the same focus on long-term wealth.',
  },
  {
    id: 'research-strategy-desk',
    image: '/images/gallery/research-strategy-desk.jpg',
    tag: 'Strategy Desk',
    title: 'Research & Strategy',
    caption: 'Market insight and portfolio construction work that informs investment advisory and allocation decisions.',
  },
  {
    id: 'executive-client-meeting',
    image: '/images/gallery/inside-team-gathering.jpeg',
    tag: 'Advisory Meet',
    title: 'Private Advisory Sessions',
    caption: 'Discreet conversations with individuals and businesses about goals, risk, and long-term wealth planning.',
  },
  {
    id: 'wealth-headquarters',
    image: '/images/gallery/wealth-headquarters.jpg',
    tag: 'Regional Reach',
    title: 'Regional Presence',
    caption: `Serving clients across Maharashtra from ${COMPANY.hqCity} headquarters and offices in Mumbai, Kolhapur, and Nashik.`,
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 180 : -180,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 180 : -180,
    opacity: 0,
    scale: 0.96,
  }),
};

const SWIPE_THRESHOLD = 40;

export function TeamGallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const activeItem = selectedIndex !== null ? GALLERY_ITEMS[selectedIndex] : null;

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setSelectedIndex((prevIndex) => {
      if (prevIndex === null) return null;
      const total = GALLERY_ITEMS.length;
      return (prevIndex + newDirection + total) % total;
    });
  }, []);

  const handleOpen = (index: number) => {
    setDirection(0);
    setSelectedIndex(index);
  };

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        paginate(-1);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedIndex, handleClose, paginate]);

  // GSAP Horizontal Scroll Pinning & Scrubbing
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const section = sectionRef.current;
      const pinContainer = pinContainerRef.current;
      const track = trackRef.current;
      if (!section || !pinContainer || !track) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet (>= 768px): Pinned scroll-driven horizontal glide
      mm.add('(min-width: 768px)', () => {
        const getDistance = () => {
          const scrollWidth = track.scrollWidth;
          const viewportWidth = window.innerWidth;
          return Math.max(0, scrollWidth - viewportWidth + 96);
        };

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: pinContainer,
            start: 'top top',
            end: () => `+=${getDistance() * 1.15 + 400}`,
            scrub: 1.1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const count = GALLERY_ITEMS.length;
              const idx = Math.min(count - 1, Math.floor(self.progress * count));
              setActiveIndex(idx);
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      // Mobile (< 768px): Smooth scroll tracking
      mm.add('(max-width: 767px)', () => {
        const handleScroll = () => {
          if (!track) return;
          const scrollLeft = track.scrollLeft;
          const cardWidth = track.firstElementChild ? (track.firstElementChild as HTMLElement).offsetWidth : 280;
          const idx = Math.min(GALLERY_ITEMS.length - 1, Math.round(scrollLeft / cardWidth));
          setActiveIndex(idx);
        };

        track.addEventListener('scroll', handleScroll, { passive: true });
        return () => track.removeEventListener('scroll', handleScroll);
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    if (window.innerWidth >= 768 && sectionRef.current) {
      const allTriggers = ScrollTrigger.getAll();
      const st = allTriggers.find((t) => t.trigger === sectionRef.current);
      if (st) {
        const targetScroll = st.start + (index / (GALLERY_ITEMS.length - 1)) * (st.end - st.start);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        return;
      }
    }
    if (trackRef.current) {
      const cards = trackRef.current.querySelectorAll('.impactCard');
      if (cards[index]) {
        (cards[index] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white"
      aria-labelledby="gallery-heading"
    >
      <div
        ref={pinContainerRef}
        className="w-full min-h-screen flex flex-col justify-center items-center py-12 md:py-16 overflow-hidden"
      >
        {/* Corner-Dot Eyebrow Badge */}
        <div className="relative w-fit px-4 mx-auto bg-white/[0.04] border text-[#9B9999] border-white/15 text-xs sm:text-sm font-mono tracking-widest leading-[1] pt-2 pb-2 inline-block">
          {TEAM_PAGE.gallery.eyebrow}
          <span className="absolute w-[3px] h-[3px] bg-white z-10 top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
          <span className="absolute w-[3px] h-[3px] bg-white z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2" />
          <span className="corner-dot-bl absolute w-[3px] h-[3px] bg-white z-10 bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
          <span className="corner-dot-br absolute w-[3px] h-[3px] bg-white z-10 bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
        </div>

        {/* Section Heading */}
        <div className="flex justify-center px-5">
          <h2
            id="gallery-heading"
            className="text-center shrink-0 mt-5 sm:mb-4 mb-3 text-[2.2rem] md:text-[3.5rem] capitalize leading-[1.2] w-[90%] md:w-[95%] lg:w-[75%] font-sans font-medium text-white tracking-tight"
          >
            {TEAM_PAGE.gallery.heading}
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-center text-white/65 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed mb-6 sm:mb-10 px-6">
          {TEAM_PAGE.gallery.body}
        </p>

        {/* Card Track */}
        <div className="w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-8 items-start px-6 md:px-16 lg:px-24 will-change-transform ImpactCardWrapper max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:scrollbar-none"
          >
            {/* Initial lead spacer for desktop composition */}
            <div className="w-[10%] sm:w-[5%] shrink-0 max-md:hidden" />

            {GALLERY_ITEMS.map((item, index) => {
              const isStaggered = index % 2 === 1;

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpen(index)}
                  className={cn(
                    'w-[92%] xs:w-[68%] sm:w-[42%] lg:w-[26%] shrink-0',
                    'impactCard snap-center rounded-2xl group overflow-hidden relative aspect-[7/9] cursor-pointer',
                    'border border-white/10 bg-neutral-950 shadow-2xl transition-all duration-300',
                    isStaggered && 'sm:mt-20',
                  )}
                  style={{ aspectRatio: '7/9' }}
                >
                  {/* Top-Left Pill Badge with Sparkles */}
                  <div className="absolute flex top-0 left-0 w-full z-20 transition-all duration-500 max-md:opacity-100 md:opacity-0 md:group-hover:opacity-100 pointer-events-none">
                    <div className="p-5 h-max mt-auto pt-6">
                      <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-full font-sans font-medium overflow-hidden shadow-lg">
                        <div className="flex items-center gap-2 px-3.5 py-1.5 text-xs text-white/90">
                          <Sparkles className="size-3.5 text-white stroke-[2]" aria-hidden="true" />
                          <span>{item.tag}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top-Right Circular Arrow Button */}
                  <div
                    aria-label={`View ${item.title}`}
                    className="absolute z-20 border ease-out border-white/30 top-5 right-5 bg-[#010101]/80 backdrop-blur-md p-3 md:p-3.5 rounded-full text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black group-hover:border-white shadow-xl"
                  >
                    <ArrowUpRight className="size-5 md:size-6 stroke-[2] transition-colors duration-300" aria-hidden="true" />
                  </div>

                  {/* Background Image with grayscale & scale hover */}
                  <div className="w-full h-full overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-all duration-500 ease-in-out max-md:grayscale-0 md:grayscale-0 md:group-hover:grayscale md:group-hover:scale-105 will-change-transform"
                    />
                  </div>

                  {/* Bottom Gradient Scrim & Titles */}
                  <div className="absolute flex bottom-0 left-0 transition-all duration-500 bg-gradient-to-t from-black via-black/80 to-transparent pt-12 min-h-[48%] w-full z-10 pointer-events-none">
                    <div className="p-6 md:p-8 h-max mt-auto w-full">
                      <h3 className="text-2xl font-medium max-md:mb-2 md:text-3xl text-white font-sans tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm md:text-base mt-2 font-light leading-relaxed line-clamp-2 md:line-clamp-3">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Trailing spacer */}
            <div className="w-16 sm:w-28 lg:w-40 shrink-0 max-md:hidden" />
          </div>
        </div>

        {/* Progress Dots Indicator */}
        <div className="flex gap-2.5 mt-8 sm:mt-10 py-3 items-center justify-center">
          {GALLERY_ITEMS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToCard(i)}
              aria-label={`Navigate to slide ${i + 1}`}
              className={cn(
                'h-2 rounded-full transition-all duration-400 cursor-pointer',
                activeIndex === i ? 'w-7 bg-white' : 'w-2 bg-white/30 hover:bg-white/60',
              )}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal Popup for Expanded Preview */}
      <AnimatePresence>
        {selectedIndex !== null && activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-3 backdrop-blur-2xl select-none sm:p-6 md:p-10"
            onClick={handleClose}
          >
            <div
              className="pointer-events-none absolute inset-x-4 top-4 z-30 flex items-center justify-between sm:inset-x-8 sm:top-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-auto rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 text-xs font-mono tracking-widest text-white/80 backdrop-blur-md">
                {selectedIndex + 1} / {GALLERY_ITEMS.length}
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close expanded view"
                className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors duration-500 hover:border-white/40 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              aria-label="Previous image"
              className="absolute top-1/2 left-2 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/50 transition-colors duration-500 hover:border-white/40 hover:text-white sm:left-6 sm:size-12 sm:bg-transparent md:left-8"
            >
              <ChevronLeft className="size-6 -translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              aria-label="Next image"
              className="absolute top-1/2 right-2 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/50 transition-colors duration-500 hover:border-white/40 hover:text-white sm:right-6 sm:size-12 sm:bg-transparent md:right-8"
            >
              <ChevronRight className="size-6 translate-x-0.5" />
            </button>

            <div
              className="relative flex max-h-[84vh] w-auto max-w-[92vw] cursor-default flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#080808]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={activeItem.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 320, damping: 32 },
                      opacity: { duration: 0.25 },
                      scale: { duration: 0.25 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragEnd={(_e, { offset }) => {
                      if (offset.x < -SWIPE_THRESHOLD) {
                        paginate(1);
                      } else if (offset.x > SWIPE_THRESHOLD) {
                        paginate(-1);
                      }
                    }}
                    className="flex cursor-grab flex-col items-center justify-center touch-pan-y active:cursor-grabbing"
                  >
                    <img
                      src={activeItem.image}
                      alt={activeItem.title}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="pointer-events-none h-auto max-h-[76vh] w-auto max-w-[92vw] rounded-2xl object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="z-20 flex w-full flex-col justify-between gap-2 border-t border-white/10 bg-black/70 px-5 py-3.5 backdrop-blur-md sm:flex-row sm:items-center">
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-white text-balance sm:truncate sm:text-base">
                    {activeItem.title}
                  </h4>
                  <p className="max-w-xl text-xs font-light text-white/70 text-pretty whitespace-normal sm:truncate">
                    {activeItem.caption}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 self-center sm:self-auto">
                  {GALLERY_ITEMS.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setDirection(idx > (selectedIndex ?? 0) ? 1 : -1);
                        setSelectedIndex(idx);
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={cn(
                        'h-1.5 cursor-pointer rounded-full transition-all duration-300',
                        idx === selectedIndex
                          ? 'w-6 bg-white'
                          : 'w-1.5 bg-white/30 hover:bg-white/60',
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

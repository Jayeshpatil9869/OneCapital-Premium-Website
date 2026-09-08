import { useEffect, useRef, useState, useCallback } from 'react';
import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/css/core';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Container,
  Section,
  Eyebrow,
  SectionHeading,
  BodyText,
} from '@/src/components/ui';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { cn } from '@/src/lib/utils';

const GALLERY_ITEMS = [
  {
    id: 'office-celebration',
    image: '/images/gallery/office-celebration.jpg',
    title: 'Collaborative Office Culture',
    caption: 'Our multidisciplinary team celebrating milestone achievements in our headquarters.',
  },
  {
    id: 'investor-conference',
    image: '/images/gallery/investor-conference.jpg',
    title: 'Annual Wealth Advisory Symposium',
    caption: 'Engaging keynote sessions and portfolio masterclasses with valued client partners.',
  },
  {
    id: 'research-strategy-desk',
    image: '/images/gallery/research-strategy-desk.jpg',
    title: 'Quantitative Research & Strategy',
    caption: 'Portfolio managers formulating bespoke asset allocation models and risk parameters.',
  },
  {
    id: 'executive-client-meeting',
    image: '/images/gallery/executive-client-meeting.jpg',
    title: 'Private Family Governance',
    caption: 'Confidential advisory sessions structuring generational trust and succession frameworks.',
  },
  {
    id: 'wealth-headquarters',
    image: '/images/gallery/wealth-headquarters.jpg',
    title: 'Executive Financial Suite',
    caption: 'State-of-the-art infrastructure facilitating institutional trading and seamless operations.',
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
  const splideRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!splideRef.current) return;

    const splide = new Splide(splideRef.current, {
      type: 'loop',
      drag: 'free',
      focus: 'center',
      perPage: 3,
      gap: '1.5rem',
      arrows: false,
      pagination: false,
      autoScroll: {
        speed: 1,
        pauseOnHover: true,
        pauseOnFocus: false,
      },
      breakpoints: {
        1024: {
          perPage: 2,
          gap: '1.25rem',
        },
        640: {
          perPage: 1,
          gap: '1rem',
        },
      },
    });

    splide.mount({ AutoScroll });

    return () => {
      splide.destroy();
    };
  }, []);

  return (
    <Section
      tone="panel"
      pad="none"
      className="relative overflow-hidden py-[var(--space-section-sm)] text-white md:py-[var(--space-section)]"
      aria-labelledby="gallery-heading"
    >
      <Container className="mb-12 md:mb-16">
        <RevealOnScroll className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>Inside OneCapital</Eyebrow>
          <SectionHeading id="gallery-heading" className="text-white">
            Behind the Scenes
          </SectionHeading>
          <BodyText className="max-w-xl text-base md:text-lg">
            A glimpse into our team, office, and the work we do.
          </BodyText>
        </RevealOnScroll>
      </Container>

      <div className="w-full overflow-hidden px-[var(--page-gutter)]">
        <div ref={splideRef} className="splide">
          <div className="splide__track">
            <ul className="splide__list items-stretch py-2">
              {GALLERY_ITEMS.map((item, index) => (
                <li key={item.id} className="splide__slide flex flex-col p-1">
                  <button
                    type="button"
                    onClick={() => handleOpen(index)}
                    className={cn(
                      'group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl',
                      'glass-panel glass-panel-hover bg-white/[0.02] text-left transition-colors duration-500 hover:border-white/20',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                    )}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white/80 opacity-100 backdrop-blur-md transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                        <ZoomIn className="size-3.5" />
                        <span>Expand</span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h3 className="mb-2 text-xl sm:text-2xl font-medium tracking-tight text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm font-light leading-relaxed text-text-muted">
                        {item.caption}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

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
              className="absolute top-1/2 left-1 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/50 transition-colors duration-500 hover:border-white/40 hover:text-white sm:left-6 sm:size-12 sm:bg-transparent md:left-8"
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
              className="absolute top-1/2 right-1 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/50 transition-colors duration-500 hover:border-white/40 hover:text-white sm:right-6 sm:size-12 sm:bg-transparent md:right-8"
            >
              <ChevronRight className="size-6 translate-x-0.5" />
            </button>

            <div
              className="relative flex max-h-[82vh] w-auto max-w-[92vw] cursor-default flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#080808]"
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
                  <p className="max-w-xl text-xs font-light text-text-muted text-pretty whitespace-normal sm:truncate">
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
    </Section>
  );
}

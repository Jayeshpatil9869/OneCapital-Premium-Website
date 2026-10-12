import { useEffect, useRef, useState, useCallback } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css/core';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Container,
  Section,
  Eyebrow,
  SectionHeading,
  BodyText,
} from '@/src/components/ui';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { cn } from '@/src/lib/utils';
import { TEAM_PAGE } from '@/src/data/team-page';
import { COMPANY } from '@/src/data/company';

const GALLERY_ITEMS = [
  {
    id: 'office-celebration',
    image: '/images/gallery/office-celebration.jpg',
    title: 'Pune Headquarters',
    caption: `Collaborative moments from ${COMPANY.brandName}'s Pune headquarters — where advisory, research, and client conversations come together.`,
  },
  {
    id: 'investor-session',
    image: '/images/gallery/investor-session.jpeg',
    title: 'Investor Session',
    caption: 'A stage conversation on a new beginning, with the same focus on long-term wealth.',
  },
  {
    id: 'research-strategy-desk',
    image: '/images/gallery/research-strategy-desk.jpg',
    title: 'Research & Strategy',
    caption: 'Market insight and portfolio construction work that informs investment advisory and allocation decisions.',
  },
  {
    id: 'executive-client-meeting',
    image: '/images/gallery/inside-team-gathering.jpeg',
    title: 'Private Advisory Sessions',
    caption: 'Discreet conversations with individuals and businesses about goals, risk, and long-term wealth planning.',
  },
  {
    id: 'wealth-headquarters',
    image: '/images/gallery/wealth-headquarters.jpg',
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
  const splideRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
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

    const frameWidth = () => splideRef.current?.parentElement?.clientWidth ?? window.innerWidth;

    const splide = new Splide(splideRef.current, {
      type: 'slide',
      drag: true,
      snap: false,
      arrows: false,
      pagination: false,
      fixedWidth: '18rem',
      gap: '1.25rem',
      padding: { left: 16, right: 16 },
      speed: 800,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      omitEnd: true,
    });

    const prev = prevRef.current;
    const next = nextRef.current;

    const limits = () => {
      const { Move } = splide.Components;
      return { min: Move.getLimit(false), max: Move.getLimit(true) };
    };

    const syncEnds = () => {
      const { min, max } = limits();
      const position = splide.Components.Move.getPosition();
      if (prev) prev.disabled = position >= min - 1;
      if (next) next.disabled = position <= max + 1;
    };

    const place = (position: number, animate: boolean) => {
      const { min, max } = limits();
      const nextPosition = Math.min(min, Math.max(max, position));
      const list = splide.Components.Elements.list;
      list.style.transition = animate
        ? 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1)'
        : '';
      splide.Components.Move.translate(nextPosition, true);
      syncEnds();
    };

    let pad = -1;
    const center = () => {
      const root = splideRef.current;
      if (root) root.style.transform = '';
      const nextPad = frameWidth() < 768 ? 16 : 0;
      if (nextPad !== pad) {
        pad = nextPad;
        splide.options = { padding: { left: nextPad, right: nextPad } };
        return;
      }
      const { min, max } = limits();
      place(nextPad > 0 ? min : (min + max) / 2, false);
    };

    const step = () => {
      const slide = splide.Components.Elements.slides[0];
      const styles = getComputedStyle(splide.Components.Elements.list);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      return (slide?.offsetWidth ?? 0) + gap;
    };

    const onPrev = () => place(splide.Components.Move.getPosition() + step(), true);
    const onNext = () => place(splide.Components.Move.getPosition() - step(), true);
    prev?.addEventListener('click', onPrev);
    next?.addEventListener('click', onNext);

    splide.on('mounted resized', center);
    splide.on('drag', () => {
      const list = splide.Components.Elements.list;
      list.style.transition = '';
    });
    splide.on('dragged', syncEnds);
    splide.mount();
    center();
    window.addEventListener('resize', center);

    return () => {
      window.removeEventListener('resize', center);
      prev?.removeEventListener('click', onPrev);
      next?.removeEventListener('click', onNext);
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
      <Container className="mb-10 md:mb-14">
        <RevealOnScroll className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>{TEAM_PAGE.gallery.eyebrow}</Eyebrow>
        </RevealOnScroll>
        <div className="mt-5 flex items-end justify-between gap-6">
          <SectionHeading id="gallery-heading" className="max-w-3xl text-white">
            {TEAM_PAGE.gallery.heading}
          </SectionHeading>
          <div className="mb-1 flex shrink-0 gap-3">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous slide"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-opacity hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next slide"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-opacity hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
        <BodyText className="mt-5 max-w-xl text-base md:text-lg">
          {TEAM_PAGE.gallery.body}
        </BodyText>
      </Container>

      <div className="w-full overflow-hidden">
        <div ref={splideRef} className="splide">
          <div className="splide__track">
            <ul className="splide__list items-stretch">
              {GALLERY_ITEMS.map((item, index) => (
                <li key={item.id} className="splide__slide">
                  <button
                    type="button"
                    onClick={() => handleOpen(index)}
                    className={cn(
                      'group relative block h-[25rem] w-full cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 text-left',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                    )}
                  >
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                      <h3 className="font-sans text-xl font-medium tracking-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 font-sans text-sm leading-5 text-white/80">
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

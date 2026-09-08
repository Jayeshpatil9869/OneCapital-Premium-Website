import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { type TeamMember } from '@/src/data/team';
import { TeamCard } from './TeamCard';
import { prefersReducedMotion } from '@/src/lib/motion';

export interface TeamCarouselProps {
  members: TeamMember[];
}

export function TeamCarousel({ members }: TeamCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const directionRef = useRef<1 | -1>(1); // 1 for forward, -1 for backward (ping-pong)
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  // Drag physics state
  const dragStartRef = useRef<{ x: number; time: number } | null>(null);
  const dragDeltaRef = useRef<number>(0);
  const isDraggingRef = useRef(false);

  const total = members.length;

  const goToSlide = useCallback(
    (index: number, animate = true) => {
      const targetIndex = Math.max(0, Math.min(total - 1, index));
      setCurrentIndex(targetIndex);

      if (!trackRef.current) return;

      const slideWidth = containerRef.current?.clientWidth || 0;
      const targetX = -targetIndex * (slideWidth + 20); // 20px gap

      if (animate && !prefersReducedMotion()) {
        gsap.to(trackRef.current, {
          x: targetX,
          duration: 0.55,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      } else {
        gsap.set(trackRef.current, { x: targetX });
      }
    },
    [total]
  );

  // Autoplay with Ping-Pong direction every 3000ms when in view (≥35% visible)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.intersectionRatio >= 0.35;
      },
      { threshold: 0.35 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const interval = setInterval(() => {
      if (
        !isVisibleRef.current ||
        isInteracting ||
        document.hidden ||
        prefersReducedMotion()
      ) {
        return;
      }

      setCurrentIndex((prev) => {
        let next = prev + directionRef.current;
        if (next >= total) {
          directionRef.current = -1;
          next = prev - 1;
        } else if (next < 0) {
          directionRef.current = 1;
          next = 1;
        }
        goToSlide(next);
        return next;
      });
    }, 3000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [goToSlide, isInteracting, total]);

  // Handle Drag / Touch
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartRef.current = { x: e.clientX, time: Date.now() };
    dragDeltaRef.current = 0;
    isDraggingRef.current = true;
    setIsInteracting(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !dragStartRef.current || !trackRef.current) return;

    let delta = e.clientX - dragStartRef.current.x;

    // Rubber-band at ends with factor 0.38
    if (
      (currentIndex === 0 && delta > 0) ||
      (currentIndex === total - 1 && delta < 0)
    ) {
      delta *= 0.38;
    }

    dragDeltaRef.current = delta;
    const slideWidth = containerRef.current?.clientWidth || 0;
    const baseX = -currentIndex * (slideWidth + 20);

    gsap.set(trackRef.current, { x: baseX + delta });
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current || !dragStartRef.current) return;
    isDraggingRef.current = false;
    setIsInteracting(false);

    const slideWidth = containerRef.current?.clientWidth || 300;
    const delta = dragDeltaRef.current;
    const elapsed = Date.now() - dragStartRef.current.time;
    const velocity = Math.abs(delta) / Math.max(1, elapsed);

    dragStartRef.current = null;

    // Snap if drag > 22% of slide OR velocity > 0.45
    if (Math.abs(delta) > slideWidth * 0.22 || velocity > 0.45) {
      if (delta < 0 && currentIndex < total - 1) {
        goToSlide(currentIndex + 1);
      } else if (delta > 0 && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      } else {
        goToSlide(currentIndex);
      }
    } else {
      goToSlide(currentIndex);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight' && currentIndex < total - 1) {
      goToSlide(currentIndex + 1);
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Team Members Carousel"
      onKeyDown={handleKeyDown}
      className="relative w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-[32px]"
    >
      {/* Hidden Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing slide {currentIndex + 1} of {total}: {members[currentIndex]?.name}
      </div>

      {/* Swipe Track */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="flex gap-5 touch-pan-y cursor-grab active:cursor-grabbing will-change-transform"
      >
        {members.map((member) => (
          <div key={member.id} className="w-full shrink-0 min-w-full">
            <TeamCard member={member} isMobile={true} />
          </div>
        ))}
      </div>

      {/* Carousel Controls (Prev/Next & Pill Dots) */}
      <div className="flex items-center justify-between mt-6 px-2">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous team member"
            disabled={currentIndex === 0}
            onClick={() => goToSlide(currentIndex - 1)}
            className="size-11 rounded-full bg-white text-black shadow-md border border-black/10 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next team member"
            disabled={currentIndex === total - 1}
            onClick={() => goToSlide(currentIndex + 1)}
            className="size-11 rounded-full bg-white text-black shadow-md border border-black/10 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pill Dots */}
        <div className="flex items-center gap-2">
          {members.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-7 bg-black'
                  : 'w-2 bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

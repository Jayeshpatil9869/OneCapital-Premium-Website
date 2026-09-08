import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TEAM_MEMBERS, type TeamMember } from '@/src/data/team';
import { TeamCard } from './TeamCard';
import { TeamCarousel } from './TeamCarousel';
import { prefersReducedMotion } from '@/src/lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface TeamSectionProps {
  members?: TeamMember[];
  className?: string;
}

export function TeamSection({ members = TEAM_MEMBERS, className }: TeamSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(true);

  // Detect fine pointer (mouse/hover capability) vs touch
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsFinePointer(media.matches);

    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // Keyboard Escape to collapse active card on desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCardId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Background Scrub (Black ↔ White) & Scroll Entrance Revelations
  useGSAP(
    () => {
      const section = sectionRef.current;
      const header = headerRef.current;
      const cards = cardsGridRef.current;
      if (!section) return;

      // 1. Static dark section styling
      gsap.set(section, { backgroundColor: '#000000', color: '#ffffff' });

      // 2. Scroll-in Reveal for Header (once)
      if (header) {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            once: true,
          },
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: 'power3.out',
        });
      }

      // 3. Scroll-in Reveal for Desktop Cards (staggered, once)
      if (cards) {
        const cardElements = cards.querySelectorAll('[data-team-card]');
        if (cardElements.length > 0) {
          gsap.from(cardElements, {
            scrollTrigger: {
              trigger: cards,
              start: 'top 90%',
              once: true,
            },
            opacity: 0,
            y: 40,
            scale: 0.98,
            duration: 1.1,
            stagger: 0.08,
            ease: 'power3.out',
          });
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="team"
      data-team-section
      className={`w-full py-16 md:py-20 text-black transition-colors duration-200 overflow-hidden relative ${
        className || ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER (left-aligned, max-w-2xl, mb-10 md:mb-12) */}
        <div ref={headerRef} className="max-w-2xl mb-10 md:mb-12 text-left">
          {/* 1. Eyebrow */}
          <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/40 block">
            Team
          </span>

          {/* 2. Hairline rule under eyebrow */}
          <div className="h-px w-12 bg-white/20 mt-3 mb-5" />

          {/* 3. H2 without text shimmer */}
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-tight mb-4 text-white">
            Meet the people behind the work.
          </h2>

          {/* 4. Subcopy */}
          <p className="text-base text-text-muted font-light leading-relaxed">
            Three people. Direct communication. The work, not the theatre around it.
          </p>
        </div>

        {/* DESKTOP VIEW (≥768px): 3-column CSS Grid with Expand/Collapse */}
        <div
          ref={cardsGridRef}
          className="hidden md:grid md:grid-cols-3 gap-5 items-start translate-x-0"
        >
          {members.map((member) => (
            <TeamCard
              key={member.id}
              member={member}
              isExpanded={activeCardId === member.id}
              isMobile={false}
              onCardPointerEnter={() => {
                if (isFinePointer) {
                  setActiveCardId(member.id);
                }
              }}
              onCardPointerLeave={() => {
                if (isFinePointer) {
                  setActiveCardId(null);
                }
              }}
              onToggleExpand={() => {
                if (!isFinePointer) {
                  setActiveCardId((prev) => (prev === member.id ? null : member.id));
                }
              }}
            />
          ))}
        </div>

        {/* MOBILE VIEW (<768px): Touch Carousel */}
        <div className="block md:hidden w-full">
          <TeamCarousel members={members} />
        </div>
      </div>
    </section>
  );
}

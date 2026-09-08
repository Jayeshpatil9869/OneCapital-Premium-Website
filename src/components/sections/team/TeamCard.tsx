import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Linkedin, Github, Instagram } from 'lucide-react';
import { type TeamMember } from '@/src/data/team';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/buttons/Button';
import { expandTeamCard, collapseTeamCard, setTeamCardInstant } from '@/src/lib/team-animations';

export interface TeamCardProps {
  member: TeamMember;
  isExpanded?: boolean;
  isMobile?: boolean;
  onCardPointerEnter?: () => void;
  onCardPointerLeave?: () => void;
  onToggleExpand?: () => void;
  className?: string;
}

export function TeamCard({
  member,
  isExpanded = false,
  isMobile = false,
  onCardPointerEnter,
  onCardPointerLeave,
  onToggleExpand,
  className,
}: TeamCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  // Synchronize desktop expand/collapse with GSAP animation engine
  useEffect(() => {
    if (isMobile) {
      if (cardRef.current) {
        setTeamCardInstant(cardRef.current, true);
      }
      return;
    }

    const el = cardRef.current;
    if (!el) return;

    if (isExpanded) {
      expandTeamCard(el);
    } else {
      collapseTeamCard(el);
    }
  }, [isExpanded, isMobile]);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerStartRef.current) return;
    const dx = Math.abs(e.clientX - pointerStartRef.current.x);
    const dy = Math.abs(e.clientY - pointerStartRef.current.y);
    pointerStartRef.current = null;

    // Ignore tap if moved > 12px (drag guard)
    if (dx < 12 && dy < 12 && onToggleExpand) {
      onToggleExpand();
    }
  };

  const isInteractive = isMobile || isExpanded;
  const tabIndex = isInteractive ? 0 : -1;

  return (
    <article
      ref={cardRef}
      data-team-card
      id={`team-card-${member.id}`}
      onMouseEnter={onCardPointerEnter}
      onMouseLeave={onCardPointerLeave}
      className={cn(
        'team-card group relative flex flex-col justify-between rounded-[28px] p-3 select-none',
        'glass-panel bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]',
        'focus-within:ring-2 focus-within:ring-white/30 focus-within:ring-offset-2 focus-within:ring-offset-black',
        isMobile ? 'w-full aspect-auto min-h-[500px]' : 'w-full md:aspect-6/8',
        className
      )}
    >
      {/* 1. IMAGE WRAP */}
      <div
        data-team-image-wrap
        role="button"
        tabIndex={isMobile ? -1 : 0}
        aria-expanded={isInteractive}
        aria-controls={`team-info-${member.id}`}
        aria-label={`Toggle details for ${member.name}, ${member.role}`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleExpand?.();
          }
        }}
        className={cn(
          'relative w-full overflow-hidden rounded-[20px] bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
          isMobile ? 'aspect-4/5 flex-none' : 'flex-1 md:aspect-auto min-h-[260px]'
        )}
      >
        <img
          data-team-image
          src={member.image}
          alt={member.name}
          loading="lazy"
          style={{
            objectPosition: member.imagePosition || 'center 20%',
            transformOrigin: '50% 100%',
          }}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />

        {/* Bottom gradient overlay veil */}
        <div
          className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Extra hover wash overlay - fades out when card is expanded */}
        <div
          className="team-hover-wash absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          aria-hidden="true"
        />

        {/* Floating Tag over Image when collapsed (subtle presence indicator) */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-[11px] font-mono tracking-widest uppercase text-white/90 border border-white/10">
            {member.category}
          </span>
        </div>
      </div>

      {/* 2. INFO PANEL (collapsible on desktop, static full height on mobile) */}
      <div
        id={`team-info-${member.id}`}
        data-team-info
        aria-hidden={!isInteractive}
        className={cn(
          'w-full overflow-hidden transition-none',
          isMobile ? 'h-auto overflow-visible' : 'h-0'
        )}
      >
        <div
          data-team-info-inner
          className="px-2 pt-5 pb-2 flex flex-col gap-5"
        >
          {/* Name & Role */}
          <div>
            <h3
              data-team-name
              className="text-[1.7rem] font-semibold tracking-[-0.03em] text-white leading-none mb-1.5"
            >
              {member.name}
            </h3>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              {member.role}
            </p>
          </div>

          {/* Description */}
          <p
            data-team-desc
            className="text-[0.95rem] text-white/65 font-light leading-relaxed line-clamp-4"
          >
            {member.description}
          </p>

          {/* Bottom Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
            {/* Social Icons & Category Tag */}
            <div data-team-tag className="flex items-center gap-2">
              {member.linkedinUrl && (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={tabIndex}
                  aria-label={`${member.name} LinkedIn Profile`}
                  className="size-8 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
              {member.githubUrl && (
                <a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={tabIndex}
                  aria-label={`${member.name} GitHub`}
                  className="size-8 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
              {member.instagramUrl && (
                <a
                  href={member.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={tabIndex}
                  aria-label={`${member.name} Instagram`}
                  className="size-8 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* CTA "View Profile" */}
            <div data-team-cta className="shrink-0">
              <Button
                to={member.profileUrl}
                variant="primary"
                size="sm"
                arrow="up-right"
                tabIndex={tabIndex}
                className="text-xs font-semibold uppercase tracking-wider min-h-11 px-5 shadow-[0_0_24px_rgba(255,255,255,0.2)]"
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

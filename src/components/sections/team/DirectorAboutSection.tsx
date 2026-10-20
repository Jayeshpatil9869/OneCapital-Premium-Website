import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Container } from '@/src/components/ui';
import { DIRECTOR_ABOUT } from '@/src/data/team';
import { gsap, prefersReducedMotion } from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

function ScrubWord({ word, charAttr }: { word: string; charAttr: string }) {
  return (
    <span className="inline-block whitespace-nowrap mr-[0.28em]">
      {Array.from(word).map((char, i) => (
        <span
          key={i}
          {...{ [charAttr]: '' }}
          className="inline-block transition-colors duration-75"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function ScrubParagraph({
  text,
  charAttr,
  className,
}: {
  text: string;
  charAttr: string;
  className?: string;
}) {
  const words = text.split(' ');
  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="select-none">
        {words.map((word, idx) => (
          <ScrubWord key={idx} word={word} charAttr={charAttr} />
        ))}
      </span>
    </p>
  );
}

/**
 * Editorial About Director section featuring:
 * - Left column: Large commanding editorial display typography with GSAP ScrollTrigger scrub text fill
 * - Right column: Clean, normal rounded portrait photo without device frames or card overlays
 */
export function DirectorAboutSection() {
  const { eyebrow, image, imagePosition, imageAlt, lead } = DIRECTOR_ABOUT;
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const textBlock = textContainerRef.current;
      if (!section || !textBlock) return;

      const leadChars = textBlock.querySelectorAll<HTMLElement>('[data-lead-char]');
      if (!leadChars.length) return;

      const DIM = 'rgba(255, 255, 255, 0.22)';
      const LIT_LEAD = '#ffffff';

      if (prefersReducedMotion()) {
        gsap.set(leadChars, { color: LIT_LEAD });
        return;
      }

      gsap.set(leadChars, { color: DIM });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textBlock,
          start: 'top 75%',
          end: 'bottom 35%',
          scrub: 1,
        },
      });

      tl.to(leadChars, {
        color: LIT_LEAD,
        ease: 'none',
        stagger: 0.04,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32 border-y border-white/10 overflow-hidden"
      aria-labelledby="director-about-heading"
    >
      {/* Ambient background lighting glow */}
      <div
        className="pointer-events-none absolute top-1/4 -right-24 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-white/[0.04] to-transparent blur-[120px] -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 -left-24 h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-white/[0.03] to-transparent blur-[110px] -z-10"
        aria-hidden="true"
      />

      <Container className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          {/* ─── LEFT COLUMN: EDITORIAL BIG FONT STORY & SCRUB ANIMATION ─── */}
          <div ref={textContainerRef} className="flex flex-col lg:col-span-7">
            {/* Eyebrow badge */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 shrink-0 bg-white/40" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-400">
                {eyebrow || 'About Me'}
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
            </div>

            {/* Monumental Lead Philosophy Statement — Big Font with Scroll Scrub Fill */}
            <h2 id="director-about-heading" className="mt-8">
              <ScrubParagraph
                text={lead}
                charAttr="data-lead-char"
                className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[2.9rem] font-medium leading-[1.24] tracking-[-0.02em] text-white/20 text-pretty"
              />
            </h2>
          </div>

          {/* ─── RIGHT COLUMN: CLEAN NORMAL PORTRAIT ─── */}
          <div className="w-full lg:col-span-5 lg:flex lg:justify-end">
            <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 aspect-[4/5] sm:aspect-[4/4.8] overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950 shadow-2xl">
              <img
                src={image}
                alt={imageAlt}
                width={720}
                height={900}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                style={{ objectPosition: imagePosition || 'center 18%' }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container } from '@/src/components/ui';
import { DIRECTOR_ABOUT } from '@/src/data/team';
import { gsap, prefersReducedMotion, ScrollTrigger } from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

/**
 * About Me — the portrait opens once from its left edge, then stays open.
 */
export function DirectorAboutSection() {
  const { eyebrow, image, imagePosition, imageAlt, lead, paragraphs } = DIRECTOR_ABOUT;
  const frameRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const frame = frameRef.current;
      const clip = clipRef.current;
      const photo = imageRef.current;
      if (!frame || !clip || !photo) return;

      const fit = () => {
        gsap.set(photo, { width: frame.offsetWidth, height: frame.offsetHeight });
      };

      fit();
      ScrollTrigger.addEventListener('refreshInit', fit);

      if (prefersReducedMotion()) {
        gsap.set(clip, { width: '100%' });
        return () => ScrollTrigger.removeEventListener('refreshInit', fit);
      }

      gsap.fromTo(
        clip,
        { width: '0%' },
        {
          width: '100%',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: frame,
            start: 'top 80%',
            once: true,
          },
        },
      );

      return () => ScrollTrigger.removeEventListener('refreshInit', fit);
    },
    { scope: frameRef },
  );

  return (
    <section
      className="relative w-full bg-black pt-16 text-white md:pt-24 lg:pt-28 pb-16 md:pb-24 lg:pb-28"
      aria-labelledby="director-about-heading"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-7">
            <RevealOnScroll direction="up" distance={20} duration={0.9} ease="power3.out">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 shrink-0 bg-white/35" aria-hidden />
                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#757575] sm:text-xs">
                  {eyebrow}
                </span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll
              direction="up"
              distance={20}
              duration={0.9}
              delay={0.14}
              ease="power3.out"
              className="mt-8 flex max-w-xl flex-col gap-5 border-t border-white/10 pt-8"
            >
              <p
                id="director-about-heading"
                className="font-sans text-base font-normal leading-relaxed text-white/90 text-pretty md:text-lg"
              >
                {lead}
              </p>
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="font-sans text-base font-normal leading-relaxed text-[#B3B3B3] text-pretty md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <div ref={frameRef} className="relative mx-auto aspect-[4/5] w-full max-w-[24rem] lg:mx-0">
              <div
                ref={clipRef}
                className="absolute inset-y-0 left-0 w-0 overflow-hidden rounded-[20px] bg-neutral-900 motion-reduce:w-full"
              >
                <img
                  ref={imageRef}
                  src={image}
                  alt={imageAlt}
                  width={720}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="absolute top-0 left-0 h-full max-w-none object-cover"
                  style={{ objectPosition: imagePosition }}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

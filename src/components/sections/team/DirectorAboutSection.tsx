import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Parallax } from '@/src/components/motion/Parallax';
import { Container } from '@/src/components/ui';
import { DIRECTOR_ABOUT } from '@/src/data/team';

/**
 * About Me — bio beside a portrait that drifts inside its frame on scroll.
 */
export function DirectorAboutSection() {
  const { eyebrow, image, imagePosition, imageAlt, lead, paragraphs } = DIRECTOR_ABOUT;

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
                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400 sm:text-xs">
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
                className="font-sans text-base font-normal leading-relaxed text-white/80 text-pretty md:text-lg"
              >
                {lead}
              </p>
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="font-sans text-base font-normal leading-relaxed text-zinc-400 text-pretty md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-[20px] bg-neutral-900 lg:mx-0 lg:max-w-none">
              <Parallax speed={0.22} className="absolute -inset-y-[14%] inset-x-0">
                <img
                  src={image}
                  alt={imageAlt}
                  width={720}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: imagePosition }}
                />
              </Parallax>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

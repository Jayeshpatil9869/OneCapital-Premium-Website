import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container, Section } from '@/src/components/ui';
import { DIRECTOR_ABOUT } from '@/src/data/team';

/**
 * About Me — director portrait + approved bio.
 * No role title in the heading; lead sentence carries hierarchy.
 */
export function DirectorAboutSection() {
  const { eyebrow, image, imagePosition, imageAlt, lead, paragraphs, closing } =
    DIRECTOR_ABOUT;

  return (
    <Section
      pad="none"
      className="relative w-full overflow-hidden border-y border-white/10 bg-black py-16 text-white sm:py-20 lg:py-28"
      aria-labelledby="director-about-heading"
    >
      <Container className="relative z-10 mx-auto max-w-[1380px] px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          <RevealOnScroll
            className="flex lg:col-span-5"
            direction="up"
            distance={28}
            duration={1}
          >
            <div className="group relative mx-auto w-full max-w-[28rem] overflow-hidden rounded-[24px] border border-white/15 bg-white/[0.02] shadow-[0_25px_60px_rgba(0,0,0,0.85)] aspect-[4/5] sm:rounded-[28px] lg:mx-0 lg:max-w-none">
              <img
                src={image}
                alt={imageAlt}
                width={720}
                height={900}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                style={{ objectPosition: imagePosition }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10 sm:rounded-[28px]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                aria-hidden
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            className="flex flex-col justify-center lg:col-span-7"
            direction="up"
            distance={24}
            duration={1}
            delay={0.1}
          >
            <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400 sm:text-xs">
              {eyebrow}
            </span>
            <div className="mb-7 h-px w-12 bg-white/20 sm:mb-8" aria-hidden />

            <h2
              id="director-about-heading"
              className="mb-7 max-w-2xl font-sans text-[1.35rem] font-medium leading-[1.35] tracking-tight text-white text-pretty sm:mb-8 sm:text-2xl md:text-[1.65rem] lg:text-[1.75rem]"
            >
              {lead}
            </h2>

            <div className="flex flex-col gap-5 sm:gap-6">
              {paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="max-w-2xl text-base font-normal leading-relaxed text-zinc-400 text-pretty sm:text-[17px] lg:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>

            <blockquote className="oc-mobile-glass-card relative mt-8 max-w-2xl rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-xl sm:mt-10 sm:rounded-3xl sm:p-6 md:p-7">
              <span
                className="pointer-events-none absolute left-5 top-4 font-serif text-3xl leading-none text-white/20 sm:left-6 sm:top-5"
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="relative z-[1] pl-1 font-sans text-base font-medium leading-relaxed text-white/90 text-pretty sm:pl-2 sm:text-lg">
                {closing}
              </p>
            </blockquote>
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}

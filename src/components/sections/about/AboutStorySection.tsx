import { Link } from 'react-router-dom';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container, Section } from '@/src/components/ui';
import { ABOUT_PAGE } from '@/src/data/about';

export function AboutStorySection() {
  const { story } = ABOUT_PAGE;

  return (
    <Section
      pad="none"
      className="relative w-full border-b border-white/10 py-16 sm:py-20 lg:py-28 bg-black text-white overflow-hidden"
      aria-labelledby="about-architecture-heading"
    >
      <Container className="max-w-[1380px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-stretch">
          <RevealOnScroll className="lg:col-span-4 flex flex-col justify-start self-start lg:pt-3">
            <span className="text-xs uppercase tracking-[0.22em] font-mono text-zinc-400 mb-3 block">
              {story.eyebrow}
            </span>
            <h2
              id="about-architecture-heading"
              className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-semibold tracking-tight text-white leading-[1.15] mb-6 sm:mb-8"
            >
              {story.headingLine1}
              {story.headingLine2 ? (
                <>
                  <br />
                  {story.headingLine2}
                </>
              ) : null}
            </h2>
            <p className="text-base lg:text-[17px] xl:text-lg text-zinc-400 font-normal leading-relaxed">
              {story.lead}
            </p>
          </RevealOnScroll>

          <RevealOnScroll
            delay={0.1}
            className="lg:col-span-4 flex justify-center items-center self-center w-full"
          >
            <div className="relative w-full max-w-[420px] aspect-[4/4.7] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-white/15 bg-white/[0.02] shadow-[0_25px_60px_rgba(0,0,0,0.85)] group">
              <img
                src={story.imageSrc}
                alt={story.imageAlt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[center_28%] sm:object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[28px] ring-1 ring-inset ring-white/10" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            delay={0.18}
            className="lg:col-span-4 flex flex-col justify-end self-end lg:pb-3 space-y-6 sm:space-y-8"
          >
            <p className="text-base lg:text-[17px] xl:text-lg text-zinc-400 font-normal leading-relaxed">
              {story.approach}{' '}
              <Link to="/solutions" className="text-white underline-offset-4 hover:underline">
                See how we work and what we offer.
              </Link>
            </p>
            <p className="text-base lg:text-[17px] xl:text-lg text-zinc-400 font-normal leading-relaxed">
              {story.bridge}
            </p>
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}

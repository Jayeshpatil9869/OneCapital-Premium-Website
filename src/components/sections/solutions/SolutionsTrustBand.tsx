import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container } from '@/src/components/ui';
import { SOLUTIONS_HUB } from '@/src/data/solutions-pages';

export function SolutionsTrustBand() {
  const { trust } = SOLUTIONS_HUB;

  return (
    <section className="w-full border-t border-white/10 bg-white/[0.015] py-[var(--space-section-sm)]">
      <Container>
        <RevealOnScroll className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
              {trust.eyebrow}
            </p>
            <h2 className="mt-4 max-w-md font-sans text-[clamp(1.75rem,1rem+2vw,2.75rem)] font-semibold leading-[1.12] tracking-tight text-white">
              {trust.headline}
            </h2>
          </div>
          <ul className="flex flex-col lg:col-span-7">
            {trust.points.map((point, index) => (
              <li
                key={point}
                className="flex gap-5 border-t border-white/10 py-5 first:border-t-0 first:pt-0 last:pb-0"
              >
                <span className="mt-0.5 font-mono text-[11px] tracking-widest text-white/30">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="font-sans text-base font-light leading-relaxed text-white/65 md:text-lg">
                  {point}
                </p>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

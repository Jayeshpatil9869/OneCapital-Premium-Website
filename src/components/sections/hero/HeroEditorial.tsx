import type { ReactNode } from 'react';
import { Container } from '@/src/components/ui/primitives/Layout';
import { Eyebrow, DisplayHeading, BodyText } from '@/src/components/ui/typography/Typography';
import { GlowOrb } from '@/src/components/effects/Atmosphere';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { cn } from '@/src/lib/utils';

type HeroEditorialProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
  className?: string;
};

/** Hero A — editorial: large type + asymmetric composition + optional visual plane. */
export function HeroEditorial({
  eyebrow,
  title,
  description,
  actions,
  visual,
  className,
}: HeroEditorialProps) {
  return (
    <section
      className={cn(
        'w-full min-h-[min(90svh,56rem)] relative flex flex-col justify-center pt-[max(6rem,env(safe-area-inset-top))] lg:pt-32',
        className
      )}
    >
      <GlowOrb />
      <Container className="relative z-10 flex flex-col">
        <div className="max-w-4xl">
          {eyebrow && (
            <RevealOnScroll trigger="load" direction="up" distance={20} duration={0.8}>
              <Eyebrow className="mb-8">{eyebrow}</Eyebrow>
            </RevealOnScroll>
          )}
          <RevealOnScroll
            trigger="load"
            direction="up"
            distance={30}
            duration={1}
            delay={0.1}
          >
            <DisplayHeading className="mb-8">{title}</DisplayHeading>
          </RevealOnScroll>
          {description && (
            <RevealOnScroll
              trigger="load"
              direction="up"
              distance={20}
              delay={0.25}
              duration={0.8}
            >
              <BodyText className="max-w-xl mb-12">{description}</BodyText>
            </RevealOnScroll>
          )}
          {actions && (
            <RevealOnScroll
              trigger="load"
              direction="up"
              distance={20}
              delay={0.35}
              duration={0.8}
            >
              <div className="flex flex-wrap items-center gap-6">{actions}</div>
            </RevealOnScroll>
          )}
        </div>
        {visual && (
          <RevealOnScroll
            trigger="load"
            direction="none"
            delay={0.45}
            duration={1.4}
            className="mt-20 lg:mt-32 w-full"
          >
            {visual}
          </RevealOnScroll>
        )}
      </Container>
    </section>
  );
}

import type { ReactNode } from 'react';
import { Container } from '@/src/components/ui/primitives/Layout';
import { SectionHeading, BodyText } from '@/src/components/ui/typography/Typography';
import { Surface } from '@/src/components/ui/primitives/Layout';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Noise } from '@/src/components/effects/Atmosphere';
import { cn } from '@/src/lib/utils';

type CtaBandProps = {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  variant?: 'panel' | 'minimal';
};

export function CtaBand({
  title,
  description,
  action,
  className,
  variant = 'panel',
}: CtaBandProps) {
  if (variant === 'minimal') {
    return (
      <RevealOnScroll className={cn('w-full px-[var(--page-gutter)] py-16 md:py-24', className)}>
        <Container className="text-center flex flex-col items-center gap-6">
          <SectionHeading>{title}</SectionHeading>
          {description && <BodyText className="max-w-xl">{description}</BodyText>}
          {action}
        </Container>
      </RevealOnScroll>
    );
  }

  return (
    <div className={cn('w-full px-[var(--page-gutter)] py-16 md:py-24 mb-8 md:mb-12', className)}>
      <RevealOnScroll>
        <Container>
          <Surface className="p-8 sm:p-12 md:p-16 lg:p-24 rounded-[1.5rem] md:rounded-[2rem] text-center flex flex-col items-center relative overflow-hidden">
            <Noise />
            <div className="absolute inset-0 bg-gradient-to-t from-white/[0.05] to-transparent pointer-events-none" />
            <SectionHeading className="text-[clamp(1.75rem,1rem+3vw,3.75rem)] mb-6 relative z-10">
              {title}
            </SectionHeading>
            {description && (
              <BodyText className="max-w-xl mx-auto mb-8 md:mb-12 relative z-10">
                {description}
              </BodyText>
            )}
            {action && <div className="relative z-10">{action}</div>}
          </Surface>
        </Container>
      </RevealOnScroll>
    </div>
  );
}

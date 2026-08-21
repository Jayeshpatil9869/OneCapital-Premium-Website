import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'article';
  children?: ReactNode;
  narrow?: boolean;
};

export function Container({
  as: Comp = 'div',
  className,
  narrow,
  children,
  ...props
}: ContainerProps) {
  return (
    <Comp
      className={cn(
        'mx-auto w-full max-w-[var(--container-max)] px-[var(--page-gutter)]',
        narrow ? 'max-w-3xl' : '',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

type SectionProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  tone?: 'dark' | 'light' | 'panel';
  pad?: 'none' | 'sm' | 'md' | 'lg';
};

const padMap = {
  none: '',
  sm: 'py-16',
  md: 'py-[var(--space-section-sm)]',
  lg: 'py-[var(--space-section)]',
} as const;

export function Section({
  className,
  tone = 'dark',
  pad = 'md',
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'w-full relative',
        tone === 'light' && 'light-section border-y border-black/10',
        tone === 'panel' && 'bg-white/[0.02] border-y border-white/10',
        padMap[pad],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

type StackProps = HTMLAttributes<HTMLDivElement> & {
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  children?: ReactNode;
};

const gapMap = {
  sm: 'gap-3',
  md: 'gap-6',
  lg: 'gap-10',
  xl: 'gap-16',
} as const;

export function Stack({ className, gap = 'md', children, ...props }: StackProps) {
  return (
    <div className={cn('flex flex-col', gapMap[gap], className)} {...props}>
      {children}
    </div>
  );
}

type SurfaceProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'plain' | 'glass' | 'elevated';
  children?: ReactNode;
};

export function Surface({
  className,
  variant = 'glass',
  children,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn(
        'relative rounded-3xl',
        variant === 'glass' && 'glass-panel',
        variant === 'elevated' && 'bg-white/[0.04] border border-white/10',
        variant === 'plain' && 'bg-transparent',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Divider({ className, ...props }: HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn('border-0 h-px w-full bg-white/10', className)}
      {...props}
    />
  );
}

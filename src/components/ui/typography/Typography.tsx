import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

type TextProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4';
};

export function Eyebrow({
  className,
  children,
  centered = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { centered?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 text-text-muted',
        centered && 'justify-center',
        className,
      )}
      {...props}
    >
      <span className="w-8 h-px bg-current/30 shrink-0" aria-hidden />
      <span className="text-xs uppercase tracking-[0.2em] font-mono">{children}</span>
      {centered && <span className="w-8 h-px bg-current/30 shrink-0" aria-hidden />}
    </div>
  );
}

export function DisplayHeading({
  as: Comp = 'h1',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Comp
      className={cn(
        'text-[clamp(2.25rem,1.2rem+4.5vw,5.5rem)] leading-[1.05] tracking-tight font-medium break-words',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({
  as: Comp = 'h2',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Comp
      className={cn(
        'text-[clamp(1.5rem,1rem+2vw,3rem)] tracking-tight font-medium leading-tight break-words',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function BodyText({
  as: Comp = 'p',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Comp
      className={cn(
        'text-lg md:text-xl text-text-muted leading-relaxed text-balance',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function Label({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'text-xs uppercase tracking-widest font-mono text-text-muted',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function Caption({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('text-sm text-text-muted leading-relaxed', className)}
      {...props}
    >
      {children}
    </span>
  );
}

import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

type BentoSize = 'sm' | 'md' | 'lg' | 'full';

const sizeClasses: Record<BentoSize, string> = {
  sm: 'md:col-span-1',
  md: 'md:col-span-1 lg:col-span-1',
  lg: 'md:col-span-2',
  full: 'md:col-span-2 lg:col-span-3',
};

type BentoGridProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  columns?: 2 | 3;
};

export function BentoGrid({
  children,
  className,
  columns = 2,
  ...props
}: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6',
        columns === 2 && 'md:grid-cols-2',
        columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type BentoItemProps = HTMLAttributes<HTMLDivElement> & {
  size?: BentoSize;
  children?: ReactNode;
};

export function BentoItem({
  size = 'md',
  className,
  children,
  ...props
}: BentoItemProps) {
  return (
    <div className={cn(sizeClasses[size], className)} {...props}>
      {children}
    </div>
  );
}

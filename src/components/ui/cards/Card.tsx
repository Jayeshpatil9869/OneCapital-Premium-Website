import {
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '@/src/lib/utils';
import { Spotlight } from '@/src/components/effects/Spotlight';

type CardVariant =
  | 'default'
  | 'glass'
  | 'spotlight'
  | 'feature'
  | 'metric'
  | 'bento';

type CardContextValue = { variant: CardVariant };
const CardContext = createContext<CardContextValue>({ variant: 'glass' });

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  asChild?: boolean;
  children?: ReactNode;
  intensity?: 'subtle' | 'medium' | 'strong';
};

const variantBase: Record<CardVariant, string> = {
  default: 'bg-white/[0.02] border border-white/10',
  glass: 'glass-panel',
  spotlight: 'glass-panel',
  feature: 'glass-panel',
  metric: 'bg-transparent',
  bento: 'glass-panel',
};

export function Card({
  variant = 'glass',
  className,
  children,
  intensity = 'medium',
  ...props
}: CardProps) {
  const inner = (
    <div
      className={cn(
        'relative rounded-3xl overflow-hidden transition-colors duration-500',
        variantBase[variant],
        variant === 'feature' && 'p-8 md:p-12 group glass-panel-hover',
        variant === 'bento' && 'p-8 md:p-10',
        variant === 'default' && 'p-6',
        variant === 'glass' && !className?.includes('p-') && 'p-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );

  return (
    <CardContext.Provider value={{ variant }}>
      {variant === 'spotlight' ? (
        <Spotlight intensity={intensity} className="rounded-3xl">
          {inner}
        </Spotlight>
      ) : (
        inner
      )}
    </CardContext.Provider>
  );
}

function useCard() {
  return useContext(CardContext);
}

Card.Eyebrow = function CardEyebrow({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-xs uppercase tracking-widest font-mono text-text-muted mb-4',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

Card.Title = function CardTitle({
  className,
  children,
  as: Comp = 'h3',
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { as?: 'h2' | 'h3' | 'h4' }) {
  useCard();
  return (
    <Comp
      className={cn('text-2xl md:text-3xl font-medium tracking-tight mb-3', className)}
      {...props}
    >
      {children}
    </Comp>
  );
};

Card.Description = function CardDescription({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-text-muted text-balance leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
};

Card.Meta = function CardMeta({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mt-6 text-xs uppercase tracking-widest text-white/50', className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Action = function CardAction({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-8 flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  );
};

Card.Media = function CardMedia({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-8 text-white/30', className)} {...props}>
      {children}
    </div>
  );
};

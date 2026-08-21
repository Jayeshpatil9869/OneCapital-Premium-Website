import {
  forwardRef,
  useRef,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { prefersReducedMotion } from '@/src/lib/motion';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'magnetic'
  | 'text'
  | 'pill'
  | 'glow';

export type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-white text-black hover:bg-white/90 font-medium',
  secondary:
    'glass-panel hover:bg-white hover:text-black',
  ghost:
    'bg-transparent text-white/70 hover:text-white',
  outline:
    'border border-white/20 bg-transparent hover:border-white/50 hover:bg-white/[0.03]',
  magnetic:
    'glass-panel hover:bg-white hover:text-black magnetic-target',
  text:
    'bg-transparent text-white/70 hover:text-white px-0 py-0 rounded-none',
  pill:
    'glass-panel rounded-full hover:bg-white hover:text-black',
  glow:
    'bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.12)] hover:shadow-[0_0_56px_rgba(255,255,255,0.2)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-xs min-h-11',
  md: 'px-8 py-4 text-sm min-h-12',
  lg: 'px-10 py-5 text-sm min-h-14',
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: 'right' | 'up-right' | false;
  children?: ReactNode;
  className?: string;
  magneticStrength?: number;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined };

type ButtonAsLink = SharedProps &
  Omit<LinkProps, 'className' | 'children'> & { to: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function useMagneticHandlers(strength: number, enabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: MouseEvent) => {
    if (!enabled || prefersReducedMotion() || !ref.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
  };

  return { ref, onMove, onLeave };
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, forwardedRef) {
    const {
      variant = 'secondary',
      size = 'md',
      arrow = false,
      children,
      className,
      magneticStrength = 0.25,
      ...rest
    } = props;

    const isMagnetic = variant === 'magnetic';
    const { ref: magRef, onMove, onLeave } = useMagneticHandlers(
      magneticStrength,
      isMagnetic
    );

    const classes = cn(
      'inline-flex items-center justify-center gap-2 uppercase tracking-wide transition-all duration-500 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
      variant !== 'text' && 'rounded-full',
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    const ArrowIcon =
      arrow === 'up-right' ? ArrowUpRight : arrow === 'right' ? ArrowRight : null;

    const content = (
      <>
        {children}
        {ArrowIcon && (
          <ArrowIcon
            className={cn(
              'w-4 h-4 transition-transform',
              arrow === 'right' && 'group-hover:translate-x-1',
              arrow === 'up-right' &&
                'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            )}
          />
        )}
      </>
    );

    const setRefs = (node: HTMLButtonElement | HTMLAnchorElement | null) => {
      magRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node as never);
      else if (forwardedRef) (forwardedRef as { current: typeof node }).current = node;
    };

    if ('to' in props && props.to) {
      const { to, ...linkRest } = rest as ButtonAsLink;
      return (
        <Link
          ref={setRefs as never}
          to={to}
          className={classes}
          onMouseMove={isMagnetic ? onMove : undefined}
          onMouseLeave={isMagnetic ? onLeave : undefined}
          {...linkRest}
        >
          {content}
        </Link>
      );
    }

    const buttonRest = rest as ButtonAsButton;
    return (
      <button
        ref={setRefs as never}
        type={buttonRest.type ?? 'button'}
        className={classes}
        onMouseMove={isMagnetic ? onMove : undefined}
        onMouseLeave={isMagnetic ? onLeave : undefined}
        {...buttonRest}
      >
        {content}
      </button>
    );
  }
);

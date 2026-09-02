import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useFlairButton } from './useFlairButton';

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
  primary: 'bg-white text-black font-medium',
  secondary: 'glass-panel text-white',
  ghost: 'bg-transparent text-white/70',
  outline: 'bg-transparent text-white/90',
  magnetic: 'glass-panel text-white',
  text: 'bg-transparent text-white/70 hover:text-white px-0 py-0 min-h-0 rounded-none',
  pill: 'glass-panel text-white/90',
  glow:
    'bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.12)] hover:shadow-[0_0_56px_rgba(255,255,255,0.2)]',
};

const strokeToneClasses: Record<ButtonVariant, string> = {
  primary: 'oc-btn-stroke--dark',
  glow: 'oc-btn-stroke--dark',
  secondary: 'oc-btn-stroke--light',
  ghost: 'oc-btn-stroke--light',
  outline: 'oc-btn-stroke--light',
  magnetic: 'oc-btn-stroke--light',
  text: '',
  pill: 'oc-btn-stroke--light',
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
  /** @deprecated Flair hover is always on for shaped variants; ignored. */
  sweep?: boolean;
  children?: ReactNode;
  className?: string;
  /** @deprecated Magnetic tracking replaced by GSAP flair; ignored. */
  magneticStrength?: number;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };

type ButtonAsLink = SharedProps &
  Omit<LinkProps, 'className' | 'children'> & { to: string; href?: undefined };

type ButtonAsAnchor = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    href: string;
    to?: undefined;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, forwardedRef) {
    const {
      variant = 'secondary',
      size = 'md',
      arrow = false,
      children,
      className,
      ...rest
    } = props;

    const isText = variant === 'text';
    const useFlair = !isText;
    const { buttonRef, flairRef } = useFlairButton(useFlair);

    const classes = cn(
      'inline-flex items-center justify-center uppercase tracking-wide transition-all duration-500 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
      useFlair && 'oc-btn-stroke',
      useFlair && strokeToneClasses[variant],
      !isText && 'rounded-full',
      !isText && sizeClasses[size],
      isText && 'text-sm gap-2',
      variantClasses[variant],
      className
    );

    const ArrowIcon =
      arrow === 'up-right' ? ArrowUpRight : arrow === 'right' ? ArrowRight : null;

    const labelContent = (
      <>
        {children}
        {ArrowIcon && (
          <ArrowIcon
            className={cn(
              'w-4 h-4 transition-transform duration-300',
              arrow === 'right' && 'group-hover:translate-x-1',
              arrow === 'up-right' &&
                'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            )}
            aria-hidden
          />
        )}
      </>
    );

    const content = useFlair ? (
      <>
        <span ref={flairRef} className="oc-btn-flair" aria-hidden />
        <span className="oc-btn-label">{labelContent}</span>
      </>
    ) : (
      labelContent
    );

    const setRefs = (node: HTMLButtonElement | HTMLAnchorElement | null) => {
      buttonRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node as never);
      else if (forwardedRef) (forwardedRef as { current: typeof node }).current = node;
    };

    if ('href' in props && props.href) {
      const { href, ...anchorRest } = rest as ButtonAsAnchor;
      return (
        <a ref={setRefs as never} href={href} className={classes} {...anchorRest}>
          {content}
        </a>
      );
    }

    if ('to' in props && props.to) {
      const { to, ...linkRest } = rest as ButtonAsLink;
      return (
        <Link ref={setRefs as never} to={to} className={classes} {...linkRest}>
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
        {...buttonRest}
      >
        {content}
      </button>
    );
  }
);


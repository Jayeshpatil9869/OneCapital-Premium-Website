import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/src/lib/utils";
import {
  directionOffset,
  isPreloaderActive,
  motionTokens,
  whenPreloaderDone,
  type MotionEase,
  type RevealDirection,
} from "@/src/lib/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export type RevealProps = {
  children?: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  ease?: MotionEase | string;
  once?: boolean;
  trigger?: "load" | "scroll";
  stagger?: number;
  disabled?: boolean;
  distance?: number;
  as?: "div" | "section" | "article" | "ul";
};

export function RevealOnScroll({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = motionTokens.duration.normal,
  ease: _ease,
  once = true,
  trigger = "scroll",
  stagger,
  disabled = false,
  distance = 28,
  as: tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const played = useRef(false);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once, margin: "0px 0px -10% 0px" });
  const [ready, setReady] = useState(() => !isPreloaderActive());
  const offset = directionOffset(direction, distance);
  const MotionComp = motion[tag];
  const childStagger = stagger != null && stagger > 0;

  useEffect(() => whenPreloaderDone(() => setReady(true)), []);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !childStagger || reduce || disabled || played.current) return;
    for (const child of root.children) {
      const node = child as HTMLElement;
      node.style.opacity = "0";
      node.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
    }
  }, [childStagger, disabled, offset.x, offset.y, reduce]);

  const play = ready && (trigger === "load" || inView);

  useEffect(() => {
    const root = ref.current;
    if (!root || !childStagger || !play || reduce || disabled || played.current) return;
    played.current = true;
    Array.from(root.children).forEach((child, index) => {
      animate(
        child,
        { opacity: 1, x: 0, y: 0 },
        { duration, delay: delay + index * (stagger ?? 0), ease: EASE },
      );
    });
  }, [childStagger, delay, disabled, duration, play, reduce, stagger]);

  if (childStagger) {
    const Comp = tag;
    return (
      <Comp ref={ref as never} className={cn("reveal-on-scroll", className)}>
        {children}
      </Comp>
    );
  }

  return (
    <MotionComp
      ref={ref as never}
      className={cn("reveal-on-scroll", className)}
      initial={reduce || disabled ? false : { opacity: 0, x: offset.x, y: offset.y }}
      animate={
        play && !reduce && !disabled ? { opacity: 1, x: 0, y: 0 } : undefined
      }
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionComp>
  );
}

export function StaggerReveal({
  children,
  stagger = motionTokens.stagger.normal,
  ...props
}: RevealProps) {
  return (
    <RevealOnScroll stagger={stagger} {...props}>
      {children}
    </RevealOnScroll>
  );
}

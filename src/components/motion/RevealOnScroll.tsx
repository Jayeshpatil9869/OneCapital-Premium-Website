import { useRef, type HTMLAttributes, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/src/lib/utils";
import {
  directionOffset,
  gsap,
  isPreloaderActive,
  motionTokens,
  prefersReducedMotion,
  whenPreloaderDone,
  type RevealDirection,
  type MotionEase,
} from "@/src/lib/motion";

gsap.registerPlugin(useGSAP);

export type RevealProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  children?: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  ease?: MotionEase | string;
  once?: boolean;
  trigger?: "load" | "scroll";
  stagger?: number;
  disabled?: boolean;
  distance?: number;
  as?: "div" | "section" | "article";
};

export function RevealOnScroll({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = motionTokens.duration.slow,
  ease = motionTokens.ease.premium,
  once = true,
  trigger = "scroll",
  stagger,
  disabled = false,
  distance = 40,
  as: Comp = "div",
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (disabled || !ref.current) return;
      if (prefersReducedMotion()) {
        gsap.set(ref.current, { clearProps: "all", opacity: 1 });
        return;
      }

      const targets = stagger
        ? ref.current.querySelectorAll(":scope > *")
        : ref.current;
      const offset = directionOffset(direction, distance);
      const fromVars = { ...offset, opacity: 0 };
      const toVars = {
        x: 0,
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease,
        stagger: stagger ?? 0,
        clearProps: "transform",
      };

      if (trigger === "load") {
        // Stay hidden under the preloader; play only on handoff.
        if (isPreloaderActive()) {
          gsap.set(targets, fromVars);
        }
        return whenPreloaderDone(() => {
          gsap.fromTo(targets, fromVars, toVars);
        });
      }

      gsap.from(targets, {
        ...fromVars,
        duration,
        delay,
        ease,
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: ref.current,
          start: motionTokens.scroll.start,
          once,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
      });
    },
    {
      scope: ref,
      dependencies: [
        direction,
        delay,
        duration,
        ease,
        once,
        trigger,
        stagger,
        disabled,
        distance,
      ],
    },
  );

  return (
    <Comp
      ref={ref as never}
      className={cn("reveal-ready", className)}
      {...props}
    >
      {children}
    </Comp>
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

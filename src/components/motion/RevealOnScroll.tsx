import { useRef, type HTMLAttributes, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/src/lib/utils";
import {
  directionOffset,
  gsap,
  isPreloaderActive,
  isMobileViewport,
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

function markRevealDone(el: HTMLElement | null) {
  el?.classList.add("reveal-done");
}

function revealVisible(targets: gsap.TweenTarget) {
  gsap.set(targets, { opacity: 1, x: 0, y: 0, clearProps: "transform" });
}

function isPastRevealStart(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92;
}

export function RevealOnScroll({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = motionTokens.duration.normal,
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
        revealVisible(ref.current);
        markRevealDone(ref.current);
        return;
      }

      const mobile = isMobileViewport();
      const targets = stagger
        ? ref.current.querySelectorAll(":scope > *")
        : ref.current;
      const offset = mobile ? { x: 0, y: 0 } : directionOffset(direction, distance);
      const fromVars = mobile ? { opacity: 0 } : { ...offset, opacity: 1 };
      const toVars = {
        x: 0,
        y: 0,
        opacity: 1,
        duration: mobile ? motionTokens.duration.fast : duration,
        delay,
        ease,
        stagger: stagger ?? 0,
        clearProps: "transform",
        onComplete: () => markRevealDone(ref.current),
      };

      if (trigger === "load") {
        if (isPreloaderActive()) {
          gsap.set(targets, fromVars);
        }
        return whenPreloaderDone(() => {
          gsap.fromTo(targets, fromVars, {
            ...toVars,
            onComplete: () => markRevealDone(ref.current),
          });
        });
      }

      if (mobile) {
        revealVisible(targets);
        markRevealDone(ref.current);
        return;
      }

      gsap.set(targets, fromVars);

      const tween = gsap.to(targets, {
        ...toVars,
        scrollTrigger: {
          trigger: ref.current,
          start: motionTokens.scroll.startEarly,
          once,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
          onEnter: () => markRevealDone(ref.current),
          onRefresh(self) {
            if (once && self.progress > 0) {
              revealVisible(targets);
              markRevealDone(ref.current);
            }
          },
        },
      });

      if (isPastRevealStart(ref.current)) {
        tween.progress(1);
        revealVisible(targets);
        markRevealDone(ref.current);
      }
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
      className={cn("reveal-on-scroll", className)}
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

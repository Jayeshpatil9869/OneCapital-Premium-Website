import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/src/lib/motion";
import { cn } from "@/src/lib/utils";

gsap.registerPlugin(useGSAP);

type LetterSwapProps = {
  label: string;
  className?: string;
};

/** Staggered vertical letter roll. Plays when the parent link or button is hovered. */
export function LetterSwap({ label, className }: LetterSwapProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const root = rootRef.current;
    const host = root?.closest("a,button") ?? root?.parentElement;
    if (!root || !host) return;

    const tween = (hovered: boolean) => {
      const chars = root.querySelectorAll<HTMLElement>("[data-letter]");
      gsap.to(chars, {
        yPercent: hovered ? -100 : 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.02,
        overwrite: "auto",
      });
    };

    const enter = () => tween(true);
    const leave = () => tween(false);
    host.addEventListener("mouseenter", enter);
    host.addEventListener("mouseleave", leave);
    host.addEventListener("focus", enter);
    host.addEventListener("blur", leave);

    return () => {
      host.removeEventListener("mouseenter", enter);
      host.removeEventListener("mouseleave", leave);
      host.removeEventListener("focus", enter);
      host.removeEventListener("blur", leave);
    };
  }, { scope: rootRef });

  if (prefersReducedMotion()) {
    return <span className={className}>{label}</span>;
  }

  return (
    <span className={cn("inline-flex", className)}>
      <span className="sr-only">{label}</span>
      <span ref={rootRef} aria-hidden className="inline-flex select-none">
        {label.split("").map((letter, index) => {
          const glyph = letter === " " ? "\u00A0" : letter;
          return (
            <span key={`${letter}-${index}`} className="inline-block overflow-hidden align-bottom">
              <span data-letter className="relative block">
                <span className="block">{glyph}</span>
                <span className="absolute left-0 top-full block">{glyph}</span>
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}

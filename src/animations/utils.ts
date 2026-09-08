import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

let registered = false;

export function registerGsapPlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, Flip);
  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Default ease for premium editorial motion */
export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
  expoInOut: "expo.inOut",
  soft: "power2.out",
} as const;

export const DURATION = {
  fast: 0.45,
  base: 0.7,
  slow: 1.1,
} as const;

/** Split text into words (Club SplitText alternative — free) */
export function splitWords(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text);
  el.innerHTML = "";
  const words = text.split(/(\s+)/);
  const spans: HTMLSpanElement[] = [];

  for (const part of words) {
    if (/^\s+$/.test(part)) {
      el.appendChild(document.createTextNode(part));
      continue;
    }
    const wrap = document.createElement("span");
    wrap.className = "gsap-word inline-block overflow-hidden align-bottom";
    const inner = document.createElement("span");
    inner.className = "gsap-word-inner inline-block will-change-transform";
    inner.textContent = part;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    spans.push(inner);
  }

  el.setAttribute("aria-hidden", "true");
  return spans;
}

export function qsa<T extends Element = HTMLElement>(
  root: Element,
  selector: string
): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

export function qs<T extends Element = HTMLElement>(
  root: Element,
  selector: string
): T | null {
  return root.querySelector<T>(selector);
}

export { gsap, ScrollTrigger, Flip };

import { useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppDownloadFloatingWidget } from "../components/AppDownloadFloatingWidget";
import ChatWidget from "../components/chat/ChatWidget";
import { RiskFactorsStrip } from "../components/sections/legal/RiskFactorsStrip";
import { Preloader } from "@/src/components/Preloader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, PRELOADER_DONE_EVENT } from "@/src/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const LENIS_OPTIONS = {
  lerp: 0.14,
  wheelMultiplier: 0.95,
  smoothWheel: true,
  syncTouch: false,
  autoRaf: false,
} as const;

/** True desktop only: no touch, fine pointer, hover, ≥1024, motion OK. */
function computeDesktopSmoothScroll(): boolean {
  if (typeof window === "undefined") return false;

  const finePointer = window.matchMedia("(pointer: fine)");
  const canHover = window.matchMedia("(hover: hover)");
  const coarsePointer = window.matchMedia("(pointer: coarse)");
  const desktopWidth = window.matchMedia("(min-width: 1024px)");
  const hasTouch =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    coarsePointer.matches;

  return (
    !hasTouch &&
    finePointer.matches &&
    canHover.matches &&
    desktopWidth.matches &&
    !prefersReducedMotion()
  );
}

/**
 * Enable Lenis smooth scroll only on desktop (non-touch) devices.
 * Touch devices use native scroll to avoid preventDefault blocking.
 * Initial state is sync so Layout never remounts AppShell under ReactLenis
 * (false→true swap caused removeChild NotFoundError).
 */
function useDesktopSmoothScroll() {
  const [enabled, setEnabled] = useState(computeDesktopSmoothScroll);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const canHover = window.matchMedia("(hover: hover)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const desktopWidth = window.matchMedia("(min-width: 1024px)");

    const sync = () => setEnabled(computeDesktopSmoothScroll());

    sync();
    finePointer.addEventListener("change", sync);
    canHover.addEventListener("change", sync);
    coarsePointer.addEventListener("change", sync);
    desktopWidth.addEventListener("change", sync);

    return () => {
      finePointer.removeEventListener("change", sync);
      canHover.removeEventListener("change", sync);
      coarsePointer.removeEventListener("change", sync);
      desktopWidth.removeEventListener("change", sync);
    };
  }, []);

  return enabled;
}

/**
 * Keep Lenis tree mounted; start/stop so resize across 1024 never remounts shell.
 *
 * Critical: `lenis.stop()` adds `.lenis-stopped { overflow: hidden }` and
 * preventDefaults touch — fine during the preloader, fatal for native mobile
 * scroll. After unlock, touch/native mode must stay started (syncTouch: false
 * already leaves touch to the browser; ScrollTrigger proxy stays desktop-only).
 */
function LenisModeGate({ enabled }: { enabled: boolean }) {
  const lenis = useLenis();
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    const onDone = () => setPreloaderDone(true);
    window.addEventListener(PRELOADER_DONE_EVENT, onDone);
    // Only treat as done when the Preloader actually handed off — never when
    // another component stripped `oc-preloader-lock` early.
    if (document.documentElement.classList.contains("oc-shell-reveal")) {
      setPreloaderDone(true);
    }
    return () => window.removeEventListener(PRELOADER_DONE_EVENT, onDone);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.remove("oc-native-scroll");
    } else {
      root.classList.add("oc-native-scroll");
    }
    return () => root.classList.remove("oc-native-scroll");
  }, [enabled]);

  useEffect(() => {
    if (!lenis) return;
    if (!preloaderDone) {
      lenis.stop();
      return;
    }
    // Never leave `.lenis-stopped` after unlock (overflow:hidden + touch block).
    // Mutate options in place — swapping ReactLenis `options` remounts the shell.
    lenis.options.smoothWheel = enabled;
    lenis.options.syncTouch = false;
    lenis.start();
  }, [lenis, enabled, preloaderDone]);

  // Defer ScrollTrigger proxy until intro unlock — avoids removeChild vs GSAP.
  if (!enabled || !preloaderDone) return null;
  return <LenisScrollSync />;
}

function LenisScrollSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    let stTick = false;
    const onScroll = () => {
      if (stTick) return;
      stTick = true;
      requestAnimationFrame(() => {
        stTick = false;
        ScrollTrigger.update();
      });
    };
    lenis.on("scroll", onScroll);

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(ticker);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    };
  }, [lenis]);

  return null;
}

function resetScrollTop(lenis: ReturnType<typeof useLenis>) {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  }
  window.scrollTo(0, 0);
}

function RouteScrollReset() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      let nextPathname = "";
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        nextPathname = url.pathname;
        if (url.hash && nextPathname === window.location.pathname) return;
      } catch {
        return;
      }

      if (nextPathname === window.location.pathname) return;

      resetScrollTop(lenis);
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, [lenis]);

  useEffect(() => {
    const onPreloaderDone = () => {
      // LenisModeGate owns start/stop; only clear leftover inline locks + refresh.
      document.documentElement.classList.remove("oc-preloader-lock", "oc-shell-intro");
      document.documentElement.classList.add("oc-shell-reveal");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      resetScrollTop(lenis);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    window.addEventListener(PRELOADER_DONE_EVENT, onPreloaderDone);
    return () => window.removeEventListener(PRELOADER_DONE_EVENT, onPreloaderDone);
  }, [lenis]);

  useLayoutEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, { offset: -100 });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 150);
      return () => clearTimeout(timer);
    }

    resetScrollTop(lenis);
    ScrollTrigger.refresh();
  }, [pathname, hash, lenis]);

  return null;
}

function AppShell({ children }: { children?: ReactNode }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isTeam = pathname === "/team";

  return (
    <>
      <RouteScrollReset />
      <div
        className={`oc-shell flex flex-col min-h-dvh w-full max-w-full overflow-x-clip bg-canvas${isHome ? " is-home" : ""}${isTeam ? " is-team" : ""}`}
      >
        <Navbar />
        <main className="grow min-w-0">
          <Outlet />
        </main>
        <Footer />
        <RiskFactorsStrip />
        <div className="fixed z-[var(--z-toast)] bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] flex flex-col items-end gap-5 pointer-events-none">
          <div className="pointer-events-auto">
            <ChatWidget embedded />
          </div>
          <div className="pointer-events-auto hidden md:block">
            <AppDownloadFloatingWidget embedded />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

export default function Layout() {
  const desktopSmoothScroll = useDesktopSmoothScroll();
  // Stable options identity — mutating smoothWheel remounted Lenis internals.
  const options = useMemo(() => ({ ...LENIS_OPTIONS }), []);

  // Preloader stays OUTSIDE ReactLenis — GSAP intro + Lenis root wrapper
  // otherwise race into removeChild NotFoundError on teardown.
  return (
    <>
      <Preloader />
      <ReactLenis root options={options}>
        <LenisModeGate enabled={desktopSmoothScroll} />
        <AppShell />
      </ReactLenis>
    </>
  );
}

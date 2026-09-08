import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppDownloadFloatingWidget } from "../components/AppDownloadFloatingWidget";
import ChatWidget from "../components/chat/ChatWidget";
import { RiskFactorsStrip } from "../components/sections/legal/RiskFactorsStrip";
import { CustomCursor } from "../components/motion/CustomCursor";
import { Preloader } from "@/src/components/Preloader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, PRELOADER_DONE_EVENT } from "@/src/lib/motion";

gsap.registerPlugin(ScrollTrigger);

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

    // #region agent log
    let stUpdateCount = 0;
    let stUpdateMs = 0;
    let lenisScrollCount = 0;
    let lastFrameTs = performance.now();
    let longFrames = 0;
    let frameSamples = 0;
    let frameDeltaSum = 0;
    let reportTimer: ReturnType<typeof setInterval> | null = null;
    const dbg = (
      hypothesisId: string,
      message: string,
      data: Record<string, unknown>,
    ) => {
      fetch("http://127.0.0.1:7812/ingest/e76c3227-8d93-41d7-972e-fde2a2da0b74", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "1bbe61",
        },
        body: JSON.stringify({
          sessionId: "1bbe61",
          runId: "post-fix",
          hypothesisId,
          location: "Layout.tsx:LenisScrollSync",
          message,
          data,
          timestamp: Date.now(),
        }),
      }).catch(() => {});
    };
    dbg("C", "lenis-sync-init", {
      stCount: ScrollTrigger.getAll().length,
      lerp: 0.14,
      autoRaf: false,
      lagSmoothing: 0,
    });
    // #endregion

    // Coalesce ST updates to one per frame — Lenis can emit many scroll events per raf.
    let stTick = false;
    const onScroll = () => {
      // #region agent log
      lenisScrollCount += 1;
      // #endregion
      if (stTick) return;
      stTick = true;
      requestAnimationFrame(() => {
        stTick = false;
        // #region agent log
        const t0 = performance.now();
        // #endregion
        ScrollTrigger.update();
        // #region agent log
        const dt = performance.now() - t0;
        stUpdateCount += 1;
        stUpdateMs += dt;
        // #endregion
      });
    };
    lenis.on("scroll", onScroll);

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const ticker = (time: number) => {
      // #region agent log
      const now = performance.now();
      const frameDelta = now - lastFrameTs;
      lastFrameTs = now;
      if (frameSamples > 0) {
        frameDeltaSum += frameDelta;
        if (frameDelta > 24) longFrames += 1;
      }
      frameSamples += 1;
      // #endregion
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    // #region agent log
    reportTimer = setInterval(() => {
      if (lenisScrollCount === 0 && stUpdateCount === 0) return;
      const avgFrame =
        frameSamples > 1 ? frameDeltaSum / (frameSamples - 1) : 0;
      dbg("A", "scroll-perf-sample", {
        lenisScrollCount,
        stUpdateCount,
        stUpdateAvgMs:
          stUpdateCount > 0 ? +(stUpdateMs / stUpdateCount).toFixed(3) : 0,
        stUpdateTotalMs: +stUpdateMs.toFixed(2),
        stCount: ScrollTrigger.getAll().length,
        avgFrameMs: +avgFrame.toFixed(2),
        longFrames24ms: longFrames,
        approxFps: avgFrame > 0 ? +(1000 / avgFrame).toFixed(1) : 0,
        velocity: lenis.velocity,
        scroll: lenis.scroll,
      });
      lenisScrollCount = 0;
      stUpdateCount = 0;
      stUpdateMs = 0;
      longFrames = 0;
      frameSamples = 0;
      frameDeltaSum = 0;
    }, 1000);
    // #endregion

    return () => {
      // #region agent log
      if (reportTimer) clearInterval(reportTimer);
      // #endregion
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

/**
 * Keeps Lenis + ScrollTrigger in sync on SPA navigations.
 * Must render under ReactLenis so useLenis() resolves.
 */
function RouteScrollReset() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Reset before React swaps pages — layout effect alone is too late.
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

  // After preloader handoff (refresh while mid-page), force top + ST refresh.
  useEffect(() => {
    const onPreloaderDone = () => {
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

export default function Layout() {
  return (
    <ReactLenis
      root
      options={{
        // Higher lerp = snappier scroll (0.08 felt laggy behind the wheel).
        lerp: 0.14,
        wheelMultiplier: 0.95,
        smoothWheel: !prefersReducedMotion(),
        syncTouch: false,
        autoRaf: false,
      }}
    >
      <LenisScrollSync />
      <RouteScrollReset />
      <Preloader />
      <div className="oc-shell flex flex-col min-h-dvh w-full max-w-full overflow-x-hidden bg-canvas">
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
        <CustomCursor />
      </div>
    </ReactLenis>
  );
}

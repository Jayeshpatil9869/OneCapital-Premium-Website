import { useEffect } from "react";
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
import { prefersReducedMotion } from "@/src/lib/motion";

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

    const onScroll = () => ScrollTrigger.update();
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

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        smoothWheel: !prefersReducedMotion(),
        syncTouch: false,
        autoRaf: false,
      }}
    >
      <LenisScrollSync />
      <Preloader enabled={pathname === "/"} />
      <div className="oc-shell flex flex-col min-h-dvh w-full max-w-full overflow-x-hidden bg-canvas">
        <Navbar />
        <main className="grow min-w-0">
          <Outlet />
        </main>
        <Footer />
        {pathname === '/' && <RiskFactorsStrip />}
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

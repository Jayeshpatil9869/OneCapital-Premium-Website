import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(ticker);
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
        {pathname === "/" && <RiskFactorsStrip />}
        <ChatWidget />
        <CustomCursor />
      </div>
    </ReactLenis>
  );
}

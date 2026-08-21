import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/src/lib/motion';

gsap.registerPlugin(ScrollTrigger);

function LenisScrollSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onScroll);
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
      <div className="flex flex-col min-h-dvh bg-canvas">
        <Navbar />
        <main className="flex-grow min-w-0">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}

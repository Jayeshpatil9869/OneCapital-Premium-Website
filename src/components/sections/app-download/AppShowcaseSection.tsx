import { CheckCircle2, Smartphone } from 'lucide-react';
import { Button, Container, Surface } from '@/src/components/ui';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Noise } from '@/src/components/effects/Atmosphere';
import { AppDownloadStoreButtons } from '@/src/components/AppDownloadStoreButtons';
import { cn } from '@/src/lib/utils';

export function AppShowcaseSection({ className }: { className?: string }) {
  return (
    <section className={cn('w-full px-[var(--page-gutter)] py-12 md:py-20', className)}>
      <RevealOnScroll>
        <Container>
          <Surface className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2.25rem] border border-white/10 bg-[#080808] p-8 sm:p-12 lg:p-16 shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
            <Noise />

            {/* Ambient glows — hidden on mobile; large blurs repaint poorly during scroll */}
            <div className="pointer-events-none absolute -right-20 -top-20 hidden h-96 w-96 rounded-full bg-white/[0.03] blur-[120px] md:block" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 hidden h-96 w-96 rounded-full bg-white/[0.02] blur-[120px] md:block" />
            
            {/* Top Border Specular White Highlight Line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              {/* Left Column: Pure Black & White Text & Features */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Monochrome Eyebrow */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  OneCapital Mobile OS
                </div>

                {/* Pure White Heading */}
                <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                  Your wealth, in your pocket.
                </h2>

                <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed font-light max-w-xl">
                  Download the OneCapital app to track your portfolio in real-time, get actionable insights, and speak directly with your relationship manager.
                </p>

                {/* Feature Checklist */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-xl">
                  {[
                    'Real-time portfolio tracking',
                    'Instant Wealth Monitor health checks',
                    'Direct access to your RM',
                    'Secure 256-bit encryption',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm md:text-base text-white/90 font-medium">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Button
                    to="/contact"
                    variant="primary"
                    size="lg"
                    arrow="right"
                    className="font-semibold uppercase tracking-wider px-7"
                  >
                    Get the App link
                  </Button>

                  <div className="flex items-center gap-3 sm:pl-4 sm:border-l sm:border-white/10 pt-2 sm:pt-0">
                    <AppDownloadStoreButtons />
                  </div>
                </div>
              </div>

              {/* Right Column: Monochrome Phone Mockup */}
              <div className="lg:col-span-5 flex justify-center w-full">
                <div className="relative w-full max-w-[21rem] rounded-[2.25rem] border border-white/15 bg-black/90 p-6 shadow-2xl md:backdrop-blur-xl group hover:border-white/25 transition-all duration-500">
                  {/* Phone Notch Pill */}
                  <div className="mx-auto -mt-2 mb-6 flex h-4 w-28 items-center justify-center rounded-b-xl border-x border-b border-white/10 bg-black">
                    <div className="h-1 w-8 rounded-full bg-white/20" />
                  </div>

                  {/* Top Phone Icon & Label */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70">
                      <Smartphone className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                      OneCapital OS
                    </span>
                  </div>

                  {/* Portfolio Card */}
                  <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-white/40">
                      Portfolio Value
                    </p>
                    <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-2xl font-bold tracking-tight text-white tabular-nums whitespace-nowrap">
                        ₹1.24 Cr
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] md:text-xs font-medium text-white whitespace-nowrap">
                        +2.4% today
                      </span>
                    </div>
                  </div>

                  {/* QR Card */}
                  <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">
                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black p-2.5 shadow-xl">
                      <img
                        src="/images/app-download-qr.png"
                        alt="Scan QR code"
                        width={128}
                        height={128}
                        className="h-32 w-32 object-cover invert rounded-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="rounded bg-black px-1.5 py-0.5 ring-1 ring-white/10 shadow">
                          <img
                            src="/brand/logo-mark-white.png"
                            alt="OneCapital"
                            width={16}
                            height={16}
                            className="h-4 w-4 object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-xs font-medium leading-relaxed text-white/60">
                      Scan to download the <br />
                      OneCapital App
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Surface>
        </Container>
      </RevealOnScroll>
    </section>
  );
}

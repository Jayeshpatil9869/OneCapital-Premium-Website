import { CheckCircle2, Smartphone } from "lucide-react";
import qrCodeUrl from "@/qr-code.svg";
import { Button, Container, Surface } from "@/src/components/ui";
import { RevealOnScroll } from "@/src/components/motion/RevealOnScroll";
import { AppDownloadStoreButtons } from "@/src/components/AppDownloadStoreButtons";
import { cn } from "@/src/lib/utils";

export function AppShowcaseSection({ className }: { className?: string }) {
  return (
    <section
      className={cn("w-full px-[var(--page-gutter)] py-12 md:py-20", className)}
    >
      <RevealOnScroll>
        <Container>
          <Surface
            variant="plain"
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#121212] p-8 text-white shadow-[0_24px_70px_rgba(0,0,0,0.5)] sm:p-12 md:rounded-[2.25rem] lg:p-16"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                  Your entire wealth universe, on one screen.
                </h2>

                <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed font-light max-w-xl">
                  Track Demat equity holdings, Mutual Funds, and capital gains in real-time. Direct access to your portfolio manager with bank-grade 256-bit encryption.
                </p>

                {/* Feature Checklist */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-xl">
                  {[
                    "Live Demat & Mutual Fund sync",
                    "Instant XIRR & benchmark tracking",
                    "1-Click Capital Gains for ITR",
                    "Direct Portfolio Manager messaging",
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-sm md:text-base text-white font-medium"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.08] border border-white/15 text-white shrink-0">
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
                    className="bg-white text-black font-semibold uppercase tracking-wider px-7 hover:bg-white/90"
                  >
                    Get the App link
                  </Button>

                  <div className="flex items-center gap-3 sm:pl-4 sm:border-l sm:border-white/10 pt-2 sm:pt-0">
                    <AppDownloadStoreButtons tone="dark" />
                  </div>
                </div>
              </div>

              {/* Right Column: Monochrome Phone Mockup */}
              <div className="lg:col-span-5 flex justify-center w-full">
                <div className="relative w-full max-w-[21rem] rounded-[2.25rem] border border-white/10 bg-[#18181b] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-colors duration-500 hover:border-white/20">
                  <div className="mx-auto -mt-2 mb-6 flex h-4 w-28 items-center justify-center rounded-b-xl border-x border-b border-white/10 bg-[#222226]">
                    <div className="h-1 w-8 rounded-full bg-white/25" />
                  </div>

                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70">
                      <Smartphone className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-white/45">
                      One Capital OS
                    </span>
                  </div>

                  <div className="mb-5 rounded-2xl border border-white/10 bg-[#121212] p-4">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-white/45">
                      Portfolio Value
                    </p>
                    <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-2xl font-bold tracking-tight text-white tabular-nums whitespace-nowrap">
                        ₹1.24 Cr
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-[10px] md:text-xs font-medium text-white whitespace-nowrap">
                        +2.4% today
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#121212] p-5 text-center">
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-white p-2.5">
                      <img
                        src={qrCodeUrl}
                        alt="Scan QR code"
                        width={128}
                        height={128}
                        loading="lazy"
                        decoding="async"
                        className="h-32 w-32 object-contain rounded-lg"
                      />
                    </div>

                    <p className="mt-3 text-xs font-medium leading-relaxed text-white/60">
                      Scan to download the <br />
                      One Capital App
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

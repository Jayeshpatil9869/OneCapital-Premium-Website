import { Button, Container, Surface } from "@/src/components/ui";
import { RevealOnScroll } from "@/src/components/motion/RevealOnScroll";
import { AppDownloadStoreButtons } from "@/src/components/AppDownloadStoreButtons";
import { HOME_SEO } from "@/src/data/home-seo";
import { cn } from "@/src/lib/utils";

export function AppShowcaseSection({ className }: { className?: string }) {
  return (
    <section
      className={cn("w-full px-[var(--page-gutter)] py-10 sm:py-16 md:py-20", className)}
    >
      <RevealOnScroll>
        <Container>
          <Surface
            variant="plain"
            className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.25rem] border border-white/10 bg-[#121212] p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 text-white shadow-[0_24px_70px_rgba(0,0,0,0.5)]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-8 lg:gap-14 xl:gap-16 items-center">
              {/* Left Column: Headline, Copy, and Actions */}
              <div className="md:col-span-7 flex flex-col items-start text-left justify-center">
                <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-white leading-[1.18] sm:leading-[1.15]">
                  Your wealth, managed with purpose.
                </h2>

                <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-base lg:text-lg text-white/70 leading-relaxed font-light max-w-xl">
                  A thoughtful approach to your investments, helping you understand your portfolio, track your returns, and stay focused on your financial goals.
                </p>

                {/* CTAs */}
                <div className="mt-7 sm:mt-8 md:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                  <Button
                    to="/contact"
                    variant="primary"
                    size="lg"
                    arrow="up-right"
                    className="w-full sm:w-auto justify-center font-semibold uppercase tracking-wider px-6 sm:px-7 text-xs sm:text-sm"
                  >
                    {HOME_SEO.cta}
                  </Button>

                  <div className="flex items-center gap-3 pl-1 sm:pl-4 sm:border-l sm:border-white/10 pt-1 sm:pt-0">
                    <AppDownloadStoreButtons tone="dark" />
                  </div>
                </div>
              </div>

              {/* Right Column: Real Mobile App Mockup */}
              <div className="md:col-span-5 flex justify-center items-center w-full pt-4 md:pt-0">
                <div className="relative mx-auto flex items-center justify-center">
                  {/* Subtle soft backdrop glow */}
                  <div className="pointer-events-none absolute -inset-6 rounded-full bg-white/[0.04] blur-2xl sm:blur-3xl" />

                  <img
                    src="/images/one-capital-mobile-app-mockup.png"
                    alt="One Capital Mobile App Mockup"
                    width={520}
                    height={1005}
                    loading="lazy"
                    decoding="async"
                    className="relative z-10 w-auto max-w-[175px] xs:max-w-[195px] sm:max-w-[215px] md:max-w-[220px] lg:max-w-[245px] xl:max-w-[260px] max-h-[360px] xs:max-h-[390px] sm:max-h-[420px] lg:max-h-[460px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </Surface>
        </Container>
      </RevealOnScroll>
    </section>
  );
}

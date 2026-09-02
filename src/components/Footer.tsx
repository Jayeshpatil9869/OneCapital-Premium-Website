import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { Button } from "@/src/components/ui";
import { AppDownloadCard } from "./AppDownloadCard";
import { SocialLinks } from "./SocialLinks";
import { LightSweepText } from "./motion/LightSweepText";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 pt-16 md:pt-20 pb-[max(2.5rem,env(safe-area-inset-bottom))] mt-8 md:mt-32 px-[var(--page-gutter)] relative overflow-hidden min-w-0">
      {/* Decorative large bg text — desktop/tablet */}
      <div
        aria-hidden
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white/[0.02] pointer-events-none whitespace-nowrap tracking-tighter mix-blend-screen z-0"
      >
        ONECAPITAL
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-8 md:mb-20 relative z-10">
        {/* Brand */}
        <div className="flex flex-col gap-6 lg:pr-8">
          <BrandLogo className="text-white w-fit" markClassName="h-9 w-9" />
          <p className="text-text-muted text-sm leading-relaxed max-w-sm text-balance">
            A sophisticated wealth-management partner helping clients
            understand, build, manage and preserve wealth over the long term.
          </p>
          <SocialLinks className="mt-2" />
        </div>

        <div className="grid grid-cols-2 gap-8 lg:contents">
          {/* Strategies */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-wider font-mono text-text-muted mb-2">
              Strategies
            </h4>
            {[
              { name: "Capital Strategy", path: "/solutions#capital-strategy" },
              { name: "Portfolio Management", path: "/solutions#portfolio-management" },
              { name: "Risk & Wealth Architecture", path: "/solutions#risk-wealth-architecture" },
              { name: "Intelligence & Oversight", path: "/solutions#intelligence-oversight" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-white/80 hover:text-white transition-colors inline-flex items-center group w-fit"
              >
                {item.name}
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-wider font-mono text-text-muted mb-2">
              Company
            </h4>
            {[
              { name: "About", path: "/about" },
              { name: "Our Approach", path: "/approach" },
              { name: "Team", path: "/team" },
              { name: "Insights", path: "/insights" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm text-white/80 hover:text-white transition-colors inline-flex items-center group w-fit"
              >
                {item.name}
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>

        {/* Contact/CTA */}
        <div className="flex flex-col gap-6">
          <h4 className="text-xs uppercase tracking-wider font-mono text-text-muted mb-2">
            Start a Conversation
          </h4>
          <p className="text-sm text-text-muted">
            Reach out to our advisory team to discuss your portfolio and
            long-term vision.
          </p>
          <Button
            to="/contact"
            variant="secondary"
            arrow="up-right"
            className="w-full rounded-xl justify-between px-6 py-4 min-h-14 [&_.oc-btn-label]:w-full [&_.oc-btn-label]:justify-between"
          >
            Book Consultation
          </Button>
          <AppDownloadCard />
        </div>
      </div>

      {/* Mobile-only brand watermark — below CTA, above copyright */}
      <LightSweepText
        className="md:hidden relative z-10 text-center text-[13vw] font-bold tracking-tighter leading-none py-3 select-none pointer-events-none whitespace-nowrap overflow-hidden"
        duration={6}
      >
        ONECAPITAL
      </LightSweepText>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 relative z-10">
        <p className="text-xs text-text-muted font-mono tracking-wide">
          © {new Date().getFullYear()} OneCapital. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-6 justify-center">
          {[
            "Privacy Policy",
            "Terms of Service",
            "Regulatory Disclosure",
            "Risk Disclosure",
          ].map((item) => (
            <span
              key={item}
              className="relative group text-xs text-text-muted hover:text-white transition-colors inline-flex items-center cursor-default"
            >
              {item}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-50" />
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

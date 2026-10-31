import { Link } from "react-router-dom";
import { RevealOnScroll } from "@/src/components/motion/RevealOnScroll";
import BrandLogo from "./BrandLogo";
import { Button } from "@/src/components/ui";
import { AppDownloadCard } from "./AppDownloadCard";
import { SocialLinks } from "./SocialLinks";
import { COMPANY } from "@/src/data/company";
import { getOfferTree } from "@/src/data/products";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 pt-16 md:pt-20 pb-[max(2.5rem,env(safe-area-inset-bottom))] mt-0 px-[var(--page-gutter)] relative overflow-hidden min-w-0">
      {/* Decorative large bg text — desktop/tablet */}
      <div
        aria-hidden
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white/[0.02] pointer-events-none whitespace-nowrap tracking-tighter mix-blend-screen z-0"
      >
        One Capital
      </div>

      <RevealOnScroll className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-8 md:mb-20 relative z-10">
        {/* Brand */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left gap-6 lg:pr-8">
          <BrandLogo className="text-white w-fit" markClassName="h-9 w-9" />
          <p className="text-text-muted text-base leading-relaxed max-w-sm text-balance">
            {COMPANY.tagline}
          </p>
          <SocialLinks className="mt-2 justify-center md:justify-start" />
          <AppDownloadCard className="mt-2 hidden w-full max-w-sm md:block" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:contents">
          {/* Strategies */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4">
            <h4 className="text-sm uppercase tracking-wider font-mono text-text-muted mb-2">
              Strategies
            </h4>
            {getOfferTree()
              .filter((node) => node.children.length > 0)
              .map((node) => (
                <div key={node.product.id} className="flex flex-col items-center md:items-start gap-2">
                  <Link
                    to={node.product.path}
                    className="text-base text-white/80 hover:text-white transition-colors w-fit"
                  >
                    {node.product.navLabel}
                  </Link>
                  <ul className="flex flex-col items-center md:items-start gap-2.5 md:border-l md:border-white/10 md:pl-3">
                    {node.children.map((child) => (
                      <li key={child.path ?? `${node.product.id}-${child.name}`}>
                        {child.path ? (
                          <Link
                            to={child.path}
                            className="text-[15px] text-white/60 hover:text-white transition-colors w-fit"
                          >
                            {child.name}
                          </Link>
                        ) : (
                          <span className="text-[15px] text-white/60 w-fit">
                            {child.name}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            <Link
              to="/calculators"
              className="text-base text-white/80 hover:text-white transition-colors w-fit"
            >
              Calculators
            </Link>
          </div>

          {/* Company */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4">
            <h4 className="text-sm uppercase tracking-wider font-mono text-text-muted mb-2">
              Company
            </h4>
            {[
              { name: "About", path: "/about" },
              { name: "Our Approach", path: "/approach" },
              { name: "Team", path: "/team" },
              { name: "Insights", path: "/insights" },
              { name: "Blog", path: "/blog" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-base text-white/80 hover:text-white transition-colors w-fit"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact/CTA */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left gap-5">
          <h4 className="text-sm uppercase tracking-wider font-mono text-text-muted">
            Connect with Us
          </h4>
          <div className="flex flex-col items-center md:items-start gap-2.5 text-base text-white/70">
            <a
              href={COMPANY.phoneHref}
              className="tabular-nums hover:text-white transition-colors w-fit"
            >
              {COMPANY.phone}
            </a>
            <p className="text-text-muted leading-relaxed">
              {COMPANY.hqStreet}
              <br />
              {COMPANY.hqCity} {COMPANY.hqPostalCode}
            </p>
            <p className="text-xs font-mono text-white/45 leading-relaxed tracking-wide">
              GSTIN {COMPANY.gstin}
              <br />
              CIN {COMPANY.cin}
            </p>
          </div>
          <Button
            to="/contact"
            variant="primary"
            arrow="up-right"
            className="w-full max-w-sm rounded-xl justify-between px-6 py-4 min-h-14 [&_.oc-btn-label]:w-full [&_.oc-btn-label]:justify-between"
          >
            Book Consultation
          </Button>
          <AppDownloadCard className="w-full max-w-sm md:hidden" />
        </div>
      </RevealOnScroll>

      {/* Mobile-only brand watermark — below CTA, above copyright */}
      <div className="md:hidden relative z-10 w-full flex justify-center items-center py-5 my-2">
        <p className="w-full max-w-md mx-auto px-1 text-center text-3xl font-bold tracking-tighter text-white/15">
          One Capital
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 relative z-10">
        <p className="text-sm text-text-muted font-mono tracking-wide">
          © {new Date().getFullYear()} {COMPANY.legalName}
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
              className="text-sm text-text-muted hover:text-white transition-colors cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { cn } from "../lib/utils";
import {
  gsap,
  isMobileViewport,
  motionTokens,
  prefersReducedMotion,
} from "../lib/motion";
import BrandLogo from "./BrandLogo";
import { Button } from "@/src/components/ui";

gsap.registerPlugin(useGSAP);

type NavChild = {
  name: string;
  path: string;
};

type NavItem =
  | { kind: "link"; name: string; path: string }
  | { kind: "dropdown"; name: string; label: string; path?: string; children: NavChild[] };

const NAV_ITEMS: NavItem[] = [
  { kind: "link", name: "Home", path: "/" },
  {
    kind: "dropdown",
    name: "About",
    label: "About Us",
    path: "/about",
    children: [
      { name: "About One Capital", path: "/about" },
      { name: "Our Team", path: "/team" },
      { name: "Our Approach", path: "/approach" },
    ],
  },
  {
    kind: "dropdown",
    name: "Solutions",
    label: "Solutions",
    path: "/solutions",
    children: [
      { name: "Capital Strategy", path: "/solutions#capital-strategy" },
      { name: "Portfolio Management", path: "/solutions#portfolio-management" },
      { name: "Risk & Wealth Architecture", path: "/solutions#risk-wealth-architecture" },
      { name: "Intelligence & Oversight", path: "/solutions#intelligence-oversight" },
    ],
  },
  {
    kind: "dropdown",
    name: "Insights",
    label: "Insights",
    path: "/insights",
    children: [
      { name: "Blog", path: "/insights" },
      { name: "Newsletter", path: "/insights" },
    ],
  },
  { kind: "link", name: "Contact Us", path: "/contact" },
];

const SURFACE_GLASS = {
  backgroundColor: "rgba(255, 255, 255, 0.02)",
  borderColor: "rgba(255, 255, 255, 0.1)",
} as const;

const SURFACE_OVER_LIGHT = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  borderColor: "rgba(255, 255, 255, 0.1)",
} as const;

const SURFACE_TOP = {
  backgroundColor: "rgba(0, 0, 0, 0.95)",
  borderColor: "rgba(255, 255, 255, 0.1)",
} as const;

function surfaceVars(
  kind: "pill" | "dropdown",
  showPill: boolean,
  overLight: boolean,
) {
  if (kind === "pill" && !showPill) {
    return { opacity: 0, ...SURFACE_GLASS };
  }
  if (!showPill) {
    return { opacity: 1, ...SURFACE_TOP };
  }
  if (overLight) {
    return { opacity: 1, ...SURFACE_OVER_LIGHT };
  }
  return { opacity: 1, ...SURFACE_GLASS };
}

function pathMatchesItem(pathname: string, item: NavItem): boolean {
  if (item.kind === "link") {
    return pathname === item.path;
  }
  return item.children.some((child) => {
    const basePath = child.path.split("#")[0];
    return pathname === child.path || (basePath.length > 1 && pathname === basePath);
  });
}

function NavLinkStyles(active: boolean, overLight: boolean) {
  if (overLight) {
    return active ? "text-white" : "text-white/70 hover:text-white";
  }
  return active ? "text-white" : "text-text-muted hover:text-white";
}

function DesktopDropdown({
  item,
  overLight,
  showPill,
  pathname,
  openId,
  setOpenId,
}: {
  item: Extract<NavItem, { kind: "dropdown" }>;
  overLight: boolean;
  showPill: boolean;
  pathname: string;
  openId: string | null;
  setOpenId: (id: string | null) => void;
}) {
  const active = pathMatchesItem(pathname, item);
  const open = openId === item.name;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = () => {
    clearClose();
    setOpenId(item.name);
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpenId(null), 150);
  };

  useEffect(() => () => clearClose(), []);

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocusCapture={openMenu}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setOpenId(null);
        }
      }}
    >
      {item.path ? (
        <Link
          to={item.path}
          aria-expanded={open}
          aria-haspopup="true"
          onClick={() => setOpenId(null)}
          className={cn(
            "text-sm tracking-wide transition-colors relative min-h-11 inline-flex items-center gap-1",
            NavLinkStyles(active, overLight),
          )}
        >
          {item.label}
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-300",
              open && "rotate-180",
            )}
            aria-hidden
          />
          {active && (
            <span className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-white opacity-50" />
          )}
        </Link>
      ) : (
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          className={cn(
            "text-sm tracking-wide transition-colors relative min-h-11 inline-flex items-center gap-1",
            NavLinkStyles(active, overLight),
          )}
        >
          {item.label}
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-300",
              open && "rotate-180",
            )}
            aria-hidden
          />
          {active && (
            <span className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-white opacity-50" />
          )}
        </button>
      )}

      <div
        className={cn(
          "absolute top-full left-0 right-0 flex justify-center pt-3 z-[var(--z-overlay)]",
          open ? "visible pointer-events-auto" : "invisible pointer-events-none",
        )}
      >
        <div
          data-nav-surface="dropdown"
          className={cn(
            "min-w-[17rem] rounded-2xl p-3 border backdrop-blur-xl",
            showPill ? "shadow-lg" : "shadow-2xl",
          )}
          role="menu"
          aria-label={item.label}
        >
          <ul className="flex flex-col gap-0.5">
            {item.children.map((child) => {
              const childActive = pathname === child.path;
              return (
                <li key={child.name}>
                  <Link
                    to={child.path}
                    role="menuitem"
                    className="group/item block px-3 py-2.5 transition-colors"
                  >
                    <span
                      className={cn(
                        "relative inline-block text-sm font-medium tracking-tight transition-colors",
                        childActive
                          ? "text-white"
                          : "text-white/90 group-hover/item:text-white",
                      )}
                    >
                      {child.name}
                      {childActive && (
                        <span className="absolute -bottom-1 left-0 w-full h-px bg-white opacity-50" />
                      )}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 opacity-0 group-hover/item:w-full group-hover/item:opacity-50" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [overLight, setOverLight] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopOpenId, setDesktopOpenId] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const updateNavState = () => {
      setScrolled(window.scrollY > 50);

      const probeY = 48;
      const lightSections = document.querySelectorAll(".light-section");
      let isOverLight = false;
      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          isOverLight = true;
        }
      });
      setOverLight(isOverLight);
    };

    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });
    window.addEventListener("resize", updateNavState);
    return () => {
      window.removeEventListener("scroll", updateNavState);
      window.removeEventListener("resize", updateNavState);
    };
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDesktopOpenId(null);
    setMobileAccordion(null);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [mobileMenuOpen, lenis]);

  useEffect(() => {
    if (!mobileMenuOpen && !desktopOpenId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setDesktopOpenId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen, desktopOpenId]);

  const showPill = scrolled || overLight;
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = headerRef.current;
      if (!root) return;

      const duration = prefersReducedMotion() ? 0 : motionTokens.duration.normal;
      const ease = motionTokens.ease.smooth;
      const pill = root.querySelector<HTMLElement>('[data-nav-surface="pill"]');
      const menus = root.querySelectorAll<HTMLElement>(
        '[data-nav-surface="dropdown"]',
      );

      if (pill) {
        const vars = surfaceVars("pill", showPill, overLight);
        const pillVars =
          isMobileViewport() && showPill
            ? {
                ...vars,
                backgroundColor: overLight
                  ? SURFACE_OVER_LIGHT.backgroundColor
                  : "rgba(0, 0, 0, 0.72)",
              }
            : vars;
        gsap.to(pill, {
          ...pillVars,
          duration,
          ease,
          overwrite: "auto",
        });
      }

      menus.forEach((menu) => {
        gsap.to(menu, {
          ...surfaceVars("dropdown", showPill, overLight),
          duration,
          ease,
          overwrite: "auto",
        });
      });
    },
    { dependencies: [showPill, overLight, desktopOpenId], scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 inset-x-0 z-[var(--z-nav)] transition-all duration-500 pt-[env(safe-area-inset-top)]",
        scrolled || overLight ? "py-4" : "py-6",
      )}
    >
      <div className="relative z-[var(--z-modal)] mx-auto max-w-[var(--container-max)] px-[var(--page-gutter)]">
        <div
          className={cn(
            "relative flex items-center justify-between transition-all duration-500",
            showPill ? "px-4 sm:px-6 py-3" : "px-0 py-2",
          )}
        >
          <div
            data-nav-surface="pill"
            data-nav-pill-active={showPill ? "true" : undefined}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full border border-white/10 bg-white/[0.02] lg:backdrop-blur-xl opacity-0"
          />

          <BrandLogo
            className={cn(
              "relative z-[1] transition-colors duration-500",
              overLight ? "text-white" : "text-text-main",
            )}
          />

          <nav
            className="relative z-[1] hidden lg:flex items-center gap-8"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) => {
              if (item.kind === "dropdown") {
                return (
                  <DesktopDropdown
                    key={item.name}
                    item={item}
                    overLight={overLight}
                    showPill={showPill}
                    pathname={location.pathname}
                    openId={desktopOpenId}
                    setOpenId={setDesktopOpenId}
                  />
                );
              }

              const active = pathMatchesItem(location.pathname, item);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "text-sm tracking-wide transition-colors relative group min-h-11 inline-flex items-center",
                    NavLinkStyles(active, overLight),
                  )}
                >
                  {item.name}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-white opacity-50" />
                  )}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-50" />
                </Link>
              );
            })}
          </nav>

          <div className="relative z-[1] flex items-center gap-2 sm:gap-3">
            <Button
              to="/contact"
              variant="secondary"
              size="sm"
              arrow="up-right"
              className="hidden md:inline-flex text-xs tracking-wider font-medium"
            >
              Book Consultation
            </Button>
            <Button
              to="/contact"
              variant="outline"
              size="sm"
              className={cn(
                "hidden md:inline-flex text-xs tracking-wider font-medium",
                overLight ? "text-white" : "text-white/80",
              )}
            >
              Login
            </Button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative inline-flex items-center justify-center min-h-11 min-w-11 text-white transition-colors hover:text-white/80"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileMenuOpen}
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-0 z-[var(--z-overlay)] bg-canvas transition-all duration-500 lg:hidden flex flex-col overflow-y-auto overscroll-contain px-[var(--page-gutter)] pt-[calc(env(safe-area-inset-top)+4.25rem)] pb-[max(1.5rem,env(safe-area-inset-bottom))]",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div className="my-auto w-full py-6">
          <nav
            className="flex flex-col gap-1 text-2xl font-medium tracking-tight"
            aria-label="Mobile"
          >
          {NAV_ITEMS.map((item) => {
            if (item.kind === "link") {
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "min-h-12 inline-flex items-center transition-colors",
                    location.pathname === item.path
                      ? "text-white"
                      : "text-text-muted hover:text-white",
                  )}
                >
                  {item.name}
                </Link>
              );
            }

            const expanded = mobileAccordion === item.name;
            return (
              <div key={item.name} className="flex flex-col">
                <div className="min-h-12 flex items-center justify-between gap-3">
                  {item.path ? (
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "grow py-3 transition-colors text-left",
                        pathMatchesItem(location.pathname, item)
                          ? "text-white"
                          : "text-text-muted hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() =>
                        setMobileAccordion(expanded ? null : item.name)
                      }
                      className={cn(
                        "grow py-3 transition-colors text-left",
                        pathMatchesItem(location.pathname, item)
                          ? "text-white"
                          : "text-text-muted hover:text-white",
                      )}
                    >
                      {item.label}
                    </button>
                  )}
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-label={`Toggle ${item.label} menu`}
                    onClick={() =>
                      setMobileAccordion(expanded ? null : item.name)
                    }
                    className="p-3 -mr-2 text-text-muted hover:text-white transition-colors"
                  >
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 shrink-0 transition-transform duration-300",
                        expanded && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                </div>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    expanded
                      ? "max-h-80 opacity-100 pb-2"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <ul className="flex flex-col gap-1 pl-3 border-l border-white/10 ml-1">
                    {item.children.map((child) => (
                      <li key={child.name}>
                        <Link
                          to={child.path}
                          className={cn(
                            "block py-2 text-base transition-colors",
                            location.pathname === child.path
                              ? "text-white"
                              : "text-text-muted hover:text-white",
                          )}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          <div className="mt-8 flex flex-col gap-3">
            <Button
              to="/contact"
              variant="secondary"
              arrow="up-right"
              className="w-full rounded-xl justify-between px-6 py-4 min-h-14 [&_.oc-btn-label]:w-full [&_.oc-btn-label]:justify-between"
            >
              Book Consultation
            </Button>
            <Button
              to="/contact"
              variant="outline"
              className="w-full rounded-xl px-6 py-4 min-h-14 text-white/80"
            >
              Login
            </Button>
          </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

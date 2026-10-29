import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import BrandLogo from "./BrandLogo";
import { subscribeRafScroll } from "../lib/raf-scroll";
import { Button } from "@/src/components/ui";
import { getOfferTree } from "../data/products";

const CLIENT_LOGIN_URL = "https://onecapitalinvestment.investwell.app/app/#/login";

type NavChild = {
  name: string;
  path: string;
  group?: string;
  children?: { name: string; path: string }[];
};

type NavItem =
  | { kind: "link"; name: string; path: string }
  | { kind: "dropdown"; name: string; label: string; path?: string; children: NavChild[] };

const PRODUCT_NAV = getOfferTree();

function productNavChild(id: string): NavChild {
  const node = PRODUCT_NAV.find(({ product }) => product.id === id);
  if (!node) {
    throw new Error(`Missing nav product: ${id}`);
  }
  const linkedChildren = node.children.filter(
    (child): child is { name: string; path: string } => Boolean(child.path),
  );
  return {
    name: node.product.navLabel,
    path: node.product.path,
    ...(linkedChildren.length > 0 ? { children: linkedChildren } : {}),
  };
}

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
  ...(["mutual-funds", "pms-aif"] as const).map((id) => {
    const product = productNavChild(id);
    return { kind: "link" as const, name: product.name, path: product.path };
  }),
  {
    kind: "dropdown",
    name: "Service",
    label: "Service",
    path: "/solutions",
    children: [
      {
        name: "Core pillars",
        path: "menu:core-pillars",
        children: [
          { name: "Capital Strategy", path: "/solutions/capital-strategy" },
          { name: "Portfolio Management", path: "/solutions/portfolio-management" },
          { name: "Wealth Management", path: "/solutions/wealth-management" },
        ],
      },
      {
        name: "Tactical Products & Strategies",
        path: "menu:tactical",
        children: [
          { name: "Mutual Funds", path: "/solutions/mutual-funds" },
          { name: "PMS & AIF", path: "/solutions/pms-aif" },
          { name: "Direct Equity", path: "/solutions/equity" },
          { name: "Equity Baskets", path: "/solutions/equity-baskets" },
          { name: "Options Baskets", path: "/solutions/options-baskets" },
          { name: "Passive Income Strategy", path: "/solutions/passive-income-strategy" },
          { name: "NIFTY 50 Hedging Strategy", path: "/solutions/nifty-50-hedging" },
          { name: "Investment Advisory", path: "/solutions/investment-advisory" },
        ],
      },
    ],
  },
  {
    kind: "dropdown",
    name: "Insights",
    label: "Insights",
    path: "/insights",
    children: [
      { name: "Blog", path: "/blog" },
      { name: "Newsletter", path: "/newsletter" },
    ],
  },
  { kind: "link", name: "Contact Us", path: "/contact" },
];

const SURFACE_OVER_LIGHT = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  borderColor: "rgba(255, 255, 255, 0.1)",
} as const;

/** Solid dropdown at top of page (no pill). */
const SURFACE_DROPDOWN = {
  backgroundColor: "rgba(0, 0, 0, 0.92)",
  borderColor: "rgba(255, 255, 255, 0.1)",
} as const;

/**
 * Glass dropdown when the pill nav is active.
 * Dark enough to read without waiting on blur, translucent enough for blur to show.
 */
const SURFACE_DROPDOWN_PILL = {
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  borderColor: "rgba(255, 255, 255, 0.12)",
} as const;

const DESKTOP_MENU_CLOSE_MS = 160;

function dropdownSurfaceVars(showPill: boolean, overLight: boolean) {
  if (overLight) return { ...SURFACE_OVER_LIGHT };
  if (showPill) return { ...SURFACE_DROPDOWN_PILL };
  return { ...SURFACE_DROPDOWN };
}

function pathMatchesChild(pathname: string, child: NavChild): boolean {
  const basePath = child.path.split("#")[0];
  if (pathname === child.path || (basePath.length > 1 && pathname === basePath)) return true;
  return (
    child.children?.some((nested) => {
      const nestedBase = nested.path.split("#")[0];
      return pathname === nested.path || (nestedBase.length > 1 && pathname === nestedBase);
    }) ?? false
  );
}

function pathMatchesItem(pathname: string, item: NavItem): boolean {
  if (item.kind === "link") {
    if (pathname === item.path) return true;
    // Keep Calculators active on nested tool pages.
    if (item.path !== "/" && pathname.startsWith(`${item.path}/`)) return true;
    return false;
  }
  return item.children.some((child) => pathMatchesChild(pathname, child));
}

function groupNavChildren(children: NavChild[]) {
  const order: string[] = [];
  const grouped = new Map<string, NavChild[]>();
  for (const child of children) {
    const key = child.group ?? "";
    const bucket = grouped.get(key);
    if (bucket) {
      bucket.push(child);
    } else {
      grouped.set(key, [child]);
      order.push(key);
    }
  }
  return order.map((label) => ({ label, items: grouped.get(label) ?? [] }));
}

function NavLinkStyles(active: boolean, overLight: boolean) {
  if (overLight) {
    return active ? "text-white" : "text-white/85 hover:text-white";
  }
  return active ? "text-white" : "text-white/90 hover:text-white";
}

function NestedNavLinks({
  open,
  items,
  pathname,
  onNavigate,
  tone,
}: {
  open: boolean;
  items: { name: string; path: string }[];
  pathname: string;
  onNavigate?: () => void;
  tone: "desktop" | "mobile";
}) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows] ease-[var(--ease-premium)] motion-reduce:transition-none",
        open ? "grid-rows-[1fr] duration-500" : "grid-rows-[0fr] duration-200",
      )}
      inert={!open}
      aria-hidden={!open}
    >
      <ul
        className={cn(
          "flex min-h-0 flex-col overflow-hidden border-l",
          tone === "desktop" ? "ml-3 border-white/15" : "ml-1 border-white/10",
        )}
      >
        {items.map((item) => {
          const itemActive = pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                role={tone === "desktop" ? "menuitem" : undefined}
                onClick={onNavigate}
                tabIndex={open ? undefined : -1}
                className={cn(
                  "group block w-fit py-1.5 pl-3 text-base transition-colors",
                  tone === "desktop"
                    ? itemActive
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                    : itemActive
                      ? "text-white"
                      : "text-white/90 hover:text-white",
                )}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DesktopDropdown({
  item,
  overLight,
  showPill,
  pathname,
  openId,
  onOpen,
  onScheduleClose,
  onClose,
}: {
  item: Extract<NavItem, { kind: "dropdown" }>;
  overLight: boolean;
  showPill: boolean;
  pathname: string;
  openId: string | null;
  onOpen: (id: string) => void;
  onScheduleClose: () => void;
  onClose: () => void;
}) {
  const active = pathMatchesItem(pathname, item);
  const open = openId === item.name;
  const defaultNestedPath =
    item.children.find((child) => (child.children?.length ?? 0) > 0)?.path ?? null;
  const [openChildPath, setOpenChildPath] = useState<string | null>(null);

  useEffect(() => {
    // Service (and similar): open with Core pillars expanded by default.
    setOpenChildPath(open ? defaultNestedPath : null);
  }, [open, defaultNestedPath]);

  const openMenu = () => onOpen(item.name);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={onScheduleClose}
      onFocusCapture={openMenu}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          onClose();
        }
      }}
    >
      {item.path ? (
        <Link
          to={item.path}
          aria-expanded={open}
          aria-haspopup="true"
          onClick={handleLinkClick}
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center gap-1 whitespace-nowrap text-base tracking-wide transition-colors relative group",
            NavLinkStyles(active, overLight),
          )}
        >
          {item.label}
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-300",
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
          onClick={() => (open ? handleLinkClick() : openMenu())}
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center gap-1 whitespace-nowrap text-base tracking-wide transition-colors relative group",
            NavLinkStyles(active, overLight),
          )}
        >
          {item.label}
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-300",
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
          // Never animate opacity here — ancestor opacity < 1 disables backdrop-filter.
          // Closed: `hidden` (not invisible) so backdrop-filter cannot leave a compositor ghost.
          "absolute top-full pt-3 z-[var(--z-overlay)]",
          item.children.some((child) => (child.children?.length ?? 0) > 0)
            ? "right-0"
            : "left-0 right-0 flex justify-center",
          open
            ? "translate-y-0 visible pointer-events-auto transition-transform duration-200 ease-out"
            : "hidden pointer-events-none",
        )}
      >
        <div
          data-nav-surface="dropdown"
          className={cn(
            "min-w-[17rem] rounded-2xl border p-3",
            item.children.some((child) => (child.children?.length ?? 0) > 0) && "min-w-[26rem]",
            groupNavChildren(item.children).some((group) => group.label) && "min-w-[34rem]",
            // Blur only while open — closed panels must not keep a GPU blur layer.
            open &&
            (showPill || overLight
              ? "backdrop-blur-2xl shadow-lg"
              : "backdrop-blur-xl shadow-2xl"),
          )}
          style={{
            ...dropdownSurfaceVars(showPill, overLight),
            ...(open
              ? {
                transform: "translateZ(0)",
                WebkitBackdropFilter:
                  showPill || overLight ? "blur(40px)" : "blur(24px)",
                backdropFilter:
                  showPill || overLight ? "blur(40px)" : "blur(24px)",
              }
              : {
                WebkitBackdropFilter: "none",
                backdropFilter: "none",
              }),
          }}
          role="menu"
          aria-label={item.label}
        >
          <div
            className={cn(
              "flex max-h-[calc(100vh-8rem)] flex-col gap-4 overflow-y-auto",
              groupNavChildren(item.children).filter((group) => group.label).length > 1 &&
              "sm:grid sm:grid-cols-2 sm:gap-6",
            )}
          >
            {groupNavChildren(item.children).map((group) => (
              <div key={group.label || "links"}>
                <ul className="flex flex-col gap-0.5">
                  {group.items.map((child) => {
                    const childActive = pathname === child.path;
                    const nested = child.children ?? [];
                    const nestedActive = nested.some((item) => pathname === item.path);
                    const nestedOpen = openChildPath === child.path;
                    return (
                      <li
                        key={child.path}
                        onMouseEnter={() => {
                          if (nested.length > 0) setOpenChildPath(child.path);
                        }}
                        onMouseLeave={() => {
                          if (openChildPath === child.path) {
                            setOpenChildPath(defaultNestedPath);
                          }
                        }}
                      >
                        {nested.length > 0 ? (
                          <button
                            type="button"
                            role="menuitem"
                            aria-expanded={nestedOpen}
                            onClick={() =>
                              setOpenChildPath((prev) =>
                                prev === child.path ? defaultNestedPath : child.path,
                              )
                            }
                            className="group group/item flex w-full items-center gap-2 px-3 py-2.5 text-left transition-colors"
                          >
                            <span
                              className={cn(
                                "relative inline-block whitespace-nowrap text-base font-medium tracking-tight transition-colors",
                                nestedActive || nestedOpen
                                  ? "text-white"
                                  : "text-white/90 group-hover/item:text-white",
                              )}
                            >
                              {child.name}
                            </span>
                            <ChevronRight
                              className={cn(
                                "ml-auto h-4 w-4 shrink-0 text-white/80 transition-transform duration-200",
                                nestedOpen && "rotate-90 text-white",
                              )}
                              aria-hidden
                            />
                          </button>
                        ) : (
                          <Link
                            to={child.path}
                            role="menuitem"
                            onClick={handleLinkClick}
                            className="group group/item flex items-center gap-2 px-3 py-2.5 transition-colors"
                          >
                            <span
                              className={cn(
                                "relative inline-block text-base font-medium tracking-tight transition-colors",
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
                        )}
                        {nested.length > 0 ? (
                          <NestedNavLinks
                            open={nestedOpen}
                            items={nested}
                            pathname={pathname}
                            onNavigate={handleLinkClick}
                            tone="desktop"
                          />
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
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
  const [mobileNestedPath, setMobileNestedPath] = useState<string | null>(null);
  const location = useLocation();
  const desktopCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDesktopClose = () => {
    if (desktopCloseTimer.current) {
      clearTimeout(desktopCloseTimer.current);
      desktopCloseTimer.current = null;
    }
  };

  const openDesktopMenu = (id: string) => {
    clearDesktopClose();
    setDesktopOpenId(id);
  };

  const scheduleDesktopClose = () => {
    clearDesktopClose();
    desktopCloseTimer.current = setTimeout(
      () => setDesktopOpenId(null),
      DESKTOP_MENU_CLOSE_MS,
    );
  };

  const closeDesktopMenu = () => {
    clearDesktopClose();
    setDesktopOpenId(null);
  };

  useEffect(() => {
    const updateNavState = () => {
      const nextScrolled = window.scrollY > 50;

      const probeY = 48;
      const lightSections = document.querySelectorAll(".light-section");
      let isOverLight = false;
      for (let i = 0; i < lightSections.length; i++) {
        const rect = lightSections[i].getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          isOverLight = true;
          break;
        }
      }

      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
      setOverLight((prev) => (prev === isOverLight ? prev : isOverLight));
    };

    const unsubscribe = subscribeRafScroll(updateNavState);
    return () => unsubscribe();
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
    closeDesktopMenu();
    setMobileAccordion(null);
    setMobileNestedPath(null);
  }, [location.pathname]);

  useEffect(() => () => clearDesktopClose(), []);

  // Close mobile menu when viewport crosses to desktop — avoids stuck
  // overflow:hidden while the panel is xl:hidden and the hamburger is gone.
  useEffect(() => {
    const desktopMq = window.matchMedia("(min-width: 1280px)");
    const onBreakpoint = () => {
      if (desktopMq.matches) {
        setMobileMenuOpen(false);
        setMobileAccordion(null);
      }
    };
    onBreakpoint();
    desktopMq.addEventListener("change", onBreakpoint);
    return () => desktopMq.removeEventListener("change", onBreakpoint);
  }, []);

  useEffect(() => {
    // CSS-only lock — never Lenis.stop() (that preventDefaults all touch scroll).
    if (mobileMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      // Always force-clear overflow locks on unmount
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.documentElement.classList.remove("oc-preloader-lock");
    };
  }, [mobileMenuOpen]);

  // Safety: force-unlock scroll on mount
  useEffect(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.documentElement.classList.remove("oc-preloader-lock");
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen && !desktopOpenId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        closeDesktopMenu();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen, desktopOpenId]);

  const showPill = scrolled || overLight;

  return (
    <header
      data-site-nav
      className={cn(
        "fixed top-0 inset-x-0 z-[var(--z-nav)] transition-all duration-500 pt-[env(safe-area-inset-top)]",
        scrolled || overLight ? "py-4" : "py-6",
      )}
    >
      <div
        className={cn(
          "relative z-[var(--z-modal)] mx-auto w-full px-[clamp(1.5rem,5.5vw,4.5rem)] transition-[max-width] duration-500",
          // Simple full-bleed bar at top; near-full pill when scrolled / over light.
          showPill
            ? "max-w-[calc(100vw-1.25rem)] sm:max-w-[calc(100vw-1.75rem)]"
            : "max-w-none",
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-between gap-3 transition-all duration-500 xl:gap-4",
            showPill ? "px-5 py-3 sm:px-7 sm:py-3.5" : "px-0 py-2",
          )}
        >
          <div
            data-nav-surface="pill"
            data-nav-pill-active={showPill ? "true" : undefined}
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 rounded-full border backdrop-blur-xl transition-[opacity,background-color,border-color] duration-300 ease-out",
              showPill
                ? overLight
                  ? "opacity-100 border-white/10 bg-black/80"
                  : "opacity-100 border-white/10 bg-white/[0.02] max-xl:bg-black/[0.72]"
                : "opacity-0 border-white/10 bg-white/[0.02]",
            )}
          />

          <BrandLogo
            className={cn(
              "relative z-[1] shrink-0 transition-colors duration-500",
              overLight ? "text-white" : "text-text-main",
            )}
          />

          <nav
            className="relative z-[1] hidden min-w-0 flex-1 items-center justify-center gap-3 xl:flex 2xl:gap-5"
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
                    onOpen={openDesktopMenu}
                    onScheduleClose={scheduleDesktopClose}
                    onClose={closeDesktopMenu}
                  />
                );
              }

              const active = pathMatchesItem(location.pathname, item);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "inline-flex min-h-11 shrink-0 items-center whitespace-nowrap text-base tracking-wide transition-colors relative group",
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

          <div className="relative z-[1] flex shrink-0 items-center gap-2 sm:gap-3">
            <Button
              to="/contact"
              variant="secondary"
              size="sm"
              arrow="up-right"
              className="hidden whitespace-nowrap px-5 xl:inline-flex text-sm tracking-wider font-medium"
            >
              Book Consultation
            </Button>
            <Button
              href={CLIENT_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
              className={cn(
                "hidden whitespace-nowrap px-5 xl:inline-flex text-sm tracking-wider font-medium",
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
              className="xl:hidden relative inline-flex items-center justify-center min-h-11 min-w-11 text-white transition-colors hover:text-white/80"
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
          "fixed inset-0 z-[var(--z-overlay)] bg-canvas transition-all duration-500 xl:hidden flex flex-col overflow-y-auto overscroll-contain px-[var(--page-gutter)] pt-[calc(env(safe-area-inset-top)+4.25rem)] pb-[max(1.5rem,env(safe-area-inset-bottom))]",
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
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "group min-h-12 inline-flex w-fit items-center transition-colors",
                      location.pathname === item.path
                        ? "text-white"
                        : "text-white/90 hover:text-white",
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
                          "group w-fit grow py-3 transition-colors text-left",
                          pathMatchesItem(location.pathname, item)
                            ? "text-white"
                            : "text-white/90 hover:text-white",
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
                          "group w-fit grow py-3 transition-colors text-left",
                          pathMatchesItem(location.pathname, item)
                            ? "text-white"
                            : "text-white/90 hover:text-white",
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
                      className="p-3 -mr-2 text-white/80 hover:text-white transition-colors"
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
                        ? "max-h-[70vh] overflow-y-auto opacity-100 pb-2"
                        : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="flex flex-col gap-4 pl-3 ml-1 border-l border-white/10">
                      {groupNavChildren(item.children).map((group) => (
                        <div key={group.label || item.name}>
                          <ul className="flex flex-col gap-1">
                            {group.items.map((child) => {
                              const nested = child.children ?? [];
                              const nestedActive = nested.some(
                                (item) => location.pathname === item.path,
                              );
                              const nestedOpen =
                                nestedActive || mobileNestedPath === child.path;
                              return (
                                <li key={child.path}>
                                  <div className="flex items-center justify-between gap-2">
                                    {nested.length > 0 ? (
                                      <button
                                        type="button"
                                        aria-expanded={nestedOpen}
                                        onClick={() =>
                                          setMobileNestedPath((current) =>
                                            current === child.path ? null : child.path,
                                          )
                                        }
                                        className="group block w-fit grow py-2 text-left text-base text-white/90 transition-colors hover:text-white"
                                      >
                                        {child.name}
                                      </button>
                                    ) : (
                                      <Link
                                        to={child.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                          "group block w-fit grow py-2 text-base transition-colors",
                                          location.pathname === child.path
                                            ? "text-white"
                                            : "text-white/90 hover:text-white",
                                        )}
                                      >
                                        {child.name}
                                      </Link>
                                    )}
                                    {nested.length > 0 ? (
                                      <button
                                        type="button"
                                        aria-expanded={nestedOpen}
                                        aria-label={`${nestedOpen ? "Hide" : "Show"} ${child.name}`}
                                        onClick={() =>
                                          setMobileNestedPath((current) =>
                                            current === child.path ? null : child.path,
                                          )
                                        }
                                        className="p-2 text-white/80 hover:text-white transition-colors"
                                      >
                                        <ChevronRight
                                          className={cn(
                                            "h-4 w-4 transition-transform duration-200",
                                            nestedOpen && "rotate-90",
                                          )}
                                          aria-hidden
                                        />
                                      </button>
                                    ) : null}
                                  </div>
                                  {nested.length > 0 ? (
                                    <NestedNavLinks
                                      open={nestedOpen}
                                      items={nested}
                                      pathname={location.pathname}
                                      onNavigate={() => setMobileMenuOpen(false)}
                                      tone="mobile"
                                    />
                                  ) : null}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
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
                href={CLIENT_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="w-full rounded-xl px-6 py-4 min-h-14 text-white/80"
                onClick={() => setMobileMenuOpen(false)}
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

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [overLight, setOverLight] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateNavState = () => {
      setScrolled(window.scrollY > 50);

      const probeY = 48;
      const lightSections = document.querySelectorAll('.light-section');
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
    window.addEventListener('scroll', updateNavState, { passive: true });
    window.addEventListener('resize', updateNavState);
    return () => {
      window.removeEventListener('scroll', updateNavState);
      window.removeEventListener('resize', updateNavState);
    };
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Our Approach', path: '/approach' },
    { name: 'Team', path: '/team' },
    { name: 'Insights', path: '/insights' },
    { name: 'Contact', path: '/contact' },
  ];

  const showPill = scrolled || overLight;

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled || overLight ? 'py-4' : 'py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-500',
            showPill && overLight && 'bg-black/80 border border-white/10 backdrop-blur-xl rounded-full px-6 py-3',
            showPill && !overLight && 'glass-panel rounded-full px-6 py-3',
            !showPill && 'px-0 py-2'
          )}
        >
          <BrandLogo
            className={cn(
              'transition-colors duration-500',
              overLight ? 'text-white' : 'text-text-main'
            )}
          />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm tracking-wide transition-colors relative group',
                  overLight
                    ? location.pathname === link.path
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                    : location.pathname === link.path
                      ? 'text-white'
                      : 'text-text-muted hover:text-white'
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1.5 left-0 w-full h-[1px] bg-white opacity-50" />
                )}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-50" />
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className={cn(
                'hidden md:flex items-center gap-2 text-xs uppercase tracking-wider font-medium px-5 py-2.5 rounded-full transition-colors duration-500 group',
                overLight
                  ? 'bg-[#A89178] text-black border border-transparent hover:bg-[#b9a48c]'
                  : 'glass-panel hover:bg-white hover:text-black'
              )}
            >
              Book Consultation
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'lg:hidden relative z-50 p-2 transition-colors',
                overLight ? 'text-white/70 hover:text-white' : 'text-text-muted hover:text-white'
              )}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-canvas/95 backdrop-blur-xl transition-all duration-500 lg:hidden flex flex-col justify-center px-6",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-6 text-2xl font-medium tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "transition-colors",
                location.pathname === link.path ? "text-white" : "text-text-muted hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-8 flex items-center justify-between text-base uppercase tracking-wider glass-panel px-6 py-4 rounded-xl active:bg-white/10"
          >
            Book Consultation
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

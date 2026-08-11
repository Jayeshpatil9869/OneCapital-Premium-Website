import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled ? 'py-4' : 'py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-500',
            scrolled ? 'glass-panel rounded-full px-6 py-3' : 'px-0 py-2'
          )}
        >
          {/* Logo */}
          <Link to="/" className="text-xl tracking-tight font-medium shrink-0 group flex items-center gap-2">
            <div className="w-4 h-4 bg-white rounded-sm group-hover:scale-90 transition-transform duration-500"></div>
            OneCapital
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-white relative group",
                  location.pathname === link.path ? "text-white" : "text-text-muted"
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
              className="hidden md:flex items-center gap-2 text-xs uppercase tracking-wider font-medium glass-panel px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-colors duration-500 group"
            >
              Book Consultation
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative z-50 p-2 text-text-muted hover:text-white transition-colors"
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

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Our Story', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Visit', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isHome = pathname === '/';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const linkColor = transparent ? 'text-ivory-100/90 hover:text-ivory-50' : 'text-ink-600 hover:text-botanical-600';
  const logoColor = transparent ? 'text-ivory-50' : 'text-ink-800';
  const logoSub = transparent ? 'text-golden-200' : 'text-botanical-500';
  const toggleColor = transparent ? 'text-ivory-50' : 'text-ink-700';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          transparent ? 'bg-transparent' : 'bg-ivory-50/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(38,36,33,0.08)]'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="Seed Café home">
              <span className={`font-serif text-xl sm:text-2xl tracking-tighter ${logoColor} group-hover:text-botanical-600 transition-colors duration-300`}>
                Seed
              </span>
              <span className={`font-serif text-xs sm:text-sm tracking-[0.3em] uppercase ${logoSub} mt-0.5`}>
                Café
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative text-sm font-medium transition-colors duration-300 group ${linkColor} ${active ? 'text-botanical-600' : ''}`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-botanical-500 transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                );
              })}
              <Link
                to="/menu"
                className="btn-shine ml-2 px-5 py-2.5 text-sm font-medium text-ivory-50 bg-ink-800 rounded-full hover:bg-botanical-600 transition-all duration-300 hover:shadow-lg hover:shadow-botanical-600/20"
              >
                View Menu
              </Link>
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              className={`md:hidden flex items-center justify-center w-10 h-10 ${toggleColor}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-400 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-ivory-50 animate-fade-in" />
        <div className="relative flex flex-col items-center justify-center h-full gap-7 px-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="font-serif text-3xl text-ink-700 hover:text-botanical-600 transition-all duration-300"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${0.1 + i * 0.06}s, transform 0.4s ease ${0.1 + i * 0.06}s, color 0.3s ease`,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/menu"
            onClick={() => setOpen(false)}
            className="btn-shine mt-4 px-8 py-3 text-base font-medium text-ivory-50 bg-ink-800 rounded-full hover:bg-botanical-600 transition-colors duration-300"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.4s ease 0.45s, transform 0.4s ease 0.45s, background-color 0.3s ease',
            }}
          >
            View Menu
          </Link>
        </div>
      </div>
    </>
  );
}

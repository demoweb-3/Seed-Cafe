import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Our Story', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Visit', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-ink-800 text-ivory-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="font-serif text-2xl tracking-tighter text-ivory-50">Seed</span>
              <span className="font-serif text-sm tracking-[0.3em] uppercase text-golden-200 mt-0.5">Café</span>
            </div>
            <p className="text-sm text-ivory-100/60 leading-relaxed max-w-xs">
              No Hurry, No Worry. A calm café at Horton Place, Colombo.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-ivory-100/50 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory-100/70 hover:text-golden-200 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-ivory-100/50 mb-4">
              Location
            </h4>
            <div className="flex items-start gap-2 text-sm text-ivory-100/70 leading-relaxed">
              <MapPin size={16} className="mt-0.5 shrink-0 text-golden-200" />
              <span>
                60 Horton Place<br />
                Colombo 00700<br />
                Sri Lanka
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-ivory-100/50 mb-4">
              Connect
            </h4>
            <div className="flex items-start gap-2 text-sm text-ivory-100/70 mb-4">
              <Phone size={16} className="mt-0.5 shrink-0 text-golden-200" />
              <span>+94 11 000 0000</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-ivory-100/60 hover:text-golden-200 transition-colors duration-300" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-ivory-100/60 hover:text-golden-200 transition-colors duration-300" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ivory-100/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ivory-100/40">
            © {new Date().getFullYear()} Seed Café. All rights reserved.
          </p>
          <p className="text-xs text-ivory-100/40 font-serif italic">
            No Hurry, No Worry.
          </p>
        </div>
      </div>
    </footer>
  );
}

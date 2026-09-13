import { useReveal } from '@/hooks/useReveal';
import { useCafeSettings } from '@/hooks/useContent';
import { HandDrawnLine, SeedSprout } from '@/components/decorations';
import { MapPin, Clock, Phone, Instagram, Facebook } from 'lucide-react';

export default function ContactPage() {
  const ref = useReveal<HTMLElement>();
  const { settings, loading } = useCafeSettings();

  const cafeName = settings?.cafe_name ?? 'Seed Café';
  const addr1 = settings?.address_line1 ?? '60 Horton Place';
  const addr2 = settings?.address_line2 ?? 'Colombo 00700';
  const addr3 = settings?.address_line3 ?? 'Sri Lanka';
  const phone = settings?.phone ?? '+94 11 000 0000';
  const hoursWeekdays = settings?.hours_weekdays ?? '7:00 AM – 8:00 PM';
  const hoursWeekends = settings?.hours_weekends ?? '8:00 AM – 9:00 PM';
  const instagramUrl = settings?.instagram_url && settings.instagram_url !== '#' ? settings.instagram_url : null;
  const facebookUrl = settings?.facebook_url && settings.facebook_url !== '#' ? settings.facebook_url : null;
  const mapQuery = encodeURIComponent(`${addr1} ${addr2} ${addr3}`);

  return (
    <section ref={ref} className="relative bg-ivory-50 pt-28 sm:pt-32 pb-20 sm:pb-28 lg:pb-36 overflow-hidden">
      <SeedSprout className="absolute top-24 left-4 sm:left-12 w-16 sm:w-24 h-16 sm:h-24 text-botanical-300/40" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="reveal flex items-center justify-center gap-3 mb-4">
            <HandDrawnLine className="w-12 h-2 text-golden-300" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-botanical-500">Visit Seed</span>
            <HandDrawnLine className="w-12 h-2 text-golden-300 -scale-x-100" />
          </div>
          <h1 className="reveal reveal-delay-1 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-ink-800">
            Come by for a <span className="italic text-botanical-600">slow one</span>.
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Info side */}
          <div>
            <div className="reveal space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <MapPin size={22} className="text-botanical-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-serif text-lg text-ink-800">{cafeName}</p>
                  <p className="text-sm text-ink-500 leading-relaxed mt-1">
                    {addr1}<br />
                    {addr2}<br />
                    {addr3}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <Clock size={22} className="text-botanical-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-serif text-lg text-ink-800">Opening Hours</p>
                  <div className="text-sm text-ink-500 leading-relaxed mt-1 space-y-0.5">
                    <div className="flex justify-between gap-8">
                      <span>Monday – Friday</span>
                      <span className="text-ink-400">{hoursWeekdays}</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Saturday – Sunday</span>
                      <span className="text-ink-400">{hoursWeekends}</span>
                    </div>
                    <p className="text-xs text-ink-300 italic mt-1">Hours may vary — please confirm before visiting.</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4">
                <Phone size={22} className="text-botanical-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-serif text-lg text-ink-800">Contact</p>
                  <p className="text-sm text-ink-500 leading-relaxed mt-1">
                    {phone}
                  </p>
                  {(instagramUrl || facebookUrl) && (
                    <div className="flex items-center gap-4 mt-3">
                      {instagramUrl && (
                        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-botanical-600 hover:text-botanical-700 transition-colors" aria-label="Instagram">
                          <Instagram size={18} />
                          <span>Instagram</span>
                        </a>
                      )}
                      {facebookUrl && (
                        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-botanical-600 hover:text-botanical-700 transition-colors" aria-label="Facebook">
                          <Facebook size={18} />
                          <span>Facebook</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="reveal reveal-delay-1 mt-8 sm:mt-10">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-ivory-50 bg-ink-800 rounded-full hover:bg-botanical-600 transition-all duration-300 hover:shadow-lg group"
              >
                Get Directions
                <MapPin size={16} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Map side */}
          <div className="reveal reveal-delay-2 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                title="Seed Café location on Google Maps"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="w-full h-[320px] sm:h-[400px] lg:h-[480px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

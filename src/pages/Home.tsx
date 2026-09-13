import { Link } from 'react-router-dom';
import { useReveal } from '@/hooks/useReveal';
import { useFeaturedMenuItems, useGalleryPreview, useCafeSettings } from '@/hooks/useContent';
import { HandDrawnLine, SeedSprout, CircleSeed, SeedCluster, OrganicCurve } from '@/components/decorations';
import MenuCard from '@/components/MenuCard';
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';

export default function Home() {
  const heroRef = useReveal<HTMLElement>();
  const brandRef = useReveal<HTMLElement>();
  const menuRef = useReveal<HTMLElement>();
  const storyRef = useReveal<HTMLElement>();
  const expRef = useReveal<HTMLElement>();
  const galleryRef = useReveal<HTMLElement>();
  const visitRef = useReveal<HTMLElement>();

  const { items: featuredItems, loading: menuLoading } = useFeaturedMenuItems(4);
  const { images: galleryImages, loading: galleryLoading } = useGalleryPreview(6);
  const { settings } = useCafeSettings();

  const addr1 = settings?.address_line1 ?? '60 Horton Place';
  const addr2 = settings?.address_line2 ?? 'Colombo 00700';
  const phone = settings?.phone ?? '+94 11 000 0000';
  const hoursWeekdays = settings?.hours_weekdays ?? '7:00 AM – 8:00 PM';

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[88svh] sm:min-h-[100svh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2101150/pexels-photo-2101150.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop"
            alt="A warm cappuccino with latte art in morning sunlight on a wooden table"
            className="w-full h-full object-cover animate-slow-zoom"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/30 to-ink-900/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-12 sm:pb-20 lg:pb-28">
          <div className="max-w-2xl">
            <div className="reveal flex items-center gap-3 mb-4 sm:mb-7">
              <HandDrawnLine className="w-12 sm:w-16 h-2 text-golden-300" />
              <span className="text-[11px] sm:text-sm font-medium tracking-[0.25em] uppercase text-ivory-100/90">
                {addr1} · {addr2.split(',')[0]}
              </span>
            </div>
            <h1 className="reveal reveal-delay-1 font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tightest text-ivory-50 text-balance">
              No Hurry,<br />
              <span className="italic font-light text-golden-200">No Worry.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-4 sm:mt-8 text-sm sm:text-lg text-ivory-100/90 leading-relaxed max-w-md text-pretty">
              A calm corner of Colombo where mornings breathe, coffee is slow, and good food brings people together.
            </p>
            <div className="reveal reveal-delay-3 mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/menu" className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold text-ink-800 bg-ivory-50 rounded-full hover:bg-golden-200 transition-all duration-300 hover:shadow-xl hover:shadow-golden-400/20 group shadow-lg shadow-ink-900/20">
                Explore Menu
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-medium text-ivory-50/90 border border-ivory-100/30 rounded-full hover:bg-ivory-50/10 hover:border-ivory-100/60 transition-all duration-300">
                Visit Seed
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-5 sm:right-8 lg:right-12 z-10 hidden sm:flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-ivory-100/60 [writing-mode:vertical-rl] rotate-180">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-ivory-100/50 to-transparent" />
        </div>
      </section>

      {/* BRAND MOMENT */}
      <section ref={brandRef} className="relative bg-ivory-50 py-16 sm:py-28 lg:py-36 overflow-hidden">
        <SeedSprout className="absolute top-12 left-4 sm:left-12 w-16 sm:w-24 h-16 sm:h-24 text-botanical-300/40" />
        <CircleSeed className="absolute bottom-16 right-4 sm:right-12 w-20 sm:w-28 h-20 sm:h-28 text-golden-300/30" />
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <div className="reveal flex justify-center mb-8">
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-botanical-500">Seed Café</span>
          </div>
          <h2 className="reveal reveal-delay-1 font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tighter text-ink-800 text-balance">
            A place to <span className="italic text-botanical-600">slow down</span>, eat well, and spend time with the people you love.
          </h2>
          <p className="reveal reveal-delay-2 mt-8 sm:mt-10 text-base sm:text-lg text-ink-500 leading-relaxed max-w-2xl mx-auto text-pretty">
            Tucked along Horton Place, Seed Café is built around a simple idea: that good food, good coffee, and unhurried conversation make for a good day. No rush. No fuss. Just warmth, light, and the quiet pleasure of a meal shared.
          </p>
          <div className="reveal reveal-delay-3 mt-10 flex justify-center">
            <div className="flex items-center gap-4">
              <span className="w-12 h-px bg-golden-300" />
              <span className="font-serif italic text-lg text-botanical-500">No Hurry, No Worry</span>
              <span className="w-12 h-px bg-golden-300" />
            </div>
          </div>
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section ref={menuRef} className="relative bg-ivory-100 py-16 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14 sm:mb-20">
            <div className="reveal flex items-center justify-center gap-3 mb-4">
              <HandDrawnLine className="w-12 h-2 text-golden-300" />
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-botanical-500">The Menu</span>
              <HandDrawnLine className="w-12 h-2 text-golden-300 -scale-x-100" />
            </div>
            <h2 className="reveal reveal-delay-1 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-ink-800">
              A taste of <span className="italic text-botanical-600">Seed</span>
            </h2>
            <p className="reveal reveal-delay-2 mt-5 text-sm sm:text-base text-ink-400 max-w-lg mx-auto">
              A selection of what we love making. The full menu changes with the seasons.
            </p>
          </div>

          {menuLoading ? (
            <div className="text-center py-8"><p className="text-sm text-ink-400">Loading...</p></div>
          ) : featuredItems.length === 0 ? (
            <div className="text-center py-8"><p className="text-sm text-ink-400">Featured items coming soon.</p></div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              {featuredItems.map((item, i) => (
                <MenuCard key={item.id} item={item} delayClass={`reveal-delay-${(i % 4) + 1}`} />
              ))}
            </div>
          )}

          <div className="reveal mt-12 sm:mt-16 text-center">
            <Link to="/menu" className="inline-flex items-center gap-2 text-sm font-medium text-botanical-600 hover:text-botanical-700 transition-colors group">
              View Full Menu
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* STORY PREVIEW */}
      <section ref={storyRef} className="relative bg-ivory-50 py-16 sm:py-28 lg:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="reveal relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/18405036/pexels-photo-18405036.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1400&fit=crop"
                  alt="Warm sunlit interior of a cozy café with pillows and tables by the window"
                  className="w-full h-[400px] sm:h-[500px] lg:h-[620px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 -right-2 sm:-right-6 w-32 sm:w-44 lg:w-52 rounded-xl overflow-hidden shadow-2xl border-4 border-ivory-50 hidden sm:block">
                <img
                  src="https://images.pexels.com/photos/16541078/pexels-photo-16541078.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop"
                  alt="Hands pouring frothy milk creating latte art"
                  className="w-full h-40 sm:h-52 lg:h-60 object-cover"
                  loading="lazy"
                />
              </div>
              <SeedCluster className="absolute -top-6 -left-4 sm:-left-6 w-20 sm:w-28 h-20 sm:h-28 text-botanical-300/50" />
            </div>
            <div>
              <div className="reveal flex items-center gap-3 mb-5">
                <span className="text-xs font-medium tracking-[0.3em] uppercase text-botanical-500">Our Story</span>
                <span className="w-10 h-px bg-golden-300" />
              </div>
              <h2 className="reveal reveal-delay-1 font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tighter text-ink-800 text-balance">
                Rooted in the belief that a café should feel like a <span className="italic text-botanical-600">second home</span>.
              </h2>
              <p className="reveal reveal-delay-2 mt-6 sm:mt-8 text-base text-ink-500 leading-relaxed">
                Seed Café began with a love for slow mornings — the kind where the coffee is poured with care, the food is made fresh, and nobody is watching the clock.
              </p>
              <div className="reveal reveal-delay-3 mt-8">
                <Link to="/about" className="inline-flex items-center gap-2 text-sm font-medium text-botanical-600 hover:text-botanical-700 transition-colors group">
                  Read Our Story
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE PREVIEW */}
      <section ref={expRef} className="relative bg-botanical-700 py-16 sm:py-28 lg:py-36 overflow-hidden">
        <OrganicCurve className="absolute top-0 left-0 w-full h-12 text-ivory-50 -translate-y-px" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14 sm:mb-20">
            <div className="reveal flex justify-center mb-4">
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-golden-200">The Seed Experience</span>
            </div>
            <h2 className="reveal reveal-delay-1 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-ivory-50 text-balance">
              A day at <span className="italic text-golden-200">Seed</span>
            </h2>
            <p className="reveal reveal-delay-2 mt-5 text-sm sm:text-base text-ivory-100/70 max-w-lg mx-auto">
              From the first pour to the last light — the atmosphere is always the same: calm, warm, unhurried.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { time: 'Morning', title: 'Slow starts', desc: 'First light, first cup. The day unfolds gently.', img: 'https://images.pexels.com/photos/30359471/pexels-photo-30359471.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop' },
              { time: 'Midday', title: 'Good food, shared', desc: 'Plates arrive warm, conversations linger.', img: 'https://images.pexels.com/photos/34052564/pexels-photo-34052564.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop' },
              { time: 'Afternoon', title: 'Quiet light', desc: 'The café softens. A book, a pastry, a friend.', img: 'https://images.pexels.com/photos/972845/pexels-photo-972845.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop' },
            ].map((m, i) => (
              <div key={m.time} className={`reveal reveal-delay-${i + 1} group relative ${i === 1 ? 'lg:mt-12' : ''} ${i === 2 ? 'lg:mt-24' : ''}`}>
                <div className="relative rounded-xl overflow-hidden mb-5">
                  <img src={m.img} alt={m.title} className="w-full h-56 sm:h-64 lg:h-72 object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-botanical-900/40 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-medium tracking-[0.2em] uppercase text-ivory-50/90">{m.time}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 mb-2 tracking-tight">{m.title}</h3>
                <p className="text-sm text-ivory-100/70 leading-relaxed max-w-xs">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <OrganicCurve className="absolute bottom-0 left-0 w-full h-12 text-ivory-100 rotate-180 -translate-y-px" />
      </section>

      {/* GALLERY PREVIEW */}
      <section ref={galleryRef} className="relative bg-ivory-100 py-16 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <div className="reveal flex items-center justify-center gap-3 mb-4">
              <HandDrawnLine className="w-12 h-2 text-golden-300" />
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-botanical-500">Gallery</span>
              <HandDrawnLine className="w-12 h-2 text-golden-300 -scale-x-100" />
            </div>
            <h2 className="reveal reveal-delay-1 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-ink-800">
              Moments at <span className="italic text-botanical-600">Seed</span>
            </h2>
          </div>
          {galleryLoading ? (
            <div className="text-center py-8"><p className="text-sm text-ink-400">Loading...</p></div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-8"><p className="text-sm text-ink-400">Gallery coming soon.</p></div>
          ) : (
            <div className="reveal reveal-delay-2 grid grid-cols-2 lg:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[200px] gap-2 sm:gap-3 lg:gap-4">
              {galleryImages.map((img) => (
                <figure key={img.id} className={`group relative overflow-hidden rounded-lg sm:rounded-xl ${img.span_class}`}>
                  <img src={img.image_url} alt={img.caption ?? ''} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/15 transition-colors duration-500" />
                </figure>
              ))}
            </div>
          )}
          <div className="reveal mt-10 text-center">
            <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-medium text-botanical-600 hover:text-botanical-700 transition-colors group">
              View Full Gallery
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* VISIT PREVIEW */}
      <section ref={visitRef} className="relative bg-ivory-50 py-16 sm:py-28 lg:py-36 overflow-hidden">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <div className="reveal flex items-center justify-center gap-3 mb-5">
            <HandDrawnLine className="w-12 h-2 text-golden-300" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-botanical-500">Visit Seed</span>
            <HandDrawnLine className="w-12 h-2 text-golden-300 -scale-x-100" />
          </div>
          <h2 className="reveal reveal-delay-1 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-ink-800 leading-[1.05]">
            Come by for a <span className="italic text-botanical-600">slow one</span>.
          </h2>
          <div className="reveal reveal-delay-2 mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 text-left">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-botanical-500 mt-0.5 shrink-0" />
              <div className="text-sm text-ink-500 leading-relaxed">
                <p className="font-serif text-base text-ink-800">{addr1}</p>
                <p>{addr2}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-botanical-500 mt-0.5 shrink-0" />
              <div className="text-sm text-ink-500 leading-relaxed">
                <p className="font-serif text-base text-ink-800">Open Daily</p>
                <p>{hoursWeekdays}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={20} className="text-botanical-500 mt-0.5 shrink-0" />
              <div className="text-sm text-ink-500 leading-relaxed">
                <p className="font-serif text-base text-ink-800">Contact</p>
                <p>{phone}</p>
              </div>
            </div>
          </div>
          <div className="reveal reveal-delay-3 mt-10">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-ivory-50 bg-ink-800 rounded-full hover:bg-botanical-600 transition-all duration-300 hover:shadow-lg group">
              Get Directions
              <MapPin size={16} className="transition-transform duration-300 group-hover:scale-110" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

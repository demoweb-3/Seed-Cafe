import { useReveal } from '@/hooks/useReveal';
import { useStory } from '@/hooks/useContent';
import { SeedCluster, SeedSprout, CircleSeed, HandDrawnLine } from '@/components/decorations';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const ref = useReveal<HTMLElement>();
  const { story, loading } = useStory();

  return (
    <section ref={ref} className="relative bg-ivory-50 pt-28 sm:pt-32 pb-20 sm:pb-28 lg:pb-36 overflow-hidden">
      <SeedSprout className="absolute top-24 right-4 sm:right-12 w-16 sm:w-24 h-16 sm:h-24 text-botanical-300/40 animate-float-slow" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-24">
          <div className="reveal flex items-center justify-center gap-3 mb-4">
            <HandDrawnLine className="w-12 h-2 text-golden-300" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-botanical-500">Our Story</span>
            <HandDrawnLine className="w-12 h-2 text-golden-300 -scale-x-100" />
          </div>
          <h1 className="reveal reveal-delay-1 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-ink-800 text-balance">
            {loading ? 'A café rooted in slow.' : story?.heading ?? 'A café rooted in slow.'}
          </h1>
        </div>

        {/* Intro image + text */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 sm:mb-28">
          <div className="reveal relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={story?.main_image_url ?? 'https://images.pexels.com/photos/18405036/pexels-photo-18405036.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop'}
                srcSet="https://images.pexels.com/photos/18405036/pexels-photo-18405036.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop 400w, https://images.pexels.com/photos/18405036/pexels-photo-18405036.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop 800w, https://images.pexels.com/photos/18405036/pexels-photo-18405036.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1400&fit=crop 1200w"
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Warm sunlit interior of a cozy café"
                className="w-full h-[400px] sm:h-[500px] lg:h-[620px] object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-8 -right-2 sm:-right-6 w-32 sm:w-44 lg:w-52 rounded-xl overflow-hidden shadow-2xl border-4 border-ivory-50 hidden sm:block">
              <img
                src={story?.secondary_image_url ?? 'https://images.pexels.com/photos/16541078/pexels-photo-16541078.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'}
                alt="Hands pouring frothy milk creating latte art"
                className="w-full h-40 sm:h-52 lg:h-60 object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <SeedCluster className="absolute -top-6 -left-4 sm:-left-6 w-20 sm:w-28 h-20 sm:h-28 text-botanical-300/50 animate-sway" />
          </div>
          <div>
            <h2 className="reveal reveal-delay-1 font-serif text-3xl sm:text-4xl leading-[1.15] tracking-tighter text-ink-800 text-balance">
              {story?.subheading ?? 'Rooted in the belief that a café should feel like a second home.'}
            </h2>
            <div className="reveal reveal-delay-2 mt-6 sm:mt-8 space-y-4 text-base text-ink-500 leading-relaxed">
              {(story?.body_text ?? 'Seed Café began with a love for slow mornings — the kind where the coffee is poured with care, the food is made fresh, and nobody is watching the clock.\n\nEvery detail at Seed — from the warm light through our windows to the food on your plate — is there to help you settle in, breathe out, and stay a while.')
                .split('\n\n')
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>
          </div>
        </div>

        {/* Philosophy section */}
        <div className="relative bg-botanical-700 rounded-2xl py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-16 mb-20 sm:mb-28 overflow-hidden">
          <CircleSeed className="absolute top-6 right-6 w-16 h-16 text-golden-200/30 animate-pulse-ring" />
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="reveal font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tighter text-ivory-50 text-balance">
              {story?.philosophy_heading ?? 'Our philosophy'}
            </h2>
            <p className="reveal reveal-delay-1 mt-6 text-base sm:text-lg text-ivory-100/80 leading-relaxed text-pretty">
              {story?.philosophy_text ?? 'We believe a café is more than a place to eat — it\'s a place to pause. To sit with a friend, a book, or your own thoughts. To let the morning stretch out without apology. That\'s the spirit we bring to everything at Seed.'}
            </p>
            <div className="reveal reveal-delay-2 mt-10 flex flex-wrap justify-center gap-x-12 gap-y-6">
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-golden-200">Slow</p>
                <p className="text-xs sm:text-sm text-ivory-100/60 mt-1">Coffee, brewed by hand</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-golden-200">Fresh</p>
                <p className="text-xs sm:text-sm text-ivory-100/60 mt-1">Food, made to order</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-golden-200">Warm</p>
                <p className="text-xs sm:text-sm text-ivory-100/60 mt-1">A space that welcomes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Café experience section */}
        <div className="mb-20 sm:mb-24">
          <div className="reveal text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tighter text-ink-800">
              The Seed <span className="italic text-botanical-600">experience</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-ink-400 max-w-lg mx-auto">
              Slow mornings, good coffee, fresh food, natural light, and relaxed moments.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { img: 'https://images.pexels.com/photos/30359471/pexels-photo-30359471.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', title: 'Slow mornings', desc: 'First light, first cup. The day unfolds gently.' },
              { img: 'https://images.pexels.com/photos/36729519/pexels-photo-36729519.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', title: 'Good company', desc: 'Friends, conversations, and warm plates shared.' },
              { img: 'https://images.pexels.com/photos/972845/pexels-photo-972845.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', title: 'Natural light', desc: 'Sunlight through big windows, all afternoon long.' },
            ].map((item, i) => (
              <div key={item.title} className={`reveal reveal-delay-${i + 1} group rounded-xl overflow-hidden`}>
                <div className="relative overflow-hidden rounded-xl">
                  <img src={item.img} alt={item.title} className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-ink-800 mt-4 tracking-tight">{item.title}</h3>
                <p className="text-sm text-ink-400 mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal text-center">
          <p className="font-serif italic text-lg text-botanical-500 mb-4">Take your time.</p>
          <Link to="/contact" className="btn-shine inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-ivory-50 bg-ink-800 rounded-full hover:bg-botanical-600 transition-all duration-300 hover:shadow-xl group">
            Come by Seed
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

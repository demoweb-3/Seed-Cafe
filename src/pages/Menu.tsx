import { useReveal } from '@/hooks/useReveal';
import { useMenu } from '@/hooks/useContent';
import MenuCard from '@/components/MenuCard';
import { Link } from 'react-router-dom';
import { HandDrawnLine } from '@/components/decorations';
import { ArrowRight } from 'lucide-react';

export default function MenuPage() {
  const ref = useReveal<HTMLElement>();
  const { categories, loading } = useMenu();

  return (
    <section ref={ref} className="relative bg-ivory-100 pt-28 sm:pt-32 pb-20 sm:pb-28 lg:pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Page header */}
        <div className="text-center mb-14 sm:mb-20">
          <div className="reveal flex items-center justify-center gap-3 mb-4">
            <HandDrawnLine className="w-12 h-2 text-golden-300" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-botanical-500">The Menu</span>
            <HandDrawnLine className="w-12 h-2 text-golden-300 -scale-x-100" />
          </div>
          <h1 className="reveal reveal-delay-1 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-ink-800">
            The full <span className="italic text-botanical-600">Seed</span> menu
          </h1>
          <p className="reveal reveal-delay-2 mt-5 text-sm sm:text-base text-ink-400 max-w-lg mx-auto">
            Coffee, breakfast, food, desserts and specials — made fresh, served slow. Prices in LKR.
          </p>
        </div>

        {/* Menu categories */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-sm text-ink-400">Loading menu...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-ink-400">Menu is being updated. Please check back soon.</p>
          </div>
        ) : (
          <div className="space-y-14 sm:space-y-20">
            {categories.map((category) => (
              <div key={category.id}>
                <div className="reveal flex items-center gap-4 mb-6 sm:mb-8">
                  <h2 className="font-serif text-2xl sm:text-3xl text-ink-700 tracking-tight">
                    {category.title}
                  </h2>
                  <div className="flex-1 h-px bg-ink-200/60" />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                  {category.items.map((item, i) => (
                    <MenuCard key={item.id} item={item} delayClass={`reveal-delay-${(i % 4) + 1}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer note */}
        <div className="reveal mt-14 sm:mt-20 text-center">
          <p className="text-sm text-ink-400 italic mb-6">
            Menu items and prices may vary — please confirm in-store.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-ivory-50 bg-ink-800 rounded-full hover:bg-botanical-600 transition-all duration-300 hover:shadow-lg group">
            Come Taste for Yourself
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

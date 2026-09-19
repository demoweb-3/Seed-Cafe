import { useReveal } from '@/hooks/useReveal';
import { useGallery } from '@/hooks/useContent';
import { GallerySkeleton } from '@/components/Skeleton';
import { HandDrawnLine } from '@/components/decorations';

export default function GalleryPage() {
  const ref = useReveal<HTMLElement>();
  const { images, loading } = useGallery();

  return (
    <section ref={ref} className="relative bg-ivory-100 pt-28 sm:pt-32 pb-20 sm:pb-28 lg:pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="reveal flex items-center justify-center gap-3 mb-4">
            <HandDrawnLine className="w-12 h-2 text-golden-300" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-botanical-500">Gallery</span>
            <HandDrawnLine className="w-12 h-2 text-golden-300 -scale-x-100" />
          </div>
          <h1 className="reveal reveal-delay-1 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-ink-800">
            Moments at <span className="italic text-botanical-600">Seed</span>
          </h1>
          <p className="reveal reveal-delay-2 mt-5 text-sm sm:text-base text-ink-400 max-w-lg mx-auto">
            Coffee, food, interiors, people — the small details that make a day at Seed.
          </p>
        </div>

        {/* Masonry grid */}
        {loading ? (
          <GallerySkeleton />
        ) : images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-ink-400">Gallery is being updated. Please check back soon.</p>
          </div>
        ) : (
          <div className="reveal reveal-delay-2 grid grid-cols-2 lg:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[200px] gap-2 sm:gap-3 lg:gap-4">
            {images.map((img) => (
              <figure key={img.id} className={`group relative overflow-hidden rounded-lg sm:rounded-xl ${img.span_class}`}>
                <img
                  src={img.image_url}
                  alt={img.caption ?? ''}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/15 transition-colors duration-500" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-3 text-xs text-ivory-50/0 group-hover:text-ivory-50/80 transition-colors duration-500 bg-gradient-to-t from-ink-900/60 to-transparent">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

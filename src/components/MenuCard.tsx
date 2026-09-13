import type { MenuItem } from '@/lib/types';

export default function MenuCard({ item, delayClass = '' }: { item: MenuItem; delayClass?: string }) {
  return (
    <article
      className={`reveal ${delayClass} group relative overflow-hidden rounded-xl sm:rounded-2xl bg-ivory-50 cursor-pointer transition-all duration-500 hover:shadow-xl hover:shadow-ink-900/8 hover:-translate-y-1`}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.image_url ?? ''}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {item.tag && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2.5 py-1 text-[10px] sm:text-xs font-medium tracking-wide uppercase text-ink-800 bg-golden-200/90 rounded-full backdrop-blur-sm">
            {item.tag}
          </span>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-serif text-sm sm:text-lg text-ink-800 leading-tight">
            {item.name}
          </h4>
          <span className="text-xs sm:text-sm font-medium text-botanical-600 whitespace-nowrap mt-0.5">
            {item.price}
          </span>
        </div>
        <p className="mt-1.5 text-[11px] sm:text-sm text-ink-400 leading-snug line-clamp-2">
          {item.description}
        </p>
      </div>
    </article>
  );
}

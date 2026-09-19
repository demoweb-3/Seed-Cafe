export function MenuCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-ivory-50">
      <div className="aspect-square bg-ink-200/30 animate-shimmer rounded-xl" />
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="h-4 w-2/3 bg-ink-200/30 rounded animate-shimmer" />
          <div className="h-4 w-12 bg-ink-200/30 rounded animate-shimmer" />
        </div>
        <div className="mt-2 h-3 w-full bg-ink-200/20 rounded animate-shimmer" />
        <div className="mt-1 h-3 w-4/5 bg-ink-200/20 rounded animate-shimmer" />
      </div>
    </div>
  );
}

export function MenuGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MenuCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[200px] gap-2 sm:gap-3 lg:gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-ink-200/30 animate-shimmer rounded-lg sm:rounded-xl" />
      ))}
    </div>
  );
}

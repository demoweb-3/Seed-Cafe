import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { MenuCategory, MenuItem, GalleryImage } from '@/lib/types';
import { UtensilsCrossed, Images, FolderTree, BookOpen, Settings, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ categories: 0, items: 0, gallery: 0, featured: 0 });
  const [recentItems, setRecentItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [catRes, itemRes, galRes, featRes, recentRes] = await Promise.all([
        supabase.from('menu_categories').select('*', { count: 'exact', head: true }),
        supabase.from('menu_items').select('*', { count: 'exact', head: true }),
        supabase.from('gallery_images').select('*', { count: 'exact', head: true }),
        supabase.from('menu_items').select('*', { count: 'exact', head: true }).eq('is_featured', true),
        supabase.from('menu_items').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      setStats({
        categories: catRes.count ?? 0,
        items: itemRes.count ?? 0,
        gallery: galRes.count ?? 0,
        featured: featRes.count ?? 0,
      });
      setRecentItems(recentRes.data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    { label: 'Categories', value: stats.categories, icon: FolderTree, to: '/admin/menu', color: 'text-botanical-600' },
    { label: 'Menu Items', value: stats.items, icon: UtensilsCrossed, to: '/admin/menu', color: 'text-golden-500' },
    { label: 'Featured', value: stats.featured, icon: UtensilsCrossed, to: '/admin/menu', color: 'text-botanical-500' },
    { label: 'Gallery Images', value: stats.gallery, icon: Images, to: '/admin/gallery', color: 'text-botanical-600' },
  ];

  const quickLinks = [
    { label: 'Edit Menu', desc: 'Manage categories and items', icon: UtensilsCrossed, to: '/admin/menu' },
    { label: 'Manage Gallery', desc: 'Upload and arrange images', icon: Images, to: '/admin/gallery' },
    { label: 'Edit Our Story', desc: 'Update story content and images', icon: BookOpen, to: '/admin/story' },
    { label: 'Café Settings', desc: 'Update contact info and hours', icon: Settings, to: '/admin/settings' },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-800 mb-1">Dashboard</h1>
      <p className="text-sm text-ink-400 mb-8">Overview of your café content.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="bg-white rounded-xl p-4 sm:p-5 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center justify-between mb-3">
              <card.icon size={22} className={card.color} />
              <ArrowRight size={14} className="text-ink-300 group-hover:text-ink-500 transition-colors" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-ink-800">
              {loading ? '—' : card.value}
            </p>
            <p className="text-xs sm:text-sm text-ink-400 mt-0.5">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <h2 className="font-serif text-xl text-ink-700 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {quickLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="bg-white rounded-xl p-4 sm:p-5 hover:shadow-lg transition-shadow group"
          >
            <link.icon size={20} className="text-botanical-500 mb-3" />
            <p className="font-medium text-sm text-ink-800 group-hover:text-botanical-600 transition-colors">{link.label}</p>
            <p className="text-xs text-ink-400 mt-1">{link.desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent items */}
      <h2 className="font-serif text-xl text-ink-700 mb-4">Recently Added</h2>
      <div className="bg-white rounded-xl overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-ink-400">Loading...</p>
        ) : recentItems.length === 0 ? (
          <p className="p-6 text-sm text-ink-400">No items yet.</p>
        ) : (
          <div className="divide-y divide-ink-100">
            {recentItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-ivory-100 shrink-0">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink-800 truncate">{item.name}</p>
                  <p className="text-xs text-ink-400">{item.price}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {item.is_featured && (
                    <span className="text-[10px] font-medium uppercase tracking-wide text-golden-600 bg-golden-100 px-2 py-0.5 rounded-full">Featured</span>
                  )}
                  {!item.is_available && (
                    <span className="text-[10px] font-medium uppercase tracking-wide text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Hidden</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

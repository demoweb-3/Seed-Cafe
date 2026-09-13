import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { MenuCategory, MenuItem, GalleryImage, StoryContent, CafeSettings } from '@/lib/types';

export type MenuCategoryWithItems = MenuCategory & { items: MenuItem[] };

export function useMenu() {
  const [categories, setCategories] = useState<MenuCategoryWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const [catRes, itemRes] = await Promise.all([
        supabase.from('menu_categories').select('*').order('display_order'),
        supabase.from('menu_items').select('*').order('display_order'),
      ]);

      const cats = catRes.data ?? [];
      const items = itemRes.data ?? [];
      const grouped = cats.map((c) => ({
        ...c,
        items: items.filter((i) => i.category_id === c.id && i.is_available),
      }));
      setCategories(grouped);
    } catch {
      setCategories([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const channel = supabase
      .channel('public-menu')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menu_categories' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menu_items' }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [load]);

  return { categories, loading };
}

export function useFeaturedMenuItems(maxCount: number = 4) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_available', true)
        .eq('is_featured', true)
        .order('display_order')
        .limit(maxCount);
      setItems(data ?? []);
    } catch {
      setItems([]);
    }
    setLoading(false);
  }, [maxCount]);

  useEffect(() => {
    load();
    const channel = supabase
      .channel('public-featured-menu')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menu_items' }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [load]);

  return { items, loading };
}

export function useGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data } = await supabase.from('gallery_images').select('*').order('display_order');
      setImages(data ?? []);
    } catch {
      setImages([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const channel = supabase
      .channel('public-gallery')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_images' }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [load]);

  return { images, loading };
}

export function useGalleryPreview(maxCount: number = 6) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data } = await supabase.from('gallery_images').select('*').order('display_order').limit(maxCount);
      setImages(data ?? []);
    } catch {
      setImages([]);
    }
    setLoading(false);
  }, [maxCount]);

  useEffect(() => {
    load();
    const channel = supabase
      .channel('public-gallery-preview')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_images' }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [load]);

  return { images, loading };
}

export function useStory() {
  const [story, setStory] = useState<StoryContent | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data } = await supabase.from('story_content').select('*').eq('id', 1).maybeSingle();
      setStory(data);
    } catch {
      setStory(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const channel = supabase
      .channel('public-story')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'story_content' }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [load]);

  return { story, loading };
}

export function useCafeSettings() {
  const [settings, setSettings] = useState<CafeSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data } = await supabase.from('cafe_settings').select('*').eq('id', 1).maybeSingle();
      setSettings(data);
    } catch {
      setSettings(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const channel = supabase
      .channel('public-settings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cafe_settings' }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [load]);

  return { settings, loading };
}

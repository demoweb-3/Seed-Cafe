import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import type { MenuCategory, MenuItem, GalleryImage, StoryContent, CafeSettings } from '@/lib/types';

export type MenuCategoryWithItems = MenuCategory & { items: MenuItem[] };

// --- Shared cache: prevents duplicate requests when multiple components need the same data ---

type CacheEntry<T> = { data: T; ts: number };
const cache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL = 30_000;

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data as T;
  return null;
}

function setCached<T>(key: string, data: T) {
  cache.set(key, { data, ts: Date.now() });
}

// --- Hooks ---

export function useMenu() {
  const [categories, setCategories] = useState<MenuCategoryWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const subscribed = useRef(false);

  const load = useCallback(async () => {
    const cached = getCached<MenuCategoryWithItems[]>('menu:full');
    if (cached) {
      setCategories(cached);
      setLoading(false);
      return;
    }
    try {
      const [catRes, itemRes] = await Promise.all([
        supabase.from('menu_categories').select('id,title,display_order,created_at').order('display_order'),
        supabase.from('menu_items').select('id,category_id,name,description,price,image_url,tag,is_available,is_featured,display_order,created_at').order('display_order'),
      ]);

      const cats = catRes.data ?? [];
      const items = itemRes.data ?? [];
      const grouped = cats.map((c) => ({
        ...c,
        items: items.filter((i) => i.category_id === c.id && i.is_available),
      }));
      setCached('menu:full', grouped);
      setCategories(grouped);
    } catch {
      setCategories([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    if (subscribed.current) return;
    subscribed.current = true;
    const channel = supabase
      .channel('public-menu')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menu_categories' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menu_items' }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); subscribed.current = false; };
  }, [load]);

  return { categories, loading };
}

export function useFeaturedMenuItems(maxCount: number = 4) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const subscribed = useRef(false);

  const load = useCallback(async () => {
    const cacheKey = `menu:featured:${maxCount}`;
    const cached = getCached<MenuItem[]>(cacheKey);
    if (cached) {
      setItems(cached);
      setLoading(false);
      return;
    }
    try {
      const { data } = await supabase
        .from('menu_items')
        .select('id,category_id,name,description,price,image_url,tag,is_available,is_featured,display_order,created_at')
        .eq('is_available', true)
        .eq('is_featured', true)
        .order('display_order')
        .limit(maxCount);
      setItems(data ?? []);
      if (data) setCached(cacheKey, data);
    } catch {
      setItems([]);
    }
    setLoading(false);
  }, [maxCount]);

  useEffect(() => {
    load();
    if (subscribed.current) return;
    subscribed.current = true;
    const channel = supabase
      .channel('public-featured-menu')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menu_items' }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); subscribed.current = false; };
  }, [load]);

  return { items, loading };
}

export function useGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const subscribed = useRef(false);

  const load = useCallback(async () => {
    const cached = getCached<GalleryImage[]>('gallery:all');
    if (cached) {
      setImages(cached);
      setLoading(false);
      return;
    }
    try {
      const { data } = await supabase.from('gallery_images').select('id,image_url,caption,display_order,span_class,created_at').order('display_order');
      setImages(data ?? []);
      if (data) setCached('gallery:all', data);
    } catch {
      setImages([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    if (subscribed.current) return;
    subscribed.current = true;
    const channel = supabase
      .channel('public-gallery')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_images' }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); subscribed.current = false; };
  }, [load]);

  return { images, loading };
}

export function useGalleryPreview(maxCount: number = 6) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const subscribed = useRef(false);

  const load = useCallback(async () => {
    const cacheKey = `gallery:preview:${maxCount}`;
    const cached = getCached<GalleryImage[]>(cacheKey);
    if (cached) {
      setImages(cached);
      setLoading(false);
      return;
    }
    try {
      const { data } = await supabase.from('gallery_images').select('id,image_url,caption,display_order,span_class,created_at').order('display_order').limit(maxCount);
      setImages(data ?? []);
      if (data) setCached(cacheKey, data);
    } catch {
      setImages([]);
    }
    setLoading(false);
  }, [maxCount]);

  useEffect(() => {
    load();
    if (subscribed.current) return;
    subscribed.current = true;
    const channel = supabase
      .channel('public-gallery-preview')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_images' }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); subscribed.current = false; };
  }, [load]);

  return { images, loading };
}

export function useStory() {
  const [story, setStory] = useState<StoryContent | null>(null);
  const [loading, setLoading] = useState(true);
  const subscribed = useRef(false);

  const load = useCallback(async () => {
    const cached = getCached<StoryContent | null>('story');
    if (cached !== null) {
      setStory(cached);
      setLoading(false);
      return;
    }
    try {
      const { data } = await supabase.from('story_content').select('*').eq('id', 1).maybeSingle();
      setStory(data);
      setCached('story', data);
    } catch {
      setStory(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    if (subscribed.current) return;
    subscribed.current = true;
    const channel = supabase
      .channel('public-story')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'story_content' }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); subscribed.current = false; };
  }, [load]);

  return { story, loading };
}

export function useCafeSettings() {
  const [settings, setSettings] = useState<CafeSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const subscribed = useRef(false);

  const load = useCallback(async () => {
    const cached = getCached<CafeSettings | null>('settings');
    if (cached !== null) {
      setSettings(cached);
      setLoading(false);
      return;
    }
    try {
      const { data } = await supabase.from('cafe_settings').select('*').eq('id', 1).maybeSingle();
      setSettings(data);
      setCached('settings', data);
    } catch {
      setSettings(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    if (subscribed.current) return;
    subscribed.current = true;
    const channel = supabase
      .channel('public-settings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cafe_settings' }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); subscribed.current = false; };
  }, [load]);

  return { settings, loading };
}

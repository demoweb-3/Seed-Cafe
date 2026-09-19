import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import type { CafeSettings } from '@/lib/types';
import { Save, Check, Search } from 'lucide-react';

export default function SettingsEditor() {
  const [data, setData] = useState<CafeSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from('cafe_settings').select('*').eq('id', 1).maybeSingle().then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  const update = (field: keyof CafeSettings, value: string) => {
    setData((d) => d ? { ...d, [field]: value } : d);
    setSaved(false);
  };

  const updateNumber = (field: keyof CafeSettings, value: string) => {
    const num = value === '' ? null : parseFloat(value);
    setData((d) => d ? { ...d, [field]: num } : d);
    setSaved(false);
  };

  const searchInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [gmapsLoaded, setGmapsLoaded] = useState(false);

  useEffect(() => {
    if (gmapsLoaded) return;
    const checkGoogle = window.google?.maps;
    if (checkGoogle) { setGmapsLoaded(true); return; }
    const existing = document.getElementById('gmaps-places-script');
    if (existing) return;
    const script = document.createElement('script');
    script.id = 'gmaps-places-script';
    script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&v=weekly';
    script.async = true;
    script.defer = true;
    script.onload = () => setGmapsLoaded(true);
    document.head.appendChild(script);
  }, [gmapsLoaded]);

  useEffect(() => {
    if (!gmapsLoaded || !searchInputRef.current || autocompleteRef.current) return;
    const ac = new window.google.maps.places.Autocomplete(searchInputRef.current, {
      types: ['establishment', 'geocode'],
    });
    ac.addListener('place_changed', () => {
      const place = ac.getPlace();
      if (!place) return;
      const lat = place.geometry?.location?.lat() ?? null;
      const lng = place.geometry?.location?.lng() ?? null;
      const addrComponents = place.address_components ?? [];
      const getComp = (type: string) => addrComponents.find(c => c.types.includes(type))?.long_name ?? '';
      const line1 = [getComp('street_number'), getComp('route')].filter(Boolean).join(' ').trim();
      const line2 = [getComp('locality'), getComp('administrative_area_level_2')].filter(Boolean).join(', ').trim();
      const line3 = getComp('country');
      const placeUrl = place.url ?? '';
      setData((d) => d ? {
        ...d,
        address_line1: line1 || d.address_line1,
        address_line2: line2 || d.address_line2,
        address_line3: line3 || d.address_line3,
        latitude: lat,
        longitude: lng,
        map_url: placeUrl || d.map_url,
      } : d);
      setSaved(false);
    });
    autocompleteRef.current = ac;
  }, [gmapsLoaded]);

  const previewSrc = data && data.latitude != null && data.longitude != null
    ? `https://www.google.com/maps?q=${data.latitude},${data.longitude}&output=embed`
    : data && data.address_line1
      ? `https://www.google.com/maps?q=${encodeURIComponent(`${data.address_line1 ?? ''} ${data.address_line2 ?? ''} ${data.address_line3 ?? ''}`)}&output=embed`
      : '';

  const save = async () => {
    if (!data) return;
    setSaving(true);
    await supabase.from('cafe_settings').update({
      cafe_name: data.cafe_name,
      logo_text: data.logo_text,
      address_line1: data.address_line1,
      address_line2: data.address_line2,
      address_line3: data.address_line3,
      phone: data.phone,
      email: data.email,
      instagram_url: data.instagram_url,
      facebook_url: data.facebook_url,
      hours_weekdays: data.hours_weekdays,
      hours_weekends: data.hours_weekends,
      latitude: data.latitude,
      longitude: data.longitude,
      map_url: data.map_url,
      updated_at: new Date().toISOString(),
    }).eq('id', 1);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <p className="text-sm text-ink-400">Loading...</p>;
  if (!data) return <p className="text-sm text-red-500">Could not load settings.</p>;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-ink-800 mb-1">Café Settings</h1>
          <p className="text-sm text-ink-400">Update café name, contact info, and hours.</p>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-ivory-50 bg-ink-800 rounded-lg hover:bg-botanical-600 transition-colors disabled:opacity-50">
          {saved ? <><Check size={16} /> Saved</> : <><Save size={16} /> {saving ? 'Saving...' : 'Save'}</>}
        </button>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-ink-500 mb-1.5">Café Name</label>
            <input type="text" value={data.cafe_name ?? ''} onChange={(e) => update('cafe_name', e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-500 mb-1.5">Logo Text</label>
            <input type="text" value={data.logo_text ?? ''} onChange={(e) => update('logo_text', e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" />
          </div>
        </div>

        <div className="border-t border-ink-100 pt-5">
          <h2 className="font-serif text-lg text-ink-700 mb-4">Address</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Address Line 1</label>
              <input type="text" value={data.address_line1 ?? ''} onChange={(e) => update('address_line1', e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Address Line 2</label>
              <input type="text" value={data.address_line2 ?? ''} onChange={(e) => update('address_line2', e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Address Line 3</label>
              <input type="text" value={data.address_line3 ?? ''} onChange={(e) => update('address_line3', e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" />
            </div>
          </div>
        </div>

        <div className="border-t border-ink-100 pt-5">
          <h2 className="font-serif text-lg text-ink-700 mb-4">Map Location</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Search location</label>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for the café on Google Maps..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400"
                />
              </div>
              <p className="text-xs text-ink-400 mt-1">Selecting a result auto-fills address, coordinates, and map URL.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5">Latitude</label>
                <input type="number" step="any" value={data.latitude ?? ''} onChange={(e) => updateNumber('latitude', e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" placeholder="6.9271" />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5">Longitude</label>
                <input type="number" step="any" value={data.longitude ?? ''} onChange={(e) => updateNumber('longitude', e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" placeholder="79.8612" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Google Maps URL</label>
              <input type="text" value={data.map_url ?? ''} onChange={(e) => update('map_url', e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" placeholder="https://maps.google.com/?q=seed+cafe" />
            </div>
            {previewSrc && (
              <div className="rounded-lg overflow-hidden border border-ink-100">
                <iframe
                  title="Location preview"
                  src={previewSrc}
                  className="w-full h-[240px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-ink-100 pt-5">
          <h2 className="font-serif text-lg text-ink-700 mb-4">Contact</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Phone</label>
              <input type="text" value={data.phone ?? ''} onChange={(e) => update('phone', e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Email</label>
              <input type="email" value={data.email ?? ''} onChange={(e) => update('email', e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" />
            </div>
          </div>
        </div>

        <div className="border-t border-ink-100 pt-5">
          <h2 className="font-serif text-lg text-ink-700 mb-4">Social Links</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Instagram URL</label>
              <input type="text" value={data.instagram_url ?? ''} onChange={(e) => update('instagram_url', e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" placeholder="https://instagram.com/seedcafe" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Facebook URL</label>
              <input type="text" value={data.facebook_url ?? ''} onChange={(e) => update('facebook_url', e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" placeholder="https://facebook.com/seedcafe" />
            </div>
          </div>
        </div>

        <div className="border-t border-ink-100 pt-5">
          <h2 className="font-serif text-lg text-ink-700 mb-4">Opening Hours</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Weekdays (Mon–Fri)</label>
              <input type="text" value={data.hours_weekdays ?? ''} onChange={(e) => update('hours_weekdays', e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" placeholder="7:00 AM – 8:00 PM" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Weekends (Sat–Sun)</label>
              <input type="text" value={data.hours_weekends ?? ''} onChange={(e) => update('hours_weekends', e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" placeholder="8:00 AM – 9:00 PM" />
            </div>
          </div>
        </div>

        <button onClick={save} disabled={saving} className="w-full py-3 text-sm font-medium text-ivory-50 bg-ink-800 rounded-lg hover:bg-botanical-600 transition-colors disabled:opacity-50">
          {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

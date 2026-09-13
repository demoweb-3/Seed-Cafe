import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { CafeSettings } from '@/lib/types';
import { Save, Check } from 'lucide-react';

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

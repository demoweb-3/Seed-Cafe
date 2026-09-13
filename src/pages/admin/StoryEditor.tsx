import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { StoryContent } from '@/lib/types';
import { uploadImage } from '@/lib/upload';
import { Upload, Save, Check } from 'lucide-react';

export default function StoryEditor() {
  const [data, setData] = useState<StoryContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingSecondary, setUploadingSecondary] = useState(false);

  useEffect(() => {
    supabase.from('story_content').select('*').eq('id', 1).maybeSingle().then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  const update = (field: keyof StoryContent, value: string) => {
    setData((d) => d ? { ...d, [field]: value } : d);
    setSaved(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'main_image_url' | 'secondary_image_url', folder: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (field === 'main_image_url') setUploadingMain(true);
    else setUploadingSecondary(true);
    const url = await uploadImage(file, folder);
    if (url) update(field, url);
    if (field === 'main_image_url') setUploadingMain(false);
    else setUploadingSecondary(false);
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    await supabase.from('story_content').update({
      heading: data.heading,
      subheading: data.subheading,
      body_text: data.body_text,
      philosophy_heading: data.philosophy_heading,
      philosophy_text: data.philosophy_text,
      main_image_url: data.main_image_url,
      secondary_image_url: data.secondary_image_url,
      updated_at: new Date().toISOString(),
    }).eq('id', 1);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <p className="text-sm text-ink-400">Loading...</p>;
  if (!data) return <p className="text-sm text-red-500">Could not load story content.</p>;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-ink-800 mb-1">Our Story</h1>
          <p className="text-sm text-ink-400">Edit the story page content and images.</p>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-ivory-50 bg-ink-800 rounded-lg hover:bg-botanical-600 transition-colors disabled:opacity-50">
          {saved ? <><Check size={16} /> Saved</> : <><Save size={16} /> {saving ? 'Saving...' : 'Save'}</>}
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-ink-500 mb-1.5">Page Heading</label>
          <input type="text" value={data.heading ?? ''} onChange={(e) => update('heading', e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-500 mb-1.5">Subheading</label>
          <input type="text" value={data.subheading ?? ''} onChange={(e) => update('subheading', e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-500 mb-1.5">Body Text</label>
          <textarea value={data.body_text ?? ''} onChange={(e) => update('body_text', e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400 resize-none" rows={6} />
        </div>

        <div className="border-t border-ink-100 pt-5">
          <h2 className="font-serif text-lg text-ink-700 mb-4">Philosophy Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Philosophy Heading</label>
              <input type="text" value={data.philosophy_heading ?? ''} onChange={(e) => update('philosophy_heading', e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Philosophy Text</label>
              <textarea value={data.philosophy_text ?? ''} onChange={(e) => update('philosophy_text', e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-white focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400 resize-none" rows={4} />
            </div>
          </div>
        </div>

        <div className="border-t border-ink-100 pt-5">
          <h2 className="font-serif text-lg text-ink-700 mb-4">Images</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Main Image</label>
              <div className="w-full h-32 rounded-lg overflow-hidden bg-ivory-100 mb-2">
                {data.main_image_url && <img src={data.main_image_url} alt="Main" className="w-full h-full object-cover" />}
              </div>
              <label className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-ink-700 bg-ivory-100 rounded-lg hover:bg-ivory-200 transition-colors cursor-pointer">
                <Upload size={12} />{uploadingMain ? 'Uploading...' : 'Upload'}
                <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'main_image_url', 'story')} className="hidden" />
              </label>
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Secondary Image</label>
              <div className="w-full h-32 rounded-lg overflow-hidden bg-ivory-100 mb-2">
                {data.secondary_image_url && <img src={data.secondary_image_url} alt="Secondary" className="w-full h-full object-cover" />}
              </div>
              <label className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-ink-700 bg-ivory-100 rounded-lg hover:bg-ivory-200 transition-colors cursor-pointer">
                <Upload size={12} />{uploadingSecondary ? 'Uploading...' : 'Upload'}
                <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'secondary_image_url', 'story')} className="hidden" />
              </label>
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

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { GalleryImage } from '@/lib/types';
import { uploadImage, deleteImage } from '@/lib/upload';
import { Plus, Trash2, X, Upload, Pencil, GripVertical } from 'lucide-react';

const SPAN_OPTIONS = [
  { label: 'Small (1×1)', value: 'col-span-1 row-span-1' },
  { label: 'Wide (2×1)', value: 'col-span-2 row-span-1' },
  { label: 'Tall (1×2)', value: 'col-span-1 row-span-2' },
  { label: 'Large (2×2)', value: 'col-span-2 row-span-2' },
];

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ image_url: '', caption: '', display_order: 0, span_class: 'col-span-1 row-span-1' });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    const { data } = await supabase.from('gallery_images').select('*').order('display_order');
    setImages(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const openModal = (img?: GalleryImage) => {
    if (img) {
      setEditId(img.id);
      setForm({ image_url: img.image_url, caption: img.caption ?? '', display_order: img.display_order, span_class: img.span_class });
    } else {
      setEditId(null);
      setForm({ image_url: '', caption: '', display_order: images.length + 1, span_class: 'col-span-1 row-span-1' });
    }
    setShowModal(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file, 'gallery');
    if (url) setForm((f) => ({ ...f, image_url: url }));
    setUploading(false);
  };

  const save = async () => {
    setSaving(true);
    const payload = {
      image_url: form.image_url,
      caption: form.caption || null,
      display_order: form.display_order,
      span_class: form.span_class,
    };
    if (editId) {
      await supabase.from('gallery_images').update(payload).eq('id', editId);
    } else {
      await supabase.from('gallery_images').insert(payload);
    }
    setSaving(false);
    setShowModal(false);
    loadData();
  };

  const remove = async (img: GalleryImage) => {
    if (!confirm('Delete this image?')) return;
    await deleteImage(img.image_url);
    await supabase.from('gallery_images').delete().eq('id', img.id);
    loadData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-ink-800 mb-1">Gallery</h1>
          <p className="text-sm text-ink-400">Upload, caption, and arrange images.</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-ivory-50 bg-ink-800 rounded-lg hover:bg-botanical-600 transition-colors">
          <Plus size={16} /> Add Image
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-ink-400">Loading...</p>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-sm text-ink-400 mb-4">No gallery images yet.</p>
          <button onClick={() => openModal()} className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-ivory-50 bg-ink-800 rounded-lg hover:bg-botanical-600 transition-colors">
            <Plus size={16} /> Add First Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {images.map((img) => (
            <div key={img.id} className="bg-white rounded-xl overflow-hidden group">
              <div className="relative aspect-square overflow-hidden bg-ivory-100">
                <img src={img.image_url} alt={img.caption ?? ''} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => openModal(img)} className="p-2 bg-white/90 rounded-full text-ink-700 hover:text-botanical-600 transition-colors"><Pencil size={16} /></button>
                  <button onClick={() => remove(img)} className="p-2 bg-white/90 rounded-full text-ink-700 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
                <span className="absolute top-2 left-2 text-[10px] font-medium uppercase tracking-wide text-ink-700 bg-white/80 px-2 py-0.5 rounded-full">#{img.display_order}</span>
              </div>
              <div className="p-3">
                <p className="text-xs text-ink-500 line-clamp-2">{img.caption || 'No caption'}</p>
                <p className="text-[10px] text-ink-300 mt-1">{SPAN_OPTIONS.find((s) => s.value === img.span_class)?.label ?? 'Custom'}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-ink-100 sticky top-0 bg-white rounded-t-2xl">
              <h2 className="font-serif text-lg text-ink-800">{editId ? 'Edit Image' : 'Add Image'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 text-ink-400 hover:text-ink-700 hover:bg-ivory-100 rounded-lg transition-colors"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5">Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-ivory-100 shrink-0">
                    {form.image_url ? <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-ink-300"><Upload size={20} /></div>}
                  </div>
                  <div className="flex-1">
                    <label className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-ink-700 bg-ivory-100 rounded-lg hover:bg-ivory-200 transition-colors cursor-pointer">
                      <Upload size={14} />{uploading ? 'Uploading...' : 'Upload'}
                      <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
                    </label>
                    <input type="text" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                      className="w-full mt-2 px-3 py-2 text-xs rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400" placeholder="or paste URL" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5">Caption</label>
                <textarea value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400 resize-none" rows={2} placeholder="A warm cappuccino in morning light" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-500 mb-1.5">Display Order</label>
                  <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-500 mb-1.5">Grid Size</label>
                  <select value={form.span_class} onChange={(e) => setForm({ ...form, span_class: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400">
                    {SPAN_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={save} disabled={saving || !form.image_url} className="w-full py-3 text-sm font-medium text-ivory-50 bg-ink-800 rounded-lg hover:bg-botanical-600 transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Image'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

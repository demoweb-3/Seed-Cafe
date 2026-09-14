import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { MenuCategory, MenuItem } from '@/lib/types';
import { uploadImage } from '@/lib/upload';
import { Plus, Pencil, Trash2, X, Upload, Star, Eye, EyeOff, UtensilsCrossed } from 'lucide-react';

type ItemForm = {
  id?: string;
  category_id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  tag: string;
  is_available: boolean;
  is_featured: boolean;
  display_order: number;
};

const EMPTY_ITEM: ItemForm = {
  category_id: '',
  name: '',
  description: '',
  price: '',
  image_url: '',
  tag: '',
  is_available: true,
  is_featured: false,
  display_order: 0,
};

export default function MenuManager() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Modals
  const [showCatModal, setShowCatModal] = useState(false);
  const [catForm, setCatForm] = useState({ id: '', title: '', display_order: 0 });
  const [showItemModal, setShowItemModal] = useState(false);
  const [itemForm, setItemForm] = useState<ItemForm>(EMPTY_ITEM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    const [catRes, itemRes] = await Promise.all([
      supabase.from('menu_categories').select('*').order('display_order'),
      supabase.from('menu_items').select('*').order('display_order'),
    ]);
    setCategories(catRes.data ?? []);
    setItems(itemRes.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((i) => i.category_id === activeCategory);

  // Category CRUD
  const openCatModal = (cat?: MenuCategory) => {
    setCatForm(cat ? { id: cat.id, title: cat.title, display_order: cat.display_order } : { id: '', title: '', display_order: 0 });
    setShowCatModal(true);
  };

  const saveCategory = async () => {
    setSaving(true);
    if (catForm.id) {
      await supabase.from('menu_categories').update({
        title: catForm.title,
        display_order: catForm.display_order,
      }).eq('id', catForm.id);
    } else {
      await supabase.from('menu_categories').insert({
        title: catForm.title,
        display_order: catForm.display_order,
      });
    }
    setSaving(false);
    setShowCatModal(false);
    loadData();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category and all its items?')) return;
    await supabase.from('menu_categories').delete().eq('id', id);
    loadData();
  };

  // Item CRUD
  const openItemModal = (item?: MenuItem) => {
    if (item) {
      setItemForm({
        id: item.id,
        category_id: item.category_id,
        name: item.name,
        description: item.description ?? '',
        price: item.price,
        image_url: item.image_url ?? '',
        tag: item.tag ?? '',
        is_available: item.is_available,
        is_featured: item.is_featured,
        display_order: item.display_order,
      });
    } else {
      setItemForm({
        ...EMPTY_ITEM,
        category_id: categories[0]?.id ?? '',
        display_order: items.length + 1,
      });
    }
    setShowItemModal(true);
  };

  const saveItem = async () => {
    setSaving(true);
    const payload = {
      category_id: itemForm.category_id,
      name: itemForm.name,
      description: itemForm.description || null,
      price: itemForm.price,
      image_url: itemForm.image_url || null,
      tag: itemForm.tag || null,
      is_available: itemForm.is_available,
      is_featured: itemForm.is_featured,
      display_order: itemForm.display_order,
    };
    if (itemForm.id) {
      await supabase.from('menu_items').update(payload).eq('id', itemForm.id);
    } else {
      await supabase.from('menu_items').insert(payload);
    }
    setSaving(false);
    setShowItemModal(false);
    loadData();
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this menu item?')) return;
    await supabase.from('menu_items').delete().eq('id', id);
    loadData();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file, 'menu');
    if (url) setItemForm((f) => ({ ...f, image_url: url }));
    setUploading(false);
  };

  const toggleFeatured = async (item: MenuItem) => {
    await supabase.from('menu_items').update({ is_featured: !item.is_featured }).eq('id', item.id);
    loadData();
  };

  const toggleAvailable = async (item: MenuItem) => {
    await supabase.from('menu_items').update({ is_available: !item.is_available }).eq('id', item.id);
    loadData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-ink-800 mb-1">Menu Management</h1>
          <p className="text-sm text-ink-400">Manage categories and menu items.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => openCatModal()} className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-ink-700 bg-white rounded-lg hover:bg-ivory-100 transition-colors">
            <Plus size={16} /> Category
          </button>
          <button onClick={() => openItemModal()} disabled={categories.length === 0} className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-ivory-50 bg-ink-800 rounded-lg hover:bg-botanical-600 transition-colors disabled:opacity-50">
            <Plus size={16} /> Add Item
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeCategory === 'all' ? 'bg-ink-800 text-ivory-50' : 'bg-white text-ink-600 hover:bg-ivory-100'}`}
        >
          All ({items.length})
        </button>
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-1 group">
            <button
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeCategory === cat.id ? 'bg-ink-800 text-ivory-50' : 'bg-white text-ink-600 hover:bg-ivory-100'}`}
            >
              {cat.title} ({items.filter((i) => i.category_id === cat.id).length})
            </button>
            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openCatModal(cat)} className="p-1.5 text-ink-400 hover:text-botanical-600"><Pencil size={14} /></button>
              <button onClick={() => deleteCategory(cat.id)} className="p-1.5 text-ink-400 hover:text-red-500"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Items grid */}
      {loading ? (
        <p className="text-sm text-ink-400">Loading...</p>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-sm text-ink-400 mb-4">No menu items yet.</p>
          <button onClick={() => openItemModal()} className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-ivory-50 bg-ink-800 rounded-lg hover:bg-botanical-600 transition-colors">
            <Plus size={16} /> Add First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden group">
              <div className="relative aspect-square overflow-hidden bg-ivory-100">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink-300">
                    <UtensilsCrossed size={32} />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <button onClick={() => toggleFeatured(item)} className={`p-1.5 rounded-full transition-colors ${item.is_featured ? 'bg-golden-300 text-ink-800' : 'bg-white/80 text-ink-400 hover:text-golden-500'}`}>
                    <Star size={14} fill={item.is_featured ? 'currentColor' : 'none'} />
                  </button>
                  <button onClick={() => toggleAvailable(item)} className={`p-1.5 rounded-full transition-colors ${item.is_available ? 'bg-white/80 text-botanical-600' : 'bg-red-50 text-red-400'}`}>
                    {item.is_available ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-sm text-ink-800 leading-tight">{item.name}</h3>
                  <span className="text-xs font-medium text-botanical-600 whitespace-nowrap">{item.price}</span>
                </div>
                {item.tag && <span className="inline-block mt-1 text-[10px] uppercase tracking-wide text-golden-600 bg-golden-100 px-2 py-0.5 rounded-full">{item.tag}</span>}
                <p className="text-xs text-ink-400 mt-1 line-clamp-2">{item.description}</p>
                <div className="flex gap-2 mt-3 pt-3 border-t border-ink-100">
                  <button onClick={() => openItemModal(item)} className="flex items-center gap-1 text-xs text-ink-500 hover:text-botanical-600 transition-colors">
                    <Pencil size={12} /> Edit
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="flex items-center gap-1 text-xs text-ink-500 hover:text-red-500 transition-colors ml-auto">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category modal */}
      {showCatModal && (
        <Modal title={catForm.id ? 'Edit Category' : 'New Category'} onClose={() => setShowCatModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Category Title</label>
              <input
                type="text"
                value={catForm.title}
                onChange={(e) => setCatForm({ ...catForm, title: e.target.value })}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400"
                placeholder="e.g. Coffee"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Display Order</label>
              <input
                type="number"
                value={catForm.display_order}
                onChange={(e) => setCatForm({ ...catForm, display_order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400 focus:ring-1 focus:ring-botanical-400"
              />
            </div>
            <button onClick={saveCategory} disabled={saving || !catForm.title} className="w-full py-3 text-sm font-medium text-ivory-50 bg-ink-800 rounded-lg hover:bg-botanical-600 transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </Modal>
      )}

      {/* Item modal */}
      {showItemModal && (
        <Modal title={itemForm.id ? 'Edit Menu Item' : 'New Menu Item'} onClose={() => setShowItemModal(false)} wide>
          <div className="space-y-4">
            {/* Image upload */}
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Image</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-ivory-100 shrink-0">
                  {itemForm.image_url ? (
                    <img src={itemForm.image_url} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink-300"><Upload size={20} /></div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-ink-700 bg-ivory-100 rounded-lg hover:bg-ivory-200 transition-colors cursor-pointer">
                    <Upload size={14} />
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                  <input
                    type="text"
                    value={itemForm.image_url}
                    onChange={(e) => setItemForm({ ...itemForm, image_url: e.target.value })}
                    className="w-full mt-2 px-3 py-2 text-xs rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400"
                    placeholder="or paste image URL"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5">Name</label>
                <input type="text" value={itemForm.name} onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400" placeholder="Flat White" />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5">Price</label>
                <input type="text" value={itemForm.price} onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400" placeholder="LKR 650" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5">Description</label>
              <textarea value={itemForm.description} onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400 resize-none" rows={2} placeholder="Double ristretto, silky steamed milk" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5">Category</label>
                <select value={itemForm.category_id} onChange={(e) => setItemForm({ ...itemForm, category_id: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400">
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5">Tag (optional)</label>
                <input type="text" value={itemForm.tag} onChange={(e) => setItemForm({ ...itemForm, tag: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400" placeholder="Signature" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-ink-500 mb-1.5">Display Order</label>
                <input type="number" value={itemForm.display_order} onChange={(e) => setItemForm({ ...itemForm, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-ink-200 bg-ivory-50 focus:outline-none focus:border-botanical-400" />
              </div>
              <div className="flex items-end gap-4 pb-1">
                <label className="flex items-center gap-2 text-sm text-ink-600 cursor-pointer">
                  <input type="checkbox" checked={itemForm.is_available} onChange={(e) => setItemForm({ ...itemForm, is_available: e.target.checked })}
                    className="w-4 h-4 rounded accent-botanical-600" />
                  Available
                </label>
                <label className="flex items-center gap-2 text-sm text-ink-600 cursor-pointer">
                  <input type="checkbox" checked={itemForm.is_featured} onChange={(e) => setItemForm({ ...itemForm, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded accent-golden-500" />
                  Featured
                </label>
              </div>
            </div>

            <button onClick={saveItem} disabled={saving || !itemForm.name || !itemForm.price || !itemForm.category_id}
              className="w-full py-3 text-sm font-medium text-ivory-50 bg-ink-800 rounded-lg hover:bg-botanical-600 transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Item'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${wide ? 'max-w-lg' : 'max-w-sm'} max-h-[90vh] overflow-y-auto animate-scale-in`}>
        <div className="flex items-center justify-between p-5 border-b border-ink-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="font-serif text-lg text-ink-800">{title}</h2>
          <button onClick={onClose} className="p-1.5 text-ink-400 hover:text-ink-700 hover:bg-ivory-100 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}



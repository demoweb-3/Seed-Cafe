import { supabase, STORAGE_BUCKET } from './supabase';

export async function uploadImage(file: File, folder: string = 'menu'): Promise<string | null> {
  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, { contentType: file.type });

  if (error) return null;

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  if (!url) return;
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname.split(`/${STORAGE_BUCKET}/`)[1];
    if (path) {
      await supabase.storage.from(STORAGE_BUCKET).remove([path]);
    }
  } catch {
    // ignore — might be an external URL
  }
}

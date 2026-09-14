import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const FALLBACK_URL = 'https://ziacqgryhzfhtlnrasei.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppYWNxZ3J5aHpmaHRsbnJhc2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwOTQzNjEsImV4cCI6MjEwNDY3MDM2MX0.IbKmk3m_ZidlKgy74hNdv-tY5tNFyaCccADNU8yPx0c';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || FALLBACK_URL;
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || FALLBACK_KEY;

let client: SupabaseClient;
try {
  client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storageKey: 'seed-cafe-auth',
    },
  });
} catch {
  client = createClient(FALLBACK_URL, FALLBACK_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

export const supabase = client;
export const STORAGE_BUCKET = 'cafe-images';

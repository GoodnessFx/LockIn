import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

let supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (supabase) return supabase;

  const extra: any = Constants?.expoConfig?.extra || {};
  const url = extra?.supabaseUrl as string | undefined;
  const anon = extra?.supabaseAnonKey as string | undefined;

  if (!url || !anon) {
    throw new Error('Supabase credentials are not configured in app config (extra.supabaseUrl/extra.supabaseAnonKey).');
  }

  supabase = createClient(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'X-Client-Info': 'lockin-mobile',
      },
    },
  });
  return supabase;
}


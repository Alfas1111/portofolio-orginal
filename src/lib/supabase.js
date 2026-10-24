import { createClient } from '@supabase/supabase-js';

// Fallback to project credentials if hosting environment variables are not set
const DEFAULT_SUPABASE_URL = 'https://nhuwwyajhrpsdfiszpbx.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5odXd3eWFqaHJwc2RmaXN6cGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1OTg5NjMsImV4cCI6MjEwODE3NDk2M30.nyBD1SM4Y7bA4oHRH4EZf2o8VhpF6WBfUGGaM7V9DMw';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-anon-key')
);

let supabase = null;

if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    }
  });
}

export { supabase };
export default supabase;

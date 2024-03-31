import { createClient } from "@supabase/supabase-js";

let supabaseInstance = null;

export const getSupabaseInstance = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    );
  }
  return supabaseInstance;
};

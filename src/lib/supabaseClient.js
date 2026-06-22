import { createClient } from "@supabase/supabase-js";

export const portfolioBucket =
  import.meta.env.VITE_SUPABASE_PORTFOLIO_BUCKET || "eventart-portfolio";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// The app still renders beautifully without env vars, which keeps local editing easy.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

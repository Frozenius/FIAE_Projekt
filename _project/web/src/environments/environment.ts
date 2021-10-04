import {createClient, SupabaseClient} from "@supabase/supabase-js";
import { initSupabase } from '../app/_utils/initSupabase'

export const environment = {
  production: false,
  qstatsUrl: "http://10.10.1.86:5000/qstats",
  portalUrl: "http://10.10.1.86:5000/portals"
};

export const supabase: SupabaseClient = createClient(initSupabase.supabaseUrl, initSupabase.supabaseKey);


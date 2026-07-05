import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lteuertfircctjkhzbmn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0ZXVlcnRmaXJjY3Rqa2h6Ym1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNDk3OTUsImV4cCI6MjA5ODgyNTc5NX0.TgSK-RYbnFsZeUINcMUIMfn3R5SXTbLmvGo9liOuA-E";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

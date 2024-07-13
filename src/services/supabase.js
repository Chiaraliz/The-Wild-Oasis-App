import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://rsemzkmkpzquiefkwftq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZW16a21rcHpxdWllZmt3ZnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2ODIyMTksImV4cCI6MjAzNjI1ODIxOX0.CvTP7hcDa6nXAM8KKIRlLRWC2Sf8QRMchtzTis8yc-4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

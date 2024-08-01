import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qeaxsmemmefrinsmffll.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlYXhzbWVtbWVmcmluc21mZmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5MzcwNDAsImV4cCI6MjAzNjUxMzA0MH0.6Vq0FgHCUyFO-vbY9mWjBgiaUY-gNkNKHc2PHpRicGc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

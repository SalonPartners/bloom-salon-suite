// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bgircjbqyhmmzapbvmcs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnaXJjamJxeWhtbXphcGJ2bWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NzI1MzcsImV4cCI6MjA2NDU0ODUzN30.SdMBECDelJ59r1ayx5wyZ0_7cn07DiUWPwmd4GQDq80";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
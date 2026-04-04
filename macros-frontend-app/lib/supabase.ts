import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://iwnjwwzpkpepahepwmji.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3bmp3d3pwa3BlcGFoZXB3bWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNzM2NDUsImV4cCI6MjA5MDg0OTY0NX0.42fM9Uwwjm6iiyszOmL0U--R5frr9LPdWlLnRGg0joA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
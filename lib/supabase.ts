import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// Replace with your Supabase URL and anon key
const supabaseUrl = 'https://yvssmuynafmysjdvuplq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2c3NtdXluYWZteXNqZHZ1cGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODk2OTksImV4cCI6MjA1NzA2NTY5OX0.foX0LD2uKpia9SAEuDUPUDEOonfBlgdpsq71LMcWsCQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;
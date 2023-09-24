export const NODE_ENV = process.env.NODE_ENV || 'development'
export const APP_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : (process.env.NEXT_PUBLIC_URL || 'http://localhost:3000')

export const API_URL = '/api'
export const SUPABASE_URL = process.env.SUPABASE_URL || ''
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || ''
export const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || NODE_ENV

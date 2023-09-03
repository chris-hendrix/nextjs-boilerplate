import { createClient } from '@supabase/supabase-js'

const createSupabaseClient = () => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

const getSupabaseClient = () => {
  if (process.env.NODE_ENV === 'production') return createSupabaseClient()
  if (!global.supabase) global.supabase = createSupabaseClient()
  return global.supabase
}

const supabase = getSupabaseClient()
export default supabase

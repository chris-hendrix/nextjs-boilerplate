/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { PrismaClient } from '@prisma/client'
import { SupabaseClient } from '@supabase/supabase-js'

declare global {
  var prisma: PrismaClient | null
  var supabase: SupabaseClient | null
}

declare module 'next-auth' {
  export interface Session extends NextAuth.Session {
    user: User | null
  }
}

declare module 'next/server' {
  export interface NextRequest extends NextServer.NextRequest {
    consumedBody: any | null = null
  }
}

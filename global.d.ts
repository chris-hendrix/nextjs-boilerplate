/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | null
}

declare module 'next-auth' {
  export interface Session extends NextAuth.Session {
    user: User | null
  }
}

declare module 'next/server' {
  export interface NextRequest extends NextServer.NextRequest {
    jsonBody: any | null = null
  }
}

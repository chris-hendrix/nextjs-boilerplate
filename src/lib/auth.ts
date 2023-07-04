/* eslint-disable no-param-reassign */
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma'
import { validatePassword } from '@/utils/hash'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'username' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('Invalid credentials')

        const user = await prisma.user.findUnique({ where: { username: credentials.username } })
        if (!user) throw new Error('Invalid credentials')

        const valid = await validatePassword(credentials.password, user?.password as string)
        if (!valid) throw new Error('Invalid credentials')
        return user
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: { strategy: 'jwt' }, // for credentials provider
  callbacks: {
    async session({ session, user, token }) {
      const email = user?.email || token?.email as string
      session.user = await prisma.user.findUnique({ where: { email } })
      return session
    }
  }
}

export default authOptions

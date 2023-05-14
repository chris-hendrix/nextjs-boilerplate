import { PrismaClient } from '@prisma/client'

const getPrismaClient = () => {
  if (process.env.NODE_ENV === 'production') return new PrismaClient()
  if (!global.prisma) global.prisma = new PrismaClient()
  return global.prisma
}

const prisma = getPrismaClient()
export default prisma

/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | null
}

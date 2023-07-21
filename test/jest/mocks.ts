import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { generateUserBody } from '../utils'

jest.mock('next-auth') // must be imported in test file as well

export const createGetServerSessionMock = async () => {
  const user = await prisma.user.create({
    data: generateUserBody()
  })
  const mockGetServerSession = getServerSession as jest.Mock
  mockGetServerSession.mockReturnValueOnce(Promise.resolve({
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user
  }))
  return user
}

export default createGetServerSessionMock

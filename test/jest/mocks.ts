import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'

jest.mock('next-auth') // must be imported in test file as well

export const createGetServerSessionMock = async () => {
  const username = `patch-adams-${new Date().getTime()}`
  const user = await prisma.user.create({
    data: { username, email: `${username}@email.com` }
  })
  const mockGetServerSession = getServerSession as jest.Mock
  mockGetServerSession.mockReturnValueOnce(Promise.resolve({
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user
  }))
  return user
}

export default createGetServerSessionMock

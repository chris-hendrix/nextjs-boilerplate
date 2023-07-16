import prisma from '@/lib/prisma'
import { GET as getUsers, POST as postUser } from '@/app/api/users/route'
import { PUT as putUser } from '@/app/api/users/[id]/route'
import { Cleaner, createNextRequest } from '../utils'
import { createGetServerSessionMock } from './mocks'

jest.mock('next-auth')

describe('/api/users', () => {
  const cleaner = new Cleaner()

  const createUserBody = () => {
    const datetime = new Date().getTime()
    return {
      name: `Patch Adams ${datetime}`,
      username: `patch-adams-${datetime}`,
      email: `patch-adams-${datetime}@email.com`,
      password: '12341234'
    }
  }

  afterAll(async () => {
    await cleaner.deleteUsers()
  })

  test('users can be retrieved', async () => {
    const req = createNextRequest()
    const res = await getUsers(req)
    expect(res.status).toBe(200)
  })

  test('user can signup with username and password', async () => {
    const body = createUserBody()
    const req = createNextRequest({ method: 'POST', body })
    const res = await postUser(req)
    expect(res.status).toBe(200)

    const data = await res.json()
    expect(data).toEqual(
      expect.objectContaining({ username: body.username }),
    )
  })

  test('user can edit same user', async () => {
    const user = await createGetServerSessionMock()
    const body = { username: `put-adams-${new Date().getTime()}` }
    const req = createNextRequest({ method: 'PUT', body })
    const res = await putUser(req, { params: { id: user.id } })
    expect(res.status).toBe(200)

    const data = await res.json()
    expect(data).toEqual(
      expect.objectContaining({ username: body.username }),
    )
  })

  test('user cannot edit different user', async () => {
    await createGetServerSessionMock()
    const body = { name: 'Put Adams' }
    const otherUser = await prisma.user.create({
      data: {
        username: 'other-adams',
        email: `other-adams-${new Date().getTime()}@email.com`
      }
    })
    const req = createNextRequest({ method: 'PUT', body })
    const res = await putUser(req, { params: { id: otherUser.id } })
    expect(res.status).toBe(401)
  })
})

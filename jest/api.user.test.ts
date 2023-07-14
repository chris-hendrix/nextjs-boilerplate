/* eslint-disable no-underscore-dangle */
import { Api, Cleaner } from './utils'

describe('/api/users', () => {
  const usersApi = new Api('/api/users')
  const cleaner = new Cleaner()

  afterAll(async () => {
    await cleaner.deleteUsers()
  })

  test('users can be retrieved', async () => {
    const res = await usersApi.get()
    expect(res.status).toBe(200)
  })

  test('user can signup with username and password', async () => {
    const datetime = new Date().getTime()
    const body = {
      name: `Patch Adams ${datetime}`,
      username: `patch-adams-${datetime}`,
      email: `patch-adams-${datetime}@email.com`,
      password: '12341234'
    }

    const res = await usersApi.post(body)
    expect(res.status).toBe(200)

    const data = await res.json()
    expect(data).toEqual(
      expect.objectContaining({ username: body.username }),
    )
  })
})

import { createRequest, RequestMethod } from 'node-mocks-http'
import { TEST_PREFIX } from '../src/config'
import prisma from '../src/lib/prisma'

type CreateNextRequest = {
  method?: RequestMethod | undefined
  body?: any | undefined
  searchParams?: { [key: string]: string | number } | undefined
}

const defaultOptions = {
  method: 'GET' as RequestMethod,
  body: undefined,
  searchParams: undefined
}

export const createNextRequest = (options: CreateNextRequest = defaultOptions) => {
  const { method, body, searchParams } = options
  const req = createRequest({ method })
  req.consumedBody = { ...body }
  req.nextUrl = {
    searchParams: new URLSearchParams(
      Object.entries(searchParams || {}).map(([key, value]) => [key, value.toString()])
    )
  }
  return req
}

export const generateUserBody = () => {
  const datetime = new Date().getTime()
  return {
    name: `Patch Adams ${datetime}`,
    username: `${TEST_PREFIX}-patch-adams-${datetime}`,
    email: `${TEST_PREFIX}-patch-adams-${datetime}@email.com`,
    password: 'Abcd1234!'
  }
}

export const deleteTestUsers = async () => prisma.user.deleteMany({
  where: { username: { contains: TEST_PREFIX } }
})

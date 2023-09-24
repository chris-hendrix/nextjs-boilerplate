import { createRequest, RequestMethod } from 'node-mocks-http'
import prisma from '../src/lib/prisma'

export const TEST_EMAIL_DOMAIN = 'test.com'

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
  req.headers = { 'content-type': '', ...req.headers }
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
    username: `patch-adams-${datetime}`,
    email: `patch-adams-${datetime}@${TEST_EMAIL_DOMAIN}`,
    password: 'Abcd1234!'
  }
}

export const deleteTestUsers = async () => prisma.user.deleteMany({
  where: { username: { endsWith: `@${TEST_EMAIL_DOMAIN}` } }
})

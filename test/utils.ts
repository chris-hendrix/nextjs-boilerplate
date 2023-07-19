import { createRequest, RequestMethod } from 'node-mocks-http'

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
  req.json = () => Promise.resolve(body)
  req.nextUrl = {
    searchParams: new URLSearchParams(
      Object.entries(searchParams || {}).map(([key, value]) => [key, value.toString()])
    )
  }
  return req
}

export const createUserBody = () => {
  const datetime = new Date().getTime()
  return {
    name: `Patch Adams ${datetime}`,
    username: `patch-adams-${datetime}`,
    email: `patch-adams-${datetime}@email.com`,
    password: 'Abcd1234!'
  }
}

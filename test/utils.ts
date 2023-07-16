/* eslint-disable max-classes-per-file */
import { createRequest, RequestMethod } from 'node-mocks-http'
import prisma from '@/lib/prisma'

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

export class Cleaner {
  startTime: Date

  constructor() {
    this.startTime = new Date()
  }

  public async deleteUsers() {
    const endTime = new Date()
    await prisma.user.deleteMany({
      where: { createdAt: { gte: this.startTime, lte: endTime } }
    })
  }
}

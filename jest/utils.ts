/* eslint-disable max-classes-per-file */
import prisma from '@/lib/prisma'
import { APP_URL } from '@/config'

export class Api {
  path = ''

  constructor(path: string) {
    this.path = path
  }

  private async baseFetch(method: string = 'GET', body: any = null): Promise<Response> {
    return fetch(`${APP_URL}${this.path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined
    })
  }

  public async get() { return this.baseFetch() }

  public async post(body: any) { return this.baseFetch('POST', body) }
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

export default Api

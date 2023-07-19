import prisma from '../src/lib/prisma'

export default class Cleaner {
  startTime: Date

  constructor(startTime: Date | null = null) {
    this.startTime = startTime || new Date()
  }

  public async deleteUsers() {
    const endTime = new Date()
    return prisma.user.deleteMany({
      where: { createdAt: { gte: this.startTime, lte: endTime } }
    })
  }
}

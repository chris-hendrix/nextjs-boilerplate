import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { generateHash } from '@/utils/hash'
import { ApiError, routeWrapper, getQueryParams } from '@/utils/api'

export const sanitizeUserSelect = () => {
  const fields = Object.keys(Prisma.UserScalarFieldEnum)
  return Object.fromEntries(fields.map((k) => [k, k !== 'password']))
}

export const checkUserBody = async (body: any, id: string | null = null) => {
  const usernameExists = async (username: string) => {
    const user = await prisma.user.findUnique({ where: { username } })
    if (!id) return Boolean(user)
    return Boolean(user && user.id !== id)
  }
  const emailExists = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!id) return Boolean(user)
    return Boolean(user && user.id !== id)
  }

  if (!body) throw new ApiError('Request must have body', 400)
  const { username, email } = body
  if (username && await usernameExists(username)) throw new ApiError('Username exists', 400)
  if (email && await emailExists(email)) throw new ApiError('Email exists', 400)
}

export const GET = routeWrapper(
  async (req: NextRequest) => {
    const queryParams = getQueryParams(req.nextUrl)
    const users = await prisma.user.findMany({
      ...queryParams,
      select: sanitizeUserSelect()
    })
    return NextResponse.json(users)
  }
)

export const POST = routeWrapper(async (req: NextRequest) => {
  await checkUserBody(req.consumedBody)

  const { email, password } = req.consumedBody
  const hash = await generateHash(password)
  const user = await prisma.user.create({
    data: { email, password: hash },
    select: sanitizeUserSelect()
  })
  return NextResponse.json(user)
})

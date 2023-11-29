import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { generateHash } from '@/utils/hash'
import { routeWrapper, getQueryParams, sanitizeUserSelect, checkUserBody } from '@/utils/api'

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

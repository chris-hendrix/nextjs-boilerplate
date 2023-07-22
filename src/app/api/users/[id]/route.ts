import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ApiError, routeWrapper, checkUserMatchesSession } from '@/utils/api'
import { checkUserBody, sanitizeUserSelect } from '../route'

export const GET = routeWrapper(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params

    if (!id) throw new ApiError('User id required', 400)

    const user = await prisma.user.findUnique({ where: { id }, select: sanitizeUserSelect() })
    return NextResponse.json(user)
  }
)

export const PUT = routeWrapper(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params
    if (!id) throw new ApiError('User id required', 400)

    await checkUserBody(req.jsonBody, id)
    await checkUserMatchesSession(id)

    const updatedUser = await prisma.user.update({
      where: { id },
      data: req.jsonBody,
      select: sanitizeUserSelect()
    })

    return NextResponse.json(updatedUser)
  }
)

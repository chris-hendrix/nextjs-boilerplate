import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ApiError, routeWrapper } from '@/utils/api'
import { sanitizeSelect } from '../route'

export const GET = routeWrapper(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params

    if (!id) throw new ApiError('User id required')

    const user = await prisma.user.findUnique({ where: { id }, select: sanitizeSelect() })
    return NextResponse.json(user)
  }
)

export default GET

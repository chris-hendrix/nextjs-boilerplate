import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ApiError, routeWrapper, checkUserMatchesSession } from '@/utils/api'
import { generateHash, validatePassword } from '@/utils/hash'
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

    // change password logic
    if (req.consumedBody?.currentPassword) {
      const user = await prisma.user.findUnique({ where: { id } })
      const { currentPassword, password, confirmPassword } = req.consumedBody
      const valid = (
        password === confirmPassword &&
        await validatePassword(currentPassword, String(user?.password))
      )

      if (!valid) throw new ApiError('Invalid credentials', 401)
      if (password === currentPassword) throw new ApiError('New password is the same as existing', 409)

      const hash = await generateHash(password)
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { password: hash },
        select: sanitizeUserSelect()
      })
      return NextResponse.json(updatedUser)
    }

    await checkUserBody(req.consumedBody, id)
    await checkUserMatchesSession(id)

    const updatedUser = await prisma.user.update({
      where: { id },
      data: req.consumedBody,
      select: sanitizeUserSelect()
    })

    return NextResponse.json(updatedUser)
  }
)

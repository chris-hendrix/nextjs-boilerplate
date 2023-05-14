import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { generateHash } from '@/utils/hash'
import { ApiError } from '@/utils/api'

const sanitizeSelect = () => {
  const fields = Object.keys(Prisma.UserScalarFieldEnum)
  return Object.fromEntries(fields.map((k) => [k, k !== 'password']))
}

export const GET = async (req: NextRequest) => {
  const skip = req.nextUrl.searchParams.get('skip')
  const take = req.nextUrl.searchParams.get('take')
  const users = await prisma.user.findMany({
    skip: skip && take ? Number(skip) : undefined,
    take: skip && take ? Number(take) : undefined,
    select: sanitizeSelect()
  })
  NextResponse.json(users)
  return NextResponse.json(users)
}

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  if (!body) throw new ApiError('Request must have body', 400)
  const { username, email, password } = body
  if (await prisma.user.findUnique({ where: { email } })) {
    throw new ApiError('Email exists', 400)
  }
  const hash = await generateHash(password)
  const user = await prisma.user.create({
    data: { username, email, password: hash },
    select: sanitizeSelect()
  })
  return NextResponse.json(user)
}

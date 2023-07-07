/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import authOptions from '@/lib/auth'

export class ApiError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

const logRequest = (req: NextRequest) => {
  if (process.env.NODE_ENV === 'test') return
  const { method, url, body } = req
  console.info('---')
  method && console.info(`Method: ${method}`)
  url && console.info(`Path:   ${url}`)
  body && console.info(`Body:   ${JSON.stringify(body)}`)
  console.info('---')
}

const logError = (error: any) => {
  if (process.env.NODE_ENV === 'test') return
  console.info(`Error:  ${JSON.stringify(error)}`)
  console.info('---')
}

const getErrorMessage = (message: string) => {
  if (message.includes('Unique constraint failed on the fields: (`username`)')) return 'Username exists'
  return message
}

export const routeWrapper = (
  routeHandler: (
    req: NextRequest, context?: any) => Promise<NextResponse>
) => async (req: NextRequest, context?: any) => {
  try {
    logRequest(req)
    const result = await routeHandler(req, context)
    return result
  } catch (error: any) {
    const response = {
      ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
      message: getErrorMessage(error.message),
      statusCode: error.statusCode,
    }
    logError(response)
    return NextResponse.json(response, { status: error.statusCode || 500 })
  }
}

export const withSessionUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions)
  if (!session) throw new ApiError('Unauthorized', 401)
  return session?.user
}

export const withUserMatchingSession = async (userId: string | undefined) => {
  const [user, session] = await Promise.all([
    userId && await prisma.user.findUnique({ where: { id: userId } }),
    await getServerSession(authOptions)
  ])
  if (!user) throw new ApiError('User does not exist', 400)
  if (session?.user?.id !== userId) throw new ApiError('Unauthorized', 401)
}

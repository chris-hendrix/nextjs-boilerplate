/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]'

export class ApiError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

const logRequest = (req: NextApiRequest) => {
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

export const apiHandler = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    logRequest(req)
    const result = await handler(req, res)
    return result
  } catch (error: any) {
    const response = {
      ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
      message: error.message,
      statusCode: error.statusCode,
    }
    logError(response)
    return res.status(error.statusCode || 500).json(response)
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

export const withUserMatchingSession = async (
  userId: string | undefined,
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const [user, session] = await Promise.all([
    userId && await prisma.user.findUnique({ where: { id: userId } }),
    await getServerSession(req, res, authOptions)
  ])
  if (!user) throw new ApiError('User does not exist', 400)
  if (session?.user?.id !== userId) throw new ApiError('Unauthorized', 401)
}

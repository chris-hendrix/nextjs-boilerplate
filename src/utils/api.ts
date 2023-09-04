/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
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

const sanitizeBody = (consumedBody: any) => {
  const sanitizedText = '*****'
  const sanitizedBody = { ...consumedBody }
  if ('password' in sanitizedBody) sanitizedBody.password = sanitizedText
  if ('cpassword' in sanitizedBody) sanitizedBody.cpassword = sanitizedText
  return sanitizedBody
}

const logRequest = (req: NextRequest) => {
  if (process.env.NODE_ENV === 'test') return
  const { method, url, consumedBody } = req
  console.info('---')
  method && console.info(`Method: ${method}`)
  url && console.info(`Path:   ${url}`)
  consumedBody && console.info(`Body:   ${JSON.stringify(sanitizeBody(consumedBody))}`)
  console.info('---')
}

const logError = (error: any) => {
  if (process.env.NODE_ENV === 'test') return
  console.info(`Error:  ${JSON.stringify(error)}`)
  console.info('---')
}

const getErrorMessage = (message: string) => {
  if (message.includes('Unique constraint failed on the fields: (`username`)')) return 'Username exists'
  if (message.includes('Unique constraint failed on the fields: (`email`)')) return 'Email exists'
  return message
}

export const routeWrapper = (
  routeHandler: (
    req: NextRequest, context?: any) => Promise<NextResponse>
) => async (req: NextRequest, context?: any) => {
  const setConsumedBody = async () => {
    const contentType = req.headers.get('content-type')?.toLowerCase()
    console.log({ contentType })
    if (contentType === 'application/json') req.consumedBody = await req.json()
    if (contentType === 'multipart/form-data') req.consumedBody = await req.formData()
  }
  try {
    await setConsumedBody()
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

export const withSessionUser = async () => {
  const session = await getServerSession(authOptions)
  if (!session) throw new ApiError('Unauthorized', 401)
  return session?.user
}

export const checkUserMatchesSession = async (userId: string | undefined) => {
  const session = await getServerSession(authOptions)
  if (session?.user?.id !== userId) throw new ApiError('Unauthorized', 401)
}

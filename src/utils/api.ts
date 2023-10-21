/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'
import { NextURL } from 'next/dist/server/web/next-url'

/**
 * Custom error class representing API errors with a specific status code.
 */
export class ApiError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

/**
 * Sanitizes sensitive information from the request body for logging purposes.
 * @param consumedBody - The request body to be sanitized.
 * @returns Sanitized request body.
 */
const sanitizeBody = (consumedBody: any) => {
  const sanitizedText = '*****'
  const sanitizedBody = { ...consumedBody }
  if ('password' in sanitizedBody) sanitizedBody.password = sanitizedText
  if ('cpassword' in sanitizedBody) sanitizedBody.cpassword = sanitizedText
  return sanitizedBody
}

/**
 * Logs request details to the console for debugging purposes.
 * @param req - The incoming request object.
 */
const logRequest = (req: NextRequest) => {
  if (process.env.NODE_ENV === 'test') return
  const { method, url, consumedBody } = req
  console.info('---')
  method && console.info(`Method: ${method}`)
  url && console.info(`Path:   ${url}`)
  consumedBody && console.info(`Body:   ${JSON.stringify(sanitizeBody(consumedBody))}`)
  console.info('---')
}

/**
 * Logs error details to the console for debugging purposes.
 * @param error - The error object to be logged.
 */
const logError = (error: any) => {
  if (process.env.NODE_ENV === 'test') return
  console.info(`Error:  ${JSON.stringify(error)}`)
  console.info('---')
}

/**
 * Extracts a human-readable error message from the given error string.
 * @param message - The error message string.
 * @returns Human-readable error message.
 */
const getErrorMessage = (message: string) => {
  if (message.includes('Unique constraint failed on the fields: (`username`)')) return 'Username exists'
  if (message.includes('Unique constraint failed on the fields: (`email`)')) return 'Email exists'
  return 'Server failure'
}

/**
 * Wraps a route handler function with error handling and request logging.
 * @param routeHandler - The route handler function to be wrapped.
 * @returns Wrapped route handler function.
 */
export const routeWrapper = (
  routeHandler: (
    req: NextRequest, context?: any) => Promise<NextResponse>
) => async (req: NextRequest, context?: any) => {
  const setConsumedBody = async () => {
    const contentType = (typeof req.headers?.get === 'function') && req.headers.get('content-type')?.toLowerCase()
    if (contentType === 'application/json') req.consumedBody = await req?.json()
    if (contentType === 'multipart/form-data') req.consumedBody = await req?.formData()
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

/**
 * Retrieves the user session information from the server session.
 * @returns User session information.
 * @throws ApiError if the user is not authenticated.
 */
export const withSessionUser = async () => {
  const session = await getServerSession(authOptions)
  if (!session) throw new ApiError('Unauthorized', 401)
  return session?.user
}

/**
 * Checks if the provided user ID matches the user ID in the session.
 * @param userId - The user ID to be checked.
 * @throws ApiError if the user IDs do not match, indicating unauthorized access.
 */
export const checkUserMatchesSession = async (userId: string | undefined) => {
  const session = await getServerSession(authOptions)
  if (session?.user?.id !== userId) throw new ApiError('Unauthorized', 401)
}

/**
 * Parses and extracts query parameters from a Next.js URL object.
 * @param nextUrl - Next.js URL object containing query parameters.
 * @returns Parsed query parameters as an object.
 */
export const getQueryParams = (nextUrl: NextURL) => {
  const queryParams = Array.from(nextUrl.searchParams.entries()).reduce((acc, [key, value]) => {
    const numericValue = !Number.isNaN(Number(value)) ? Number(value) : value
    return { ...acc, [key]: numericValue }
  }, {} as { [key: string]: string | number })

  return queryParams
}

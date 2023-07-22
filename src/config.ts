export const APP_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : (process.env.NEXT_PUBLIC_URL || 'http://localhost:3000')

export const API_URL = '/api'

export const TEST_SECRET = process.env.TEST_SECRET || 'test1234'

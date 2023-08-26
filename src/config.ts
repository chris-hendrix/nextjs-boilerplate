export const APP_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : (process.env.NEXT_PUBLIC_URL || 'http://localhost:3000')

export const API_URL = '/api'

export const TEST_PREFIX = process.env.TEST_PREFIX || 'test1234'
export const SEED_PREFIX = process.env.TEST_PREFIX || 'seed1234'

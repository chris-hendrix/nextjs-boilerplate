export const getErrorMessage = (error: any) => {
  if (!error) return null
  if (typeof error === 'string') return error
  if ('status' in error) return String('error' in error ? error.error : error.data.message)
  return String(error.message)
}

export default getErrorMessage

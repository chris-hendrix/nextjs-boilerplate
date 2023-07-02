const getErrorMessage = (error: any): string | null => {
  if (!error?.data?.message) return null
  return String(error.data.message)
}

export default getErrorMessage

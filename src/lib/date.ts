export const formatDate = (dateString: string, options: Intl.DateTimeFormatOptions = {}) => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const mergedOptions = { ...defaultOptions, ...options }
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', mergedOptions)
  return formattedDate
}

export default formatDate

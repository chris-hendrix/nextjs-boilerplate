import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { SerializedError } from '@reduxjs/toolkit'
// https://redux-toolkit.js.org/rtk-query/usage-with-typescript#type-safe-error-handling
const getBaseQueryErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  if (!error) return null
  if ('status' in error) return String('error' in error ? error.error : error.data)
  return String(error.message)
}

export default getBaseQueryErrorMessage

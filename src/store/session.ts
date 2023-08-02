import { useState } from 'react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Session } from 'next-auth'
import { signIn, SignInOptions, SignInResponse } from 'next-auth/react'
import { API_URL } from '@/config'

export const sessionApi = createApi({
  reducerPath: 'sessionApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/auth` }),
  endpoints: (build) => ({
    getSession: build.query<Session, void>({
      query: () => 'session',
    })
  })
})

export const useSignInUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [signInResponse, setSignInResponse] = useState<SignInResponse | undefined>(undefined)

  const signInUser = async (provider: string, options?: SignInOptions) => {
    setIsLoading(true)
    setSignInResponse(await signIn(provider, options))
    setIsLoading(false)
  }

  return {
    signInUser,
    isLoading,
    error: signInResponse && signInResponse.error,
    status: signInResponse && signInResponse.status,
  }
}

export const { useGetSessionQuery } = sessionApi

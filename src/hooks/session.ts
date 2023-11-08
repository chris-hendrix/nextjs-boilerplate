import { useState } from 'react'
import { useSignInMutation, useSignOutMutation } from '@/store/session'
import { SignInOptions, SignInAuthorizationParams, getCsrfToken } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [signInUser] = useSignInMutation()

  const signIn = async (
    provider: BuiltInProviderType,
    options?: SignInOptions,
    authParams?: SignInAuthorizationParams
  ) => {
    setIsLoading(true)
    const res = await signInUser({
      provider,
      options: {
        ...options,
        csrfToken: await getCsrfToken(),
        redirect: false
      },
      authParams
    })

    let httpsError: string | null = null
    if ('error' in res) {
      const fetchError = res.error as FetchBaseQueryError
      if ('error' in fetchError && typeof fetchError.error === 'string') httpsError = fetchError.error
      if ('data' in fetchError && typeof fetchError.data === 'string') httpsError = fetchError.data
      if ('data' in fetchError && typeof fetchError.data === 'object') {
        const url = (fetchError?.data && 'url' in fetchError.data && fetchError.data.url as string) || null
        httpsError = url && new URL(url).searchParams.get('error')
      }
    }
    setIsSuccess(!httpsError)
    setError(httpsError || null)
    setIsLoading(false)
  }

  const reset = () => {
    setIsLoading(false)
    setIsSuccess(false)
    setError(null)
  }

  return { signIn, isLoading, isSuccess, error, reset }
}

/**
 * Custom hook for handling user sign-out functionality via redux. The signOut function mimics:
 * https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/react/index.tsx
 */
export const useSignOut = () => {
  const [signOutUser] = useSignOutMutation()

  const signOut = async (options?: SignInOptions,) => {
    await signOutUser({
      options: {
        ...options,
        csrfToken: await getCsrfToken(),
      },
    })
    window.location.reload() // TODO try to invalidate instead of reload
  }

  return { signOut }
}

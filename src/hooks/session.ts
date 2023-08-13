import { useState } from 'react'
import { useSignInMutation, useSignOutMutation } from '@/store/session'
import { SignInOptions, SignInAuthorizationParams, getCsrfToken } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

/**
 * Custom hook for handling user sign-in functionality via redux. The signIn function mimics:
 * https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/react/index.tsx
 */
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
    const url = 'data' in res && res.data?.url
    const authError = url && new URL(url).searchParams.get('error')
    let httpsError: string | null = null
    if ('error' in res) {
      if ('status' in res.error) httpsError = String('error' in res.error ? res.error.error : res.error.data)
      else httpsError = String(res.error.message)
    }
    setIsSuccess(!httpsError && !authError)
    setError(httpsError || authError || null)
    setIsLoading(false)
  }

  return { signIn, isLoading, isSuccess, error }
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

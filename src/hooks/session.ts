import { useState } from 'react'
import { useSignInMutation, useSignOutMutation } from '@/store/session'
import { SignInOptions, SignInAuthorizationParams, getCsrfToken } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<any | null>(null)

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
    setIsSuccess(!('error' in res))
    setError(('error' in res && res?.error) || null)
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
  const [isSuccess, setIsSuccess] = useState(false)

  const signOut = async (options?: SignInOptions,) => {
    await signOutUser({
      options: {
        ...options,
        csrfToken: await getCsrfToken(),
      },
    })
    window.location.reload() // TODO try to invalidate instead of reload
    setIsSuccess(true)
  }

  return { signOut, isSuccess }
}

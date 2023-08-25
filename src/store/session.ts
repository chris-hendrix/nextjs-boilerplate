import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Session } from 'next-auth'
import { SignInOptions, SignInAuthorizationParams } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

export const sessionApi = createApi({
  reducerPath: 'sessionApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api/auth' }),
  tagTypes: ['Session'],
  endpoints: (build) => ({
    getSession: build.query<Session, void>({
      query: () => 'session',
      providesTags: (_session, _err) => [{ type: 'Session', id: 'current_session' }],
    }),
    signIn: build.mutation<{ url: string }, {
      provider: BuiltInProviderType,
      options: SignInOptions,
      authParams?: SignInAuthorizationParams
    }>({
      query: ({ provider, options, authParams }) => ({
        url: `${`/${provider === 'credentials' ? 'callback' : 'signin'}/${provider}`}?${new URLSearchParams(authParams)}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // @ts-expect-error
        body: new URLSearchParams({
          ...options,
          json: true,
        }),
      }),
      invalidatesTags: (_url) => ['Session'],
    }),
    signOut: build.mutation<{ url: string }, { options: SignInOptions }>({
      query: ({ options }) => ({
        url: '/signout',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // @ts-expect-error
        body: new URLSearchParams({
          ...options,
          json: true,
        }),
      }),
      invalidatesTags: (_url) => ['Session'],
    }),
  })
})

export const { useGetSessionQuery, useSignInMutation, useSignOutMutation } = sessionApi

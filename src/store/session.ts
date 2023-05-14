import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Session } from 'next-auth'
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

export const { useGetSessionQuery } = sessionApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '@prisma/client'
import { API_URL } from '@/config'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => `users/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'User', id }],
    }),
    getUsers: build.query<User[], { skip: number, take: number } | undefined>({
      query: (params) => ({
        url: 'users',
        params
      }),
      providesTags: (result) => [
        ...(result || []).map(({ id }) => ({ type: 'User' as const, id })),
        { type: 'User', id: 'LIST' }
      ]
    }),
    addUser: build.mutation<User, Partial<User>>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      })
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `users/${data?.id}`,
        method: 'PUT',
        body: { ...data, id: undefined }
      }),
      invalidatesTags: (user) => [{ type: 'User', id: user?.id }],
    })
  })
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation
} = userApi

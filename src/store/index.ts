import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { userApi, useGetUserQuery, useGetUsersQuery, useAddUserMutation, useUpdateUserMutation } from './user'
import { sessionApi, useGetSessionQuery } from './session'

export const makeStore = () => configureStore({
  reducer: {
    [sessionApi.reducerPath]: sessionApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    sessionApi.middleware,
    userApi.middleware,
  ]),
  devTools: process.env.NODE_ENV !== 'production'
})

export const store = makeStore()

setupListeners(store.dispatch)

export {
  useGetUserQuery, useGetUsersQuery, useAddUserMutation, useUpdateUserMutation,
  useGetSessionQuery,
}

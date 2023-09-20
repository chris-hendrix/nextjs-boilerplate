import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { userApi } from './user'
import { sessionApi } from './session'
import { storageApi } from './storage'

export const makeStore = () => configureStore({
  reducer: {
    [sessionApi.reducerPath]: sessionApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [storageApi.reducerPath]: storageApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    sessionApi.middleware,
    userApi.middleware,
    storageApi.middleware
  ]),
  devTools: process.env.NODE_ENV !== 'production'
})

export const store = makeStore()

setupListeners(store.dispatch)

export { useGetUserQuery, useGetUsersQuery, useAddUserMutation, useUpdateUserMutation } from './user'
export { useGetSessionQuery, useSignInMutation, useSignOutMutation } from './session'
export { useUploadFileMutation } from './storage'

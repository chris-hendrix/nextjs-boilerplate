import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { useSelector } from 'react-redux'
import { userApi, useGetUserQuery, useGetUsersQuery, useAddUserMutation, useUpdateUserMutation } from './user'
import { sessionApi, useGetSessionQuery } from './session'
import appSlice, { setIsMenuOpen } from './app'

export const makeStore = () => configureStore({
  reducer: {
    app: appSlice.reducer,
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

export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)

const useSelectIsMenuOpen = () => useSelector((state: RootState) => state.app.isMenuOpen)
const dispatchIsMenuOpen = (isOpen: boolean) => store.dispatch(setIsMenuOpen(isOpen))

export {
  useGetUserQuery, useGetUsersQuery, useAddUserMutation, useUpdateUserMutation,
  useGetSessionQuery,
  useSelectIsMenuOpen, dispatchIsMenuOpen
}

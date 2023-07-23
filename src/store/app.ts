/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    setIsMenuOpen: (state: any, action) => { state.isMenuOpen = action.payload },
  },
})

export const { setIsMenuOpen } = appSlice.actions
export default appSlice

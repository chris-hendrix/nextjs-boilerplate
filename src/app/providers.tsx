'use client'

import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { store } from '@/store'

const Providers = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <SessionProvider>
      {children}
    </SessionProvider>
  </Provider>
)

export default Providers

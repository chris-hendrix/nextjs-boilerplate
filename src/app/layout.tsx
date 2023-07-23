import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './providers'
import Navbar from './navbar'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <Providers>
        <Navbar />
        <div className="flex h-screen">
          <div className="flex-grow">
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
              {children}
            </div>
          </div>
        </div>
      </Providers>
    </body>
  </html>
)

export default RootLayout

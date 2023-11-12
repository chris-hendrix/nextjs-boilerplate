import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './providers'
import Navbar from './navbar'
import Footer from './footer'
import AlertBox from './alert-box'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <Providers>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <main className="flex w-full flex-col items-center p-24 max-w-screen-lg mx-auto">
              {children}
            </main>
          </div>
          <AlertBox />
          <Footer />
        </div>
      </Providers>
    </body>
  </html>
)

export default RootLayout

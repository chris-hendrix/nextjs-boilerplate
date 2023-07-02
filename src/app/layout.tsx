import './globals.css'
import { Inter } from 'next/font/google'
import Home from '@/icons/Home'
import UserGroup from '@/icons/UserGroup'
import Link from 'next/link'
import Providers from './providers'
import Navbar from './navbar'

const inter = Inter({ subsets: ['latin'] })

const MENU_WIDTH = 48

const SideMenu: React.FC = () => (
  <aside className={`bg-gray-800 text-primary w-${MENU_WIDTH}`}>
    <ul className={`menu p-3 bg-base-200 h-full w-${MENU_WIDTH}`}>
      <li className="menu-title">
        <span>Menu</span>
      </li>
      <li>
        <Link href="/">
          <Home height={24} width={24} />
          Home
        </Link>
      </li>
      <li>
        <Link href="/users">
          <UserGroup height={24} width={24} />
          Users
        </Link>
      </li>
    </ul>
  </aside>
)

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <Providers>
        <Navbar />
        <div className="flex h-screen">
          <SideMenu />
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

'use client'

import Link from 'next/link'
import useSessionUser from '@/hooks/user'
import { signIn, signOut } from 'next-auth/react'
import Avatar from '@/components/Avatar'

import Home from '@/icons/Home'
import UserGroup from '@/icons/UserGroup'
import Logout from '@/icons/Logout'
import Menu from '@/icons/Menu'

const Dropdown: React.FC = () => {
  const { user, isLoading } = useSessionUser()

  const renderUserLinks = () => {
    if (isLoading) return null
    if (user) {
      return <>
        <li><Link href="/profile"><Avatar />Profile</Link></li>
        <li><a onClick={() => signOut()}><Logout />Log out</a></li>
      </>
    }
    return <>
      <li><a onClick={() => signIn()}>Log in</a></li>
      <li><Link href="/signup" >Sign up</Link></li>
    </>
  }

  return (
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost avatar">
          <Menu />
          <Avatar user={user} />
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52 text-primary">
        {renderUserLinks()}
          <div className="divider" />
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
      </div>
    </div>
  )
}

const Navbar: React.FC = () => (
  <div className="navbar bg-primary text-primary-content">
    <div className="navbar-start" />
    <div className="navbar-center">
      <a className="btn btn-ghost normal-case text-xl"><Link href="/">Next.js Boilerplate</Link></a>
    </div>
    <div className="navbar-end">
      <Dropdown />
    </div>
  </div>
)

export default Navbar

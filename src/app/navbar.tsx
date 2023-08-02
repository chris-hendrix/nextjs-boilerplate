'use client'

import { useState } from 'react'
import Link from 'next/link'
import useSessionUser from '@/hooks/user'
import { signOut } from 'next-auth/react'
import Avatar from '@/components/Avatar'
import CredentialsModal from '@/components/CredentialsModal'

import Home from '@/icons/Home'
import UserGroup from '@/icons/UserGroup'
import Logout from '@/icons/Logout'
import Menu from '@/icons/Menu'

const Dropdown: React.FC = () => {
  const { user, isLoading } = useSessionUser()
  const [signupOpen, setSignupOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  const renderUserLinks = () => {
    if (isLoading) return null
    if (user) {
      return <>
        <li><Link href="/profile"><Avatar />Profile</Link></li>
        <li><a onClick={() => signOut()}><Logout />Log out</a></li>
      </>
    }
    return <>
      <li><a onClick={() => setLoginOpen(true)}>Log in</a></li>
      <li><a onClick={() => setSignupOpen(true)} >Sign up</a></li>
    </>
  }

  return (
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost avatar" id="menu-button">
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
      {signupOpen && <CredentialsModal setOpen={setSignupOpen} />}
      {loginOpen && <CredentialsModal setOpen={setLoginOpen} login />}
    </div>
  )
}

const Navbar: React.FC = () => (
  <div className="navbar bg-primary text-primary-content">
    <div className="navbar-start" />
    <div className="navbar-center text-xl">
      <Link href="/">Next.js Boilerplate</Link>
    </div>
    <div className="navbar-end">
      <Dropdown />
    </div>
  </div>
)

export default Navbar

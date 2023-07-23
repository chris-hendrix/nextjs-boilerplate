'use client'

import Link from 'next/link'
import useSessionUser from '@/hooks/user'
import { signIn, signOut } from 'next-auth/react'
import Avatar from '@/components/Avatar'
import { useSelectIsMenuOpen, dispatchIsMenuOpen } from '@/store'

const LoginButtons: React.FC = () => {
  const { user, isLoading } = useSessionUser()

  const renderUserLinks = () => {
    if (isLoading) return null
    if (user) {
      return <>
        <li><Link href="/profile">Profile</Link></li>
        <li><a onClick={() => signOut()}>Log out</a></li>
      </>
    }
    return <>
      <li><a onClick={() => signIn()}>Log in</a></li>
      <li><Link href="/signup" >Sign up</Link></li>
    </>
  }

  return (
    <>
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <Avatar user={user} />
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52 text-primary">
        {renderUserLinks()}
      </ul>
    </>
  )
}

const Navbar: React.FC = () => {
  const isMenuOpen = useSelectIsMenuOpen()

  return (
  <nav className="navbar bg-primary text-primary-content">
      <div className="navbar-start">
        <button tabIndex={0} className="btn btn-ghost btn-circle" onClick={() => { dispatchIsMenuOpen(!isMenuOpen) }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </button>
      </div>
    <div className="flex-1">
      <a className="btn btn-ghost normal-case text-xl" href="/">Next.js Boilerplate</a>
    </div>
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <LoginButtons />
      </div>
    </div>
  </nav>
  )
}

export default Navbar

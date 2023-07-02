'use client'

import Link from 'next/link'
import Image from 'next/image'
import useSessionUser from '@/hooks/user'
import { signIn, signOut } from 'next-auth/react'
import React from 'react'

const LoginButtons: React.FC = () => {
  const { user, isLoading } = useSessionUser()

  const renderUserLinks = () => {
    if (user) {
      return <>
        <li><Link href="/profile">Profile</Link></li>
        <li><a onClick={() => signOut()}>Logout</a></li>
      </>
    }
    return <>
      <li><a onClick={() => signIn()}>Log in</a></li>
      <li><Link href="/signup" >Sign up</Link></li>
    </>
  }

  if (isLoading) return <></>

  return (
      <>
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Image src="/avatar.svg" alt="avatar.svg" fill />
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52 text-primary">
        {renderUserLinks()}
        </ul>
      </>
  )
}

const Navbar: React.FC = () => (
    <nav className="navbar bg-primary text-primary-content">
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

export default Navbar

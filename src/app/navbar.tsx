import Image from 'next/image'
import useSessionUser from '@/hooks/user'
import { signIn, signOut } from 'next-auth/react'
import React from 'react'

const LoginButtons: React.FC = () => {
  const { user, isLoading } = useSessionUser()

  if (isLoading) return <></>
  if (!user) {
    return <ul className="menu menu-horizontal px-1">
      <li><a className="btn btn-secondary mr-3 flex content-center" onClick={() => signIn()}>Log in</a></li>
        <li><a className="btn btn-accent content-center" href="/signup" >Sign up</a></li>
      </ul>
  }

  return (
      <>
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Image src="/avatar.svg" alt="avatar.svg" fill />
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52 text-primary">
          <li><a href="/profile">Profile</a></li>
        <li><a onClick={() => signOut()}>Logout</a></li>
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

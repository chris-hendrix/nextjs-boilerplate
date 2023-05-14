import Image from 'next/image'
import useSessionUser from '@/hooks/user'

const Navbar: React.FC = () => {
  const { user, isLoading } = useSessionUser()

  const renderLoggedIn = () => {
    if (isLoading) return <></>
    if (!user) {
      return <ul className="menu menu-horizontal px-1">
        <li><a className="btn btn-secondary mr-3">Log in</a></li>
        <li><a className="btn btn-accent" href="/signup" >Sign up</a></li>
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
          <li><a>Logout</a></li>
        </ul>
      </>
    )
  }

  return (
    <nav className="navbar bg-primary text-primary-content">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">Next.js Boilerplate</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          {renderLoggedIn()}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

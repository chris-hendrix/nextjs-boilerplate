'use client'

import Image from 'next/image'
import useSessionUser from '@/hooks/user'
import { formatDate } from '@/lib/date'

const Profile = () => {
  const { user, isLoading } = useSessionUser()

  if (!user && !isLoading) return <>TODO</>

  return (
    <main className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative w-12 h-12 rounded-full mr-4 overflow-hidden">
            <Image
              src="/avatar.svg"
              alt="User Avatar"
              fill
            />
          </div>
          {user && <div>
            <h3 className="text-2xl font-medium">{user?.name}</h3>
            <p className="text-gray-500">{user?.username}</p>
            <p className="text-gray-500">{`Joined on ${formatDate(user.createdAt)}`}</p>
          </div>}
        </div>
        <button className="btn btn-primary">Edit Profile</button>
      </div>
      <div className="mt-8">
        <h4 className="text-lg font-bold">Personal Info</h4>
        <p className="text-gray-500">{user?.name}</p>
        <p className="text-gray-500">{user?.email}</p>
      </div>
      <div className="mt-8">
        <h4 className="text-lg font-bold">About</h4>
        <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor nisi eu quam tincidunt tempus.</p>
      </div>
      <div className="mt-8">
        <h4 className="text-lg font-bold">Linked Accounts</h4>
        <ul className="mt-2 space-x-2">
          <li className="inline-block">
            <a href="#" className="text-blue-600 hover:underline">Twitter</a>
          </li>
          <li className="inline-block">
            <a href="#" className="text-blue-600 hover:underline">LinkedIn</a>
          </li>
          <li className="inline-block">
            <a href="#" className="text-blue-600 hover:underline">GitHub</a>
          </li>
        </ul>
      </div>
    </main>
  )
}

export default Profile

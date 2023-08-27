'use client'

import React, { useState, useEffect } from 'react'
import { User } from '@prisma/client'
import { useGetUsersQuery } from '@/store'
import { formatDate } from '@/lib/date'
import Avatar from '@/components/Avatar'

const LOAD_INCREMENT = 5

const UserCard: React.FC<{ user: Partial<User> }> = ({ user }) => (
  <div className="flex items-center justify-between bg-base-200 rounded-box p-4 mt-4 w-full">
    <div className="flex items-center">
      <div className="mr-4"><Avatar /></div>
      <div>
        <h3 className="text-2xl font-medium">{user?.name}</h3>
        <p className="text-gray-500">{user?.username}</p>
        <p className="text-gray-500">{`Joined on ${formatDate(String(user.createdAt))}`}</p>
      </div>
    </div>
    <a href={`/users/${user.id}`} className="btn btn-sm btn-secondary">
      View Profile
    </a>
  </div>
)

const Users: React.FC = () => {
  const [loadedUserCount, setLoadedUserCount] = useState(2 * LOAD_INCREMENT)
  const [visibleUserCount, setVisibleUserCount] = useState(LOAD_INCREMENT)

  const { data: users } = useGetUsersQuery({ skip: 0, take: loadedUserCount })

  useEffect(() => { setLoadedUserCount(visibleUserCount + LOAD_INCREMENT) }, [visibleUserCount])

  if (!users) return <></>

  return (
    <main className="px-6 py-4 w-full max-w-[800px]">
      {users.slice(0, visibleUserCount).map((user) => <UserCard key={user.id} user={user} />)}
      {visibleUserCount < users.length && (
        <div className="flex justify-center mt-4">
          <button
            className="btn btn-primary btn-wide"
            onClick={() => setVisibleUserCount(visibleUserCount + LOAD_INCREMENT)}
          >
            Load More
          </button>
        </div>
      )}
  </main>
  )
}

export default Users

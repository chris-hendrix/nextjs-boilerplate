'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { User } from '@prisma/client'
import { useGetUsersQuery } from '@/store'
import { formatDate } from '@/lib/date'
import Avatar from '@/components/Avatar'

const LOAD_INCREMENT = 5

const UserCard: React.FC<{ user: Partial<User> }> = ({ user }) => (
  <Link href={`/users/${user.id}`}>
    <div className="flex items-center text-center md:text-left justify-between bg-base-200 rounded-box p-4 mt-4 w-full">
      <div className="flex items-center">
        <div className="hidden md:block mr-4"><Avatar user={user} size={64} /></div>
        <div>
          <div className="flex justify-center mb-4 md:hidden">
            <Avatar user={user} size={64} />
          </div>
          <h3 className="text-2xl font-medium">{user?.name || user?.email}</h3>
          <p className="text-gray-500">{`Joined on ${formatDate(String(user.createdAt))}`}</p>
        </div>
      </div>
    </div>
  </Link>
)

const Users: React.FC = () => {
  const [loadedUserCount, setLoadedUserCount] = useState(2 * LOAD_INCREMENT)
  const [visibleUserCount, setVisibleUserCount] = useState(LOAD_INCREMENT)

  const { data: users } = useGetUsersQuery({ skip: 0, take: loadedUserCount })

  useEffect(() => {
    // cache the next results and scroll to bottom
    setLoadedUserCount(visibleUserCount + LOAD_INCREMENT)
    scrollToBottom()
  }, [visibleUserCount])

  const scrollToBottom = () => window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })

  if (!users) return <></>

  return (
    <main className="px-6 py-4 w-full max-w-[800px]">
      {users.slice(0, visibleUserCount).map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      {visibleUserCount < users.length && (
        <div className="flex justify-center mt-4">
          <button
            className="btn btn-primary btn-wide"
            onClick={() => {
              setVisibleUserCount(visibleUserCount + LOAD_INCREMENT)
            }}
          >
            Load More
          </button>
        </div>
      )}
    </main>
  )
}

export default Users

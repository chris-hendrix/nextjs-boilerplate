'use client'

import { User } from '@prisma/client'
import { useGetUsersQuery } from '@/store'
import { formatDate } from '@/lib/date'
import Avatar from '@/components/Avatar'

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
    <button className="btn btn-sm btn-primary">
      View Profile
    </button>
  </div>
)

const Users: React.FC = () => {
  const { data: users } = useGetUsersQuery({ skip: 0, take: 5 })

  if (!users) return <></>

  return (
    <main className="px-6 py-4 w-full max-w-[800px]">
      {users.map((user) => <UserCard key={user.id} user={user} />)}
  </main>
  )
}

export default Users

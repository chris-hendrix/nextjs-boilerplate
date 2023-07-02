'use client'

import { useGetUsersQuery } from '@/store'

const Users = () => {
  const { data: users } = useGetUsersQuery({ skip: 0, take: 5 })
  return (
  <main className="">
      {JSON.stringify(users)}
  </main>
  )
}

export default Users

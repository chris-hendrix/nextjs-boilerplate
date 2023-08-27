'use client'

import { useGetUserQuery } from '@/store'
import NotFound from '@/app/not-found'
import Profile from '@/components/Profile'

interface Props {
  params: { id: string }
}

const UsersProfilePage: React.FC<Props> = ({ params }) => {
  const { data: user, isLoading } = useGetUserQuery(params.id)

  if (!user && !isLoading) return <NotFound />
  if (!user) return <></>

  return (
    <main className="w-full px-6 py-4 max-w-screen-sm">
      <Profile user={user} />
    </main>
  )
}

export default UsersProfilePage

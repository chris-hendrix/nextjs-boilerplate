'use client'

import useSessionUser from '@/hooks/user'
import NotFound from '@/app/not-found'
import Profile from '@/components/Profile'

const ProfilePage = () => {
  const { user, isLoading } = useSessionUser()

  if (!user && !isLoading) return <NotFound />
  if (!user) return <></>

  return (
    <main className="px-6 py-4">
      <Profile user={user} canEdit />
    </main>
  )
}

export default ProfilePage

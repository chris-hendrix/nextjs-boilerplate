'use client'

import { redirect } from 'next/navigation'
import useSessionUser from '@/hooks/user'
import Profile from '@/components/Profile'

const ProfilePage = () => {
  const { user, isLoading } = useSessionUser()

  if (!user && !isLoading) return redirect('/')
  if (!user) return <></>

  return (
    <main className="px-6 py-4">
      <Profile user={user} canEdit />
    </main>
  )
}

export default ProfilePage

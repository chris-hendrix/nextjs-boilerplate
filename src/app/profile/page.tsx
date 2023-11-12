'use client'

import { redirect } from 'next/navigation'
import { useSessionUser } from '@/hooks/user'
import Profile from '@/components/Profile'

const ProfilePage = () => {
  const { user, isLoading } = useSessionUser()

  if (!user && !isLoading) return redirect('/')
  if (!user) return <></>

  return (
    <div className="w-full max-w-screen-sm">
      <Profile user={user} canEdit />
    </div>
  )
}

export default ProfilePage

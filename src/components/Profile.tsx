'use client'

import { useState } from 'react'
import { User } from '@prisma/client'
import { formatDate } from '@/lib/date'
import Avatar from '@/components/Avatar'
import EditProfileModal from '@/components/EditProfileModal'
import Pencil from '@/icons/Pencil'

interface Props {
  user: Partial<User>
  canEdit?: boolean
}

const Profile: React.FC<Props> = ({ user, canEdit = false }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const info = user.info as any

  return (
    <>
      <div className="flex items-center justify-between bg-base-200 rounded-box p-4">
        <div className="flex items-center">
          <div className="mr-4 hidden md:block">
            <Avatar user={user} size={60} />
          </div>
          {user && (
            <div>
              <div className="flex mb-4 md:hidden">
                <Avatar user={user} size={64} />
              </div>
              <h3 className="text-2xl font-medium">{user?.name || user?.email}</h3>
              <p className="text-gray-500">{`Joined on ${formatDate(String(user.createdAt))}`}</p>
            </div>
          )}
        </div>
        {canEdit &&
          <div className="tooltip" data-tip="Edit profile">
            <button id="edit-profile" className="btn btn-square p-2" onClick={() => setModalOpen(true)}>
              <Pencil className="text-primary" />
            </button>
          </div>
        }
      </div>
      <div className="p-4">
        <div className="mt-8">
          <h4 className="text-lg font-bold">Personal Info</h4>
          <p className="text-gray-500">{user?.name}</p>
          <p className="text-gray-500">{user?.email}</p>
        </div>
        {info?.about
          && <div className="mt-8">
            <h4 className="text-lg font-bold">About</h4>
            <p className="text-gray-500 whitespace-pre-line">{info?.about || ''}</p>
          </div>
        }

      </div>
      {modalOpen && user && <EditProfileModal user={user} setOpen={setModalOpen} />}
    </ >
  )
}

export default Profile

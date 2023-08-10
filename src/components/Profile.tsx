'use client'

import { useState } from 'react'
import { User } from '@prisma/client'
import { formatDate } from '@/lib/date'
import Avatar from '@/components/Avatar'
import EditProfileModal from '@/components/EditProfileModal'

interface Props {
  user: Partial<User>
  canEdit?: boolean
}

const Profile: React.FC<Props> = ({ user, canEdit = false }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const avatar = <Avatar user={user} size={60} />
  const info = user.info as any

  return (
    <>
      <div className="flex items-center justify-between bg-base-200 rounded-box p-4">
        <div className="flex items-center">
          <div className="mr-4">
            {!canEdit
              ? avatar
              : <label style={{ cursor: 'pointer' }}>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={() => console.log('TODO')} />
                {avatar}
              </label>
            }
          </div>
          {user && (
            <div>
              <h3 className="text-2xl font-medium">{user?.name}</h3>
              <p className="text-gray-500">{user?.username}</p>
              <p className="text-gray-500">{`Joined on ${formatDate(String(user.createdAt))}`}</p>
            </div>
          )}
        </div>
        {canEdit && <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Edit Profile
        </button>}
      </div>
      <div className="p-4">
        <div className="mt-8">
          <h4 className="text-lg font-bold">Personal Info</h4>
          <p className="text-gray-500">{user?.name}</p>
          <p className="text-gray-500">{user?.email}</p>
        </div>
        <div className="mt-8">
          <h4 className="text-lg font-bold">About</h4>
          <p className="text-gray-500 whitespace-pre-line">{info?.about || ''}</p>
        </div>
        <div className="mt-8">
          <h4 className="text-lg font-bold">Linked Accounts</h4>
          <ul className="mt-2 space-x-2">
            <li className="inline-block">
              <a href="#" className="text-blue-600 hover:underline">
                Twitter
              </a>
            </li>
            <li className="inline-block">
              <a href="#" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            </li>
            <li className="inline-block">
              <a href="#" className="text-blue-600 hover:underline">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      {modalOpen && user && <EditProfileModal user={user} setOpen={setModalOpen} />}
    </ >
  )
}

export default Profile

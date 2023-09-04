import React, { useEffect, useState } from 'react'
import { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { useUpdateUserMutation } from '@/store'
import Alert from '@/components/Alert'
import Avatar from '@/components/Avatar'
import TextInput from '@/components/TextInput'
import Modal from '@/components/Modal'
import FileUploadButton from './FileUploadButton'

interface Props {
  user: Partial<User>;
  setOpen: (open: boolean) => void;
}

const EditProfileModal: React.FC<Props> = ({ user, setOpen }) => {
  const [updateUser, { isLoading, isSuccess, error: updateUserError }] = useUpdateUserMutation()
  const form = useForm({ mode: 'onChange' })
  const [imageUrl, setImageUrl] = useState('')
  const [imageUploadError, setImageUploadError] = useState<any | null>(null)

  const error = updateUserError || imageUploadError

  const onSubmit = async (data: { [x: string]: unknown }) => {
    const { name, username, email, about } = data
    await updateUser({
      id: user.id,
      name,
      username,
      email,
      info: { about }
    })
  }

  useEffect(() => {
    // initial form data
    form.reset({
      name: user.name,
      username: user.username,
      email: user.email,
      about: (user.info as any)?.about,
    })
  }, [])

  useEffect(() => { imageUrl && updateUser({ id: user.id, bucketImage: imageUrl }) }, [imageUrl])

  if (!user) return <></>
  return (
    <Modal title="Edit profile" setOpen={setOpen}>
      <FileUploadButton
        buttonComponent={
          <div className="avatar indicator" style={{ cursor: 'pointer' }}>
            <span className="indicator-item badge badge-secondary">+</span>
            <Avatar user={user} size={60} />
          </div>
        }
        bucketDirectory={`image/${user.id}`}
        onFileUpload={setImageUrl}
        onError={setImageUploadError}
      />
      <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
        <TextInput name="name" form={form} disabled={isLoading} />
        <TextInput name="username" form={form} disabled={isLoading} />
        <TextInput name="email" form={form} disabled={isLoading} />
        <TextInput name="about" form={form} disabled={isLoading} multiline />
        <div className="flex justify-end mt-4">
          <div className="space-x-2">
            <button
              type="submit"
              className="btn btn-primary w-24"
              disabled={!form.formState.isValid || isLoading}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary w-24"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Close
            </button>
          </div>
        </div>
      </form>
      {error && <div className="mt-2"><Alert error={error} /></div>}
      {isSuccess && <div className="mt-2"><Alert message="Saved!" type="success" /></div>}
    </Modal>

  )
}

export default EditProfileModal

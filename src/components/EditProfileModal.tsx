import React, { useEffect, useState } from 'react'
import { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { useUpdateUserMutation } from '@/store'
import { useAlert } from '@/hooks/app'
import Avatar from '@/components/Avatar'
import TextInput from '@/components/TextInput'
import Modal from '@/components/Modal'
import FileUploadWrapper from './FileUploadWrapper'

interface Props {
  user: Partial<User>;
  setOpen: (open: boolean) => void;
}

const EditProfileModal: React.FC<Props> = ({ user, setOpen }) => {
  const [updateUser, { isLoading, isSuccess, error: updateUserError }] = useUpdateUserMutation()
  const form = useForm({ mode: 'onChange' })
  const { showAlert } = useAlert()
  const [imageUrl, setImageUrl] = useState('')
  const [imageUploadError, setImageUploadError] = useState<any | null>(null)

  const error = updateUserError || imageUploadError

  const onSubmit = async (data: { [x: string]: unknown }) => {
    const { name, email, about } = data
    await updateUser({
      id: user.id,
      name,
      email,
      info: { about }
    })
  }

  useEffect(() => {
    // initial form data
    form.reset({
      name: user.name,
      email: user.email,
      about: (user.info as any)?.about,
    })
  }, [])

  useEffect(() => { imageUrl && updateUser({ id: user.id, bucketImage: imageUrl }) }, [imageUrl])
  useEffect(() => { isSuccess && showAlert({ successMessage: 'Changes saved' }) }, [isSuccess])
  useEffect(() => { error && showAlert({ error }) }, [error])

  if (!user) return <></>
  return (
    <Modal title="Edit profile" setOpen={setOpen}>
      <FileUploadWrapper
        bucketDirectory={`image/${user.id}`}
        onFileUpload={setImageUrl}
        onError={setImageUploadError}
      >
        <div
          className="avatar indicator tooltip tooltip-right"
          data-tip="Upload new"
          style={{ cursor: 'pointer' }}
        >
          <span className="indicator-item badge badge-secondary">+</span>
          <Avatar user={user} size={60} />
        </div>
      </FileUploadWrapper>
      <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
        <TextInput name="name" form={form} disabled={isLoading} />
        <TextInput name="email" form={form} disabled={isLoading} />
        <TextInput name="about" form={form} disabled={isLoading} multiline />
        <div className="flex justify-end mt-4">
          <div className="space-x-2">
            <button
              type="submit"
              className="btn btn-primary w-24"
              disabled={!form.formState.isValid || isLoading || !form.formState.isDirty}
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
    </Modal>

  )
}

export default EditProfileModal

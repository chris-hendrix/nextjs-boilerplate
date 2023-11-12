import React, { useEffect, useState } from 'react'
import { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { useAlert } from '@/hooks/app'
import { useUpdateUser } from '@/hooks/user'
import Avatar from '@/components/Avatar'
import TextInput from '@/components/TextInput'
import Modal from '@/components/Modal'
import FileUploadWrapper from './FileUploadWrapper'

type FormType = 'profile' | 'password'
interface FormProps {
  user: Partial<User>;
  setOpen?: (open: boolean) => void;
  setActiveForm: (formType: FormType) => void;
}

const EditProfileForm: React.FC<FormProps> = ({ user, setOpen, setActiveForm }) => {
  const { updateUser, isLoading } = useUpdateUser()
  const { showAlert } = useAlert()
  const form = useForm({ mode: 'onChange' })
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState<any | null>(null) // image upload error

  const onSubmit = async (data: { [x: string]: unknown }) => {
    const { name, about } = data
    const res = await updateUser({ id: user.id, name, info: { about } })
    if (!('error' in res)) form.reset({ name, email: user.email, about })
  }

  useEffect(() => {
    // initial form data
    const { name, email, info } = user
    form.reset({ name, email, about: (info as any)?.about })
  }, [])

  // image upload
  useEffect(() => { imageUrl && updateUser({ id: user.id, bucketImage: imageUrl }) }, [imageUrl])
  useEffect(() => { error && showAlert({ error }) }, [error])

  if (!user) return <></>
  return (
    <div>
      <div className="flex items-center justify-between">
        <FileUploadWrapper
          bucketDirectory={`image/${user.id}`}
          onFileUpload={setImageUrl}
          onError={setError}
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
        <button className="link link-primary text-right link-hover" onClick={() => setActiveForm('password')}>Change password</button>
      </div>
      <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
        <TextInput name="email" form={form} disabled={true} />
        <TextInput name="name" form={form} disabled={isLoading} />
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
              onClick={() => setOpen && setOpen(false)}
              disabled={isLoading}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

const EditPasswordForm: React.FC<FormProps> = ({ user, setActiveForm }) => {
  const { updateUser, isLoading } = useUpdateUser()
  const form = useForm({ mode: 'onChange' })

  const onSubmit = async (data: { [x: string]: unknown }) => {
    const { currentPassword, password, confirmPassword } = data
    const res = await updateUser({
      id: user.id,
      currentPassword,
      password,
      confirmPassword
    })
    if ('error' in res) return
    setActiveForm('profile')
  }

  if (!user) return <></>
  return (
    <div>
      <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
        <TextInput name="currentPassword" form={form} disabled={isLoading} validate={() => true} />
        <TextInput name="password" labelOverride="New password*" form={form} disabled={isLoading} />
        <TextInput name="confirmPassword" labelOverride="New password confirmation*" form={form} disabled={isLoading} />
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
              onClick={() => setActiveForm('profile')}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

interface ModalProps {
  user: Partial<User>;
  setOpen: (open: boolean) => void;
}

const EditProfileModal: React.FC<ModalProps> = ({ user, setOpen }) => {
  const [activeForm, setActiveForm] = useState<FormType>('profile')

  const forms = {
    profile: <EditProfileForm user={user} setOpen={setOpen} setActiveForm={setActiveForm} />,
    password: <EditPasswordForm user={user} setActiveForm={setActiveForm} />
  }

  if (!user) return <></>
  return (
    <Modal title="Edit profile" setOpen={setOpen}>
      {forms[activeForm]}
    </Modal>
  )
}

export default EditProfileModal

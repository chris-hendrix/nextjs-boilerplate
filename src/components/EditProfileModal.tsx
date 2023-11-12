import React, { useEffect, useState } from 'react'
import { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { useAlert } from '@/hooks/app'
import { useUpdateUser } from '@/hooks/user'
import Avatar from '@/components/Avatar'
import TextInput from '@/components/TextInput'
import Modal from '@/components/Modal'
import Form from '@/components/Form'
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
      <Form
        form={form}
        onSubmit={onSubmit}
        onClose={() => setOpen && setOpen(false)}
        isSubmitting={isLoading}
      >
        <TextInput name="email" form={form} disabled={true} />
        <TextInput name="name" form={form} disabled={isLoading} />
        <TextInput name="about" form={form} disabled={isLoading} multiline />
      </Form>
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
      <Form
        form={form}
        onSubmit={onSubmit}
        onCancel={() => setActiveForm('profile')}
        isSubmitting={isLoading}
      >
        <TextInput name="currentPassword" form={form} disabled={isLoading} validate={() => true} />
        <TextInput name="password" labelOverride="New password*" form={form} disabled={isLoading} />
        <TextInput name="confirmPassword" labelOverride="New password confirmation*" form={form} disabled={isLoading} />
      </Form>
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
    profile: {
      title: 'Edit profile',
      component: <EditProfileForm user={user} setOpen={setOpen} setActiveForm={setActiveForm} />
    },
    password: {
      title: 'Change password',
      component: <EditPasswordForm user={user} setActiveForm={setActiveForm} />
    }
  }

  if (!user) return <></>
  return (
    <Modal title={forms[activeForm].title} setOpen={setOpen}>
      {forms[activeForm].component}
    </Modal>
  )
}

export default EditProfileModal

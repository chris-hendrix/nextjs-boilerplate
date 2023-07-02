import React, { useEffect } from 'react'
import { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import TextInput from '@/components/TextInput'

interface Props {
  user: Partial<User>;
}

const EditProfile: React.FC<Props> = ({ user }) => {
  const initialFormData = {
    name: user.name,
    username: user.username,
    email: user.email,
    about: 'TODO',
  }
  const isLoading = false // TODO
  const form = useForm({ mode: 'onChange' })

  const onSubmit = () => console.log('TODO')

  useEffect(() => {
    user && form.reset(initialFormData)
  }, [])

  if (!user) return <></>
  return (
    <div className="">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <TextInput name="name" form={form} disabled={isLoading} />
        <TextInput name="username" form={form} disabled={isLoading} />
        <TextInput name="email" form={form} disabled={isLoading} />
        <TextInput name="about" form={form} disabled={isLoading} />
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!form.formState.isValid || isLoading}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile

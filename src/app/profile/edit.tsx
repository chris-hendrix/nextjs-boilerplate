import React, { useEffect } from 'react'
import { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { useUpdateUserMutation } from '@/store'
import Alert from '@/components/Alert'
import TextInput from '@/components/TextInput'
import Modal from '@/components/Modal'

interface Props {
  user: Partial<User>;
  setOpen: (open: boolean) => void;
}

const EditProfileModal: React.FC<Props> = ({ user, setOpen }) => {
  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation()
  const form = useForm({ mode: 'onChange' })

  const onSubmit = async (data: { [x: string]: unknown }) => {
    await updateUser({ id: user.id, ...data, about: undefined }) // TODO
  }

  useEffect(() => {
    // initial form data
    form.reset({
      name: user.name,
      username: user.username,
      email: user.email,
      about: 'TODO',
    })
  }, [])

  if (!user) return <></>
  return (
    <Modal title="Edit profile" setOpen={setOpen}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <TextInput name="name" form={form} disabled={isLoading} />
        <TextInput name="username" form={form} disabled={isLoading} />
        <TextInput name="email" form={form} disabled={isLoading} />
        <TextInput name="about" form={form} disabled={isLoading} />
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

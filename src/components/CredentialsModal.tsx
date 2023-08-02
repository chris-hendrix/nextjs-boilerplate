import { useForm } from 'react-hook-form'
import { useAddUserMutation } from '@/store'
import { useSignInUser } from '@/store/session'
import Alert from '@/components/Alert'
import TextInput from '@/components/TextInput'
import Modal from '@/components/Modal'

interface Props {
  setOpen: (open: boolean) => void;
  login?: boolean
}

const CredentialsModal: React.FC<Props> = ({ setOpen, login = false }) => {
  const form = useForm({ mode: 'onChange' })
  const [addUser, { error: addUserError, isLoading: isAddUserLoading }] = useAddUserMutation()
  const { signInUser, error: signInUserError, isLoading: isSignInUserLoading } = useSignInUser()
  const isLoading = isAddUserLoading || isSignInUserLoading
  const error = addUserError || signInUserError

  const onSubmit = async (data: { [x: string]: string }) => {
    const { username, email, password } = data
    if (!login) {
      await addUser({ username, email, password })
    }
    await signInUser('credentials', {
      username,
      password,
      redirect: true
    })
    setOpen(false)
  }

  return (
    <Modal title={login ? 'Log in' : 'Sign up'} setOpen={setOpen}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <TextInput name="username" form={form} disabled={isLoading} />
        {!login && <TextInput name="email" form={form} disabled={isLoading} />}
        <TextInput name="password" form={form} disabled={isLoading} />
        {!login && <TextInput name="cpassword" form={form} disabled={isLoading} />}
        <button type="submit" className="btn btn-primary w-full">
          {login ? 'Log in' : 'Sign up'}
        </button>
      </form>
      {error && <div className="mt-2"><Alert error={error} /></div>}
    </Modal>

  )
}

export default CredentialsModal

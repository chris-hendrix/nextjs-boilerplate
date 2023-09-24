import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAddUserMutation } from '@/store'
import { useSignIn } from '@/hooks/session'
import Alert from '@/components/Alert'
import TextInput from '@/components/TextInput'
import Modal from '@/components/Modal'

interface Props {
  setOpen: (open: boolean) => void;
  signUp?: boolean
}

const CredentialsModal: React.FC<Props> = ({ setOpen, signUp = false }) => {
  const form = useForm({ mode: 'onChange' })
  const [addUser, {
    error: addUserError,
    isLoading: isAddUserLoading,
  }] = useAddUserMutation()
  const {
    signIn,
    isLoading: isSignInLoading,
    isSuccess: signInSuccess,
    error: signInError
  } = useSignIn()

  const isLoading = isAddUserLoading || isSignInLoading
  const error = addUserError || signInError

  useEffect(() => { signInSuccess && setOpen(false) }, [signInSuccess])

  const onSubmit = async (data: { [x: string]: string }) => {
    const { email, password } = data
    const signUpError = signUp && 'error' in await addUser({ email, password })
    if (!signUp || !signUpError) await signIn('credentials', { email, password })
  }

  return (
    <Modal title={signUp ? 'Sign up' : 'Log in'} setOpen={setOpen}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <TextInput name="email" form={form} disabled={isLoading} />
        <TextInput name="password" form={form} disabled={isLoading} validate={!signUp ? () => true : null} />
        {signUp && <TextInput name="cpassword" form={form} disabled={isLoading} />}
        <button type="submit" className="btn btn-primary w-full">
          {signUp ? 'Sign up' : 'Log in'}
        </button>
      </form>
      {error && <div className="mt-2"><Alert error={error} time={null} /></div>}
    </Modal>

  )
}

export default CredentialsModal

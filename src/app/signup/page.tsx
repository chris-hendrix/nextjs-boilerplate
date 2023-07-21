'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useAddUserMutation } from '@/store'
import TextInput from '@/components/TextInput'
import Alert from '@/components/Alert'

const Signup: React.FC = () => {
  const form = useForm({ mode: 'onChange' })
  const router = useRouter()
  const [addUser, { isLoading, error }] = useAddUserMutation()

  const onSubmit = async (data: { [x: string]: unknown }) => {
    const resp = await addUser(data)
    if ('error' in resp) return
    router.push('/')
  }

  return (
    <div className="flex items-center justify-center">
      <div className="px-6 py-4 shadow-md overflow-hidden sm:rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TextInput name="username" form={form} disabled={isLoading} />
          <TextInput name="email" form={form} disabled={isLoading} />
          <TextInput name="password" form={form} disabled={isLoading} />
          <TextInput name="cpassword" form={form} disabled={isLoading} />
          <button type="submit" className="btn btn-primary w-full">
            Sign up
          </button>
          {error && <div className="mt-2"><Alert error={error} /></div>}
        </form>
      </div>
    </div>
  )
}

export default Signup

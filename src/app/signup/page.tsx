'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useAddUserMutation } from '@/store'
import { useAlert } from '@/hooks/app'
import TextInput from '@/components/TextInput'

const Signup: React.FC = () => {
  const form = useForm({ mode: 'onChange' })
  const router = useRouter()
  const { showAlert } = useAlert()
  const [addUser, { isLoading, isSuccess, error }] = useAddUserMutation()

  const onSubmit = async (data: { [x: string]: string }) => {
    const { email, password } = data
    await addUser({ email, password })
  }

  useEffect(() => { error && showAlert({ error }) }, [error])

  if (isSuccess) router.push('/api/auth/signin')

  return (
    <div className="flex items-center justify-center">
      <div className="px-6 py-4 shadow-md overflow-hidden sm:rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TextInput name="username" form={form} disabled={isLoading} />
          <TextInput name="email" form={form} disabled={isLoading} />
          <TextInput name="password" form={form} disabled={isLoading} />
          <TextInput name="confirmPassword" form={form} disabled={isLoading} />
          <button type="submit" className="btn btn-primary w-full">
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup

'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import TextInput from './textinput'

const Signup: React.FC = () => {
  const form = useForm({ mode: 'onChange' })

  const onSubmit = async (data: { [x: string]: unknown }) => { console.log({ data }) }

  return (
    <div className="flex items-center justify-center">
      <div className="px-6 py-4 shadow-md overflow-hidden sm:rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TextInput name="email" form={form} />
          <TextInput name="password" form={form} />
          <TextInput name="cpassword" form={form} />
          <button type="submit" className="btn btn-primary w-full">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup

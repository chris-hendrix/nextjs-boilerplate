import { UseFormReturn } from 'react-hook-form'
import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'

type Props = {
  name: string,
  form: UseFormReturn,
  disabled?: boolean
}

const TextInput: React.FC<Props> = ({ name, form, disabled = false }) => {
  const { register, getValues, formState: { errors } } = form

  let inputProps = {
    label: name.charAt(0).toUpperCase() + name.slice(1),
    type: 'text',
    disabled,
    ...!register ? {} : register(name)
  }

  if (name === 'username') {
    inputProps = {
      ...inputProps,
      label: 'Username*',
      ...!register ? {} : register(name, {
        required: 'Username is required',
        validate: (value: string) => value.length > 2 || 'Too short'
      })
    }
  }

  if (name === 'email') {
    inputProps = {
      ...inputProps,
      label: 'Email*',
      ...!register ? {} : register(name, {
        required: 'Email is required',
        validate: (value: string) => isEmail(value) || 'Invalid email'
      })
    }
  }

  if (name === 'password') {
    inputProps = {
      ...inputProps,
      label: 'Password*',
      type: 'password',
      ...!register ? {} : register(name, {
        required: 'Password is required',
        validate: (value: string) => isStrongPassword(value) || 'Weak password'
      })
    }
  }

  if (name === 'cpassword') {
    inputProps = {
      ...inputProps,
      label: 'Password confirmation*',
      type: 'password',
      ...!register || !getValues ? {} : register(name, {
        validate: (value: string) => getValues()?.password === value || 'Password does not match'
      })
    }
  }

  return <div className="mb-4">
    <label htmlFor="email" className="block mb-2 font-bold">
      {inputProps.label}
    </label>
    <input
      className={`input input-bordered mb-1 w-full ${errors?.[name] ? 'input-error' : ''}`}
      {...inputProps}
    />
    <span className="block h-1 text-sm text-red-500">{errors?.[name]?.message as string || ''}</span>
  </div>
}

export default TextInput

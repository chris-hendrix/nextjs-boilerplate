import { UseFormReturn, RegisterOptions } from 'react-hook-form'
import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'

type Props = {
  name: string,
  form: UseFormReturn,
  disabled?: boolean,
  multiline?: boolean,
  validate?: ((value: string) => any) | null,
  labelOverride?: string
}

const TextInput: React.FC<Props> = ({
  name, form, disabled = false, multiline = false, validate = null, labelOverride = null
}) => {
  const { register, getValues, formState: { errors } } = form

  const registerHelper = (options?: RegisterOptions) => {
    if (!register) return {}
    return register(name, {
      required: options?.required,
      validate: validate || options?.validate
    })
  }

  let inputProps = {
    label: name.charAt(0).toUpperCase() + name.slice(1),
    type: 'text',
    autoComplete: 'off',
    disabled,
    ...registerHelper()
  }

  if (name === 'username') {
    inputProps = {
      ...inputProps,
      label: 'Username*',
      autoComplete: 'username',
      ...registerHelper({
        required: 'Username is required',
        validate: (value: string) => value.length > 2 || 'Too short'
      })
    }
  }

  if (name === 'email') {
    inputProps = {
      ...inputProps,
      label: 'Email*',
      type: 'email',
      autoComplete: 'email',
      ...registerHelper({
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
      autoComplete: 'current-password',
      ...registerHelper({
        required: 'Password is required',
        validate: (value: string) => isStrongPassword(value) || 'Weak password'
      })
    }
  }

  if (name === 'confirmPassword') {
    inputProps = {
      ...inputProps,
      label: 'Password confirmation*',
      type: 'password',
      autoComplete: 'current-password',
      ...registerHelper({
        required: false,
        validate: (value: string) => getValues()?.password === value || 'Password does not match'
      })
    }
  }

  if (name === 'currentPassword') {
    inputProps = {
      ...inputProps,
      label: 'Current password*',
      type: 'password',
      autoComplete: 'current-password',
      ...registerHelper({
        required: 'Password is required',
        validate: (value: string) => isStrongPassword(value) || 'Weak password'
      })
    }
  }

  const InputElement = multiline ? 'textarea' : 'input'

  return <div className="mb-4">
    <label htmlFor="email" className="block mb-2 font-bold">
      {labelOverride || inputProps.label}
    </label>
    <InputElement
      className={[
        'input',
        'input-bordered',
        'mb-1',
        'w-full',
        errors?.[name] ? 'input-error' : '',
        multiline ? 'min-h-[144px] h-[auto] p-4' : '',
      ].join(' ')}
      {...inputProps}
    />
    <span className="block h-1 text-sm text-red-500">{errors?.[name]?.message as string || ''}</span>
  </div>
}

export default TextInput

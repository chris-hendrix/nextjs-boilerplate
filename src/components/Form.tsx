// Form.tsx
import React from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

type FormProps = {
  form: UseFormReturn;
  onSubmit: SubmitHandler<any>;
  onClose?: () => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({
  form,
  onSubmit,
  onClose = null,
  onCancel = null,
  isSubmitting = false,
  children
}) => (
  <div>
    <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
      {children}
      <div className="flex justify-end mt-4">
        <div className="space-x-2">
          <button
            type="submit"
            className="btn btn-primary w-24"
            disabled={!form.formState.isValid || isSubmitting}
          >
            Save
          </button>
          {onClose && (
            <button
              type="button"
              className="btn btn-secondary w-24"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Close
            </button>
          )}
          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary w-24"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  </div>
)

export default Form

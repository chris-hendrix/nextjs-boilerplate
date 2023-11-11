import { useDispatch, useSelector } from 'react-redux'
import { showAlertAsync, AlertType } from '@/store/app'
import { RootState, AppDispatch } from '@/store'
import { getErrorMessage } from '@/lib/error'

interface ShowAlertOptions {
  message?: string | null
  successMessage?: string | null,
  errorMessage?: string,
  error?: any
  duration?: number
}

export const useAlert = () => {
  const dispatch: AppDispatch = useDispatch()
  const alertState = useSelector((state: RootState) => state.app.alert)

  const showAlert = (options: ShowAlertOptions | string) => {
    if (typeof options === 'string') {
      dispatch(showAlertAsync({ message: options, type: 'normal', duration: 3000 }))
      return
    }
    const {
      message = null,
      successMessage = null,
      errorMessage = null,
      error = null,
      duration = 5000
    } = options || {}
    const alertMessage = message || successMessage || errorMessage || getErrorMessage(error)
    let type: AlertType = 'normal'
    if (successMessage) type = 'success'
    if (error || errorMessage) type = 'error'
    if (!alertMessage) return
    dispatch(showAlertAsync({ message: alertMessage, type, duration }))
  }

  return { showAlert, ...alertState }
}

export default useAlert

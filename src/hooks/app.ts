import { useDispatch, useSelector } from 'react-redux'
import { showAlertAsync, AlertType } from '@/store/app'
import { RootState, AppDispatch } from '@/store'

export const useAlert = () => {
  const dispatch: AppDispatch = useDispatch()
  const alertState = useSelector((state: RootState) => state.app.alert)

  const showAlert = (message: string, options?: {
    type?: AlertType,
    duration?: number
  }) => {
    const { type = 'normal', duration = 5000 } = options || {}
    dispatch(showAlertAsync({ message, type, duration }))
  }

  return {
    showAlert,
    ...alertState
  }
}

export default useAlert

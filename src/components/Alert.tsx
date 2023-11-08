import React, { useState, useEffect } from 'react'
import { AlertType } from '@/store/app'
import { getErrorMessage } from '@/lib/error'

type Props = {
  message?: string,
  error?: any,
  type?: AlertType
  duration?: number
}

const ICONS = {
  normal: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
  info: <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  success: <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  warning: <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  error: <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
}

/**
 * Alert Component
 *
 * Displays an alert message with an optional icon and a specified duration.
 * If the 'time' prop is set to null, the alert remains visible indefinitely.
 *
 * @param {string|null} message - The alert message to display.
 * @param {any} error - An error object to extract the error message from.
 * @param {'normal' | 'info' | 'success' | 'warning' | 'error'} type - The type of alert.
 * @param {number|null} time - Duration in ms for display. If null, alert is shown indefinitely.
 */
const Alert: React.FC<Props> = ({ message = null, error = null, type = 'normal', duration = 3000 }) => {
  const [showAlert, setShowAlert] = useState(false)
  const alertType = error ? 'error' : type
  const alertMessage = getErrorMessage(error) || message

  useEffect(() => {
    if (!duration) {
      setShowAlert(true)
      return () => null
    }
    setShowAlert(true)
    const timeout = setTimeout(() => setShowAlert(false), duration)
    return () => clearTimeout(timeout)
  }, [])

  if (!alertMessage) return null
  if (!showAlert) return null

  return (
    <div className={`alert ${alertType !== 'normal' ? `alert-${alertType}` : ''}`}>
      {ICONS[alertType]}
      <span>{alertMessage}</span>
    </div>
  )
}

export default Alert

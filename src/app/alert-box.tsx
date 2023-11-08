'use client'

import React from 'react'
import Alert from '@/components/Alert'
import { useAlert } from '@/hooks/app'

const AlertBox = () => {
  const { isVisible, message, type, duration } = useAlert()
  if (!isVisible || !message || !type || !duration) return null
  return (
    <div>
      <Alert message={message} type={type} duration={duration} />
    </div>
  )
}

export default AlertBox

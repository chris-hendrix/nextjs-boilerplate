'use client'

import React from 'react'
import Alert from '@/components/Alert'
import { useAlert } from '@/hooks/app'

const AlertBox: React.FC = () => {
  const { isVisible, message, type, duration } = useAlert()

  if (!isVisible || !message || !type || !duration) return null
  return (
    <div style={{ zIndex: 9999 }} className={'fixed bottom-8 left-8 w-96 transition-opacity duration-300 ease-in-out'}>
      <Alert message={message} type={type} duration={duration} />
    </div>
  )
}

export default AlertBox

'use client'

import { WherebyMeeting } from './event-modal'
import { useState } from 'react'

type MeetingWrapperProps = {
  roomUrl: string
}

export default function MeetingWrapper({ roomUrl }: MeetingWrapperProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  return <WherebyMeeting url={roomUrl} isOpen={isOpen} onClose={handleClose} />
}

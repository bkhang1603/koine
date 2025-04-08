'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlayCircle } from 'lucide-react'
import { WherebyMeeting } from '@/app/(public)/event/components/event-modal'
import { handleErrorApi } from '@/lib/utils'

interface EventMeetingProps {
  roomUrl: string
}

export function EventMeeting({ roomUrl }: EventMeetingProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isMeetingOpen, setIsMeetingOpen] = useState(false)

  const openMeet = async () => {
    try {
      setIsProcessing(true)
      setIsMeetingOpen(true)
    } catch (error) {
      handleErrorApi({ error })
    } finally {
      setTimeout(() => {
        setIsProcessing(false)
      }, 500)
    }
  }

  return (
    <>
      <Button className='w-full' size='lg' onClick={openMeet} disabled={isProcessing}>
        <PlayCircle className='h-4 w-4 mr-2' />
        {isProcessing ? 'Đang kết nối...' : 'Tham gia ngay'}
      </Button>

      <WherebyMeeting url={roomUrl} isOpen={isMeetingOpen} onClose={() => setIsMeetingOpen(false)} />
    </>
  )
}

'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { X } from 'lucide-react'

interface WherebyMeetingProps {
  url: string
  isOpen: boolean
  onClose: () => void
}

export function WherebyMeeting({ url, isOpen, onClose }: WherebyMeetingProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-[90vw] max-h-[90vh] p-0'>
        <DialogHeader className='p-4 flex flex-row items-center justify-between'>
          <DialogTitle>Cuộc họp trực tuyến</DialogTitle>
        </DialogHeader>
        <div className='w-full h-[80vh]'>
          <iframe
            src={url}
            sandbox='allow-scripts allow-same-origin allow-popups allow-forms allow-modals'
            allow='camera; microphone; fullscreen; speaker; display-capture; clipboard-write'
            className='w-full h-full border-0'
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import Artplayer from 'artplayer'

interface EventRecordingProps {
  recordUrl: string
}

export default function EventRecording({ recordUrl }: EventRecordingProps) {
  const artRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!artRef.current || !recordUrl) return

    const art = new Artplayer({
      container: artRef.current,
      url: recordUrl,
      volume: 0.5,
      autoplay: false,
      pip: true,
      autoSize: true,
      screenshot: false,
      setting: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: true,
      subtitleOffset: true,
      miniProgressBar: true,
      mutex: true,
      backdrop: true,
      playsInline: true,
      autoPlayback: true,
      theme: '#2563eb' // primary color
    })

    return () => {
      if (art && art.destroy) {
        art.destroy(false)
      }
    }
  }, [recordUrl])

  return (
    <div className='w-full'>
      <div ref={artRef} className='w-full aspect-video bg-black rounded-lg shadow overflow-hidden' />
      <p className='text-sm text-gray-500 mt-2'>Bạn có thể xem lại bản ghi sự kiện này bất kỳ lúc nào</p>
    </div>
  )
}

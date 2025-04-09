import { Clock, FileText, MonitorPlay, Video } from 'lucide-react'
import Artplayer from 'artplayer'
import { useEffect, useRef } from 'react'

// Add custom type to extend Artplayer's Selector
type CustomSelector = {
  default?: boolean
  html: string
  value: string
}

type LessonType = 'VIDEO' | 'DOCUMENT' | 'BOTH'

type LessonContentProps = {
  lesson: {
    id: string
    type: LessonType
    title: string
    sequence: number
    durations: number
    description: string
    content: string | null
    videoUrl: string | null
  }
}

export const LessonContent = ({ lesson }: { lesson: LessonContentProps['lesson'] }) => {
  const artRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!artRef.current || !lesson.videoUrl) return

    const art = new Artplayer({
      container: artRef.current,
      url: lesson.videoUrl,
      volume: 0.5,
      autoplay: false,
      pip: true,
      screenshot: false,
      setting: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      miniProgressBar: true,
      theme: '#2563eb', // primary color
      controls: [
        {
          name: 'quality',
          position: 'right',
          html: 'Quality',
          selector: [
            { default: true, html: '1080p', value: lesson.videoUrl },
            { html: '720p', value: lesson.videoUrl.replace('1080p', '720p') },
            { html: '480p', value: lesson.videoUrl.replace('1080p', '480p') }
          ] as CustomSelector[]
        }
      ]
    })

    return () => {
      if (art && art.destroy) {
        art.destroy(false)
      }
    }
  }, [lesson.videoUrl])

  const renderTypeIcon = () => {
    switch (lesson.type) {
      case 'VIDEO':
        return <Video className='w-4 h-4' />
      case 'DOCUMENT':
        return <FileText className='w-4 h-4' />
      case 'BOTH':
        return <MonitorPlay className='w-4 h-4' />
    }
  }

  return (
    <div className='space-y-8'>
      <div>
        <div className='flex items-center gap-3 text-sm text-gray-500'>
          <span>Bài {lesson.sequence}</span>
          <span>•</span>
          <div className='flex items-center gap-1'>
            {renderTypeIcon()}
            <span>
              {lesson.type === 'VIDEO' && 'Bài giảng video'}
              {lesson.type === 'DOCUMENT' && 'Tài liệu học tập'}
              {lesson.type === 'BOTH' && 'Video và Tài liệu'}
            </span>
          </div>
          <span>•</span>
          <div className='flex items-center gap-1'>
            <Clock className='w-4 h-4' />
            <span>{lesson.durations} phút</span>
          </div>
        </div>
        <h2 className='text-2xl font-bold mt-2'>{lesson.title}</h2>

        {/* Description */}
        <div className='prose prose-slate max-w-none mt-2'>
          <p className='text-gray-600 leading-relaxed'>{lesson.description}</p>
        </div>
      </div>

      {/* Video Section */}
      {(lesson.type === 'VIDEO' || lesson.type === 'BOTH') && lesson.videoUrl && (
        <div className='aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-lg'>
          <div ref={artRef} className='w-full h-full' />
        </div>
      )}

      {/* Content Section */}
      {(lesson.type === 'DOCUMENT' || lesson.type === 'BOTH') && (
        <>
          <div className='border-t border-gray-200' />
          <div
            className='prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-xl
              prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-primary
              prose-img:rounded-xl prose-img:shadow-md'
            dangerouslySetInnerHTML={{ __html: lesson.content || '' }}
          />
        </>
      )}
    </div>
  )
}

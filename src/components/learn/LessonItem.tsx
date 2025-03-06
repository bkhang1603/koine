import { Clock, FileText, MonitorPlay, Video, CheckCircle2, LockKeyhole } from 'lucide-react'
import { cn } from '@/lib/utils'

type LessonType = 'VIDEO' | 'DOCUMENT' | 'BOTH'

type LessonItemProps = {
  lesson: {
    id: string
    type: LessonType
    title: string
    durations: number
    status: 'YET' | 'COMPLETED' | 'IN_PROGRESS'
  }
  isActive: boolean
  isAccessible: boolean
  onClick: () => void
}

export const LessonItem = ({ lesson, isActive, isAccessible, onClick }: LessonItemProps) => {
  const renderTypeIcon = () => {
    switch (lesson.type) {
      case 'VIDEO':
        return <Video className='w-4 h-4 text-blue-500' />
      case 'DOCUMENT':
        return <FileText className='w-4 h-4 text-emerald-500' />
      case 'BOTH':
        return <MonitorPlay className='w-4 h-4 text-purple-500' />
    }
  }

  const renderStatus = () => {
    if (!isAccessible) return <LockKeyhole className='w-4 h-4 text-gray-400' />
    if (lesson.status === 'COMPLETED') return <CheckCircle2 className='w-4 h-4 text-emerald-500' />
    return null
  }

  return (
    <button
      onClick={onClick}
      disabled={!isAccessible}
      className={cn(
        'w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors',
        isActive && 'bg-primary/5 hover:bg-primary/5',
        !isAccessible && 'opacity-60 cursor-not-allowed'
      )}
    >
      {/* Type Icon */}
      <div className='flex-shrink-0 mt-1'>{renderTypeIcon()}</div>

      {/* Content */}
      <div className='flex-1 min-w-0 text-left'>
        <h5 className='font-medium text-sm truncate'>{lesson.title}</h5>
        <div className='flex items-center gap-2 text-xs text-gray-500 mt-0.5'>
          {/* <span
            className={cn(
              lesson.type === 'VIDEO' && 'text-blue-500',
              lesson.type === 'DOCUMENT' && 'text-emerald-500',
              lesson.type === 'BOTH' && 'text-purple-500'
            )}
          >
            {lesson.type === 'VIDEO' && 'Video'}
            {lesson.type === 'DOCUMENT' && 'Tài liệu'}
            {lesson.type === 'BOTH' && 'Video & Tài liệu'}
          </span>

          <span>•</span> */}
          <Clock
            className={cn(
              lesson.type === 'VIDEO' && 'text-blue-500 w-3 h-3',
              lesson.type === 'DOCUMENT' && 'text-emerald-500 w-3 h-3',
              lesson.type === 'BOTH' && 'text-purple-500 w-3 h-3'
            )}
          />
          <span
            className={cn(
              lesson.type === 'VIDEO' && 'text-blue-500',
              lesson.type === 'DOCUMENT' && 'text-emerald-500',
              lesson.type === 'BOTH' && 'text-purple-500'
            )}
          >
            {lesson.durations} phút
          </span>
        </div>
      </div>

      {/* Status Icon */}
      <div className='flex-shrink-0 mt-1'>{renderStatus()}</div>
    </button>
  )
}

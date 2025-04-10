'use client'

import { Badge } from '@/components/ui/badge'
import { Video, File, FileText } from 'lucide-react'

interface LessonTypeDisplayProps {
  type: string
  size?: 'sm' | 'md'
}

export function LessonTypeDisplay({ type, size = 'sm' }: LessonTypeDisplayProps) {
  const iconSize = size === 'sm' ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-1.5'

  switch (type) {
    case 'VIDEO':
      return (
        <Badge variant='outline' className='border-blue-500/50 text-blue-500'>
          <Video className={iconSize} />
          Video
        </Badge>
      )
    case 'DOCUMENT':
      return (
        <Badge variant='outline' className='border-green-500/50 text-green-500'>
          <File className={iconSize} />
          Bài đọc
        </Badge>
      )
    case 'BOTH':
      return (
        <Badge variant='outline' className='border-purple-500/50 text-purple-500'>
          <Video className={iconSize} />
          Video & Bài đọc
        </Badge>
      )
    default:
      return (
        <Badge variant='outline' className='border-gray-500/50 text-gray-500'>
          <FileText className={iconSize} />
          Khác
        </Badge>
      )
  }
}

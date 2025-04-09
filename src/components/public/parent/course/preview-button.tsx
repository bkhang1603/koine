'use client'

import Link from 'next/link'
import { Eye } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useAppStore } from '@/components/app-provider'
import { useAuthModal } from '@/components/auth/auth-modal-provider'

interface PreviewButtonProps {
  courseId: string
  lessonId: string
}

export default function PreviewButton({ courseId, lessonId }: PreviewButtonProps) {
  const isAuth = useAppStore((state) => state.isAuth)
  const { showLoginModal } = useAuthModal()

  const buttonClass =
    'flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium hover:bg-primary/20 transition-colors cursor-pointer'

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {isAuth ? (
            <Link href={`/learn/${courseId}?lessonId=${lessonId}&preview=true`} className={buttonClass}>
              <Eye className='w-3.5 h-3.5' />
              <span>Học thử</span>
            </Link>
          ) : (
            <div className={buttonClass} onClick={showLoginModal}>
              <Eye className='w-3.5 h-3.5' />
              <span>Học thử</span>
            </div>
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>Xem trước nội dung bài học</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

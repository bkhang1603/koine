import { HelpCircle, LockKeyhole, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuizItemProps {
  chapter: any
  index: number
  isAccessible: boolean
  onClick: () => void
  isActive: boolean
}

export const QuizItem = ({ chapter, index, isAccessible, onClick, isActive }: QuizItemProps) => {
  const renderStatus = () => {
    if (!isAccessible) return <LockKeyhole className='w-4 h-4 text-gray-400' />
    if (chapter.quizCompleted) return <CheckCircle2 className='w-4 h-4 text-emerald-500' />
    return null
  }

  return (
    <button
      onClick={onClick}
      disabled={!isAccessible}
      className={cn(
        'w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors',
        !isAccessible && 'opacity-60 cursor-not-allowed',
        isActive && 'bg-primary/5 hover:bg-primary/5'
      )}
    >
      {/* Type Icon */}
      <div className='flex-shrink-0 mt-1'>
        <HelpCircle className='w-4 h-4 text-amber-500' />
      </div>

      {/* Content */}
      <div className='flex-1 min-w-0 text-left'>
        <h5 className='font-medium text-sm truncate'>Kiểm tra chương {index + 1}</h5>
        <div className='flex items-center gap-2 text-xs text-amber-500 mt-0.5'>
          <HelpCircle className='w-3 h-3' />
          <span>{chapter.questions.length} câu hỏi</span>
        </div>
      </div>

      {/* Status Icon */}
      <div className='flex-shrink-0 mt-1'>{renderStatus()}</div>
    </button>
  )
}

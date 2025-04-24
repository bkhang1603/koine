import configRoute from '@/config/route'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

type BreadcrumbProps = {
  courseTitle?: string
  courseId?: string
}

export const Breadcrumb = ({ courseTitle, courseId }: BreadcrumbProps) => (
  <div className='mb-6 flex items-center gap-1 text-sm'>
    <Link
      href={configRoute.kid.dashboard}
      className='flex items-center gap-1 text-gray-500 hover:text-primary transition-colors'
    >
      <Home className='h-4 w-4' />
      <span className='hidden sm:inline'>Trang chính</span>
    </Link>
    <ChevronRight className='h-4 w-4 text-gray-400' />
    <Link href={configRoute.kid.course} className='text-gray-500 hover:text-primary transition-colors'>
      Khóa học
    </Link>
    {courseTitle && courseId && (
      <>
        <ChevronRight className='h-4 w-4 text-gray-400' />
        <Link
          href={`${configRoute.kid.course}/${courseId}`}
          className='text-gray-500 hover:text-primary transition-colors truncate max-w-[180px]'
        >
          {courseTitle}
        </Link>
        <ChevronRight className='h-4 w-4 text-gray-400' />
        <span className='text-gray-800 font-medium'>Học tập</span>
      </>
    )}
  </div>
)

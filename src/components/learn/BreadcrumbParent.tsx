import configRoute from '@/config/route'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

type BreadcrumbProps = {
  courseTitle?: string
}

export const BreadcrumbParent = ({ courseTitle }: BreadcrumbProps) => (
  <div className='mb-6 flex items-center gap-1 text-sm'>
    <Link
      href={configRoute.setting.myCourse}
      className='flex items-center gap-1 text-gray-500 hover:text-primary transition-colors'
    >
      <span className='hidden sm:inline'>Khóa học của tôi</span>
    </Link>
    {courseTitle && (
      <>
        <ChevronRight className='h-4 w-4 text-gray-400' />
        <span className='text-gray-800 font-medium'>{courseTitle}</span>
      </>
    )}
  </div>
)

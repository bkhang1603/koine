'use client'

import NewCoursePage from '@/components/private/common/course/course-new'
import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

const COURSE_DRAFT_KEY = 'course_draft_data'

function Page() {
  const [localDraft, setLocalDraft] = useState<any | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localDraft = localStorage.getItem(COURSE_DRAFT_KEY)
        if (localDraft) {
          setLocalDraft(JSON.parse(localDraft))
        }
      } catch (error) {
        console.error('Error loading draft:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      {/* Breadcrumb */}
      <nav className='flex items-center space-x-1 text-sm text-muted-foreground mb-6'>
        <Link href='/content-creator/course' className='hover:text-primary transition-colors'>
          Khóa học
        </Link>
        <ChevronRight className='h-4 w-4' />
        <span className='font-medium text-foreground'>Tạo mới</span>
      </nav>
      <div>
        <NewCoursePage localDraft={localDraft} baseUrl='/content-creator/course' />
      </div>
    </div>
  )
}

export default Page

'use client'

import NewBlogPage from '@/components/private/common/blog/blog-new'
import { BlogDataResType } from '@/schemaValidations/blog.schema'
import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

const BLOG_DRAFT_KEY = 'blog_draft_data'

function Page() {
  const [localDraft, setLocalDraft] = useState<BlogDataResType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localDraft = localStorage.getItem(BLOG_DRAFT_KEY)
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
        <Link href='/admin/blog' className='hover:text-primary transition-colors'>
          Blog
        </Link>
        <ChevronRight className='h-4 w-4' />
        <span className='font-medium text-foreground'>Tạo mới</span>
      </nav>
      <div>
        <NewBlogPage localDraft={localDraft} baseUrl='/admin/blog' />
      </div>
    </div>
  )
}

export default Page

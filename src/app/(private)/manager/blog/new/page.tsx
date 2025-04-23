'use client'

import NewBlogPage from '@/components/private/common/blog/blog-new'
import { BlogDataResType } from '@/schemaValidations/blog.schema'
import { useEffect, useState } from 'react'
import { Breadcrumb } from '@/components/private/common/breadcrumb'

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

  const breadcrumbItems = [
    {
      title: 'Blog',
      href: '/manager/blog'
    },
    {
      title: 'Tạo mới'
    }
  ]

  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      <div>
        <NewBlogPage localDraft={localDraft} baseUrl='/manager/blog' />
      </div>
    </div>
  )
}

export default Page

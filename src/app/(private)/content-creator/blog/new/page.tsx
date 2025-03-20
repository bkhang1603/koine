'use client'

import Loading from '@/components/loading'
import NewBlogPage from '@/components/private/content-creator/blog/blog-new'
import { BlogDataResType } from '@/schemaValidations/blog.schema'
import { useEffect, useState } from 'react'

const BLOG_DRAFT_KEY = 'blog_draft_data'

function Page() {
  const [localDraft, setLocalDraft] = useState<BlogDataResType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localDraft = localStorage.getItem(BLOG_DRAFT_KEY)
        if (localDraft) {
          setLocalDraft(JSON.parse(localDraft))
        }
      } catch (error) {
        console.error('Error loading draft:', error)
      } finally {
        // Set loading to false after data is fetched (or attempted to fetch)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[calc(100vh-10rem)]'>
        <Loading />
      </div>
    )
  }

  return <div>{<NewBlogPage localDraft={localDraft} />}</div>
}

export default Page

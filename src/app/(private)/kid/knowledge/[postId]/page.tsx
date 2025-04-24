'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useBlogDetailQuery } from '@/queries/useBlog'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Home, ChevronRight } from 'lucide-react'
import configRoute from '@/config/route'

function KnowledgeDetailPage(props: { params: Promise<{ postId: string }> }) {
  const params = use(props.params)
  const { postId } = params
  const { data, isLoading } = useBlogDetailQuery({ id: postId })
  const blog = data?.payload.data

  // Breadcrumb component
  const Breadcrumb = () => (
    <div className='mb-6 flex items-center gap-1 text-sm'>
      <Link
        href={configRoute.kid.dashboard}
        className='flex items-center gap-1 text-gray-500 hover:text-primary transition-colors'
      >
        <Home className='h-4 w-4' />
        <span className='hidden sm:inline'>Trang chính</span>
      </Link>
      <ChevronRight className='h-4 w-4 text-gray-400' />
      <Link href={configRoute.kid.knowledge} className='text-gray-500 hover:text-primary transition-colors'>
        Kiến thức
      </Link>
      {!isLoading && blog && (
        <>
          <ChevronRight className='h-4 w-4 text-gray-400' />
          <span className='text-gray-800 font-medium truncate max-w-[180px]'>{blog.title}</span>
        </>
      )}
    </div>
  )

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (!blog) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Breadcrumb />
        <div className='text-center py-12'>
          <h2 className='text-2xl font-bold mb-4'>Không tìm thấy bài viết</h2>
          <p className='text-gray-600 mb-6'>Bài viết này không tồn tại hoặc đã bị xóa</p>
          <Button asChild>
            <Link href={configRoute.kid.knowledge}>Quay lại trang kiến thức</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb />

      {/* Header Image */}
      <div className='relative h-[400px] rounded-3xl overflow-hidden mb-8'>
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
        <div className='absolute bottom-8 left-8 right-8 text-white'>
          <div className='flex items-center flex-wrap gap-3 mb-4'>
            {blog.categories.map((category) => (
              <span key={category.id} className='bg-primary/20 px-4 py-1.5 rounded-full text-sm backdrop-blur-sm'>
                {category.name}
              </span>
            ))}
            <span className='bg-white/20 px-4 py-1.5 rounded-full text-sm backdrop-blur-sm'>
              {formatReadingTime(blog.content)}
            </span>
          </div>
          <h1 className='text-4xl font-bold mb-4'>{blog.title}</h1>
          <p className='text-lg opacity-90 mb-4'>{blog.description}</p>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <div className='w-10 h-10 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm'>
                {blog.creatorInfo.avatarUrl ? (
                  <Image
                    src={blog.creatorInfo.avatarUrl}
                    alt={blog.creatorInfo.firstName}
                    width={40}
                    height={40}
                    className='object-cover'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center'>👨‍🏫</div>
                )}
              </div>
              <span>{blog.creatorInfo.firstName}</span>
            </div>
            <span>•</span>
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Table of Contents - now on the left */}
        <div className='space-y-8'>
          <Card className='p-6 sticky top-32'>
            <h3 className='font-bold text-lg mb-4'>Trong bài này có gì? 📑</h3>
            <div className='space-y-3'>
              <ExtractTableOfContents content={blog.content} />
            </div>
          </Card>
        </div>

        {/* Main Content - now on the right */}
        <div className='lg:col-span-2'>
          <div className='prose prose-lg max-w-none' dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
    </div>
  )
}

// Helper function to extract headings from HTML content and create a table of contents
function ExtractTableOfContents({ content }: { content: string }) {
  // Very basic implementation - extract h2 tags
  const headings = content.match(/<h2[^>]*>(.*?)<\/h2>/g) || []

  if (headings.length === 0) {
    return <p className='text-gray-500'>Không tìm thấy mục lục</p>
  }

  return (
    <ul className='space-y-3'>
      {headings.map((heading, index) => {
        const text = heading.replace(/<[^>]*>/g, '')
        return (
          <li key={index}>
            <Button variant='ghost' className='w-full justify-start rounded-full text-left'>
              📌 {text}
            </Button>
          </li>
        )
      })}
    </ul>
  )
}

// Helper function to calculate reading time based on content length
function formatReadingTime(content: string) {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 200)) // Assume average reading speed of 200 words per minute
  return `${minutes} phút đọc`
}

// Loading skeleton
function LoadingSkeleton() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6'>
        <Skeleton className='h-4 w-48' />
      </div>

      {/* Header Image Skeleton */}
      <div className='relative h-[400px] rounded-3xl overflow-hidden mb-8'>
        <Skeleton className='h-full w-full' />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Table of Contents Skeleton - now on the left */}
        <div className='space-y-8'>
          <Card className='p-6'>
            <Skeleton className='h-6 w-2/3 mb-4' />
            <div className='space-y-3'>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
            </div>
          </Card>
        </div>

        {/* Content Skeleton - now on the right */}
        <div className='lg:col-span-2 space-y-6'>
          <Skeleton className='h-8 w-3/4 mb-4' />
          <Skeleton className='h-6 w-full' />
          <Skeleton className='h-6 w-full' />
          <Skeleton className='h-6 w-2/3' />

          <Skeleton className='h-[200px] w-full my-8' />

          <Skeleton className='h-8 w-1/2 mb-4' />
          <Skeleton className='h-6 w-full' />
          <Skeleton className='h-6 w-full' />
          <Skeleton className='h-6 w-4/5' />
        </div>
      </div>
    </div>
  )
}

export default KnowledgeDetailPage

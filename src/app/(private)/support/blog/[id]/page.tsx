'use client'
import { use } from 'react'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, Clock, User, ThumbsUp, MessageSquare, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { useBlogDetailQuery } from '@/queries/useBlog'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/lib/utils'
import { Breadcrumb } from '@/components/private/common/breadcrumb'

export default function BlogPostDetail(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { data, isLoading } = useBlogDetailQuery({ id: params.id })
  const post = data?.payload.data

  // Skeleton loading component
  if (isLoading) {
    return (
      <div className='max-w-5xl mx-auto space-y-6'>
        <div className='flex justify-between items-center'>
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-24' />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className='w-full h-64 rounded-t-lg' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex justify-between items-center'>
              <Skeleton className='h-6 w-20' />
              <Skeleton className='h-6 w-24' />
            </div>
            <Skeleton className='h-12 w-3/4' />
            <div className='flex items-center text-sm text-muted-foreground gap-2'>
              <Skeleton className='h-4 w-4 rounded-full' />
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-4 w-4 rounded-full' />
              <Skeleton className='h-4 w-32' />
            </div>
            <div className='space-y-4'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-5/6' />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!post) {
    return (
      <div className='max-w-5xl mx-auto space-y-6'>
        <div className='flex justify-between items-center'>
          <Button variant='outline' asChild>
            <Link href='/support/blog'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Quay lại danh sách
            </Link>
          </Button>
        </div>

        <Card className='p-8 text-center'>
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold'>Không tìm thấy bài viết</h2>
            <p className='text-muted-foreground'>Bài viết không tồn tại hoặc đã bị xóa</p>
            <Button asChild>
              <Link href='/support/blog'>Quay lại danh sách</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const breadcrumbItems = [
    {
      title: 'Bài viết',
      href: '/support/blog'
    },
    {
      title: post?.title || 'Chi tiết bài viết'
    }
  ]

  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200)

  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      {/* Breadcrumb component */}
      <div className='mb-6'>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className='max-w-5xl mx-auto space-y-6'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-2xl font-bold line-clamp-1 max-w-[500px]'>{post.title}</h1>
            <p className='text-sm text-muted-foreground mt-1'>Chi tiết bài viết</p>
          </div>
          <div className='space-x-2'>
            <Button variant='outline' asChild>
              <Link href={`/support/blog/${post.id}/comment`}>
                <MessageCircle className='mr-2 h-4 w-4' />
                Xem bình luận
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className='p-0 relative'>
            <div className='aspect-[21/9] w-full relative overflow-hidden rounded-t-lg'>
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
              />
            </div>
          </CardHeader>
          <CardContent className='space-y-6 pt-6'>
            <div className='flex flex-wrap gap-2'>
              {post.categories.map((category) => (
                <Badge key={category.id} variant='outline' className='rounded-full px-3 py-1'>
                  {category.name}
                </Badge>
              ))}
              <Badge variant='secondary' className='rounded-full px-3 py-1 ml-auto'>
                <Clock className='mr-1 h-3 w-3' />
                {readingTime} phút đọc
              </Badge>
            </div>

            <CardTitle className='text-3xl font-bold'>{post.title}</CardTitle>

            <p className='text-muted-foreground text-lg'>{post.description}</p>

            <div className='flex items-center justify-between border-y border-slate-200 py-4'>
              <div className='flex items-center space-x-4'>
                <div className='w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0'>
                  {post.creatorInfo.avatarUrl ? (
                    <Image
                      src={post.creatorInfo.avatarUrl}
                      alt={post.creatorInfo.firstName}
                      width={40}
                      height={40}
                      className='object-cover'
                    />
                  ) : (
                    <User className='w-full h-full p-2 text-slate-400' />
                  )}
                </div>
                <div>
                  <div className='font-medium'>{post.creatorInfo.firstName}</div>
                  <div className='text-sm text-muted-foreground'>Tác giả</div>
                </div>
              </div>
              <div className='flex items-center space-x-4 text-sm text-muted-foreground'>
                <div className='flex items-center'>
                  <Calendar className='mr-1 h-4 w-4' />
                  {formatDate(post.createdAt)}
                </div>
                <div className='flex items-center'>
                  <ThumbsUp className='mr-1 h-4 w-4' />
                  {post.totalReact} lượt thích
                </div>
                <div className='flex items-center'>
                  <MessageSquare className='mr-1 h-4 w-4' />
                  {post.totalComment} bình luận
                </div>
              </div>
            </div>

            <div className='prose prose-lg max-w-none' dangerouslySetInnerHTML={{ __html: post.content }} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

'use client'
import { use, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, AlertCircle, User, ThumbsUp, MessageCircle, Reply } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useBlogDetailAdminQuery, useBlogCommentsAdminQuery } from '@/queries/useBlog'
import { Skeleton } from '@/components/ui/skeleton'
import { vi } from 'date-fns/locale'
import { format } from 'date-fns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AdminBlogDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { isLoading, error, data } = useBlogDetailAdminQuery({ id: params.id })
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    error: commentsError
  } = useBlogCommentsAdminQuery({ id: params.id })

  const blog = data?.payload.data
  const comments = commentsData?.payload.data.commentsWithReplies || []
  const totalComments = commentsData?.payload.data.totalComments || 0

  if (isLoading) {
    return (
      <div className='container max-w-7xl mx-auto py-6 space-y-8'>
        {/* Back button skeleton */}
        <Skeleton className='w-[200px] h-10' />

        {/* Header skeleton */}
        <div>
          <div className='flex items-center justify-between mb-4'>
            <Skeleton className='w-[300px] h-8' />
            <Skeleton className='w-[80px] h-6' />
          </div>
          <div className='flex items-center gap-6'>
            <Skeleton className='w-[100px] h-5' />
            <Skeleton className='w-[80px] h-5' />
            <Skeleton className='w-[120px] h-5' />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-6'>
          <div className='col-span-2 space-y-6'>
            {/* Blog image skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-full h-[300px] rounded-lg' />
              </CardContent>
            </Card>

            {/* Description skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-full h-20' />
              </CardContent>
            </Card>

            {/* Content skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-full h-[400px]' />
              </CardContent>
            </Card>
          </div>

          {/* Blog info skeleton */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className='flex justify-between'>
                      <Skeleton className='w-[120px] h-5' />
                      <Skeleton className='w-[100px] h-5' />
                    </div>
                  ))}
                </div>

                <Skeleton className='w-full h-px' />

                <div className='space-y-3'>
                  <Skeleton className='w-[100px] h-5' />
                  <div className='flex flex-wrap gap-2'>
                    <Skeleton className='w-[80px] h-6 rounded-full' />
                    <Skeleton className='w-[60px] h-6 rounded-full' />
                    <Skeleton className='w-[70px] h-6 rounded-full' />
                  </div>
                </div>

                <Skeleton className='w-full h-px' />

                <div className='space-y-3'>
                  <Skeleton className='w-[150px] h-5' />
                  <div className='flex items-center gap-3'>
                    <Skeleton className='w-12 h-12 rounded-full' />
                    <div className='space-y-1'>
                      <Skeleton className='w-[100px] h-5' />
                      <Skeleton className='w-[80px] h-4' />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action buttons skeleton */}
            <div className='space-y-3'>
              <Skeleton className='w-full h-10 rounded-md' />
              <Skeleton className='w-full h-10 rounded-md' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
        <AlertCircle className='w-12 h-12 text-red-500' />
        <div className='text-center'>
          <h3 className='text-lg font-medium text-gray-900 mb-1'>Không tìm thấy bài viết</h3>
          <p className='text-gray-500'>Bài viết không tồn tại hoặc đã bị xóa</p>
        </div>
        <Button variant='outline' asChild>
          <Link href='/admin/blog'>Quay lại danh sách bài viết</Link>
        </Button>
      </div>
    )
  }

  // Format date for comments
  const formatCommentDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi })
  }

  // Render a single comment
  const renderComment = (comment: any) => (
    <div key={comment.id} className='border rounded-lg p-4 mb-4'>
      <div className='flex items-start gap-3'>
        <Avatar className='h-10 w-10'>
          <AvatarImage src={comment.user.avatarUrl || '/avatar-placeholder.png'} alt={comment.user.firstName} />
          <AvatarFallback>{comment.user.firstName?.[0] || comment.user.username?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <div className='flex justify-between items-center mb-1'>
            <div className='font-medium'>{comment.user.firstName || comment.user.username}</div>
            <div className='text-xs text-muted-foreground'>{formatCommentDate(comment.createdAt)}</div>
          </div>
          <p className='text-sm text-gray-700'>{comment.content}</p>
        </div>
      </div>

      {/* Render replies if available */}
      {comment.replies && comment.replies.length > 0 && (
        <div className='ml-12 mt-4 space-y-4'>
          {comment.replies.map((reply: any) => (
            <div key={reply.id} className='border-l-2 border-gray-200 pl-4'>
              <div className='flex items-start gap-3'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src={reply.user.avatarUrl || '/avatar-placeholder.png'} alt={reply.user.firstName} />
                  <AvatarFallback>{reply.user.firstName?.[0] || reply.user.username?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <div className='flex justify-between items-center mb-1'>
                    <div className='font-medium text-sm'>{reply.user.firstName || reply.user.username}</div>
                    <div className='text-xs text-muted-foreground'>{formatCommentDate(reply.createdAt)}</div>
                  </div>
                  <p className='text-sm text-gray-700'>{reply.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Back button */}
      <Button variant='ghost' asChild className='gap-2 hover:bg-gray-100'>
        <Link href='/admin/blog'>
          <ArrowLeft className='h-4 w-4' />
          Quay lại danh sách bài viết
        </Link>
      </Button>

      {/* Header */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>{blog.title}</h1>
          <Badge variant={blog.status === 'PUBLISHED' ? 'secondary' : 'destructive'}>
            {blog.status === 'PUBLISHED' ? 'Đã xuất bản' : 'Bản nháp'}
          </Badge>
        </div>
        <div className='flex items-center gap-6 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <User className='h-4 w-4' />
            {blog.creatorInfo.firstName}
          </div>
          <div className='flex items-center gap-2'>
            <ThumbsUp className='h-4 w-4' />
            {blog.totalReact} lượt thích
          </div>
          <div className='flex items-center gap-2'>
            <MessageCircle className='h-4 w-4' />
            {blog.totalComment} bình luận
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-2 space-y-6'>
          <Tabs defaultValue='content'>
            <TabsList className='mb-4'>
              <TabsTrigger value='content'>Nội dung</TabsTrigger>
              <TabsTrigger value='comments'>Bình luận ({totalComments})</TabsTrigger>
            </TabsList>

            <TabsContent value='content' className='space-y-6'>
              {/* Blog Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Hình ảnh bài viết</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='relative w-full h-[600px]'>
                    <Image src={blog.imageUrl} alt={blog.title} fill className='object-cover rounded-lg' />
                  </div>
                </CardContent>
              </Card>

              {/* Blog Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Mô tả ngắn</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-600'>{blog.description}</p>
                </CardContent>
              </Card>

              {/* Blog Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Nội dung bài viết</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: blog.content }} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='comments'>
              <Card>
                <CardHeader>
                  <CardTitle>Bình luận ({totalComments})</CardTitle>
                </CardHeader>
                <CardContent>
                  {isCommentsLoading ? (
                    <div className='space-y-4'>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className='border rounded-lg p-4'>
                          <div className='flex items-start gap-3'>
                            <Skeleton className='h-10 w-10 rounded-full' />
                            <div className='flex-1 space-y-2'>
                              <div className='flex justify-between'>
                                <Skeleton className='h-4 w-28' />
                                <Skeleton className='h-3 w-20' />
                              </div>
                              <Skeleton className='h-16 w-full' />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : commentsError ? (
                    <div className='text-center py-8'>
                      <AlertCircle className='h-8 w-8 text-red-500 mx-auto mb-2' />
                      <p>Không thể tải bình luận, vui lòng thử lại sau.</p>
                    </div>
                  ) : comments.length === 0 ? (
                    <div className='text-center py-8 text-muted-foreground'>
                      <MessageCircle className='h-8 w-8 mx-auto mb-2' />
                      <p>Chưa có bình luận nào cho bài viết này.</p>
                    </div>
                  ) : (
                    <div className='space-y-0'>{comments.map(renderComment)}</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Blog Info */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin bài viết</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Trạng thái</span>
                  <span>{blog.status === 'PUBLISHED' ? 'Đã xuất bản' : 'Bản nháp'}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Lượt thích</span>
                  <span>{blog.totalReact}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Bình luận</span>
                  <span>{blog.totalComment}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Ngày tạo</span>
                  <span>{format(new Date(blog.createdAt), 'dd/MM/yyyy', { locale: vi })}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Cập nhật lần cuối</span>
                  <span>{format(new Date(blog.updatedAt), 'dd/MM/yyyy', { locale: vi })}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className='text-sm font-medium mb-2'>Danh mục</h3>
                <div className='flex flex-wrap gap-2'>
                  {blog.categories.map((category) => (
                    <Badge key={category.id} variant='outline'>
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className='text-sm font-medium mb-2'>Tác giả</h3>
                <div className='flex items-center gap-3'>
                  <div className='relative w-12 h-12 rounded-full overflow-hidden'>
                    <Image
                      src={blog.creatorInfo.avatarUrl || '/avatar-placeholder.png'}
                      alt={blog.creatorInfo.firstName}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div>
                    <p className='font-medium'>{blog.creatorInfo.firstName}</p>
                    <p className='text-sm text-muted-foreground'>ID: {blog.creatorInfo.id.slice(0, 8)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className='space-y-3'>
            <Button className='w-full' variant='default'>
              Chỉnh sửa bài viết
            </Button>
            <Button
              variant='outline'
              className={`w-full ${
                blog.status === 'PUBLISHED' ? 'text-yellow-600 border-yellow-600' : 'text-green-600 border-green-600'
              }`}
            >
              {blog.status === 'PUBLISHED' ? 'Chuyển sang bản nháp' : 'Xuất bản bài viết'}
            </Button>
            <Button className='w-full' variant='destructive'>
              Xóa bài viết
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

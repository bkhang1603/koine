'use client'

import { use, useEffect, useMemo, useState } from 'react'
import { SearchParams } from '@/types/query'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useBlogCommentCreateMutation, useBlogCommentDeleteMutation } from '@/queries/useBlog'
import { handleErrorApi } from '@/lib/utils'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronDown, ChevronUp, Loader2, MessageCircle, User } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { useInfiniteQuery } from '@tanstack/react-query'
import blogApiRequest from '@/apiRequests/blog'

// Define interface for comment structure
interface CommentUser {
  id: string
  username: string
  firstName: string
  avatarUrl: string
}

interface Comment {
  id: string
  blogId: string
  content: string
  replyId: string | null
  isReact: boolean
  userId: string
  user: CommentUser
  totalReply?: number
  replies?: Comment[]
  createdAt: string
  updatedAt: string
}

interface BlogInfo {
  id: string
  title: string
}

function CommentList(props: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  // Use React.use() to properly unwrap the params and searchParams
  const params = use(props.params)
  // unwrap searchParams and cast to the right type (non-Promise version)

  const blogId = params.id
  const [activeReply, setActiveReply] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({})

  // Use useInfiniteQuery for comments
  const {
    data: responseData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['blogCommentsAdmin', blogId],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await blogApiRequest.getBlogCommentsAdmin({
          id: blogId,
          page_index: pageParam,
          page_size: 10
        })
        return response
      } catch (error) {
        throw new Error('Error fetching blog comments')
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.payload?.pagination?.currentPage < lastPage?.payload?.pagination?.totalPage) {
        return lastPage.payload.pagination.currentPage + 1
      }
      return undefined
    },
    initialPageParam: 1
  })

  // Comment mutations
  const createCommentMutation = useBlogCommentCreateMutation()
  const deleteCommentMutation = useBlogCommentDeleteMutation()

  useEffect(() => {
    if (error) {
      handleErrorApi({
        error
      })
    }
  }, [error])

  // Process comments data from all pages
  const comments = useMemo(() => {
    if (!responseData?.pages) return []

    // Flatten all pages and filter out only root comments
    const allComments: Comment[] = responseData.pages
      .flatMap((page) => page.payload.data.commentsWithReplies)
      .filter((comment) => !comment.replyId) as Comment[]

    return allComments
  }, [responseData])

  // Blog info data
  const blogInfo: BlogInfo = useMemo(
    () => ({
      id: blogId,
      title: 'Bài viết'
    }),
    [blogId]
  )

  const handleToggleReply = (commentId: string) => {
    if (activeReply === commentId) {
      setActiveReply(null)
      setReplyContent('')
    } else {
      setActiveReply(commentId)
      setReplyContent('')
    }
  }

  // Initialize expandedComments with all comments expanded by default
  useEffect(() => {
    if (comments.length > 0) {
      const initialExpandedState: Record<string, boolean> = {}
      comments.forEach((comment: Comment) => {
        initialExpandedState[comment.id] = true
      })
      setExpandedComments(initialExpandedState)
    }
  }, [comments])

  const toggleReplies = (commentId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId]
    }))
  }

  const handleCreateReply = (parentId: string) => {
    if (!replyContent.trim()) {
      toast({
        title: 'Thông báo',
        description: 'Vui lòng nhập nội dung trả lời',
        variant: 'destructive'
      })
      return
    }

    createCommentMutation.mutate(
      {
        identifier: blogId,
        content: replyContent,
        replyId: parentId
      },
      {
        onSuccess: () => {
          toast({
            title: 'Thành công',
            description: 'Trả lời đã được gửi thành công'
          })
          setReplyContent('')
          setActiveReply(null)
          // Automatically expand replies after adding a new one
          setExpandedComments((prev) => ({
            ...prev,
            [parentId]: true
          }))
        },
        onError: (error) => {
          toast({
            title: 'Lỗi',
            description: 'Có lỗi xảy ra khi gửi trả lời',
            variant: 'destructive'
          })
          handleErrorApi({ error })
        }
      }
    )
  }

  const handleDeleteComment = (commentId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
      deleteCommentMutation.mutate(commentId, {
        onSuccess: () => {
          toast({
            title: 'Thành công',
            description: 'Bình luận đã được xóa thành công'
          })
        },
        onError: (error) => {
          toast({
            title: 'Lỗi',
            description: 'Có lỗi xảy ra khi xóa bình luận',
            variant: 'destructive'
          })
          handleErrorApi({ error })
        }
      })
    }
  }

  const breadcrumbItems = [
    {
      title: 'Bài viết',
      href: '/support/blog'
    },
    {
      title: blogInfo.title,
      href: `/support/blog/${blogInfo.id}`
    },
    {
      title: 'Bình luận',
      href: '#'
    }
  ]

  // Calculate total comments count from all pages
  const totalComments = responseData?.pages[0]?.payload.data.totalComments || 0

  // Render a comment and its replies
  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-8 mt-3' : 'border-b border-slate-200 pb-3 mb-3'}`}>
      <div className='flex items-start gap-3'>
        <Avatar className='h-9 w-9 mt-1'>
          <AvatarImage src={comment.user?.avatarUrl} alt={comment.user?.firstName || 'User'} />
          <AvatarFallback>
            <User className='h-4 w-4' />
          </AvatarFallback>
        </Avatar>

        <div className='flex-1 space-y-1'>
          <div className='bg-slate-100 rounded-xl px-4 py-2'>
            <div className='font-semibold text-sm'>{comment.user?.firstName || 'Người dùng'}</div>
            <p className='text-sm break-words'>{comment.content}</p>
          </div>

          <div className='flex items-center text-xs text-slate-500 gap-3'>
            <div>{format(new Date(comment.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}</div>
            <button onClick={() => handleToggleReply(comment.id)} className='font-medium hover:underline'>
              Trả lời
            </button>
            <button onClick={() => handleDeleteComment(comment.id)} className='text-red-500 hover:underline'>
              Xóa
            </button>
          </div>

          {/* Reply form */}
          {activeReply === comment.id && (
            <div className='mt-2 flex gap-2'>
              <Avatar className='h-7 w-7 mt-1'>
                <AvatarFallback>
                  <User className='h-3 w-3' />
                </AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <Textarea
                  placeholder='Viết phản hồi...'
                  className='min-h-16 mb-2 text-sm'
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
                <div className='flex justify-end gap-2'>
                  <Button variant='outline' size='sm' onClick={() => setActiveReply(null)}>
                    Hủy
                  </Button>
                  <Button
                    size='sm'
                    onClick={() => handleCreateReply(comment.id)}
                    disabled={createCommentMutation.isPending || !replyContent.trim()}
                  >
                    {createCommentMutation.isPending ? 'Đang gửi...' : 'Phản hồi'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Show/hide replies button - Only show for comments with replies */}
          {comment.replies && comment.replies.length > 0 && (
            <button
              className='text-sm font-medium text-blue-600 flex items-center gap-1 mt-1'
              onClick={() => toggleReplies(comment.id)}
            >
              {expandedComments[comment.id] ? (
                <>
                  <ChevronUp className='h-4 w-4' />
                  Ẩn {comment.replies.length} phản hồi
                </>
              ) : (
                <>
                  <ChevronDown className='h-4 w-4' />
                  Xem {comment.replies.length} phản hồi
                </>
              )}
            </button>
          )}

          {/* Replies - Show all replies by default */}
          {comment.replies && comment.replies.length > 0 && expandedComments[comment.id] && (
            <div className='mt-2 space-y-3'>{comment.replies.map((reply) => renderComment(reply, true))}</div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Breadcrumb */}
      <div className='mb-4'>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold'>Bình luận</h1>
        <p className='text-muted-foreground mt-1'>Bình luận về bài viết: {blogInfo.title}</p>
      </div>

      {/* Comments list */}
      <Card>
        <CardHeader className='pb-2 border-b'>
          <h2 className='text-lg font-medium'>Tất cả bình luận ({totalComments})</h2>
        </CardHeader>
        <CardContent className='pt-4'>
          {isLoading ? (
            <div className='space-y-4'>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className='flex gap-3'>
                  <Skeleton className='h-9 w-9 rounded-full' />
                  <div className='flex-1 space-y-2'>
                    <Skeleton className='h-4 w-32' />
                    <Skeleton className='h-16 w-full' />
                    <div className='flex gap-2'>
                      <Skeleton className='h-3 w-16' />
                      <Skeleton className='h-3 w-16' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : comments.length > 0 ? (
            <div className='space-y-1'>{comments.map((comment: Comment) => renderComment(comment))}</div>
          ) : (
            <div className='text-center py-12'>
              <MessageCircle className='mx-auto h-12 w-12 text-muted-foreground/50' />
              <h3 className='text-lg font-medium mt-4'>Chưa có bình luận nào</h3>
              <p className='text-sm text-muted-foreground mt-1'>Không có bình luận nào để hiển thị</p>
            </div>
          )}
        </CardContent>
        {comments.length > 0 && hasNextPage && (
          <CardFooter className='border-t pt-4 flex justify-center'>
            <Button
              variant='outline'
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className='w-full max-w-xs'
            >
              {isFetchingNextPage ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Đang tải thêm...
                </>
              ) : (
                'Tải thêm bình luận'
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

export default CommentList

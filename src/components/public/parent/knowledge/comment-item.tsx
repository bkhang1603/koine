import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BlogCommentResType } from '@/schemaValidations/blog.schema'
import { Camera, MoreHorizontalIcon, SendHorizontal, Smile } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { RoleType } from '@/types/jwt.types'
import {
  useBlogCommentCreateMutation,
  useBlogCommentDeleteMutation,
  useBlogCommentUpdateMutation
} from '@/queries/useBlog'
import { changeTime, handleErrorApi } from '@/lib/utils'
import { useAppStore } from '@/components/app-provider'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'

export default function CommentItem({
  comment,
  level = 0,
  login
}: {
  comment: BlogCommentResType['data']
  level?: number
  login?: RoleType | undefined
}) {
  const avatar = useAppStore((state) => state.avatar)
  const username = useAppStore((state) => state.username)
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null)
  const updateCommentRef = useRef<HTMLTextAreaElement>(null)

  const [showReplies, setShowReplies] = useState(false)
  const commentMutation = useBlogCommentCreateMutation()
  const deleteCommentMutation = useBlogCommentDeleteMutation()
  const updateCommentMutation = useBlogCommentUpdateMutation()

  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)

  useEffect(() => {
    if (replyTextareaRef.current) {
      replyTextareaRef.current.style.height = 'auto'
      replyTextareaRef.current.style.height = `${replyTextareaRef.current.scrollHeight}px`
    }
  }, [replyContent])

  useEffect(() => {
    if (showReplyInput && replyTextareaRef.current) {
      replyTextareaRef.current.focus()
    }
  }, [showReplyInput])

  useEffect(() => {
    if (isEditing && updateCommentRef.current) {
      updateCommentRef.current.focus()
      updateCommentRef.current.setSelectionRange(
        updateCommentRef.current.value.length,
        updateCommentRef.current.value.length
      )
    }
  }, [isEditing])

  const handleReplyKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (replyContent.trim()) {
        try {
          await commentMutation.mutateAsync({
            content: replyContent,
            identifier: comment.blogId,
            replyId: comment.id
          })
          setReplyContent('')
          setShowReplyInput(false)
        } catch (error) {
          handleErrorApi({
            error
          })
        }
      }
    }
  }

  const handleActionClick = async () => {
    if (replyContent.trim()) {
      try {
        await commentMutation.mutateAsync({
          content: replyContent,
          identifier: comment.blogId,
          replyId: comment.id
        })
        setReplyContent('')
        setShowReplyInput(false)
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    }
  }

  const handleEmojiSelect = (emoji: any) => {
    setReplyContent((prev) => prev + emoji.native)
    setShowEmojiPicker(false)
  }

  const countTotalReplies = (comment: any) => {
    if (!comment.replies || comment.replies.length === 0) {
      return 0
    }

    return comment.replies.reduce((total: any, reply: any) => {
      return total + 1 + countTotalReplies(reply)
    }, 0)
  }

  const handleDeleteComment = async () => {
    try {
      if (deleteCommentMutation.isPending) {
        return
      }

      await deleteCommentMutation.mutateAsync(comment.id)

      toast({
        title: 'Thành công',
        description: 'Xóa bình luận thành công'
      })
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  const handleUpdateComment = async () => {
    try {
      await updateCommentMutation.mutateAsync({
        id: comment.id,
        data: {
          content: editContent
        }
      })
      setIsEditing(false)
      toast({
        title: 'Thành công',
        description: 'Cập nhật bình luận thành công'
      })
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  const handleKeyDownUpdateComment = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (editContent.trim()) {
        try {
          await updateCommentMutation.mutateAsync({
            id: comment.id,
            data: {
              content: editContent
            }
          })
          setIsEditing(false)
          toast({
            title: 'Thành công',
            description: 'Cập nhật bình luận thành công'
          })
        } catch (error) {
          handleErrorApi({
            error
          })
        }
      }
    }
  }

  return (
    <div className='flex items-start gap-3 pt-4'>
      <Avatar className={level > 0 ? 'w-8 h-8' : ''}>
        <AvatarImage src={comment.user.avatarUrl} alt={comment.user.username} />
        <AvatarFallback>{comment.user.username}</AvatarFallback>
      </Avatar>

      <div className='w-full'>
        {!isEditing && (
          <div className='flex justify-start items-center'>
            <div className='bg-slate-50 rounded-3xl py-2 px-4 max-w-fit'>
              <h3 className='text-base font-semibold'>{comment.user.username}</h3>
              {editContent ? <p className='text-sm'>{editContent}</p> : <p className='text-sm'>{comment.content}</p>}
            </div>

            {username === comment.user.username && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'icon'} size={'icon'} className='ml-2 text-gray-400 focus-visible:ring-0'>
                    <MoreHorizontalIcon className='w-5 h-5' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>Chỉnh sửa</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDeleteComment}>Xóa</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}

        {isEditing && (
          <div className='flex justify-between items-start gap-3'>
            <div className='w-full bg-slate-50 rounded-3xl px-3 py-2 flex flex-col gap-1'>
              <textarea
                ref={updateCommentRef}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onKeyDown={handleKeyDownUpdateComment}
                placeholder='Chỉnh sửa bình luận...'
                className='w-full bg-transparent border-none focus:outline-none resize-none overflow-hidden px-2'
                rows={1}
              />

              <div className='flex justify-between items-center text-slate-400'>
                <div className='flex justify-center items-center'>
                  <Button onClick={() => setShowEmojiPicker(!showEmojiPicker)} variant={'icon'} size={'icon'}>
                    <Smile className='w-5 h-5' />
                  </Button>

                  <Button variant={'icon'} size={'icon'}>
                    <Camera className='w-5 h-5' />
                  </Button>
                </div>

                <Button
                  className={editContent.trim() ? 'text-primary' : 'text-gray-400'}
                  disabled={!editContent.trim()}
                  variant={'icon'}
                  size={'icon'}
                  onClick={handleUpdateComment}
                >
                  <SendHorizontal />
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className='flex items-center mt-0'>
          <Button variant={'link'} className='text-gray-500 px-2 hover:no-underline'>
            <span>{changeTime(comment.createdAt)}</span>
          </Button>

          {login && (
            <Button variant={'link'} className='text-gray-500 px-2' onClick={() => setShowReplyInput(!showReplyInput)}>
              <span>Trả lời</span>
            </Button>
          )}
        </div>

        {showReplyInput && (
          <div className='flex justify-between items-start gap-3 py-4'>
            <Avatar>
              <AvatarImage src={avatar} alt={username} />
              <AvatarFallback>{username}</AvatarFallback>
            </Avatar>

            <div className='w-full bg-slate-50 rounded-3xl px-3 py-2 flex flex-col gap-1'>
              <textarea
                ref={replyTextareaRef}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                onKeyDown={handleReplyKeyDown}
                placeholder='Viết phản hồi...'
                className='w-full bg-transparent border-none focus:outline-none resize-none overflow-hidden px-2'
                rows={1}
              />

              <div className='flex justify-between items-center text-slate-400'>
                <div className='flex justify-center items-center'>
                  <Button onClick={() => setShowEmojiPicker(!showEmojiPicker)} variant={'icon'} size={'icon'}>
                    <Smile className='w-5 h-5' />
                  </Button>

                  <Button variant={'icon'} size={'icon'}>
                    <Camera className='w-5 h-5' />
                  </Button>
                </div>

                <Button
                  className={replyContent.trim() ? 'text-primary' : 'text-gray-400'}
                  disabled={!replyContent.trim()}
                  variant={'icon'}
                  size={'icon'}
                  onClick={handleActionClick}
                >
                  <SendHorizontal />
                </Button>
              </div>
            </div>
          </div>
        )}

        {showEmojiPicker && (
          <div className='absolute z-10 mt-2'>
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <>
            <Button className='px-1' variant='link' onClick={() => setShowReplies(!showReplies)}>
              {showReplies ? 'Ẩn phản hồi' : `Xem ${countTotalReplies(comment)} phản hồi`}
            </Button>
            {showReplies &&
              comment.replies.map((reply: any) => (
                <CommentItem key={reply.id} comment={reply} level={level + 1} login={login} />
              ))}
          </>
        )}
      </div>
    </div>
  )
}

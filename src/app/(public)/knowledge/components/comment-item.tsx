import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BlogCommentResType } from '@/schemaValidations/blog.schema'
import { Camera, SendHorizontal, Smile } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { RoleType } from '@/types/jwt.types'
import { useBlogCommentCreateMutation } from '@/queries/useBlog'
import { handleErrorApi } from '@/lib/utils'

export default function CommentItem({
  comment,
  level = 0,
  login,
  refetch
}: {
  comment: BlogCommentResType['data']
  level?: number
  login?: RoleType | undefined
  refetch?: () => void
}) {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null)
  const [showReplies, setShowReplies] = useState(false)
  const commentMutation = useBlogCommentCreateMutation()

  useEffect(() => {
    if (replyTextareaRef.current) {
      replyTextareaRef.current.style.height = 'auto'
      replyTextareaRef.current.style.height = `${replyTextareaRef.current.scrollHeight}px`
    }
  }, [replyContent])

  const handleReplyKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (replyContent.trim()) {
        try {
          await commentMutation.mutateAsync({
            content: replyContent,
            blogId: comment.blogId,
            replyId: comment.id
          })
          setReplyContent('')
          refetch && refetch()
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
          blogId: comment.blogId,
          replyId: comment.id
        })
        setReplyContent('')
        refetch && refetch()
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

  const changeCreatedAt = (createdAt: string) => {
    // Tôi đang có data là 14:00:00-10/01/2024, tôi muốn chuyển thành số giờ trước so với thời gian hiện tại
    // Ví dụ: 2 giờ trước
    const [time, date] = createdAt.split('-')
    const [hour, minute, second] = time.split(':').map(Number)
    const [day, month, year] = date.split('/').map(Number)
    const commentDate = new Date(year, month - 1, day, hour, minute, second)
    const currentDate = new Date()
    const diff = currentDate.getTime() - commentDate.getTime()

    if (diff < 0) {
      return 'Vừa xong'
    }

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    if (years) {
      return `${years} năm trước`
    }

    if (months) {
      return `${months} tháng trước`
    }

    if (days) {
      return `${days} ngày trước`
    }

    if (hours) {
      return `${hours} giờ trước`
    }

    if (minutes) {
      return `${minutes} phút trước`
    }

    if (seconds) {
      return `${seconds} giây trước`
    }

    return 'Vừa xong'
  }

  return (
    <div className='flex items-start gap-3 pt-4'>
      <Avatar className={level > 0 ? 'w-8 h-8' : ''}>
        <AvatarImage
          src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.user.username}`}
          alt={`${comment.user.username} avatar`}
        />
        <AvatarFallback>{comment.user.username}</AvatarFallback>
      </Avatar>

      <div className='w-full'>
        <div className='bg-slate-50 rounded-3xl py-2 px-4 max-w-fit'>
          <h3 className='text-base font-semibold'>{comment.user.username}</h3>
          <p className='text-gray-500'>{comment.content}</p>
        </div>

        <div className='flex items-center mt-0'>
          <Button variant={'link'} className='text-gray-500 px-2'>
            <span>{changeCreatedAt(comment.createdAt)}</span>
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
              <AvatarImage src='' alt='user avatar' />
              <AvatarFallback>You</AvatarFallback>
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
              {showReplies ? 'Ẩn phản hồi' : `Xem ${comment.replies.length} phản hồi`}
            </Button>
            {showReplies &&
              comment.replies.map((reply: any) => (
                <CommentItem refetch={refetch} key={reply.id} comment={reply} level={level + 1} login={login} />
              ))}
          </>
        )}
      </div>
    </div>
  )
}

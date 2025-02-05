import CommentItem from '@/components/public/parent/knowledge/comment-item'
import { useAppStore } from '@/components/app-provider'
import Loading from '@/components/loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { handleErrorApi } from '@/lib/utils'
import { useBlogCommentCreateMutation, useGetInfinitiveBlogCommentsQuery } from '@/queries/useBlog'
import { RoleType } from '@/types/jwt.types'
import { Camera, SendHorizontal, Smile } from 'lucide-react'
import { useRef, useState } from 'react'
import Picker from '@emoji-mart/react'

function CommentModal({
  openModal,
  setOpenModal,
  role,
  id
}: {
  openModal: boolean
  // eslint-disable-next-line no-unused-vars
  setOpenModal: (openModal: boolean) => void
  role: RoleType | undefined
  id: string
}) {
  const avatar = useAppStore((state) => state.avatar)
  const username = useAppStore((state) => state.username)
  const [content, setContent] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const commentMutation = useBlogCommentCreateMutation()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  // const { data, isFetching } = useBlogCommentsQuery({ id, page_index: pageIndex, page_size: 10 }) // Thay đổi page_size thành 10

  const { data, isFetching, fetchNextPage, isFetchingNextPage } = useGetInfinitiveBlogCommentsQuery({ id })

  const commentData = data?.pages?.map((page) => page.payload.data.commentsWithReplies).flat() || []
  const currentPage = data?.pages?.length || 0
  const totalPage = Math.max(...(data?.pages?.map((page) => page.payload.pagination.totalPage) || [0]))

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (content.trim()) {
        try {
          await commentMutation.mutateAsync({
            content,
            identifier: id,
            replyId: null
          })
          setContent('')
        } catch (error) {
          handleErrorApi({
            error
          })
        }
      }
    }
  }

  const handleActionClick = async () => {
    if (content.trim()) {
      try {
        if (commentMutation.isPending) return

        await commentMutation.mutateAsync({
          content,
          identifier: id,
          replyId: null
        })
        setContent('')
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    }
  }

  const handleEmojiSelect = (emoji: any) => {
    setContent((prev) => prev + emoji.native)
    setShowEmojiPicker(false)
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className='min-w-[50vw]'>
        <DialogHeader>
          <DialogTitle>Tất cả bình luận</DialogTitle>
        </DialogHeader>
        <DialogDescription className='max-h-[50vh] overflow-y-auto'>
          {isFetching && (
            <div className='flex justify-center items-center h-20'>
              <Loading />
            </div>
          )}

          {commentData.map((comment: any) => (
            <CommentItem key={comment.id} comment={comment} login={role} />
          ))}

          {/* Load more button */}

          {!isFetchingNextPage && currentPage < totalPage && (
            <div className='flex justify-center items-center py-2' onClick={() => fetchNextPage()}>
              <Button variant='link' className='hover:no-underline'>
                Xem thêm
              </Button>
            </div>
          )}

          {isFetchingNextPage && (
            <div className='flex justify-center items-center h-20'>
              <Loading />
            </div>
          )}
        </DialogDescription>

        <DialogFooter>
          <div className='w-full flex justify-between items-start gap-3 py-4'>
            <Avatar>
              <AvatarImage src={avatar} alt={username} />
              <AvatarFallback>{username}</AvatarFallback>
            </Avatar>

            <div className='w-full bg-slate-50 rounded-3xl px-3 py-2 flex flex-col gap-1'>
              <textarea
                ref={inputRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Viết bình luận...'
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
                  className={content.trim() ? 'text-primary' : 'text-gray-400'}
                  disabled={!content.trim()}
                  variant={'icon'}
                  size={'icon'}
                  onClick={handleActionClick}
                >
                  <SendHorizontal />
                </Button>
              </div>

              {showEmojiPicker && (
                <div className='absolute z-10 mt-16'>
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CommentModal

'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Camera, Heart, MessageCircle, SendHorizontal, Smile } from 'lucide-react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import CommentItem from '@/components/public/parent/knowledge/comment-item'
import { useAppStore } from '@/components/app-provider'
import {
  useBlogCommentCreateMutation,
  useBlogCommentsQuery,
  useBlogReactQuery,
  useBlogReactUpdateMutation
} from '@/queries/useBlog'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import CommentModal from '@/components/public/parent/knowledge/comment-modal'
import Loading from '@/components/loading'
import ShareButton from '@/components/share-button'
import { useEffect, useRef, useState } from 'react'

function BlogComments({ id }: { id: string }) {
  const router = useRouter()

  const role = useAppStore((state) => state.role)
  const avatar = useAppStore((state) => state.avatar)
  const username = useAppStore((state) => state.username)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [content, setContent] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const { data: data1, isFetching } = useBlogCommentsQuery({ id, page_index: 1, page_size: 2 })
  const comments = data1?.payload?.data.commentsWithReplies || []
  const totalComments = data1?.payload?.data.totalComments || 0
  const commentMutation = useBlogCommentCreateMutation()
  const { data: data2 } = useBlogReactQuery({ id })
  const totalReacts = data2?.payload?.data.totalReacts || 0
  const isReacted = data2?.payload?.data.isReact || false
  const reactMutation = useBlogReactUpdateMutation()

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [content])

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

  const handleEmojiSelect = (emoji: any) => {
    setContent((prev) => prev + emoji.native)
    setShowEmojiPicker(false)
  }

  const handleActionClick = async () => {
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

  const handleOpenModal = () => {
    if (!role) {
      router.push('/login')
    } else {
      setOpenModal(true)
    }
  }

  const handleReact = async () => {
    try {
      if (reactMutation.isPending) return

      await reactMutation.mutateAsync({
        identifier: id,
        isReact: !isReacted
      })
    } catch (error) {}
  }

  return (
    <section>
      <div className='flex justify-between items-center border-t-2 border-b-2 py-2 mt-8'>
        <div className='flex justify-start items-center gap-4'>
          <div className='flex items-center gap-2 cursor-pointer text-secondary hover:underline' onClick={handleReact}>
            {isReacted ? <Heart className='w-6 h-6 fill-secondary' /> : <Heart className='w-6 h-6' />}
            {totalReacts !== 0 && <span className='text-lg'>{totalReacts}</span>}
          </div>

          <div
            className='flex items-center gap-2 cursor-pointer select-none text-primary hover:underline'
            onClick={handleOpenModal}
          >
            <MessageCircle className='w-6 h-6' />
            <span className='text-lg'>
              {totalComments} {totalComments > 1 ? 'bình luận' : 'bình luận'}
            </span>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          {isReacted ? (
            <Button
              variant={'ghost'}
              className='w-full flex items-center justify-center gap-2 text-secondary hover:text-secondary hover:bg-secondary/5'
              onClick={handleReact}
            >
              <Heart className='fill-secondary w-5 h-5' />
              <span>Yêu thích</span>
            </Button>
          ) : (
            <Button
              variant={'ghost'}
              className='w-full flex items-center justify-center gap-2 text-secondary hover:text-secondary hover:bg-secondary/5'
              onClick={handleReact}
            >
              <Heart className='w-5 h-5' />
              <span>Yêu thích</span>
            </Button>
          )}

          <Button
            variant={'ghost'}
            className='w-full flex items-center justify-center gap-2 text-primary hover:text-primary hover:bg-primary/5'
            onClick={handleOpenModal}
          >
            <MessageCircle className='w-5 h-5' />
            <span>Bình luận</span>
          </Button>

          <ShareButton />
        </div>
      </div>

      {totalComments > 0 && (
        <Button className='px-0 mt-4' variant='link' onClick={handleOpenModal}>
          Xem tất cả {totalComments} bình luận
        </Button>
      )}

      {isFetching && (
        <div className='flex justify-center items-center h-20'>
          <Loading />
        </div>
      )}

      {/* {!isFetching && comments.length === 0 && <div>Chưa có bình luận nào</div>} */}

      {!isFetching &&
        comments.length > 0 &&
        comments.map((comment) => <CommentItem key={comment.id} comment={comment} login={role} />)}

      {role && (
        <div className='flex justify-between items-start gap-3 py-4'>
          <Avatar>
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>

          <div className='w-full bg-slate-50 rounded-3xl px-3 py-2 flex flex-col gap-1'>
            <textarea
              ref={textareaRef}
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
          </div>
        </div>
      )}

      {showEmojiPicker && (
        <div className='absolute z-10 mt-2'>
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      )}

      <CommentModal id={id} role={role} openModal={openModal} setOpenModal={setOpenModal} />
    </section>
  )
}

export default BlogComments

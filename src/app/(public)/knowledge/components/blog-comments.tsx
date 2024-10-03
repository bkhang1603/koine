'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Camera, Heart, MessageCircle, Redo, SendHorizontal, Smile } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import Picker from '@emoji-mart/react'
import CommentItem from '@/app/(public)/knowledge/components/comment-item'
import { useAppStore } from '@/components/app-provider'
import { useBlogCommentCreateMutation, useBlogCommentsQuery } from '@/queries/useBlog'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import CommentModal from '@/app/(public)/knowledge/components/comment-modal'
import Loading from '@/components/loading'

function BlogComments({ id }: { id: string }) {
  const role = useAppStore((state) => state.role)
  const [content, setContent] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const { data, isFetching, refetch } = useBlogCommentsQuery({ id, page_index: 1, page_size: 2 })
  const comments = data?.payload?.data || []
  const commentMutation = useBlogCommentCreateMutation()
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)

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
            blogId: id,
            replyId: null
          })
          setContent('')
          refetch()
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
          blogId: id,
          replyId: null
        })
        setContent('')
        refetch()
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

  return (
    <section>
      <div className='flex justify-between items-center border-t-2 border-b-2 py-2 mt-8'>
        <div className='flex justify-start items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Heart className='text-secondary w-6 h-6' />
            <span className='text-gray-500 text-lg'>10</span>
          </div>

          <div className='flex items-center gap-2'>
            <MessageCircle className='text-secondary w-6 h-6' />
            <span className='text-gray-500 text-lg'>10</span>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <Button variant={'ghost'} className='w-full flex items-center justify-center gap-2 text-gray-500'>
            <Heart className='w-5 h-5' />
            <span>Yêu thích</span>
          </Button>

          <Button
            variant={'ghost'}
            className='w-full flex items-center justify-center gap-2 text-gray-500'
            onClick={handleOpenModal}
          >
            <MessageCircle className='w-5 h-5' />
            <span>Bình luận</span>
          </Button>

          <Button variant={'ghost'} className='w-full flex items-center justify-center gap-2 text-gray-500'>
            <Redo className='w-5 h-5' />
            <span>Chia sẻ</span>
          </Button>
        </div>
      </div>

      {isFetching && (
        <div className='flex justify-center items-center h-20'>
          <Loading />
        </div>
      )}

      {!isFetching && comments.length > 3 && (
        <Button className='px-0 mt-4' variant='link' onClick={handleOpenModal}>
          Xem tất cả {comments.length} bình luận
        </Button>
      )}

      {/* {!isFetching && comments.length === 0 && <div>Chưa có bình luận nào</div>} */}

      {!isFetching &&
        comments.length > 0 &&
        comments.map((comment) => <CommentItem refetch={refetch} key={comment.id} comment={comment} login={role} />)}

      {role && (
        <div className='flex justify-between items-start gap-3 py-4'>
          <Avatar>
            <AvatarImage src='' alt='user avatar' />
            <AvatarFallback>User</AvatarFallback>
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

      <CommentModal id={id} refetch={refetch} role={role} openModal={openModal} setOpenModal={setOpenModal} />
    </section>
  )
}

export default BlogComments

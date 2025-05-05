'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Camera, Heart, MessageCircle, SendHorizontal, Smile } from 'lucide-react'
import CommentItem from '@/components/public/parent/knowledge/comment-item'
import { useAppStore } from '@/components/app-provider'
import {
  useBlogCommentCreateMutation,
  useBlogCommentsQuery,
  useBlogReactQuery,
  useBlogReactUpdateMutation
} from '@/queries/useBlog'
import { handleErrorApi } from '@/lib/utils'
import CommentModal from '@/components/public/parent/knowledge/comment-modal'
import Loading from '@/components/loading'
import ShareButton from '@/components/share-button'
import { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { useAuthModal } from '@/components/auth/auth-modal-provider'

function BlogComments({ id }: { id: string }) {
  const { showLoginModal } = useAuthModal()

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
  const { data: data2 } = useBlogReactQuery({ id, enabled: !!role })
  const totalReacts = data2?.payload?.data.totalReacts || 0
  const isReacted = data2?.payload?.data.isReact || false
  const reactMutation = useBlogReactUpdateMutation()

  const [localReacted, setLocalReacted] = useState(isReacted)
  // const [localTotalReacts, setLocalTotalReacts] = useState(totalReacts)
  const [shouldUpdateApi, setShouldUpdateApi] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [content])

  useEffect(() => {
    setLocalReacted(isReacted)
    // setLocalTotalReacts(totalReacts)
  }, [isReacted, totalReacts])

  useEffect(() => {
    if (shouldUpdateApi && localReacted !== isReacted) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(async () => {
        try {
          if (reactMutation.isPending) return

          if (localReacted !== isReacted) {
            await reactMutation.mutateAsync({
              identifier: id,
              isReact: localReacted
            })
          }

          setShouldUpdateApi(false)
        } catch (error) {
          setLocalReacted(isReacted)
          // setLocalTotalReacts(totalReacts)
          handleErrorApi({ error })
          setShouldUpdateApi(false)
        }
      }, 500)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [localReacted, shouldUpdateApi, id, reactMutation, isReacted, totalReacts])

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

  const handleEmojiSelect = (emojiData: any) => {
    const emoji = emojiData.emoji
    const cursorPosition = textareaRef.current?.selectionStart || 0
    const textBeforeCursor = content.slice(0, cursorPosition)
    const textAfterCursor = content.slice(cursorPosition)
    setContent(textBeforeCursor + emoji + textAfterCursor)
    setShowEmojiPicker(false)
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

  const handleOpenModal = () => {
    if (!role) {
      showLoginModal()
    } else {
      setOpenModal(true)
    }
  }

  const handleReact = () => {
    if (!role) {
      showLoginModal()
      return
    }

    if (reactMutation.isPending) return
    setLocalReacted(!localReacted)
    // setLocalTotalReacts((prev) => (!localReacted ? prev + 1 : prev - 1))
    setShouldUpdateApi(true)
  }

  return (
    <section>
      <div className='flex justify-center sm:justify-between items-center border-t-2 border-b-2 py-2 mt-8'>
        <div className='hidden sm:flex justify-start items-center gap-4'>
          <div className='flex items-center gap-2 cursor-pointer text-secondary hover:underline' onClick={handleReact}>
            {localReacted ? <Heart className='w-6 h-6 fill-secondary' /> : <Heart className='w-6 h-6' />}
            {/* {localTotalReacts !== 0 && <span className='text-lg'>{localTotalReacts}</span>} */}
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
          <Button
            variant={'ghost'}
            className={`w-full flex items-center justify-center gap-2 ${
              localReacted ? 'text-secondary hover:text-secondary hover:bg-secondary/5' : ''
            }`}
            onClick={handleReact}
          >
            <Heart className={`w-5 h-5 ${localReacted ? 'fill-secondary' : ''}`} />
            <span>Yêu thích</span>
          </Button>

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

      {!isFetching &&
        comments.length > 0 &&
        comments.map((comment) => <CommentItem key={comment.id} comment={comment} login={role} maxDepth={2} />)}

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
          <EmojiPicker onEmojiClick={handleEmojiSelect} searchPlaceholder='Tìm emoji...' width={320} height={400} />
        </div>
      )}

      <CommentModal id={id} role={role} openModal={openModal} setOpenModal={setOpenModal} />
    </section>
  )
}

export default BlogComments

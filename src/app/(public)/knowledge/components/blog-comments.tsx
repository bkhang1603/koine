'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Camera, Heart, MessageCircle, Redo, SendHorizontal, Smile } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

type Comment = {
  id: string
  author: string
  content: string
  timestamp: string
  replies?: Comment[]
}

const sampleComments: Comment[] = [
  {
    id: '1',
    author: 'Người dùng 1',
    content: 'Đây là một bài viết tuyệt vời! Cảm ơn bạn đã chia sẻ.',
    timestamp: '2 giờ trước',
    replies: [
      {
        id: '1-1',
        author: 'Người dùng 2',
        content: 'Tôi đồng ý! Rất nhiều thông tin hữu ích.',
        timestamp: '1 giờ trước'
      },
      {
        id: '1-2',
        author: 'Người dùng 3',
        content: 'Cảm ơn bạn đã chia sẻ ý kiến!',
        timestamp: '30 phút trước'
      }
    ]
  },
  {
    id: '2',
    author: 'Người dùng 4',
    content: 'Tôi có một câu hỏi về điểm thứ ba. Bạn có thể giải thích thêm không?',
    timestamp: '3 giờ trước'
  }
]

function CommentItem({ comment, level = 0 }: { comment: Comment; level?: number }) {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (replyTextareaRef.current) {
      replyTextareaRef.current.style.height = 'auto'
      replyTextareaRef.current.style.height = `${replyTextareaRef.current.scrollHeight}px`
    }
  }, [replyContent])

  const handleReplyKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (replyContent.trim()) {
        console.log('Đã gửi phản hồi:', replyContent)
        setReplyContent('')
        setShowReplyInput(false)
      }
    }
  }

  const handleEmojiSelect = (emoji: any) => {
    setReplyContent((prev) => prev + emoji.native)
    setShowEmojiPicker(false)
  }

  return (
    <div className='flex items-start gap-3 pt-4'>
      <Avatar className={level > 0 ? 'w-8 h-8' : ''}>
        <AvatarImage
          src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`}
          alt={`${comment.author} avatar`}
        />
        <AvatarFallback>{comment.author[0]}</AvatarFallback>
      </Avatar>

      <div className='w-full'>
        <div className='bg-slate-50 rounded-3xl py-2 px-4 max-w-fit'>
          <h3 className='text-base font-semibold'>{comment.author}</h3>
          <p className='text-gray-500'>{comment.content}</p>
        </div>

        <div className='flex items-center mt-0'>
          <Button variant={'link'} className='text-gray-500 px-2'>
            <span>{comment.timestamp}</span>
          </Button>

          <Button variant={'link'} className='text-gray-500 px-2' onClick={() => setShowReplyInput(!showReplyInput)}>
            <span>Trả lời</span>
          </Button>
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

        {comment.replies &&
          comment.replies.map((reply) => <CommentItem key={reply.id} comment={reply} level={level + 1} />)}
      </div>
    </div>
  )
}

function BlogComments() {
  const [content, setContent] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [content])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (content.trim()) {
        setContent('')
      }
    }
  }

  const handleEmojiSelect = (emoji: any) => {
    setContent((prev) => prev + emoji.native)
    setShowEmojiPicker(false)
  }

  return (
    <section>
      <div className='flex justify-start items-center py-4 gap-4'>
        <div className='flex items-center gap-2'>
          <Heart className='text-secondary w-6 h-6' />
          <span className='text-gray-500 text-lg'>10</span>
        </div>

        <div className='flex items-center gap-2'>
          <MessageCircle className='text-secondary w-6 h-6' />
          <span className='text-gray-500 text-lg'>10</span>
        </div>
      </div>

      <div className='flex items-center justify-between border-t-2 border-b-2'>
        <Button variant={'ghost'} className='w-full flex items-center justify-center gap-2 text-gray-500'>
          <Heart className='w-5 h-5' />
          <span>Yêu thích</span>
        </Button>

        <Button variant={'ghost'} className='w-full flex items-center justify-center gap-2 text-gray-500'>
          <MessageCircle className='w-5 h-5' />
          <span>Bình luận</span>
        </Button>

        <Button variant={'ghost'} className='w-full flex items-center justify-center gap-2 text-gray-500'>
          <Redo className='w-5 h-5' />
          <span>Chia sẻ</span>
        </Button>
      </div>

      {sampleComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}

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
            >
              <SendHorizontal />
            </Button>
          </div>
        </div>
      </div>

      {showEmojiPicker && (
        <div className='absolute z-10 mt-2'>
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
    </section>
  )
}

export default BlogComments

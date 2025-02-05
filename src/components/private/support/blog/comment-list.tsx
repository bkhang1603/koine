import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'

// Define the BlogPost type
interface BlogPost {
  title: string
  date: string
  commentCount: number
  excerpt: string
  newComments: number
}

// Define the BlogComment type
interface BlogComment {
  id: string
  author: string
  avatar: string
  date: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  replies?: BlogComment[]
}

interface CommentListProps {
  blogPost: BlogPost
  comments: BlogComment[]
  // eslint-disable-next-line no-unused-vars
  onStatusChange: (id: string, newStatus: 'approved' | 'rejected') => void
  // eslint-disable-next-line no-unused-vars
  onReply: (id: string, content: string) => void
  onBack: () => void
}

export function CommentList({ blogPost, comments, onStatusChange, onReply, onBack }: CommentListProps) {
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({})

  const CommentComponent = ({ comment, depth = 0 }: { comment: BlogComment; depth?: number }) => (
    <div className={`relative ${depth > 0 ? 'ml-14 mt-4' : 'mt-8'}`}>
      <div>
        <div className='flex items-start space-x-4'>
          <Avatar className='w-10 h-10'>
            <AvatarImage src={comment.avatar} alt={comment.author} />
            <AvatarFallback>{comment.author[0]}</AvatarFallback>
          </Avatar>
          <div className='flex-1 bg-gray-50 rounded-lg p-4 shadow-sm'>
            <div className='flex items-center justify-between mb-2'>
              <h3 className='font-semibold text-gray-900'>{comment.author}</h3>
              <span className='text-sm text-gray-500'>{comment.date}</span>
            </div>
            <p className='text-gray-700 mb-4'>{comment.content}</p>
            <div className='flex items-center space-x-2 mb-4'>
              <Button
                variant={comment.status === 'approved' ? 'default' : 'outline'}
                size='sm'
                onClick={() => onStatusChange(comment.id, 'approved')}
              >
                <CheckCircle className='w-4 h-4 mr-1' />
                Approve
              </Button>
              <Button
                variant={comment.status === 'rejected' ? 'destructive' : 'outline'}
                size='sm'
                onClick={() => onStatusChange(comment.id, 'rejected')}
              >
                <XCircle className='w-4 h-4 mr-1' />
                Reject
              </Button>
              <Badge
                variant={
                  comment.status === 'pending' ? 'secondary' : comment.status === 'approved' ? 'green' : 'destructive'
                }
                className='ml-auto'
              >
                {comment.status}
              </Badge>
            </div>
            <div className='mt-2'>
              <Textarea
                placeholder='Write a reply...'
                value={replyContent[comment.id] || ''}
                onChange={(e) => setReplyContent({ ...replyContent, [comment.id]: e.target.value })}
                className='mb-2'
              />
              <Button
                onClick={() => {
                  onReply(comment.id, replyContent[comment.id] || '')
                  setReplyContent({ ...replyContent, [comment.id]: '' })
                }}
                size='sm'
              >
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className='mt-4 space-y-4'>
          {comment.replies.map((reply) => (
            <CommentComponent key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Blog Post Details</h1>
        <Button variant='outline' onClick={onBack}>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Blog Comments
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{blogPost.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground mb-4'>
            Published on {blogPost.date} • {blogPost.commentCount} comments
          </p>
          <p>{blogPost.excerpt}</p>
          {blogPost.newComments > 0 && (
            <div className='mt-4 p-4 bg-yellow-100 rounded-lg flex items-center'>
              <AlertCircle className='w-5 h-5 text-yellow-500 mr-2' />
              <span>There are {blogPost.newComments} new comments that need your attention.</span>
            </div>
          )}
        </CardContent>
      </Card>

      <div className='space-y-6'>
        <h2 className='text-xl font-semibold'>Comments</h2>
        {comments.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

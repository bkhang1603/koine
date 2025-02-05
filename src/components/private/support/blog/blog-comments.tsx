'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CommentList } from '@/components/private/support/blog/comment-list'
import { BlogOverview } from '@/components/private/support/blog/blog-overview'
import { BlogPostList } from '@/components/private/support/blog/blog-post-list'

interface BlogComment {
  id: string
  replies?: BlogComment[]
  author: string
  avatar: string
  content: string
  date: string
  status: 'approved' | 'rejected'
}

interface BlogPost {
  id: string
  title: string
  content: string
  date: string
  category: string
  commentCount: number
  excerpt: string
  newComments: number
  image: string
}

export function BlogComments() {
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null)
  const [comments, setComments] = useState<BlogComment[]>([])
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'comments'>('date')

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'How to Use the New Features in Next.js 12',
      content: '...',
      date: '2021-10-20',
      category: 'Next.js',
      commentCount: 3,
      excerpt: '...',
      newComments: 1,
      image: '/nextjs-12.jpg'
    },
    {
      id: '2',
      title: 'React 18: New Features and Changes',
      content: '...',
      date: '2021-10-15',
      category: 'React',
      commentCount: 2,
      excerpt: '...',
      newComments: 0,
      image: '/react-18.jpg'
    },
    {
      id: '3',
      title: 'The Complete Guide to Server-Side Rendering with React',
      content: '...',
      date: '2021-10-10',
      category: 'React',
      commentCount: 1,
      excerpt: '...',
      newComments: 0,
      image: '/ssr-react.jpg'
    }
  ]

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected') => {
    const updateCommentStatus = (comments: BlogComment[]): BlogComment[] => {
      return comments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, status: newStatus }
        }
        if (comment.replies) {
          return { ...comment, replies: updateCommentStatus(comment.replies) }
        }
        return comment
      })
    }

    setComments(updateCommentStatus(comments))
  }

  const handleReply = (id: string, content: string) => {
    if (content && content.trim()) {
      const newReply: BlogComment = {
        id: `${id}-${Date.now()}`,
        author: 'Support Team',
        avatar: '/placeholder.svg',
        content: content,
        date: new Date().toISOString().split('T')[0],
        status: 'approved'
      }

      const addReply = (comments: BlogComment[]): BlogComment[] => {
        return comments.map((comment) => {
          if (comment.id === id) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply]
            }
          }
          if (comment.replies) {
            return { ...comment, replies: addReply(comment.replies) }
          }
          return comment
        })
      }

      setComments(addReply(comments))
    }
  }

  const filteredPosts =
    filterCategory === 'all' ? blogPosts : blogPosts.filter((post) => post.category === filterCategory)

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else {
      return b.commentCount - a.commentCount
    }
  })

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Blog Comments</h1>
      </div>

      {selectedBlog ? (
        <CommentList
          blogPost={blogPosts.find((post) => post.id === selectedBlog)!}
          comments={comments.filter((comment) => comment.id.startsWith(selectedBlog))}
          onStatusChange={handleStatusChange}
          onReply={handleReply}
          onBack={() => setSelectedBlog(null)}
        />
      ) : (
        <>
          <BlogOverview blogPosts={blogPosts} comments={comments} />
          <div className='flex justify-between items-center'>
            <Select value={filterCategory} onValueChange={(value) => setFilterCategory(value)}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Filter by category' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Categories</SelectItem>
                {Array.from(new Set(blogPosts.map((post) => post.category))).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: 'date' | 'comments') => setSortBy(value)}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='date'>Sort by Date</SelectItem>
                <SelectItem value='comments'>Sort by Comments</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <BlogPostList posts={sortedPosts} onSelectBlog={setSelectedBlog} />
        </>
      )}
    </div>
  )
}

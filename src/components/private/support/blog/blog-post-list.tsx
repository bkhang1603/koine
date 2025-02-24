import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MessageSquare } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  image: string
  category: string
  excerpt: string
  date: string
  commentCount: number
  newComments: number
}

interface BlogPostListProps {
  posts: BlogPost[]
  // eslint-disable-next-line no-unused-vars
  onSelectBlog: (id: string) => void
}

export function BlogPostList({ posts, onSelectBlog }: BlogPostListProps) {
  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {posts.map((post) => (
        <Card
          key={post.id}
          className='overflow-hidden cursor-pointer hover:shadow-lg transition-shadow'
          onClick={() => onSelectBlog(post.id)}
        >
          <Image src={post.image} alt={post.title} width={400} height={200} className='w-full h-48 object-cover' />
          <CardHeader>
            <div className='flex justify-between items-start'>
              <CardTitle className='text-lg'>{post.title}</CardTitle>
              <Badge>{post.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground mb-2'>{post.excerpt}</p>
            <div className='flex items-center justify-between text-sm text-muted-foreground'>
              <div className='flex items-center'>
                <Calendar className='w-4 h-4 mr-1' />
                {post.date}
              </div>
              <div className='flex items-center'>
                <MessageSquare className='w-4 h-4 mr-1' />
                {post.commentCount} comments
              </div>
              {post.newComments > 0 && <Badge variant='secondary'>{post.newComments} new</Badge>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

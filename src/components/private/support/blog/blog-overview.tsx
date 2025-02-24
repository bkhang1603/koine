import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

// Define or import the BlogPost type
interface BlogPost {
  commentCount: number
  newComments: number
}

interface BlogComment {
  status: 'approved' | 'rejected'
}

interface BlogOverviewProps {
  blogPosts: BlogPost[]
  comments: BlogComment[]
}

export function BlogOverview({ blogPosts, comments }: BlogOverviewProps) {
  const totalComments = blogPosts.reduce((sum, post) => sum + post.commentCount, 0)
  const totalNewComments = blogPosts.reduce((sum, post) => sum + post.newComments, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <div className='flex items-center gap-2'>
            <MessageSquare className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Total Comments: {totalComments}</span>
          </div>
          <div className='flex items-center gap-2'>
            <AlertCircle className='h-4 w-4 text-yellow-500' />
            <span className='text-sm font-medium'>New Comments: {totalNewComments}</span>
          </div>
          <div className='flex items-center gap-2'>
            <CheckCircle className='h-4 w-4 text-green-500' />
            <span className='text-sm font-medium'>
              Approved: {comments.filter((c) => c.status === 'approved').length}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <XCircle className='h-4 w-4 text-red-500' />
            <span className='text-sm font-medium'>
              Rejected: {comments.filter((c) => c.status === 'rejected').length}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent } from '@/components/ui/card'
import { HelpCircle, Eye, ThumbsUp, MessageSquare } from 'lucide-react'

interface FAQStatsProps {
  stats: {
    totalArticles: number
    totalViews: number
    avgHelpful: number
    ticketReduction: number
  }
}

export function FAQStats({ stats }: FAQStatsProps) {
  return (
    <div className='grid gap-4 md:grid-cols-4'>
      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-purple-50 rounded-full'>
              <HelpCircle className='w-6 h-6 text-purple-500' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Tổng số bài viết</p>
              <p className='text-2xl font-bold'>{stats.totalArticles}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-blue-50 rounded-full'>
              <Eye className='w-6 h-6 text-blue-500' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Lượt xem</p>
              <p className='text-2xl font-bold'>{stats.totalViews.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-green-50 rounded-full'>
              <ThumbsUp className='w-6 h-6 text-green-500' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Độ hữu ích</p>
              <p className='text-2xl font-bold'>{stats.avgHelpful}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-orange-50 rounded-full'>
              <MessageSquare className='w-6 h-6 text-orange-500' />
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Giảm tickets</p>
              <p className='text-2xl font-bold'>{stats.ticketReduction}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
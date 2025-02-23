import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Eye, ThumbsUp, Edit, Trash } from 'lucide-react'

interface FAQItemProps {
  id: string
  question: string
  answer: string
  category: string
  views: number
  helpful: number
  onEdit?: () => void
  onDelete?: () => void
}

export function FAQItem({ question, answer, category, views, helpful, onEdit, onDelete }: FAQItemProps) {
  return (
    <Card>
      <CardHeader className='flex-row justify-between items-start space-y-0'>
        <div className='space-y-1'>
          <h3 className='font-medium'>{question}</h3>
          <Badge variant='secondary'>{category}</Badge>
        </div>
        <div className='flex gap-2'>
          <Button size='icon' variant='ghost' onClick={onEdit}>
            <Edit className='w-4 h-4' />
          </Button>
          <Button size='icon' variant='ghost' onClick={onDelete}>
            <Trash className='w-4 h-4' />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-sm text-muted-foreground whitespace-pre-line'>{answer}</p>
        <div className='flex gap-4 text-sm text-muted-foreground'>
          <span className='flex items-center gap-1'>
            <Eye className='w-4 h-4' />
            {views} lượt xem
          </span>
          <span className='flex items-center gap-1'>
            <ThumbsUp className='w-4 h-4' />
            {helpful}% hữu ích
          </span>
        </div>
      </CardContent>
    </Card>
  )
} 
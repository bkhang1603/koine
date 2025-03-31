import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Search } from 'lucide-react'
import Link from 'next/link'

interface EmptyCoursesProps {
  title: string
  description: string
}

export function EmptyCourses({ title, description }: EmptyCoursesProps) {
  return (
    <Card className='border-dashed border-2 shadow-sm'>
      <CardContent className='p-8 flex flex-col items-center justify-center text-center'>
        <div className='h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4'>
          <BookOpen className='h-8 w-8 text-blue-500' />
        </div>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>{title}</h3>
        <p className='text-gray-500 max-w-md mb-6'>{description}</p>
        <Button asChild variant='outline'>
          <Link href='/courses'>
            <Search className='h-4 w-4 mr-2' />
            Tìm khóa học cho con
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

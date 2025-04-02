import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import configRoute from '@/config/route'
import { BookOpen, Search } from 'lucide-react'
import Link from 'next/link'

interface EmptyCoursesProps {
  title: string
  description: string
}

export function EmptyCourses({ title, description }: EmptyCoursesProps) {
  return (
    <Card className='border-dashed border border-gray-200 shadow-none bg-gray-50/50'>
      <CardContent className='p-8 flex flex-col items-center justify-center text-center'>
        <div className='h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center mb-4'>
          <BookOpen className='h-7 w-7 text-blue-400' />
        </div>
        <h3 className='text-lg font-medium text-gray-800 mb-2'>{title}</h3>
        <p className='text-sm text-gray-500 max-w-md mb-5'>{description}</p>
        <Button asChild variant='outline' className='shadow-sm border-gray-200 hover:border-primary/20'>
          <Link href={configRoute.course}>
            <Search className='h-3.5 w-3.5 mr-2' />
            Khám phá khóa học
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

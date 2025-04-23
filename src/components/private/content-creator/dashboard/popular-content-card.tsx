'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Users } from 'lucide-react'

interface PopularCourse {
  id: string
  title: string
  views: number
  engagement?: number
}

interface PopularContentCardProps {
  data: PopularCourse[]
  title: string
  description: string
}

export function PopularContentCard({ data, title, description }: PopularContentCardProps) {
  // Find maximum enrollment for relative progress calculation
  const maxEnrollments = Math.max(...data.map((course) => course.views))

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className='text-base'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {data.map((course) => (
            <div key={course.id} className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h3 className='font-medium'>{course.title}</h3>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <Users className='mr-1 h-4 w-4' />
                  <span>{course.views} học viên</span>
                </div>
              </div>
              <Progress value={(course.views / maxEnrollments) * 100} className='h-1.5' />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

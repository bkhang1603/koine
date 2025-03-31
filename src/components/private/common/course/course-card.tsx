/* eslint-disable no-unused-vars */
import { MoreHorizontal, Edit, Trash } from 'lucide-react'
import Image from 'next/image'
import { formatDate, formatCurrency } from '@/lib/utils'
import { Card, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'

interface CourseCardProps {
  course: any
  onDelete: (id: string) => void
  onNavigate: (url: string) => void
}

export function CourseCard({ course, onDelete, onNavigate }: CourseCardProps) {
  // Tính giá sau khi giảm
  const discountedPrice = course.price - (course.price * course.discount) / 100

  return (
    <Link href={`/content-creator/course/${course.id}`}>
      <Card className='overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-200 cursor-pointer'>
        {/* Card Image */}
        <div className='relative h-48 w-full overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10' />
          <Image
            src={course.imageUrl || '/images/placeholder-image.jpg'}
            alt={course.title}
            fill
            className='object-cover transition-transform duration-300 hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          {course.isBanned && (
            <Badge variant='destructive' className='absolute top-3 left-3 z-20'>
              Đã khóa
            </Badge>
          )}
          {course.isCustom && <Badge className='absolute top-3 left-3 z-20'>Tùy chỉnh</Badge>}
        </div>

        <div className='flex flex-col flex-grow p-4'>
          {/* Categories */}
          <div className='flex flex-wrap gap-1.5 mb-3 min-h-[24px]'>
            {course.categories?.slice(0, 3).map((category: any) => (
              <Badge variant='secondary' key={category.id} className='font-normal text-xs'>
                {category.name}
              </Badge>
            ))}
            {course.categories?.length > 3 && (
              <Badge variant='outline' className='font-normal text-xs'>
                +{course.categories.length - 3}
              </Badge>
            )}
          </div>

          {/* Title - fixed height */}
          <h3 className='font-bold text-lg line-clamp-2 min-h-[56px] mb-2'>{course.title}</h3>

          {/* Description - fixed height */}
          <p className='text-muted-foreground text-sm line-clamp-2 min-h-[40px] mb-auto'>{course.description}</p>

          {/* Price and Rating */}
          <div className='flex items-center justify-between mt-4'>
            <div className='flex flex-col'>
              {course.discount > 0 ? (
                <>
                  <span className='font-bold'>{formatCurrency(discountedPrice)}</span>
                  <span className='text-sm text-muted-foreground line-through'>{formatCurrency(course.price)}</span>
                </>
              ) : (
                <span className='font-bold'>{formatCurrency(course.price)}</span>
              )}
            </div>
            <div className='flex items-center'>
              <span className='text-sm font-medium'>
                {course.aveRating > 0 ? `${course.aveRating.toFixed(1)} ★` : 'Chưa có đánh giá'}
              </span>
            </div>
          </div>
        </div>

        <CardFooter className='p-4 border-t flex justify-between items-center bg-muted/10'>
          <div className='flex items-center text-xs text-muted-foreground'>
            <span>
              {course.durationsDisplay} • {course.totalEnrollment} học viên
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 rounded-full dropdown-trigger focus-visible:ring-0'
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className='h-4 w-4' />
                <span className='sr-only'>Mở menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  onNavigate(`/content-creator/course/${course.id}/edit`)
                }}
              >
                <Edit className='h-4 w-4 mr-2' />
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-destructive focus:text-destructive'
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(course.id)
                }}
              >
                <Trash className='h-4 w-4 mr-2' />
                Xóa khóa học
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </Link>
  )
}

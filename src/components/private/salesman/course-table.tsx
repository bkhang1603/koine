'use client'

import { useState, useEffect, useMemo } from 'react'
import { TableCustom } from '@/components/table-custom'
import { Badge } from '@/components/ui/badge'
import { mockCourses } from '@/app/(private)/salesman/_mock/data'
import { MoreOptions } from './more-options'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Star, Users } from 'lucide-react'
import type { Course } from '@/app/(private)/salesman/_mock/data'
import { CourseStatusBadge } from '@/components/private/course-status-badge'
import { EmptyState } from '@/components/empty-state'

interface CourseTableProps {
  search: string
  category: string
  priceRange: string
}

export function CourseTable({ search, category, priceRange }: CourseTableProps) {
  const router = useRouter()
  const [data, setData] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setData(mockCourses)
    setLoading(false)
  }, [])

  const headerColumn = [
    { id: 1, name: 'Ảnh' },
    { id: 2, name: 'Tên khóa học' },
    { id: 3, name: 'Danh mục' },
    { id: 4, name: 'Số buổi' },
    { id: 5, name: 'Tài liệu' },
    { id: 6, name: 'Trạng thái' },
    { id: 7, name: 'Giá bán' },
    { id: 8, name: 'Học viên' },
    { id: 9, name: 'Đánh giá' },
    { id: 10, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (course: Course) => (
          <div className='relative w-16 h-16 rounded-lg overflow-hidden border'>
            <Image src={course.image} alt={course.name} fill className='object-cover' />
          </div>
        )
      },
      {
        id: 2,
        render: (course: Course) => (
          <div className='space-y-1'>
            <div className='font-medium line-clamp-2'>{course.name}</div>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <span>{course.duration}</span>
              <span>•</span>
              <span>{course.level}</span>
            </div>
          </div>
        )
      },
      {
        id: 3,
        render: (course: Course) => (
          <Badge variant='outline'>{course.category === 'language' ? 'Ngoại ngữ' : 'Kỹ năng'}</Badge>
        )
      },
      {
        id: 4,
        render: (course: Course) => <div className='text-sm'>{course.lessons} buổi</div>
      },
      {
        id: 5,
        render: (course: Course) => <div className='text-sm'>{course.materials} tài liệu</div>
      },
      {
        id: 6,
        render: (course: Course) => (
          <div className='space-y-1'>
            <CourseStatusBadge status={course.status} />
            {course.status === 'rejected' && <div className='text-xs text-destructive'>{course.reviewNote}</div>}
          </div>
        )
      },
      {
        id: 7,
        render: (course: Course) =>
          course.status === 'published' ? (
            <div className='font-medium'>{course.price}</div>
          ) : course.status === 'pending_price' ? (
            <Badge variant='outline' className='text-yellow-600 border-yellow-600'>
              Chờ thiết lập giá
            </Badge>
          ) : (
            <div className='text-muted-foreground text-sm'>Chưa có giá</div>
          )
      },
      {
        id: 8,
        render: (course: Course) => (
          <div className='flex items-center gap-1.5'>
            <Users className='w-4 h-4 text-muted-foreground' />
            <span>{course.status === 'published' ? course.students : 0}</span>
          </div>
        )
      },
      {
        id: 9,
        render: (course: Course) =>
          course.status === 'published' ? (
            <div className='flex items-center gap-1.5'>
              <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
              <span>{course.rating.toFixed(1)}</span>
              <span className='text-muted-foreground'>({course.totalRatings})</span>
            </div>
          ) : (
            <div className='text-muted-foreground text-sm'>Chưa có đánh giá</div>
          )
      },
      {
        id: 10,
        render: (course: Course) => {
          const canSetPrice = course.status === 'pending_price'

          return (
            <MoreOptions
              type='course'
              onView={() => router.push(`/salesman/courses/${course.id}`)}
              onEdit={canSetPrice ? () => router.push(`/salesman/courses/${course.id}/pricing`) : undefined}
            />
          )
        }
      }
    ],
    [router]
  )

  const filteredData = data.filter((course) => {
    const nameMatch = course.name.toLowerCase().includes(search.toLowerCase())
    const categoryMatch = category === 'all' || course.category === category
    const priceMatch =
      course.status === 'pending_price' ||
      priceRange === 'all' ||
      (priceRange === '0-500000' && parseInt(course.price.replace(/\D/g, '')) <= 500000) ||
      (priceRange === '500000-1000000' &&
        parseInt(course.price.replace(/\D/g, '')) > 500000 &&
        parseInt(course.price.replace(/\D/g, '')) <= 1000000) ||
      (priceRange === '1000000+' && parseInt(course.price.replace(/\D/g, '')) > 1000000)

    const statusMatch = ['pending_price', 'pending_review', 'published'].includes(course.status)

    return nameMatch && categoryMatch && priceMatch && statusMatch
  })

  if (!loading && filteredData.length === 0) {
    return <EmptyState title='Không tìm thấy khóa học' description='Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm khác.' />
  }

  return (
    <TableCustom
      data={{
        data: filteredData.slice(0, 10),
        message: '',
        pagination: {
          pageSize: 10,
          totalItem: filteredData.length,
          currentPage: 1,
          totalPage: Math.ceil(filteredData.length / 10),
          maxPageSize: 10
        }
      }}
      loading={loading}
      headerColumn={headerColumn}
      bodyColumn={bodyColumn}
      href='/salesman/courses'
    />
  )
}

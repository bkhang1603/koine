'use client'
import { use } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Package, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useComboDetailQuery } from '@/queries/useCombo'
import { Skeleton } from '@/components/ui/skeleton'
import { vi } from 'date-fns/locale'
import { format } from 'date-fns'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import configRoute from '@/config/route'
import { formatCurrency } from '@/lib/utils'

export default function ComboDetail(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { isLoading, error, data } = useComboDetailQuery(params.id)
  const combo = data?.payload.data

  if (isLoading) {
    return (
      <div className='container max-w-7xl mx-auto py-6 space-y-8'>
        {/* Back button skeleton */}
        <Skeleton className='w-[200px] h-10' />

        {/* Header skeleton */}
        <div>
          <div className='flex items-center justify-between mb-4'>
            <Skeleton className='w-[300px] h-8' />
            <Skeleton className='w-[80px] h-6' />
          </div>
          <div className='flex items-center gap-6'>
            <Skeleton className='w-[100px] h-5' />
            <Skeleton className='w-[80px] h-5' />
            <Skeleton className='w-[120px] h-5' />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-6'>
          <div className='col-span-2 space-y-6'>
            {/* Combo image skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-full h-[400px] rounded-lg' />
              </CardContent>
            </Card>

            {/* Description skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-full h-20' />
              </CardContent>
            </Card>

            {/* Courses list skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[200px] h-6' />
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className='w-full h-20' />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Combo info skeleton */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <Skeleton className='w-[100px] h-5' />
                    <Skeleton className='w-[80px] h-5' />
                  </div>
                  <div className='flex justify-between'>
                    <Skeleton className='w-[100px] h-5' />
                    <Skeleton className='w-[60px] h-5' />
                  </div>
                </div>

                <Skeleton className='w-full h-px' />

                <div className='space-y-3'>
                  {[1, 2, 3].map((item) => (
                    <div key={item} className='flex justify-between'>
                      <Skeleton className='w-[120px] h-5' />
                      <Skeleton className='w-[100px] h-5' />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action buttons skeleton */}
            <div className='space-y-3'>
              <Skeleton className='w-full h-10 rounded-md' />
              <Skeleton className='w-full h-10 rounded-md' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !combo) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
        <AlertCircle className='w-12 h-12 text-red-500' />
        <div className='text-center'>
          <h3 className='text-lg font-medium text-gray-900 mb-1'>Không tìm thấy combo</h3>
          <p className='text-gray-500'>Combo không tồn tại hoặc đã bị xóa</p>
        </div>
        <Button variant='outline' asChild>
          <Link href={configRoute.manager.combo}>Quay lại danh sách combo</Link>
        </Button>
      </div>
    )
  }

  // Calculate suggested price (total of all courses minus 10%)
  const totalCoursesPrice = combo.courseInfos.reduce((total: number, course: any) => total + course.price, 0)
  const suggestedPrice = totalCoursesPrice * 0.9 // 10% discount

  const breadcrumbItems = [
    {
      title: 'Combo',
      href: configRoute.manager.combo
    },
    {
      title: combo.name
    }
  ]

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Breadcrumb */}
      <div className='mb-6'>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Header */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>{combo.name}</h1>
        </div>
        <div className='flex items-center gap-6 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <Package className='h-4 w-4' />
            {combo.courseInfos?.length || 0} khóa học
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-2 space-y-6'>
          {/* Combo Image */}
          <Card>
            <CardHeader>
              <CardTitle>Hình ảnh combo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='relative w-full h-[400px]'>
                <Image
                  src={combo.imageUrl || '/placeholder-image.jpg'}
                  alt={combo.name}
                  fill
                  className='object-contain rounded-lg'
                />
              </div>
            </CardContent>
          </Card>

          {/* Combo Description */}
          <Card>
            <CardHeader>
              <CardTitle>Mô tả combo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600'>{combo.description}</p>
            </CardContent>
          </Card>

          {/* Courses List */}
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <div>
                <CardTitle className='flex items-center gap-2'>
                  <Package className='w-5 h-5' />
                  Danh sách khóa học
                </CardTitle>
                <CardDescription className='mt-1.5'>
                  Hiện có {combo.courseInfos?.length || 0} khóa học trong combo này
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {combo.courseInfos?.length > 0 ? (
                  combo.courseInfos.map((course) => (
                    <div key={course.id} className='flex items-center gap-4 p-4 border rounded-lg relative'>
                      <div className='relative w-20 h-20 flex-shrink-0'>
                        <Image
                          src={course.imageUrl || '/placeholder-image.jpg'}
                          alt={course.title}
                          fill
                          className='object-cover rounded-md'
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-medium'>{course.title}</h3>
                        <p className='text-sm text-gray-500 line-clamp-2'>{course.description}</p>
                      </div>
                      <div className='text-right'>
                        <div className='font-medium'>{formatCurrency(course.price)}</div>
                        {course.discount > 0 && (
                          <div className='text-sm text-red-500'>-{Math.round(course.discount * 100)}%</div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex flex-col items-center justify-center py-12 text-center'>
                    <div className='rounded-full bg-gray-100 p-3 mb-4'>
                      <Package className='h-8 w-8 text-gray-400' />
                    </div>
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>Chưa có khóa học nào</h3>
                    <p className='text-sm text-gray-500 max-w-sm mb-6'>
                      Combo này chưa có khóa học nào. Hãy thêm khóa học để hoàn thiện combo.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Combo Info */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin combo</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Giá gốc</span>
                  <span>{formatCurrency(combo.price)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Giá đề xuất</span>
                  <span className='text-blue-600'>{formatCurrency(suggestedPrice)}</span>
                </div>
                <div className='text-xs text-gray-500 italic text-right'>(Tổng giá khóa học giảm 10%)</div>
              </div>

              <Separator />

              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Số khóa học</span>
                  <span>{combo.courseInfos?.length || 0} khóa học</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Ngày tạo</span>
                  <span>{format(new Date(combo.createdAt), 'dd/MM/yyyy', { locale: vi })}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Cập nhật lần cuối</span>
                  <span>{format(new Date(combo.updatedAt), 'dd/MM/yyyy', { locale: vi })}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className='text-sm font-medium mb-2'>Danh mục</h3>
                <div className='flex flex-wrap gap-2'>
                  {combo.categories?.map((category) => (
                    <Badge key={category.id} variant='outline'>
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

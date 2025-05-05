'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState, use } from 'react'
import { useGetCourseQuery, useUpdateCourseMutation, useGetCategoryCoursesQuery } from '@/queries/useCourse'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'
import { CreateCourseBodyType } from '@/schemaValidations/course.schema'
import { CourseEditForm } from '@/components/private/salesman/course/course-edit-form'

// Define the partial type for salesman update
type SalesmanCourseUpdateType = Pick<CreateCourseBodyType, 'price' | 'discount'>

export default function EditCoursePage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const router = useRouter()

  const { data: courseData, isLoading: isCourseLoading } = useGetCourseQuery({ id: params.id })
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoryCoursesQuery({
    page_index: 1,
    page_size: 99
  })
  const updateCourseMutation = useUpdateCourseMutation({ id: params.id })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const course = courseData?.payload.data
  const categories = categoriesData?.payload?.data || []

  // Handle form submission
  const onSubmit = async (values: CreateCourseBodyType) => {
    try {
      setIsSubmitting(true)

      // For salesmen, we only update price and discount
      // Note: The discount conversion is now handled in CourseEditForm component
      const updateData: SalesmanCourseUpdateType = {
        price: values.price,
        discount: values.discount
      }

      // Cast to any to bypass the type check for the mutation
      await updateCourseMutation.mutateAsync(updateData as any)

      toast({
        title: 'Cập nhật thành công',
        description: 'Giá và khuyến mãi khóa học đã được cập nhật',
        variant: 'default'
      })

      router.push(`/salesman/course/${params.id}`)
    } catch (error) {
      handleErrorApi({
        error
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Convert categories for component
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name
  }))

  // Loading state
  if (isCourseLoading || isCategoriesLoading) {
    return (
      <div className='container max-w-4xl mx-auto px-4 py-6 space-y-8'>
        <Skeleton className='h-10 w-32' />
        <Skeleton className='h-8 w-64' />
        <div className='space-y-6'>
          <Card>
            <Skeleton className='h-96 w-full' />
          </Card>
          <div className='flex justify-end gap-4'>
            <Skeleton className='h-10 w-32' />
          </div>
        </div>
      </div>
    )
  }

  if (!course && !isCourseLoading) {
    return (
      <div className='container max-w-4xl mx-auto px-4 py-6'>
        <Button variant='ghost' asChild className='mb-6'>
          <Link href='/salesman/course'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Quay lại
          </Link>
        </Button>
        <Card className='p-8 text-center'>
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold'>Không tìm thấy khóa học</h2>
            <p className='text-muted-foreground'>Khóa học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button asChild className='mt-4'>
              <Link href='/salesman/course'>Quay lại danh sách khóa học</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const isLoading = updateCourseMutation.isPending || isSubmitting

  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      {/* Breadcrumb */}
      <nav className='flex items-center space-x-1 text-sm text-muted-foreground mb-6'>
        <Link href='/salesman/course' className='hover:text-primary transition-colors'>
          Khóa học
        </Link>
        <ChevronRight className='h-4 w-4' />
        <Link
          href={`/salesman/course/${params.id}`}
          className='hover:text-primary transition-colors max-w-[200px] truncate'
        >
          {course?.title || 'Chi tiết'}
        </Link>
        <ChevronRight className='h-4 w-4' />
        <span className='font-medium text-foreground'>Chỉnh sửa</span>
      </nav>

      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Chỉnh sửa khóa học</h1>
          <p className='text-sm text-muted-foreground mt-1'>Cập nhật giá và khuyến mãi khóa học</p>
        </div>
        <div>
          <Button variant='outline' asChild>
            <Link href={`/salesman/course/${params.id}`}>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Quay lại
            </Link>
          </Button>
        </div>
      </div>

      {/* Course Edit Form - using our specialized component */}
      <CourseEditForm course={course} categoryOptions={categoryOptions} onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  )
}

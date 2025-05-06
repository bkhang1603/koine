'use client'
import { use, useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Package, AlertCircle, Plus, Search, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useComboDetailQuery, useAddCourseToComboMutation, useRemoveCourseFromComboMutation } from '@/queries/useCombo'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { vi } from 'date-fns/locale'
import { format } from 'date-fns'
import { Breadcrumb } from '@/components/private/common/breadcrumb'
import configRoute from '@/config/route'
import { useGetCourses } from '@/queries/useCourse'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { handleErrorApi, formatCurrency } from '@/lib/utils'
import { MoreOptions } from '@/components/private/common/more-options'

// Define a type for the course item based on the response
interface CourseItem {
  id: string
  title: string
  description: string
  imageUrl: string
  price: number
  discount: number
  isCombo: boolean
  [key: string]: any // For other properties we don't need to explicitly type
}

export default function ComboDetail(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { isLoading, error, data } = useComboDetailQuery(params.id)
  const combo = data?.payload.data
  const { toast } = useToast()

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false)
  const [addingCourseId, setAddingCourseId] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // Get all courses with a large page size to get most courses in one request
  const coursesQuery = useGetCourses({
    page_index: 1,
    page_size: 99
  })

  // Add course mutation
  const addCourseMutation = useAddCourseToComboMutation(params.id)
  // Remove course mutation
  const removeCourse = useRemoveCourseFromComboMutation(params.id)

  // Update the debounce effect for search
  useEffect(() => {
    // Only set up a timer when user has typed something
    if (searchInput !== searchQuery) {
      // Create timer but don't show loading state immediately
      const timer = setTimeout(() => {
        // Show loading state briefly before updating results
        setIsSearching(true)

        // Small additional delay before applying the search
        setTimeout(() => {
          setSearchQuery(searchInput)
          setIsSearching(false)
        }, 500)
      }, 500) // Wait 500ms after typing stops

      return () => clearTimeout(timer)
    }
  }, [searchInput, searchQuery])

  const handleAddCourse = (courseId: string) => {
    setAddingCourseId(courseId)
    addCourseMutation.mutate(courseId, {
      onSuccess: () => {
        toast({
          title: 'Thành công',
          description: 'Đã thêm khóa học vào combo'
        })
        setIsAddCourseModalOpen(false)
        setAddingCourseId(null)
      },
      onError: (error) => {
        handleErrorApi({ error })
        setAddingCourseId(null)
      }
    })
  }

  const handleRemoveCourse = (courseId: string) => {
    removeCourse.mutate(courseId, {
      onSuccess: () => {
        toast({
          title: 'Thành công',
          description: 'Đã xóa khóa học khỏi combo'
        })
      },
      onError: (error) => {
        handleErrorApi({ error })
      }
    })
  }

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
          <Link href={configRoute.salesman.combo}>Quay lại danh sách combo</Link>
        </Button>
      </div>
    )
  }

  // Calculate final price after discount
  const finalPrice = combo.price * (1 - combo.discount)

  // Calculate suggested price (total of all courses minus 10%)
  const totalCoursesPrice = combo.courseInfos.reduce((total: number, course: any) => total + course.price, 0)
  const suggestedPrice = totalCoursesPrice * 0.9 // 10% discount

  const breadcrumbItems = [
    {
      title: 'Combo',
      href: configRoute.salesman.combo
    },
    {
      title: combo.name
    }
  ]

  // Filter out courses that are already in the combo and filter out courses that are combos themselves
  const availableCourses: CourseItem[] =
    coursesQuery.data?.payload.data?.filter(
      (course: CourseItem) =>
        // Filter out courses already in this combo
        !combo.courseInfos.some((comboItem: { id: string }) => comboItem.id === course.id) &&
        // Filter out courses that are combos themselves
        !course.isCombo
    ) || []

  // Filter available courses based on search query
  const filteredCourses = availableCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <div className='flex items-center gap-3'>
            <Badge variant={combo.isDeleted ? 'destructive' : 'secondary'}>
              {combo.isDeleted ? 'Đã xóa' : 'Hoạt động'}
            </Badge>
            <Button variant='outline' asChild>
              <Link href={`${configRoute.salesman.combo}/${params.id}/edit`}>Chỉnh sửa</Link>
            </Button>
          </div>
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
              <Button
                onClick={() => setIsAddCourseModalOpen(true)}
                className='flex items-center gap-1'
                variant='secondary'
              >
                <Plus className='w-4 h-4' />
                Thêm khóa học
              </Button>
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
                      <MoreOptions
                        itemType='course'
                        item={{
                          id: course.id,
                          title: course.title,
                          status: 'Active',
                          slug: course.slug || ''
                        }}
                        onDelete={() => handleRemoveCourse(course.id)}
                      />
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
                {combo.discount > 0 && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Giảm giá</span>
                    <span className='text-red-500'>{combo.discount * 100}%</span>
                  </div>
                )}
                {combo.discount > 0 && (
                  <div className='flex justify-between text-sm font-medium'>
                    <span className='text-muted-foreground'>Giá sau giảm</span>
                    <span className='text-green-600'>{formatCurrency(finalPrice)}</span>
                  </div>
                )}
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

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className='max-w-3xl max-h-[80vh]'>
          <DialogHeader>
            <DialogTitle>Hình ảnh combo</DialogTitle>
            <DialogDescription>{combo.name}</DialogDescription>
          </DialogHeader>

          <div className='relative w-full h-[500px]'>
            {selectedImage && <Image src={selectedImage} alt={combo.name} fill className='object-contain' />}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Course Dialog */}
      <Dialog open={isAddCourseModalOpen} onOpenChange={setIsAddCourseModalOpen}>
        <DialogContent className='max-w-3xl'>
          <DialogHeader>
            <DialogTitle>Thêm khóa học vào combo</DialogTitle>
            <DialogDescription>Chọn một khóa học để thêm vào combo &ldquo;{combo.name}&rdquo;</DialogDescription>
          </DialogHeader>

          {/* Course search */}
          <div className='mb-4 relative'>
            <div className='absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
              <Search className='w-4 h-4 text-gray-400' />
            </div>
            <Input
              placeholder='Tìm kiếm khóa học...'
              className='w-full pl-9'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              disabled={coursesQuery.isLoading}
            />
          </div>

          {coursesQuery.isLoading ? (
            <div className='flex items-center justify-center p-8'>
              <Loader2 className='w-8 h-8 animate-spin text-primary' />
              <span className='ml-2'>Đang tải danh sách khóa học...</span>
            </div>
          ) : isSearching ? (
            <div className='flex items-center justify-center p-8'>
              <Loader2 className='w-6 h-6 animate-spin text-primary' />
              <span className='ml-2'>Đang tìm kiếm...</span>
            </div>
          ) : (
            <div className='space-y-3 max-h-[60vh] overflow-y-auto p-2'>
              {filteredCourses.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                  <AlertCircle className='w-8 h-8 mx-auto mb-2' />
                  {searchQuery ? (
                    <>
                      <p>Không tìm thấy khóa học nào phù hợp với &ldquo;{searchQuery}&rdquo;</p>
                      <p className='text-sm mt-1'>Vui lòng thử tìm kiếm với từ khóa khác</p>
                    </>
                  ) : (
                    <>
                      <p>Không tìm thấy khóa học nào có thể thêm vào combo.</p>
                      <p className='text-sm'>Tất cả các khóa học đã được thêm vào combo này.</p>
                    </>
                  )}
                </div>
              ) : (
                filteredCourses.map((course: CourseItem) => (
                  <div
                    key={course.id}
                    className='border rounded-lg p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors'
                  >
                    <div className='relative w-16 h-16 flex-shrink-0'>
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
                    <Button
                      onClick={() => handleAddCourse(course.id)}
                      size='sm'
                      className='min-w-[120px]'
                      disabled={addingCourseId === course.id}
                    >
                      {addingCourseId === course.id ? (
                        <>
                          <Loader2 className='w-4 h-4 mr-1 animate-spin' />
                          Đang thêm...
                        </>
                      ) : (
                        <>
                          <Plus className='w-4 h-4 mr-1' />
                          Thêm
                        </>
                      )}
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

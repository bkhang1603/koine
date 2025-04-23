import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Save, Loader2 } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { CreateCourseBodyType, createCourseBody } from '@/schemaValidations/course.schema'
import { Badge } from '@/components/ui/badge'

// Define the partial type for salesman update
type SalesmanCourseUpdateType = Pick<CreateCourseBodyType, 'price' | 'discount'>

// Course level options text display
const getLevelLabel = (value: string) => {
  switch (value) {
    case 'ALL':
      return 'Tất cả'
    case 'BEGINNER':
      return 'Người mới bắt đầu'
    case 'INTERMEDIATE':
      return 'Trung cấp'
    case 'ADVANCED':
      return 'Nâng cao'
    default:
      return value
  }
}

// Age stage label display
const getAgeStageLabel = (value: string) => {
  switch (value) {
    case '3-6':
      return '3-6 tuổi'
    case '7-9':
      return '7-9 tuổi'
    case '10-12':
      return '10-12 tuổi'
    case '13-15':
      return '13-15 tuổi'
    case '16-18':
      return '16-18 tuổi'
    case '18+':
      return 'Từ 18 tuổi trở lên'
    default:
      return value
  }
}

interface CourseEditFormProps {
  course: any
  categoryOptions: { value: string; label: string }[]
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: CreateCourseBodyType) => void
  isLoading: boolean
}

// eslint-disable-next-line no-unused-vars
export function CourseEditForm({ course, categoryOptions, onSubmit, isLoading }: CourseEditFormProps) {
  // Setup form with default values
  const form = useForm<CreateCourseBodyType>({
    resolver: zodResolver(createCourseBody),
    defaultValues: {
      title: '',
      description: '',
      categoryIds: [],
      imageUrl: '',
      imageBanner: '',
      price: 0,
      discount: 0,
      level: 'ALL',
      ageStage: '18+'
    }
  })

  // Load course data into form when available
  useEffect(() => {
    if (course) {
      form.reset({
        title: course.title,
        description: course.description,
        categoryIds: course.categories.map((cat: any) => cat.id),
        imageUrl: course.imageUrl,
        imageBanner: course.imageBanner,
        price: course.price,
        discount: course.discount,
        level: course.level,
        ageStage: course?.ageStage || '18+'
      })
    }
  }, [course, form])

  // Define the form values we will actually send on submit
  const handleSubmit = (values: CreateCourseBodyType) => {
    // Create a new object with only the editable fields (price and discount)
    // Salesmen can only update price and discount
    const updatedValues: SalesmanCourseUpdateType = {
      price: values.price,
      discount: values.discount
    }

    onSubmit(updatedValues as CreateCourseBodyType)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin khóa học</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Thumbnail Field - Read Only */}
            <FormItem>
              <FormLabel>Ảnh thumbnail</FormLabel>
              <div className='flex gap-2 items-start justify-start'>
                <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                  <AvatarImage src={course?.imageUrl} />
                  <AvatarFallback className='rounded-none'>Ảnh</AvatarFallback>
                </Avatar>
              </div>
            </FormItem>

            {/* Banner Field - Read Only */}
            <FormItem>
              <FormLabel>Ảnh banner</FormLabel>
              <div className='flex gap-2 items-start justify-start'>
                <div className='relative w-[200px] h-[100px]'>
                  <Avatar className='w-full h-full rounded-md object-cover'>
                    <AvatarImage src={course?.imageBanner} className='object-cover' />
                    <AvatarFallback className='rounded-none w-full h-full'>Banner</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </FormItem>

            {/* Categories Field - Read Only */}
            <FormItem>
              <FormLabel>Danh mục</FormLabel>
              <div className='flex flex-wrap gap-2 mt-1.5'>
                {course?.categories.map((category: any) => (
                  <Badge key={category.id} variant='outline' className='bg-secondary/10'>
                    {category.name}
                  </Badge>
                ))}
              </div>
            </FormItem>

            {/* Title Field - Read Only */}
            <FormItem>
              <FormLabel>Tiêu đề</FormLabel>
              <div className='p-2 border rounded-md bg-muted/10'>{course?.title}</div>
            </FormItem>

            {/* Description Field - Read Only */}
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <div className='p-2 border rounded-md bg-muted/10 min-h-24 whitespace-pre-wrap'>
                {course?.description}
              </div>
            </FormItem>

            {/* Level Field - Read Only */}
            <FormItem>
              <FormLabel>Cấp độ</FormLabel>
              <div className='p-2 border rounded-md bg-muted/10'>{getLevelLabel(course?.level)}</div>
            </FormItem>

            {/* Age Stage Field - Read Only */}
            <FormItem>
              <FormLabel>Độ tuổi</FormLabel>
              <div className='p-2 border rounded-md bg-muted/10'>{getAgeStageLabel(course?.ageStage || '18+')}</div>
            </FormItem>

            {/* Price and Discount Fields - Editable */}
            <div className='grid grid-cols-2 gap-4'>
              {/* Price Field */}
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá (VNĐ)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Nhập giá khóa học'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Discount Field */}
              <FormField
                control={form.control}
                name='discount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giảm giá (%)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Nhập % giảm giá'
                        {...field}
                        min={0}
                        max={100}
                        onChange={(e) => {
                          const value = Number(e.target.value)
                          field.onChange(value > 100 ? 100 : value < 0 ? 0 : value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className='flex justify-end gap-4'>
          <Button type='submit' disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className='mr-2 h-4 w-4' />
                Lưu thay đổi
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

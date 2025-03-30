import courseApiRequest from '@/apiRequests/course'
import CourseCard from '@/components/public/parent/course/course-card'
import CustomInput from '@/components/public/parent/home/custom-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { wrapServerApi } from '@/lib/server-utils'
import { CoursesResType } from '@/schemaValidations/course.schema'
import { searchParams } from '@/types/query'
import { Button } from '@/components/ui/button'
import { BookOpen, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import configRoute from '@/config/route'
import PaginationCustom from '@/components/pagination-custom'

async function CourseList({ searchParams }: { searchParams?: searchParams }) {
  let courseData: CoursesResType['data'] = []
  const page_index = isNaN(Number(searchParams?.page_index)) ? 1 : Number(searchParams?.page_index)
  const keyword = searchParams?.search ?? ''
  const sortOptions = ['pa', 'pd', 'na', 'nd'] as const
  const sort = sortOptions.includes(searchParams?.sort as any) ? searchParams?.sort : 'pa'
  const range = isNaN(Number(searchParams?.range)) ? undefined : Number(searchParams?.range)
  let category = searchParams?.category ?? ''
  category = (typeof category === 'string' ? category : '')
    .split(',')
    .map((cat) => encodeURIComponent(cat))
    .join('a%a')

  const data = await wrapServerApi(() =>
    courseApiRequest.getCourses({
      page_index: page_index,
      page_size: 9,
      keyword: keyword,
      sort: sort,
      range: range,
      category: category
    })
  )

  courseData = data?.payload?.data ?? []

  if (!data) {
    return null
  }

  return (
    <section className='col-span-3'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <CustomInput className='w-full md:max-w-[400px] h-9' placeholder='Tìm kiếm sản phẩm...' />

        <div className='hidden sm:flex items-center gap-2 w-full md:w-auto'>
          <Select>
            <SelectTrigger className='w-[150px] focus:ring-0'>
              <SelectValue placeholder='Sắp xếp theo' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='price-asc'>Giá thấp đến cao</SelectItem>
              <SelectItem value='price-desc'>Giá cao đến thấp</SelectItem>
              <SelectItem value='most-popular'>Phổ biến nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {courseData.length === 0 && (
        <div className='col-span-full flex flex-col items-center justify-center py-16 px-4'>
          <div className='w-48 h-48 mb-6 bg-muted rounded-full flex items-center justify-center'>
            <BookOpen className='w-20 h-20 text-muted-foreground/50' />
          </div>
          <h3 className='text-xl font-semibold text-center mb-2'>Không tìm thấy khóa học nào</h3>
          <p className='text-muted-foreground text-center max-w-md mb-8'>
            Không có khóa học nào phù hợp với tiêu chí tìm kiếm hiện tại. Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
          </p>
          <Button asChild variant='outline' size='lg'>
            <Link href={configRoute.course} className='gap-2'>
              <RefreshCw className='w-4 h-4' />
              Xem tất cả khóa học
            </Link>
          </Button>
        </div>
      )}

      {courseData.length > 0 && (
        <>
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6'>
            {courseData.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <PaginationCustom
            totalPage={data?.payload?.pagination.totalPage ?? 1}
            href={configRoute.course}
            className='mt-6'
          />
        </>
      )}
    </section>
  )
}

export default CourseList

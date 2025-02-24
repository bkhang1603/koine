import courseApiRequest from '@/apiRequests/course'
import CourseCard from '@/components/public/parent/course/course-card'
import { CourseMobileFilter } from '@/components/public/parent/course/course-mobile-filter'
import CustomInput from '@/components/public/parent/home/custom-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CoursesResType } from '@/schemaValidations/course.schema'
import { searchParams } from '@/types/query'

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

  try {
    const { payload } = await courseApiRequest.getCourses({
      page_index: page_index,
      page_size: 12,
      keyword: keyword,
      sort: sort,
      range: range,
      category: category
    })

    courseData = payload.data
  } catch (error) {
    console.log(error)
  }

  return (
    <section className='col-span-3'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <CustomInput className='w-full md:max-w-[400px] h-9' placeholder='Tìm kiếm sản phẩm...' />

        <div className='flex items-center gap-2 w-full md:w-auto'>
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

          <div className='md:hidden'>
            <CourseMobileFilter />
          </div>
        </div>
      </div>

      {courseData.length === 0 && <p className='text-center mt-6'>Không tìm thấy khóa học nào</p>}

      {courseData.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6'>
          {courseData.map((course) => (
            // <Link href={`/course/${course.slug}`} passHref key={course.id}>
            //   <article
            //     className='rounded-xl overflow-hidden shadow-lg
            //           group/course cursor-pointer'
            //   >
            //     <div className='w-full aspect-square overflow-hidden'>
            //       <Image
            //         src={course.imageUrl}
            //         alt='koine course'
            //         width={1000}
            //         height={1000}
            //         quality={100}
            //         className='w-full h-full object-cover group-hover/course:scale-110 ease-linear duration-300 transition-all'
            //       />
            //     </div>

            //     <div className='p-4'>
            //       <h3 className='text-lg'>{course.title}</h3>
            //       <p className='text-base text-secondary font-semibold'>
            //         {course.price === 0 ? 'Miễn phí' : course.price ? `${course.price.toLocaleString()}đ` : 'N/A'}
            //       </p>

            //       <Separator className='my-4 h-[2px]' />

            //       <div className='flex justify-between items-center text-primary/80 font-medium'>
            //         <div className='flex justify-center items-center gap-1'>
            //           <Star className='w-4 h-4' />
            //           <p className='text-sm'>{course.aveRating === 0 ? 5 : course.aveRating}</p>
            //         </div>

            //         <div className='flex justify-center items-center gap-1'>
            //           <AlarmClock className='w-4 h-4' />
            //           <p className='text-sm'>{course.durationsDisplay}</p>
            //         </div>

            //         <div className='flex justify-center items-center gap-1'>
            //           <Users className='w-4 h-4' />
            //           <p className='text-sm'>{course.totalEnrollment}</p>
            //         </div>
            //       </div>
            //     </div>
            //   </article>
            // </Link>
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  )
}

export default CourseList

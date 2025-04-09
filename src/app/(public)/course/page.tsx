import CourseList from '@/components/public/parent/course/course-list'
import images from '@/assets/images'
import Image from 'next/image'
import CourseFilter from '@/components/public/parent/course/course-filter'
import { searchParams } from '@/types/query'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SlidersHorizontal } from 'lucide-react'
import { wrapServerApi } from '@/lib/server-utils'
import courseApiRequest from '@/apiRequests/course'
import { CustomCourseCard } from '@/components/public/parent/course/custom-course-card'

export default async function CoursePage(props: { searchParams?: Promise<searchParams> }) {
  const searchParams = await props.searchParams

  const data = await wrapServerApi(() => courseApiRequest.getCategoryCoursesCache())
  const categories = data?.payload?.data ?? []

  return (
    <main>
      <Image
        src={images.courseBanner}
        alt='Course banner'
        width={1920}
        height={400}
        quality={100}
        className='h-[20vh] sm:h-[25vh] md:h-[30vh] w-full object-cover'
        priority
      />

      {/* Mobile: Filter Trigger & Custom Course Card */}
      <div className='container mt-6'>
        <div className='md:hidden space-y-3'>
          <CustomCourseCard variant='mobile' />

          {/* Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' size='sm' className='w-full gap-2 bg-white'>
                <SlidersHorizontal className='w-4 h-4' />
                Bộ lọc
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-[300px] p-0'>
              <SheetHeader className='p-4 border-b'>
                <SheetTitle>Bộ lọc khóa học</SheetTitle>
              </SheetHeader>
              <div className='p-4 overflow-y-auto max-h-[calc(100vh-80px)]'>
                {categories && <CourseFilter categories={categories} />}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mt-4 md:mt-8 container'>
        {/* Desktop: Sidebar with Filter */}
        <div className='md:col-span-1 hidden md:block'>
          {categories && <CourseFilter categories={categories} />}
          <CustomCourseCard />
        </div>

        {/* Course List spans all columns on mobile, 3 columns on desktop */}
        <div className='col-span-1 md:col-span-3'>
          <CourseList searchParams={searchParams} />
        </div>
      </div>

      {/* Promotional Banner */}
      <section className='container py-20'>
        <Image
          src={images.coursePoster}
          alt='Course poster'
          width={1920}
          height={400}
          quality={100}
          className='w-full object-cover rounded-2xl'
        />
      </section>
    </main>
  )
}

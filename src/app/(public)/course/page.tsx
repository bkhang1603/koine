import CourseList from '@/components/public/parent/course/course-list'
import images from '@/assets/images'
import Image from 'next/image'
import CourseFilter from '@/components/public/parent/course/course-filter'
import { searchParams } from '@/types/query'

function CoursePage({ searchParams }: { searchParams?: searchParams }) {
  return (
    <main>
      <Image
        src={images.courseBanner}
        alt='Course banner'
        width={1920}
        height={400}
        quality={100}
        className='h-[30vh] w-full object-cover'
      />

      <div className='grid grid-cols-3 md:grid-cols-4 gap-6 mt-8 container'>
        <div className='md:col-span-1 hidden md:block'>
          <CourseFilter />
        </div>

        <CourseList searchParams={searchParams} />
      </div>

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

export default CoursePage

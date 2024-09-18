import CourseList from '@/app/(public)/course/components/course-list'
import images from '@/assets/images'
import Image from 'next/image'

function CoursePage() {
  return (
    <main>
      <Image
        src={images.banner}
        alt='Banner'
        width={1920}
        height={400}
        quality={100}
        className='h-[30vh] w-full object-cover'
      />

      <section className='container'>
        <CourseList />
      </section>
    </main>
  )
}

export default CoursePage

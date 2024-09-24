import CourseList from '@/app/(public)/course/components/course-list'
import images from '@/assets/images'
import Image from 'next/image'

function CoursePage() {
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

      <section className='container py-16'>
        <CourseList />
      </section>

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

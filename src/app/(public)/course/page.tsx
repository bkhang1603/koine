import Information from '@/app/(public)/components/information'
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
      {/* <section className='flex justify-center items-center mt-20 md:mt-40 relative'>
        <Input
          placeholder='Tìm kiếm khóa học'
          className='w-full max-w-[600px] px-5 md:h-14 md:text-lg focus-visible:ring-0 border-2 border-primary rounded-xl'
        />

        <Image
          src={images.searchImage}
          alt='Search'
          width={500}
          height={500}
          className='hidden sm:block absolute top-0 transform -translate-y-14 max-w-[500px]'
        />
      </section> */}

      <section className='container'>
        <h1 className='text-center text-3xl font-bold mt-8'>Danh sách khóa học</h1>
      </section>

      <Information />
    </main>
  )
}

export default CoursePage

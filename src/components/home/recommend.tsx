import icons from '@/assets/icons'
import images from '@/assets/images'
import CardCourse from '@/components/card-course'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

function Recommend() {
  return (
    <section className='container flex items-center justify-center flex-col py-16 sm:py-28 relative'>
      <h3 className='font-medium sm:text-lg'>Các khóa học của chúng tôi</h3>
      <h2
        className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
        text-transparent bg-clip-text text-2xl md:text-3xl lg:text-5xl lg:h-14 font-bold mt-5 text-center'
      >
        Những khóa học hàng đầu
      </h2>
      <Image
        src={icons.pinkStars}
        alt='pink-stars'
        width={200}
        height={200}
        className='hidden sm:block absolute top-20 left-14 mt-32'
      />

      <div className='mt-10 sm:mt-20 p-4 w-full flex items-center justify-end gap-2 cursor-pointer text-gray-500 hover:text-secondary'>
        <span className='font-semibold text-sm sm:text-lg'>Xem thêm</span>
        <ArrowRight className='w-4 h-4 sm:w-6 sm:h-6' />
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
        <CardCourse images={images.children} />
        <CardCourse images={images.children1} />
        <CardCourse images={images.children2} />
      </div>
    </section>
  )
}

export default Recommend

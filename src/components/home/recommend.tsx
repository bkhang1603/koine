import icons from '@/assets/icons'
import images from '@/assets/images'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

function Recommend() {
  return (
    <section className='container flex items-center justify-center flex-col py-28 relative'>
      <h3 className='font-medium text-lg'>Các khóa học của chúng tôi</h3>
      <h2
        className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
        text-transparent bg-clip-text text-5xl font-bold mt-5 h-[52px] line-clamp-1'
      >
        Những khóa học hàng đầu
      </h2>
      <Image
        src={icons.pinkStars}
        alt='pink-stars'
        width={200}
        height={200}
        className='absolute top-20 left-14 mt-32'
      />

      <div className='mt-20 p-4 w-full flex items-center justify-end gap-2 cursor-pointer text-gray-500 hover:text-secondary'>
        <span className='font-semibold text-lg'>Xem thêm</span>
        <ArrowRight />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div
          className='h-[530px] rounded-xl shadow-md w-full overflow-hidden group
        transition-shadow duration-500 hover:shadow-xl cursor-pointer ease-in-out'
        >
          <Image
            src={images.children}
            alt='children'
            width={500}
            height={500}
            className='w-full h-[350px] object-cover'
          />
          <div className='px-11 py-4 h-[180px] flex flex-col justify-between'>
            <h3 className='text-gray-400 font-medium text-base'>Tên khóa học</h3>
            <h2 className='font-bold text-lg line-clamp-3'>
              Hàng nghìn bà mẹ không thể sai được. Hãy xem vì sao bạn cũng cần một đĩa nhạc ngủ ngon.
            </h2>
            <div className='w-full flex justify-between items-center pt-3'>
              <span className='text-sm text-gray-400'>5 Bài giảng</span>
              <ArrowUpRight className='group-hover:text-secondary' />
            </div>
          </div>
        </div>

        <div className='h-[530px] rounded-xl shadow-md w-full overflow-hidden group transition-shadow duration-300 hover:shadow-xl cursor-pointer'>
          <Image
            src={images.children1}
            alt='children'
            width={500}
            height={500}
            className='w-full h-[350px] object-cover'
          />
          <div className='px-11 py-4 h-[180px] flex flex-col justify-between'>
            <h3 className='text-gray-400 font-medium text-base'>Tên khóa học</h3>
            <h2 className='font-bold text-lg line-clamp-3'>
              Hàng nghìn bà mẹ không thể sai được. Hãy xem vì sao bạn cũng cần một đĩa nhạc ngủ ngon.
            </h2>
            <div className='w-full flex justify-between items-center pt-3'>
              <span className='text-sm text-gray-400'>5 Bài giảng</span>
              <ArrowUpRight className='group-hover:text-secondary' />
            </div>
          </div>
        </div>

        <div className='h-[530px] rounded-xl shadow-md w-full overflow-hidden group transition-shadow duration-300 hover:shadow-xl cursor-pointer'>
          <Image
            src={images.children2}
            alt='children'
            width={500}
            height={500}
            className='w-full h-[350px] object-cover'
          />
          <div className='px-11 py-4 h-[180px] flex flex-col justify-between'>
            <h3 className='text-gray-400 font-medium text-base'>Tên khóa học</h3>
            <h2 className='font-bold text-lg line-clamp-3'>
              Hàng nghìn bà mẹ không thể sai được. Hãy xem vì sao bạn cũng cần một đĩa nhạc ngủ ngon.
            </h2>
            <div className='w-full flex justify-between items-center pt-3'>
              <span className='text-sm text-gray-400'>5 Bài giảng</span>
              <ArrowUpRight className='group-hover:text-secondary' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Recommend

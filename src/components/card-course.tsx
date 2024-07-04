import { ArrowUpRight } from 'lucide-react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

function CardCourse({ images }: { images: string | StaticImport }) {
  return (
    <div
      className='h-[200px] sm:h-[530px] rounded-xl shadow-md w-full overflow-hidden group
            transition-shadow duration-500 hover:shadow-xl cursor-pointer ease-in-out'
    >
      <Image
        src={images}
        alt='children'
        width={500}
        height={500}
        className='w-full h-[120px] sm:h-[350px] object-cover'
      />
      <div className='px-4 md:px-8 xl:px-11 py-3 sm:py-4 h-[80px] sm:h-[180px] flex flex-col justify-between'>
        <h3 className='text-gray-400 font-medium text-xs sm:text-base'>Tên khóa học</h3>
        <h2 className='font-bold text-sm sm:text-lg line-clamp-2 sm:line-clamp-3'>
          Hàng nghìn bà mẹ không thể sai được. Hãy xem vì sao bạn cũng cần một đĩa nhạc ngủ ngon.
        </h2>
        <div className='hidden sm:flex w-full  justify-between items-center pt-3'>
          <span className='text-sm text-gray-400'>5 Bài giảng</span>
          <ArrowUpRight className='transform duration-500 ease-in-out group-hover:text-secondary' />
        </div>
      </div>
    </div>
  )
}

export default CardCourse

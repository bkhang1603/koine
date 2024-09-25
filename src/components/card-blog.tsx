import { DataType } from '@/app/(public)/knowledge/[id]/page'
import images from '@/assets/images'
import { Ellipsis } from 'lucide-react'
import Image from 'next/image'

function CardBlog({ data }: { data: DataType }) {
  const postedDate = new Date(data?.date!)
  const currentDate = new Date()
  const differenceInTime = currentDate.getTime() - postedDate.getTime()
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24))

  let displayText = ''
  if (differenceInDays === 0) {
    displayText = 'Đã đăng hôm nay'
  } else if (differenceInDays === 1) {
    displayText = 'Đã đăng 1 ngày trước'
  } else {
    displayText = `Đã đăng ${differenceInDays} ngày trước`
  }

  return (
    <article className='w-full py-7 px-6 cursor-pointer hover:bg-fourth/80 shadow-lg rounded-2xl transition duration-500 ease-in-out'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <Image src={images.avatar} alt='avatar' width={35} height={35} />
          <span className='font-semibold'>Koine Company</span>
        </div>

        <div className='flex items-center gap-4 text-secondary'>
          <Ellipsis />
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-between items-center gap-4 mt-3'>
        <div className='max-w-[800px] h-[150px] flex flex-col justify-between'>
          <h2
            className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
            text-transparent bg-clip-text text-2xl font-semibold line-clamp-1'
          >
            {data?.title}
          </h2>
          <h3 className='line-clamp-2'>{data?.description}</h3>
          <span className='font-medium text-sm'>
            {/* {new Date(data.date).toLocaleDateString('vi-VN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} */}
            {displayText}
          </span>
        </div>
        <Image
          src={data?.image!}
          alt='blog'
          width={500}
          height={500}
          className='w-full md:w-[320px] h-[180px] object-cover rounded-xl'
        />
      </div>
    </article>
  )
}

export default CardBlog

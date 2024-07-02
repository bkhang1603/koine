import images from '@/assets/images'
import { Bookmark, Ellipsis } from 'lucide-react'
import Image from 'next/image'

function CardBlog() {
  return (
    <article className='w-full py-7 px-6 cursor-pointer hover:bg-fourth/80 shadow-lg rounded-2xl transition duration-500 ease-in-out'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <Image src={images.avatar} alt='avatar' width={35} height={35} />
          <span className='font-semibold'>Koine Company</span>
        </div>

        <div className='flex items-center gap-4 text-secondary'>
          <Bookmark />
          <Ellipsis />
        </div>
      </div>

      <div className='flex justify-between items-center mt-3'>
        <div className='max-w-[800px] h-[150px] flex flex-col justify-between'>
          <h2
            className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
            text-transparent bg-clip-text text-2xl font-semibold line-clamp-1'
          >
            Một số vấn đề cần được giải quyết ngay lập tức kể từ bây giờ
          </h2>
          <h3 className='line-clamp-2'>
            Bài viết này đơn giản là nơi để mình lưu lại những kinh nghiệm mà mình đã làm việc với mọi thứ như thế nào
            cũng như là nêu chia sẻ của mình về những vấn đề
          </h3>
          <span className='font-medium text-sm'>1 tuần trước</span>
        </div>
        <Image
          src={images.children}
          alt='blog'
          width={500}
          height={500}
          className='w-[320px] h-[180px] object-cover rounded-xl'
        />
      </div>
    </article>
  )
}

export default CardBlog

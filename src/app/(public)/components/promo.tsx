import icons from '@/assets/icons'
import images from '@/assets/images'
import configRoute from '@/config/route'
import { CircleArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function Promo() {
  return (
    <section className='bg-fourth py-10 sm:py-24'>
      <div className='container grid grid-cols-1 lg:grid-cols-2 gap-4 relative'>
        <Image
          src={images.product}
          alt='product'
          width={500}
          height={500}
          priority
          className='w-full max-h-[500px] object-cover rounded-[20px]'
        />

        <div className='flex items-center justify-between flex-col py-10 xl:py-16 gap-y-6'>
          <div className='text-center'>
            <h3 className='text-base sm:text-lg font-semibold text-gray-600'>Sản phẩm của Koine</h3>
            <h2
              className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
            text-transparent bg-clip-text text-2xl md:text-3xl lg:text-4xl font-bold mt-2 sm:mt-4 md:mt-6'
            >
              Hộp quà trưởng thành
            </h2>
          </div>

          <p
            className='line-clamp-5 max-w-[500px] text-center
          font-medium text-xs sm:text-base md:text-lg text-gray-700'
          >
            Đi đôi với các khoá học thiết thực, Koine chúng tôi còn đem đến cho các em bộ sản phẩm cần thiết phù hợp với
            từng nhu cầu của cá nhân mỗi bé, nhằm hỗ trợ quá trình học hiệu quả và chính xác hơn.
          </p>

          <Link
            href={configRoute.register}
            className='w-full p-4 flex items-center justify-center gap-2 text-secondary hover:text-secondary/80'
          >
            <span className='font-semibold text-base sm:text-xl'>Mua hàng</span>
            <CircleArrowRight className='w-5 h-5 sm:h-6 sm:w-6' />
          </Link>
        </div>

        <Image
          src={icons.pinkStars}
          alt='pink stars'
          width={200}
          height={200}
          className='hidden lg:block absolute left-0 bottom-0
          translate-x-[-50%] translate-y-[50%] h-52 w-52'
        />
      </div>
    </section>
  )
}

export default Promo

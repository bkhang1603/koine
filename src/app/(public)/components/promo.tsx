import icons from '@/assets/icons'
import images from '@/assets/images'
import { Button } from '@/components/ui/button'
import configRoute from '@/config/route'
import { CircleArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function Promo() {
  return (
    <section className='bg-fourth py-10 sm:py-24'>
      <div className='container grid grid-cols-1 lg:grid-cols-2 gap-4 relative'>
        <div className='flex justify-center items-center'>
          <Image
            src={images.product}
            alt='product'
            width={500}
            height={500}
            priority
            className='w-full max-h-[500px] object-cover rounded-[20px]'
          />
        </div>

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
            href={configRoute.product}
            // className='w-full p-4 flex items-center justify-center gap-2 text-secondary hover:text-secondary/80'
          >
            <Button variant={'secondary'} className='w-60 flex justify-center items-center gap-2 mt-6'>
              <span className='text-base sm:text-lg'>Mua hàng</span>
              <CircleArrowRight className='w-4 h-4 sm:h-5 sm:w-5' />
            </Button>
          </Link>
        </div>

        <Image
          src={icons.pinkStars}
          alt='pink stars'
          width={200}
          height={200}
          className='hidden lg:block absolute left-12 bottom-4 translate-x-[-50%] translate-y-[50%] h-32 w-auto'
        />
      </div>
    </section>
  )
}

export default Promo

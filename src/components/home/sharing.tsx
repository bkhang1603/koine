import icons from '@/assets/icons'
import images from '@/assets/images'
import configRoute from '@/config/route'
import { CircleArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function Sharing() {
  return (
    <section className='relative py-24'>
      <div className='container grid grid-cols-2 gap-4 relative'>
        <Image
          src={images.sharing}
          alt='sharing'
          width={1000}
          height={1000}
          className='w-full object-cover rounded-[20px]'
        />

        <div className='flex items-center justify-between flex-col'>
          <div className='text-center'>
            <h3 className='text-lg font-semibold'>Chia sẻ của chuyên gia</h3>
            <h2
              className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
            inline-block text-transparent bg-clip-text text-4xl font-bold h-11 mt-6'
            >
              Các buổi tư vấn miễn phí
            </h2>
          </div>

          <p className='line-clamp-4 max-w-[450px] text-center font-medium mb-6'>
            Nguyên nhân chính của bệnh là do sự bận rộn với đời sống hằng ngày, nếp sống càng tiện nghi thì họ lại càng
            hết sức lao tâm lao lực để đạt đến cái tiện nghi hơn. Nguyên nhân chính của bệnh là do sự bận rộn với đời
            sống hằng ngày, nếp sống càng tiện nghi thì họ lại càng hết sức lao tâm lao lực để đạt đến cái tiện nghi.
          </p>

          <Link
            href={configRoute.home}
            className='w-full p-4 flex items-center justify-end gap-2 text-secondary hover:text-secondary/80'
          >
            <span className='font-semibold text-xl'>Đăng ký</span>
            <CircleArrowRight />
          </Link>
        </div>

        <Image
          src={icons.pinkStars}
          alt='pink stars'
          width={200}
          height={200}
          className='absolute left-0 bottom-0 translate-x-[-50%] translate-y-[50%]'
        />
      </div>

      <Image
        src={images.sharingBackground}
        alt='koine'
        width={2000}
        height={2000}
        className='w-[60vw] absolute right-0 top-0 -z-10'
      />
    </section>
  )
}

export default Sharing

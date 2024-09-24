import icons from '@/assets/icons'
import images from '@/assets/images'
import { Button } from '@/components/ui/button'
import configRoute from '@/config/route'
import { cn } from '@/lib/utils'
import { CircleArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const sharingData = [
  {
    id: 1,
    image: images.teamVy,
    name: 'Nguyễn Phương',
    content: 'Tôi đã học được rất nhiều điều mới mẻ, những kiến thức mà trước đây tôi chưa từng biết.'
  },
  {
    id: 2,
    image: images.teamHuyen,
    name: 'Minh Hằng',
    content: 'Trải nghiệm cùng với Koine thật sự tuyệt vời. Tôi rất hài lòng với khóa học này.',
    class: 'hidden sm:flex'
  },
  {
    id: 3,
    image: images.teamDao,
    name: 'Mai Anh',
    content: 'Đây là một khóa học rất tuyệt vời, tôi chưa từng thấy khóa học nào tốt như vậy trước đây.',
    class: 'hidden lg:flex'
  },
  {
    id: 4,
    image: images.teamKhoa,
    name: 'Ngọc Hằng',
    content: 'Đây là lần đầu tiên tôi thấy có một khóa học phù hợp với bé nhỏ của tôi như vậy.',
    class: 'hidden xl:flex'
  }
]

function Sharing() {
  return (
    <section className='bg-fifth'>
      <div className='container text-center py-20'>
        <h3 className='text-gray-600 font-medium'>Nhận xét của người dùng</h3>

        <h2
          className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
          text-transparent bg-clip-text text-2xl md:text-3xl lg:text-5xl lg:h-14 font-bold mt-4'
        >
          Chia sẻ sau khóa học
        </h2>

        <p className='text-gray-700'>Vùng đất kỉ niệm của Koine</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-10 gap-10'>
          {sharingData.map((item) => (
            <article
              key={item.id}
              className={cn(
                'bg-white w-60 sm:w-80 mx-auto flex justify-between items-center flex-col p-8 rounded-full relative',
                item.class
              )}
            >
              <Image
                src={icons.quote}
                alt='koine icon'
                width={35}
                height={35}
                quality={100}
                className='absolute top-5 left-5 w-9 h-auto'
              />

              <Image
                src={item.image}
                alt='koine image'
                width={1000}
                height={1000}
                priority
                className='rounded-full w-44 h-44 sm:w-60 sm:h-60 object-cover'
              />
              <div className='pt-6'>
                <h3>{item.name}</h3>
                <p className='pb-6 pt-2 px-2 text-sm text-gray-500'>{item.content}</p>
              </div>

              <Image
                src={icons.quote}
                alt='koine icon'
                width={35}
                height={35}
                quality={100}
                className='absolute bottom-5 right-5 rotate-180 w-9 h-auto'
              />
            </article>
          ))}
        </div>
      </div>

      <div className='container grid grid-cols-1 xl:grid-cols-5 mt-28'>
        <div className='xl:col-span-2'>
          <h2
            className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
            text-transparent bg-clip-text text-3xl lg:text-5xl lg:leading-16 font-bold'
          >
            Tham gia cùng Koine
          </h2>
          <p className='text-gray-700 mt-6 text-sm md:text-base'>
            Cùng Koine, trẻ sẽ khám phá những kiến thức quý giá về cơ thể, cảm xúc và mối quan hệ, giúp em phát triển
            toàn diện và tự tin hơn. Hãy sẵn sàng để mở ra những cánh cửa mới và xây dựng nền tảng vững chắc cho tương
            lai của bé nhé!
          </p>

          <Button
            asChild
            variant={'secondary'}
            className='gap-2 lg:text-xl mt-10 xl:mt-16 lg:h-12 lg:w-48 lg:rounded-xl'
          >
            <Link href={configRoute.course}>
              Tham gia <CircleArrowRight className='h-5 w-5 lg:w-6 lg:h-6' />
            </Link>
          </Button>
        </div>

        <div className='xl:col-span-3'>
          <Image src={images.sharing} alt='koine image' width={1000} height={1000} priority />
        </div>
      </div>
    </section>
  )
}

export default Sharing

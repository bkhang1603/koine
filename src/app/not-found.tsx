import images from '@/assets/images'
import { Button } from '@/components/ui/button'
import configRoute from '@/config/route'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function NotFoundPage() {
  return (
    <section className='h-screen flex flex-col justify-between relative'>
      <div className='container pt-20'>
        <Image src={images.notFound404} alt='404' width={300} height={300} quality={100} />

        <h1 className='text-3xl font-bold mt-6'>Trang không tồn tại</h1>
        <div className='mt-4 text-gray-700'>
          <p className='text-base'>Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <p className='text-base'>Xin hãy quay trở lại trang chủ.</p>
        </div>

        <Button asChild variant={'customOutline'} className='mt-10 h-12 w-52 text-base gap-2'>
          <Link href={configRoute.home}>
            Quay về trang chủ <ArrowUpRight className='w-5 h-5' />
          </Link>
        </Button>
      </div>

      <Image src={images.loginVector} alt='Koine' width={1800} height={1800} className='w-[100vw] min-h-[200px] z-50' />

      <div className='absolute bottom-0 right-32'>
        <Image src={images.ghost} alt='Koine' width={600} height={600} className='' />
      </div>
    </section>
  )
}

export default NotFoundPage

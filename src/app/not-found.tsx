import images from '@/assets/images'
import { Button } from '@/components/ui/button'
import configRoute from '@/config/route'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function NotFoundPage() {
  return (
    <section className='h-screen flex flex-col justify-between relative'>
      <div className='container pt-36'>
        <Image src={images.notFound404} alt='404' width={300} height={300} quality={100} />

        <h1 className='text-4xl font-bold mt-16'>Trang không tồn tại</h1>
        <div className='mt-6 text-gray-700'>
          <p className='text-lg'>Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <p className='text-lg'>Xin hãy quay trở lại trang chủ.</p>
        </div>

        <Button asChild variant={'customOutline'} className='mt-10 h-14 w-64 text-xl gap-2'>
          <Link href={configRoute.home}>
            Quay về trang chủ <ArrowUpRight />
          </Link>
        </Button>
      </div>

      <Image src={images.loginVector} alt='Koine' width={1800} height={1800} className='w-[100vw] min-h-[200px] z-50' />

      <div className='absolute bottom-0 right-72'>
        <Image src={images.ghost} alt='Koine' width={800} height={800} className='' />
      </div>
    </section>
  )
}

export default NotFoundPage

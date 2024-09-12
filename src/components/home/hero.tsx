import images from '@/assets/images'
import { Button } from '@/components/ui/button'
import configRoute from '@/config/route'
import Image from 'next/image'
import Link from 'next/link'

function Hero() {
  return (
    <section className='container pt-[60px] md:pt-[100px] grid grid-cols-1 lg:grid-cols-2 h-[100vh]'>
      <div className='relative mr-0 lg:mr-10 flex justify-center items-center'>
        <Image
          src={images.heroBackground}
          alt='Hero background'
          width={1920}
          height={1080}
          className='absolute top-10 left-0 object-contain -z-10'
        />
        <div className='w-full flex items-center flex-col'>
          <Image src={images.cloud} alt='Cloud' width={500} height={500} className='md:max-w-[420px]' />

          <h1 className='mt-6 max-w-[420px] text-lg font-medium text-center break-words text-black/65'>
            “Vun đắp tâm hồn, thấu hiểu cơ thể.
            <br /> Một nền tảng cho một cuộc sống hạnh phúc.”
          </h1>

          <Button
            asChild
            className='mt-12 h-14 w-full md:w-[420px] bg-secondary hover:bg-secondary/90 text-lg rounded-2xl'
          >
            <Link href={configRoute.course}>Trải nghiệm cùng Koine</Link>
          </Button>

          <Button asChild className='mt-4 h-14 w-full md:w-[420px] bg-third hover:bg-third/90 text-lg rounded-2xl'>
            <Link href={configRoute.course}>Đăng ký các khóa học ngay</Link>
          </Button>
        </div>
      </div>
      <div className='w-[calc(50vw-4px)] hidden lg:block'>
        <Image
          src={images.heroImage}
          alt='Hero image'
          width={1920}
          height={1080}
          className='max-h-[calc(100vh-100px)]'
        />
      </div>
    </section>
  )
}

export default Hero

import images from '@/assets/images'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

function Hero() {
  return (
    <section className='container pt-[100px] grid grid-cols-2 h-[100vh]'>
      <div className='relative mr-10 mt-32'>
        <Image
          src={images.heroBackground}
          alt='Hero background'
          width={1920}
          height={1080}
          layout='responsive'
          className='absolute top-0 left-0 object-contain -z-10'
        />
        <div className='w-full mt-10 flex items-center flex-col'>
          <Image
            src={images.cloud}
            alt='Cloud'
            width={500}
            height={500}
            layout='responsive'
            className='max-w-[420px]'
          />

          <h1 className='mt-6 max-w-[420px] text-lg text-center break-words'>
            “Vun đắp tâm hồn, thấu hiểu cơ thể.
            <br /> Một nền tảng cho một cuộc sống hạnh phúc.”
          </h1>

          <Button className='mt-12 h-14 w-[420px] bg-secondary hover:bg-secondary/90 text-lg rounded-2xl'>
            Trải nghiệm cùng Koine
          </Button>

          <Button className='mt-4 h-14 w-[420px] bg-third hover:bg-third/90 text-lg rounded-2xl'>
            Đăng ký các khóa học ngay
          </Button>
        </div>
      </div>
      <div className='w-[calc(50vw-4px)]'>
        <Image src={images.heroImage} alt='Hero image' width={1920} height={1080} layout='responsive' />
      </div>
    </section>
  )
}

export default Hero

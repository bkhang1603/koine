import images from '@/assets/images'
import CardCategory from '@/components/card-category'
import Information from '@/app/(public)/components/information'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

function CoursePage() {
  return (
    <main>
      <figure className='py-24 relative'>
        <Image src={images.knowledgeBackground} alt='Koine' width={2000} height={2000} className='hidden md:block' />

        <h1
          className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
        text-transparent bg-clip-text text-xl md:text-3xl lg:text-4xl font-bold 
        max-w-[600px] lg:max-w-[900px] text-center
        absolute inset-0 flex items-center justify-center mx-auto'
        >
          “Vun đắp tâm hồn, thấu hiểu cơ thể. Một nền tảng cho một cuộc sống hạnh phúc”
        </h1>
      </figure>

      <section className='grid grid-cols-2 xl:grid-cols-3 gap-2'>
        <CardCategory title='Khóa học chung' images={images.course} />
        <CardCategory title='Cẩm nang bé gái' images={images.course2} />
        <CardCategory title='Cảm xúc gia đình' images={images.course3} />
        <CardCategory title='Tâm lý' images={images.course4} />
        <CardCategory title='Cẩm nang bé trai' images={images.course5} />
        <CardCategory title='Xã hội' images={images.course6} />
      </section>

      <section className='flex justify-center items-center mt-20 md:mt-40 relative'>
        <Input
          placeholder='Tìm kiếm khóa học'
          className='w-full max-w-[600px] px-5 md:h-14 md:text-lg focus-visible:ring-0 border-2 border-primary rounded-xl'
        />

        <Image
          src={images.searchImage}
          alt='Search'
          width={500}
          height={500}
          className='hidden sm:block absolute top-0 transform -translate-y-14 max-w-[500px]'
        />
      </section>

      <section className='flex flex-col justify-center items-center mt-20 gap-4'>
        <p className='text-2xl font-medium'>Hiện tất cả các khóa học đang được bảo trì</p>
        <Image src={images.maintenance} alt='' width={600} height={600} />
      </section>

      <Information />
    </main>
  )
}

export default CoursePage

import images from '@/assets/images'
import Image from 'next/image'

function CourseHero() {
  return (
    <section className='py-24 relative'>
      <Image src={images.knowledgeBackground} alt='Koine' width={2000} height={2000} className='hidden md:block' />

      <h1
        className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
  text-transparent bg-clip-text text-xl md:text-3xl lg:text-4xl font-bold 
  max-w-[600px] lg:max-w-[900px] text-center
  absolute inset-0 flex items-center justify-center mx-auto'
      >
        “Vun đắp tâm hồn, thấu hiểu cơ thể. Một nền tảng cho một cuộc sống hạnh phúc”
      </h1>
    </section>
  )
}

export default CourseHero

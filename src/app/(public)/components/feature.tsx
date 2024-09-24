import icons from '@/assets/icons'
import Image from 'next/image'

function Feature() {
  return (
    <section className='bg-fourth'>
      <div className='container flex justify-center items-center flex-col relative pt-28 pb-24'>
        <h2
          className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
          text-transparent bg-clip-text text-3xl md:text-4xl lg:text-5xl font-bold text-center lg:leading-14'
        >
          Sứ mệnh của Koine
        </h2>
        <p className='mt-8 text-center text-sm md:text-lg text-gray-600'>
          Chúng tôi - Koine sẽ cùng đồng hành với các bạn nhỏ sắp và đang trong độ tuổi dậy thì, giúp các em tự tin khám
          phá cũng như phát triển tiềm năng bản thân. Với sự thấu hiểu và hỗ trợ từ Koine, các bậc phụ huynh sẽ có cơ
          hội cùng con xây dựng nền tảng vững chắc về tâm lý và kỹ năng trong giai đoạn quan trọng này.
        </p>
        <Image
          src={icons.pinkStar}
          alt='pink star'
          width={50}
          height={50}
          className='hidden md:block absolute top-20 left-0 ml-32 h-12 w-12'
        />
        <Image
          src={icons.blueStar}
          alt='Blue star'
          width={40}
          height={40}
          className='absolute bottom-10 right-0 mr-10 h-10 w-10'
        />
        <Image
          src={icons.blueStar}
          alt='Blue star'
          width={100}
          height={100}
          className='absolute -bottom-10 right-0 mr-24 h-24 w-24'
        />
      </div>
    </section>
  )
}

export default Feature

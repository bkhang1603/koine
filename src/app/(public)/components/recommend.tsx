import icons from '@/assets/icons'
import images from '@/assets/images'
import Image from 'next/image'

function Recommend() {
  return (
    <section className='container flex items-center justify-center flex-col py-16 sm:py-28 relative'>
      <h3 className='font-medium sm:text-lg'>Các khóa học của chúng tôi</h3>
      <h2
        className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
        text-transparent bg-clip-text text-2xl md:text-3xl lg:text-5xl lg:h-14 font-bold mt-5 text-center'
      >
        Những khóa học hàng đầu
      </h2>
      <Image
        src={icons.pinkStars}
        alt='pink-stars'
        width={200}
        height={200}
        className='hidden sm:block absolute top-20 left-14 mt-32'
      />

      <section className='flex flex-col justify-center items-center mt-20 gap-4'>
        <p className='text-2xl font-medium'>Hiện tất cả các khóa học đang được bảo trì</p>
        <Image src={images.maintenance} alt='' width={600} height={600} />
      </section>
    </section>
  )
}

export default Recommend

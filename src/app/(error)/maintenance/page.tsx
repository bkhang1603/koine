import images from '@/assets/images'
import Image from 'next/image'

function Maintenance() {
  return (
    <section className='bg-white dark:bg-gray-900 h-screen flex justify-center items-center'>
      <div className='py-8 px-4 mx-auto max-w-screen text-center lg:py-16 lg:px-12'>
        <Image
          src={images.maintenance}
          alt='Maintenance image'
          width={800}
          height={800}
          className='mx-auto h-80 w-auto'
        />
        <h1 className='mb-4 mt-10 text-3xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-4xl xl:text-5xl dark:text-white'>
          KOINE hiện đang được bảo trì và nâng cấp
        </h1>
        <p className='font-medium text-gray-600 md:text-lg xl:text-xl dark:text-gray-500'>
          Chúng tôi sẽ sớm trở lại. Xin lỗi vì sự bất tiện này.
        </p>
      </div>
    </section>
  )
}

export default Maintenance

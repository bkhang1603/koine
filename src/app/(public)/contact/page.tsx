import icons from '@/assets/icons'
import images from '@/assets/images'
import ContactForm from '@/components/form/contact-form'

import Image from 'next/image'

function ContactPage() {
  return (
    <main className='py-20'>
      <h1
        className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE] text-center
        text-transparent bg-clip-text text-2xl md:text-4xl lg:text-5xl lg:h-14 font-bold mt-10'
      >
        Liên hệ với Koine ngay nào
      </h1>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8 mt-28 relative'>
        <Image src={images.contactImage} width={1000} height={1000} alt='Koine' />

        <Image
          src={icons.purpleCurly}
          width={150}
          height={150}
          alt='Koine'
          className='absolute top-10 -left-20 rotate-180 transform translate-x-1/2 -translate-y-1/2'
        />

        <div className='flex justify-center items-center flex-col space-y-14 relative'>
          <h2 className='font-semibold text-xl md:text-3xl text-secondary text-center'>Mẫu điền thông tin của Koine</h2>

          <ContactForm />

          <Image
            src={icons.blueCurly}
            width={100}
            height={100}
            alt='Koine'
            className='hidden 2xl:block absolute -bottom-20 -right-10 transform translate-x-1/2 -translate-y-1/2'
          />
        </div>
      </div>
    </main>
  )
}

export default ContactPage

'use client'

import icons from '@/assets/icons'
import images from '@/assets/images'
import ContactForm from '@/components/form/contact-form'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'

const contactInfo = [
  {
    icon: <Phone className='w-5 h-5' />,
    title: 'Điện thoại',
    content: '(+84) 123 456 789',
    description: 'Thứ 2 - Thứ 6, 9:00 - 18:00'
  },
  {
    icon: <Mail className='w-5 h-5' />,
    title: 'Email',
    content: 'contact@koine.com',
    description: 'Liên hệ với chúng tôi bất cứ lúc nào'
  },
  {
    icon: <MapPin className='w-5 h-5' />,
    title: 'Địa chỉ',
    content: 'Thảo Cầm Viên Sài Gòn',
    description: '2B Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1'
  }
]

function ContactPage() {
  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative py-20 overflow-hidden'>
        <div className='container'>
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
            {/* Content */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className='text-4xl md:text-5xl font-bold mb-6'>
                Hãy <span className='text-primary'>Kết Nối</span> <br />
                Với Chúng Tôi
              </h1>
              <p className='text-gray-600 text-lg mb-12 max-w-lg'>
                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy chia sẻ với chúng tôi câu chuyện của bạn.
              </p>

              {/* Contact Info */}
              <div className='space-y-8'>
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className='flex items-start gap-4'
                  >
                    <div
                      className='flex-shrink-0 w-12 h-12 rounded-xl bg-primary/5 
                      flex items-center justify-center text-primary'
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900 mb-1'>{item.title}</h3>
                      <p className='text-primary font-medium mb-1'>{item.content}</p>
                      <p className='text-sm text-gray-500'>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className='relative'
            >
              <div
                className='bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                border border-gray-100'
              >
                <div className='mb-8'>
                  <h2 className='text-2xl font-bold mb-2'>Gửi tin nhắn cho chúng tôi</h2>
                  <p className='text-gray-600'>Chúng tôi sẽ phản hồi trong thời gian sớm nhất</p>
                </div>

                <ContactForm />
              </div>

              {/* Decorative Elements */}
              <Image
                src={icons.purpleCurly}
                width={150}
                height={150}
                alt='Decoration'
                className='absolute -top-12 -left-12 -z-10 opacity-50'
              />
              <Image
                src={icons.blueCurly}
                width={100}
                height={100}
                alt='Decoration'
                className='absolute -bottom-8 -right-8 -z-10 opacity-50'
              />
            </motion.div>
          </div>
        </div>

        {/* Background Image */}
        <div className='absolute top-0 right-0 w-1/3 h-full -z-10 opacity-10'>
          <Image src={images.contactImage} alt='Contact' fill className='object-cover' />
        </div>
      </section>

      {/* Map Section */}
      <section className='py-20 bg-gray-50'>
        <div className='container'>
          <div className='max-w-3xl mx-auto text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>Vị Trí Của Chúng Tôi</h2>
            <p className='text-gray-600'>Ghé thăm văn phòng của chúng tôi để trò chuyện trực tiếp</p>
          </div>

          <div className='aspect-[21/9] rounded-[2rem] overflow-hidden'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4547299845774!2d106.70298937580705!3d10.776732189377384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc7%3A0x4db964d76bf6e18e!2zVGjhuqNvIEPhuqduIFZpw6puIFPDoGkgR8Oybg!5e0!3m2!1svi!2s!4v1708613436599!5m2!1svi!2s'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage

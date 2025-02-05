import icons from '@/assets/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const serviceData = [
  {
    icon: icons.user,
    title: 'Hướng dẫn 1-1',
    description:
      'Koine tạo cơ hội cho học viên kết nối trực tiếp với các chuyên gia hàng đầu trong lĩnh vực giáo dục giới tính xuyên suốt khóa học.'
  },
  {
    icon: icons.clock,
    title: 'Sẵn sàng 24/7',
    description:
      'Với hệ thống học trực tuyến hoạt động 24/7, đội ngũ chuyên gia sẵn sàng hỗ trợ giải đáp các thắc mắc đồng hành cùng học viên.'
  },
  {
    icon: icons.calendar,
    title: 'Nhận tư vấn mọi lúc',
    description:
      'Mỗi học viên tại Koine đều có trải nghiệm học tập được cá nhân hóa, phù hợp với độ tuổi, sở thích và nhu cầu riêng. '
  },
  {
    icon: icons.dollar,
    title: 'Giá cả phải chăng',
    description: 'Tất cả chương trình giáo dục đặc biệt của chúng tôi các chuyên gia có bằng cấp về giáo dục đặc biệt'
  }
]

function Service() {
  return (
    <section className='bg-fifth'>
      <div className='container pt-20 pb-28 flex flex-col justify-center items-center'>
        <h3 className='font-semibold sm:text-lg'>Tại sao chọn chúng tôi</h3>
        <h2
          className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
          text-transparent bg-clip-text text-2xl md:text-3xl lg:text-5xl lg:h-14 font-bold mt-5 text-center'
        >
          Các khóa học tạo nên sự khác biệt
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16'>
          {serviceData.map((service, index) => (
            <Card key={index} className='transition-shadow duration-300 hover:shadow-xl cursor-pointer'>
              <CardHeader className='pt-4 pb-2 px-4 sm:pt-6 sm:pb-4 sm:px-6'>
                <Image src={service.icon} alt='user' width={70} height={70} className='w-10 h-10 sm:w-16 sm:h-16' />
              </CardHeader>
              <CardContent className='pb-4 pt-2 px-4 sm:pb-6 sm:pt-4 sm:px-6'>
                <CardTitle className='text-sm sm:text-base'>{service.title}</CardTitle>
                <CardDescription className='mt-2 text-xs sm:text-base line-clamp-4'>
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}

          {/* <Card className='transition-shadow duration-300 hover:shadow-xl cursor-pointer'>
            <CardHeader className='pt-4 pb-2 px-4 sm:pt-6 sm:pb-4 sm:px-6'>
              <Image src={icons.user} alt='user' width={70} height={70} className='w-10 h-10 sm:w-16 sm:h-16' />
            </CardHeader>
            <CardContent className='pb-4 pt-2 px-4 sm:pb-6 sm:pt-4 sm:px-6'>
              <CardTitle className='text-sm sm:text-base'>Hướng dẫn 1-1</CardTitle>
              <CardDescription className='mt-2 text-xs sm:text-base line-clamp-4'>
                Tất cả chương trình giáo dục đặc biệt của chúng tôi các chuyên gia có bằng cấp về giáo dục đặc biệt
              </CardDescription>
            </CardContent>
          </Card>

          <Card className='transition-shadow duration-300 hover:shadow-xl cursor-pointer'>
            <CardHeader className='pt-4 pb-2 px-4 sm:pt-6 sm:pb-4 sm:px-6'>
              <Image src={icons.clock} alt='clock' width={70} height={70} className='w-10 h-10 sm:w-16 sm:h-16' />
            </CardHeader>
            <CardContent className='pb-4 pt-2 px-4 sm:pb-6 sm:pt-4 sm:px-6'>
              <CardTitle className='text-sm sm:text-base'>Sẵn sàng 24/7</CardTitle>
              <CardDescription className='mt-2 text-xs sm:text-base line-clamp-4'>
                Tất cả chương trình giáo dục đặc biệt của chúng tôi các chuyên gia có bằng cấp về giáo dục đặc biệt
              </CardDescription>
            </CardContent>
          </Card>

          <Card className='transition-shadow duration-300 hover:shadow-xl cursor-pointer'>
            <CardHeader className='pt-4 pb-2 px-4 sm:pt-6 sm:pb-4 sm:px-6'>
              <Image src={icons.calendar} alt='calendar' width={70} height={70} className='w-10 h-10 sm:w-16 sm:h-16' />
            </CardHeader>
            <CardContent className='pb-4 pt-2 px-4 sm:pb-6 sm:pt-4 sm:px-6'>
              <CardTitle className='text-sm sm:text-base'>Nhận tư vấn mọi lúc</CardTitle>
              <CardDescription className='mt-2 text-xs sm:text-base line-clamp-4'>
                Tất cả chương trình giáo dục đặc biệt của chúng tôi các chuyên gia có bằng cấp về giáo dục đặc biệt
              </CardDescription>
            </CardContent>
          </Card>

          <Card className='transition-shadow duration-300 hover:shadow-xl cursor-pointer'>
            <CardHeader className='pt-4 pb-2 px-4 sm:pt-6 sm:pb-4 sm:px-6'>
              <Image src={icons.dollar} alt='dollar' width={70} height={70} className='w-10 h-10 sm:w-16 sm:h-16' />
            </CardHeader>
            <CardContent className='pb-4 pt-2 px-4 sm:pb-6 sm:pt-4 sm:px-6'>
              <CardTitle className='text-sm sm:text-base'>Giá cả phải chăng</CardTitle>
              <CardDescription className='mt-2 text-xs sm:text-base line-clamp-4'>
                Tất cả chương trình giáo dục đặc biệt của chúng tôi các chuyên gia có bằng cấp về giáo dục đặc biệt
              </CardDescription>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </section>
  )
}

export default Service

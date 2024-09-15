'use client'

import images from '@/assets/images'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'

const teamMembers = [
  {
    name: 'Le Bao Khang',
    role: 'Co-Founder / CEO',
    avatar: images.teamKhang
  },
  {
    name: 'Pham Tuong Vy',
    role: 'Co-Founder / CFO',
    avatar: images.teamVy
  },
  {
    name: 'Le Van Dao',
    role: 'Developer',
    avatar: images.teamDao
  },
  {
    name: 'Vu Dan Thuy Huyen',
    role: 'Designer',
    avatar: images.teamHuyen
  },
  {
    name: 'Do Duong Dang Khoa',
    role: 'Developer',
    avatar: images.teamKhoa
  },
  {
    name: 'Pham Thi Van Anh',
    role: 'Designer',
    avatar: images.teamVanh
  },
  {
    name: 'Le Bao Khang',
    role: 'Co-Founder / CEO',
    avatar: images.teamKhang
  },
  {
    name: 'Pham Tuong Vy',
    role: 'Co-Founder / CFO',
    avatar: images.teamVy
  },
  {
    name: 'Le Van Dao',
    role: 'Developer',
    avatar: images.teamDao
  },
  {
    name: 'Vu Dan Thuy Huyen',
    role: 'Designer',
    avatar: images.teamHuyen
  },
  {
    name: 'Do Duong Dang Khoa',
    role: 'Developer',
    avatar: images.teamKhoa
  },
  {
    name: 'Pham Thi Van Anh',
    role: 'Designer',
    avatar: images.teamVanh
  }
]

function Team() {
  return (
    <section className='bg-fifth py-32 mt-32'>
      <div className='container text-center mb-12'>
        <h2
          className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
          text-transparent bg-clip-text text-xl md:text-3xl
          lg:text-5xl font-bold text-center lg:leading-16'
        >
          Thành viên của Koine
        </h2>
        <p className='text-xs sm:text-sm lg:text-base text-gray-500 mt-4'>
          Đây là những người sáng lập và phát triển sản phẩm của Koine <br />
          Một đội ngũ trẻ trung, năng động và sáng tạo
        </p>
      </div>

      <Carousel
        className='w-full container'
        opts={{ loop: true }}
        plugins={[AutoScroll({ stopOnInteraction: false, speed: 1 })]}
      >
        <CarouselContent className='-ml-1'>
          {teamMembers.map((member, index) => (
            <CarouselItem key={index} className='pl-1 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/7'>
              <div className='p-1'>
                <div
                  className='flex items-center justify-center p-0 rounded-t-[300px]
                rounded-b-2xl overflow-hidden h-72 relative cursor-pointer'
                >
                  <Image
                    src={member.avatar}
                    alt='avatar'
                    width={200}
                    height={200}
                    className='w-full h-full object-cover'
                  />

                  <div
                    className='absolute inset-0 bg-gradient-to-t
                  from-black hover:opacity-100 to-transparent opacity-80 transition-opacity duration-300'
                  >
                    <div className='flex flex-col items-start justify-end h-full text-white text-start px-2 py-3'>
                      <h3 className='text-sm font-medium'>{member.name}</h3>
                      <p className='text-xs text-gray-200'>{member.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default Team

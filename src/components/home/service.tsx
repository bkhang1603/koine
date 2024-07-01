import icons from '@/assets/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

function Service() {
  return (
    <section className='bg-fifth'>
      <div className='container pt-20 pb-28 flex flex-col justify-center items-center'>
        <h3 className='font-semibold text-lg'>Tại sao chọn chúng tôi</h3>
        <h2
          className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
          inline-block text-transparent bg-clip-text text-5xl font-bold mt-5 h-14'
        >
          Các khóa học tạo nên sự khác biệt
        </h2>

        <div className='grid grid-cols-4 gap-4 mt-16'>
          <Card>
            <CardHeader>
              <Image src={icons.user} alt='user' width={70} height={70} />
            </CardHeader>
            <CardContent>
              <CardTitle>Hướng dẫn 1-1</CardTitle>
              <CardDescription className='mt-2'>
                Tất cả chương trình giáo dục đặc biệt của chúng tôi các chuyên gia có bằng cấp về giáo dục đặc biệt
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Image src={icons.clock} alt='clock' width={70} height={70} />
            </CardHeader>
            <CardContent>
              <CardTitle>Sẵn sàng 24/7</CardTitle>
              <CardDescription className='mt-2'>
                Tất cả chương trình giáo dục đặc biệt của chúng tôi các chuyên gia có bằng cấp về giáo dục đặc biệt
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Service

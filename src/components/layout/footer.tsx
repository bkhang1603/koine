import icons from '@/assets/icons'
import images from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import configRoute from '@/config/route'
import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <footer className='mt-20'>
      <Image src={images.footer} alt='footer' width={3000} height={3000} className='w-[calc(100vw-4px)]' />

      <section className='container'>
        <div className='grid grid-cols-4 gap-4 py-20'>
          <div>
            <h3 className='font-semibold text-xl'>Giới thiệu</h3>

            <ul className='space-y-3 mt-4'>
              <li>
                <Link href={configRoute.home}>Trang chủ</Link>
              </li>
              <li>
                <Link href={configRoute.course}>Khóa học</Link>
              </li>
              <li>
                <Link href={configRoute.knowledge}>Kiến thức</Link>
              </li>
              <li>
                <Link href={configRoute.about}>Tổng quan</Link>
              </li>
              <li>
                <Link href={configRoute.service}>Dịch vụ</Link>
              </li>
              <li>
                <Link href={configRoute.contact}>Liên hệ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-semibold text-xl'>Trợ giúp</h3>

            <ul className='space-y-3 mt-4 cursor-pointer'>
              <li>Hỏi & đáp</li>
              <li>Tin tức</li>
              <li>Báo tường</li>
            </ul>
          </div>

          <div>
            <h3 className='font-semibold text-xl'>Mạng xã hội</h3>

            <ul className='space-y-3 mt-4'>
              <li>
                <Link href={'https://www.facebook.com/'} className='flex items-center gap-2'>
                  <Image src={icons.facebook} alt='facebook' width={100} height={100} className='w-5 h-5' />
                  Facebook
                </Link>
              </li>
              <li>
                <Link href={'https://www.facebook.com/'} className='flex items-center gap-2'>
                  <Image src={icons.instagram} alt='instagram' width={100} height={100} className='w-5 h-5' />
                  Instagram
                </Link>
              </li>
              <li>
                <Link href={'https://www.facebook.com/'} className='flex items-center gap-2'>
                  <Image src={icons.x} alt='instagram' width={100} height={100} className='w-5 h-5' />
                  Twitter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-semibold text-xl'>Liên hệ</h3>

            <ul className='space-y-3 mt-4'>
              <li>Địa chỉ: 123 ABC</li>
              <li>Điện thoại: 123456789</li>
              <li>Email: koine@gmail.com</li>
            </ul>

            <div className='flex w-full items-center mt-10 gap-2'>
              <Input type='email' placeholder='Email' />
              <Button className='bg-secondary hover:bg-secondary/80'>Đăng ký</Button>
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center py-6 border-t border-t-secondary/40'>
          <span className='text-secondary/80 font-semibold'>© 2024 - Copyright belongs to Koine</span>
        </div>
      </section>
    </footer>
  )
}

export default Footer

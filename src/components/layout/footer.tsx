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

      <div className='bg-fourth'>
        <section className='container'>
          <div className='grid grid-cols-4 gap-4 py-20'>
            <div>
              <h3 className='font-semibold text-xl'>Giới thiệu</h3>

              <ul className='space-y-3 mt-4'>
                <li>
                  <Link className='hover:text-black/70' href={configRoute.home}>
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link className='hover:text-black/70' href={configRoute.course}>
                    Khóa học
                  </Link>
                </li>
                <li>
                  <Link className='hover:text-black/70' href={configRoute.knowledge}>
                    Kiến thức
                  </Link>
                </li>
                <li>
                  <Link className='hover:text-black/70' href={configRoute.about}>
                    Tổng quan
                  </Link>
                </li>
                <li>
                  <Link className='hover:text-black/70' href={configRoute.service}>
                    Dịch vụ
                  </Link>
                </li>
                <li>
                  <Link className='hover:text-black/70' href={configRoute.contact}>
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-semibold text-xl'>Trợ giúp</h3>

              <ul className='space-y-3 mt-4 cursor-pointer'>
                <li>
                  <span className='hover:text-black/70'>Hỏi & đáp</span>
                </li>
                <li>
                  <span className='hover:text-black/70'>Tin tức</span>
                </li>
                <li>
                  <span className='hover:text-black/70'>Báo tường</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-semibold text-xl'>Mạng xã hội</h3>

              <ul className='space-y-3 mt-4'>
                <li>
                  <Link href={'https://www.facebook.com/'} className='flex items-center gap-3 hover:text-black/70'>
                    <Image src={icons.facebook} alt='facebook' width={100} height={100} className='w-5 h-5' />
                    <span>Facebook</span>
                  </Link>
                </li>
                <li>
                  <Link href={'https://www.facebook.com/'} className='flex items-center gap-3 hover:text-black/70'>
                    <Image src={icons.instagram} alt='instagram' width={100} height={100} className='w-5 h-5' />
                    <span>Instagram</span>
                  </Link>
                </li>
                <li>
                  <Link href={'https://www.facebook.com/'} className='flex items-center gap-3 hover:text-black/70'>
                    <Image src={icons.x} alt='instagram' width={100} height={100} className='w-5 h-5' />
                    <span>Twitter</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-semibold text-xl'>Liên hệ</h3>

              <ul className='space-y-3 mt-4'>
                <li>
                  Địa chỉ: <span className='text-primary'>66 Nguyen Ngoc Phuong, p19, Binh Thanh</span>
                </li>
                <li>
                  <Link href={'https://zalo.me/0934600600'}>
                    Điện thoại: <span className='text-primary'>+84 934 600 600</span>
                  </Link>
                </li>
                <li>
                  <Link href={'https://mail.google.com'}>
                    Email: <span className='text-primary'>koine@gmail.com</span>
                  </Link>
                </li>
              </ul>

              <div className='flex w-full items-center mt-10 gap-2'>
                <Input
                  type='email'
                  placeholder='Email'
                  className='border-secondary placeholder:text-secondary/80 focus-visible:ring-0'
                />
                <Button className='bg-secondary hover:bg-secondary/80'>Đăng ký</Button>
              </div>
            </div>
          </div>

          <div className='flex justify-center items-center py-6 border-t border-t-secondary/40'>
            <span className='text-secondary/80 font-semibold'>© 2024 - Copyright belongs to Koine</span>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer

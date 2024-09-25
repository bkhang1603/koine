import icons from '@/assets/icons'
import images from '@/assets/images'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import configRoute from '@/config/route'
import Image from 'next/image'
import Link from 'next/link'

const footerLinks = [
  {
    title: 'Giới thiệu',
    links: [
      { name: 'Trang chủ', href: configRoute.home, icon: null },
      { name: 'Sản phẩm', href: configRoute.product, icon: null },
      { name: 'Khóa học', href: configRoute.course, icon: null },
      { name: 'Kiến thức', href: configRoute.knowledge, icon: null },
      { name: 'Tổng quan', href: configRoute.about, icon: null },
      { name: 'Liên hệ', href: configRoute.contact, icon: null }
    ]
  },
  {
    title: 'Trợ giúp',
    links: [
      { name: 'Hỏi & đáp', href: '#', icon: null },
      { name: 'Tin tức', href: '#', icon: null },
      { name: 'Báo tường', href: '#', icon: null }
    ]
  },
  {
    title: 'Mạng xã hội',
    links: [
      { name: 'Facebook', href: 'https://www.facebook.com/', icon: icons.facebook },
      { name: 'Instagram', href: 'https://www.instagram.com/', icon: icons.instagram },
      { name: 'Twitter', href: 'https://www.twitter.com/', icon: icons.x }
    ]
  }
]

function Footer() {
  return (
    <footer className='mt-10'>
      <Image src={images.footer} alt='footer' width={3000} height={3000} priority className='w-[100vw]' />

      <div className='bg-fourth'>
        <section className='container'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 py-20'>
            {footerLinks.map((footerLink, index) => (
              <div key={index}>
                <h3 className='font-semibold text-sm sm:text-xl'>{footerLink.title}</h3>

                <ul className='space-y-3 mt-4 text-xs sm:text-base'>
                  {footerLink.links.map((link, index) => (
                    <li key={index}>
                      {!link.icon && (
                        <Link className='hover:text-black/70' href={link.href}>
                          {link.name}
                        </Link>
                      )}
                      {link.icon && (
                        <Link href={link.href} className='flex items-center gap-3 hover:text-black/70'>
                          <Image src={link.icon} alt={link.name} width={100} height={100} className='w-5 h-5' />
                          <span>{link.name}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className='font-semibold text-sm sm:text-xl'>Liên hệ</h3>

              <ul className='space-y-3 mt-4 text-xs sm:text-base'>
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
            <span className='text-secondary/80 font-semibold text-xs sm:text-base'>
              © 2024 - Copyright belongs to Koine
            </span>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer

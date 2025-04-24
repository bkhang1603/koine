'use client'

import { Mail, Facebook, Youtube, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import images from '@/assets/images'
import icons from '@/assets/icons'
import configRoute from '@/config/route'

const footerLinks = {
  company: [
    { label: 'Về chúng tôi', href: '/about' },
    { label: 'Liên hệ', href: '/contact' },
    { label: 'Tuyển dụng', href: '/' },
    { label: 'Đối tác', href: '/' }
  ],
  support: [
    { label: 'FAQs', href: configRoute.help },
    { label: 'Chính sách bảo mật', href: configRoute.help },
    { label: 'Điều khoản sử dụng', href: configRoute.help },
    { label: 'Hướng dẫn sử dụng', href: configRoute.help }
  ],
  contact: [
    { icon: <Phone className='w-5 h-5' />, info: '0934 600 600' },
    { icon: <Mail className='w-5 h-5' />, info: 'bkhang160303@gmail.com' },
    { icon: <MapPin className='w-5 h-5' />, info: 'Địa chỉ văn phòng' }
  ]
}

export default function Footer() {
  return (
    <footer className='relative'>
      {/* Footer Image */}
      <Image src={images.footer} alt='footer' width={3000} height={3000} priority className='w-full hidden md:block' />

      {/* Main Footer */}
      <div className='bg-fourth -mt-2 relative'>
        <div className='container py-12'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12'>
            {/* Brand */}
            <div className='col-span-2 md:col-span-1'>
              <Link href={configRoute.home} className='block mb-2'>
                <Image src={icons.logo} alt='Logo' width={100} height={40} />
              </Link>
              <p className='text-muted-foreground text-sm mb-6'>
                Nền tảng giáo dục giới tính toàn diện đầu tiên tại Việt Nam, giúp trẻ phát triển một cách tự nhiên và
                lành mạnh.
              </p>
              <div className='flex gap-4'>
                <Link
                  href='#'
                  className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors'
                >
                  <Facebook className='w-5 h-5' />
                </Link>
                <Link
                  href='#'
                  className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors'
                >
                  <Youtube className='w-5 h-5' />
                </Link>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className='font-semibold mb-6'>Công ty</h4>
              <ul className='space-y-4'>
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className='text-muted-foreground hover:text-primary transition-colors'>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className='font-semibold mb-6'>Hỗ trợ</h4>
              <ul className='space-y-4'>
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className='text-muted-foreground hover:text-primary transition-colors'>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className='font-semibold mb-6'>Liên hệ</h4>
              <ul className='space-y-4'>
                {footerLinks.contact.map((item, index) => (
                  <li key={index} className='flex items-center gap-3 text-muted-foreground'>
                    <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary'>
                      {item.icon}
                    </div>
                    <span>{item.info}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='bg-fourth border-t border-t-secondary/40'>
        <div className='container py-6'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
            <p className='text-sm text-muted-foreground'>
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
            <div className='flex items-center gap-6'>
              <Link
                href={configRoute.help}
                className='text-sm text-muted-foreground hover:text-primary transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                href={configRoute.help}
                className='text-sm text-muted-foreground hover:text-primary transition-colors'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

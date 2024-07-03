'use client'

import configRoute from '@/config/route'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Image from 'next/image'
import images from '@/assets/images'
import { ChevronDown } from 'lucide-react'

function DesktopNavbar() {
  const pathname = usePathname()
  const menuItems = [
    { name: 'Trang chủ', href: configRoute.home },
    {
      name: 'Khóa học',
      href: configRoute.course,
      icon: <ChevronDown className='w-5 h-5' />,
      children: {
        course: [
          { name: 'Tất cả khóa học', href: configRoute.course },
          { name: 'Khóa mới', href: configRoute.course },
          { name: 'Phổ biến', href: configRoute.course },
          { name: 'Về gia đình', href: configRoute.course },
          { name: 'Về xã hội', href: configRoute.course },
          { name: 'Về sức khỏe', href: configRoute.course },
          { name: 'Về tâm lý', href: configRoute.course }
        ],
        course2: [
          { name: 'Tất cả khóa học', href: configRoute.course },
          { name: 'Khóa mới', href: configRoute.course },
          { name: 'Phổ biến', href: configRoute.course }
        ]
      }
    },
    { name: 'Kiến thức', href: configRoute.knowledge },
    { name: 'Tổng quan', href: configRoute.about },
    { name: 'Dịch vụ', href: configRoute.service },
    { name: 'Liên hệ', href: configRoute.contact }
  ]

  const courseMenuItems = [
    { name: 'Tất cả khóa học', href: configRoute.course },
    { name: 'Khóa mới', href: configRoute.course },
    { name: 'Phổ biến', href: configRoute.course },
    { name: 'Về gia đình', href: configRoute.course },
    { name: 'Về xã hội', href: configRoute.course },
    { name: 'Về sức khỏe', href: configRoute.course },
    { name: 'Về tâm lý', href: configRoute.course }
  ]

  const course2MenuItems = [
    { name: 'Tất cả khóa học', href: configRoute.course },
    { name: 'Khóa mới', href: configRoute.course },
    { name: 'Phổ biến', href: configRoute.course }
  ]

  return (
    <nav className='pl-20 hidden lg:block'>
      <ul className='flex space-x-6 font-semibold text-primary'>
        {menuItems.map((item, index) =>
          item.children ? (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger>
                  <Link key={index} href={item.href}>
                    <li
                      className={`flex items-center gap-1 hover:text-primary/90 cursor-pointer ${pathname === item.href && 'text-secondary hover:text-secondary/90'}`}
                    >
                      {item.name}
                      {item.icon}
                    </li>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className='bg-white shadow-2xl py-6 px-4 max-w-[1200px]'>
                  <div className='flex justify-between container'>
                    <div className='flex gap-14'>
                      <article>
                        <h2 className='text-lg font-semibold text-secondary'>Khóa học của bé gái</h2>
                        <ul className='space-y-3 mt-4 text-sm text-gray-600'>
                          {courseMenuItems.map((item, index) => (
                            <li key={index} className='cursor-pointer hover:text-gray-600/80'>
                              {item.name}
                            </li>
                          ))}
                        </ul>
                      </article>

                      <article>
                        <h2 className='text-lg font-semibold text-secondary'>Khóa học của bé trai</h2>
                        <ul className='space-y-3 mt-4 text-sm text-gray-600'>
                          {course2MenuItems.map((item, index) => (
                            <li key={index} className='cursor-pointer hover:text-gray-600/80'>
                              {item.name}
                            </li>
                          ))}
                        </ul>
                      </article>
                    </div>

                    <div className='flex justify-end items-end mt-14'>
                      <Image
                        src={images.navbarBackground}
                        alt='Koine'
                        width={1000}
                        height={1000}
                        className='w-[450px]'
                      />
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link key={index} href={item.href}>
              <li
                className={`hover:text-primary/90 cursor-pointer ${pathname === item.href && 'text-secondary hover:text-secondary/90'}`}
              >
                {item.name}
              </li>
            </Link>
          )
        )}
      </ul>
    </nav>
  )
}

export default DesktopNavbar

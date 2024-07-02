import icons from '@/assets/icons'
import { Button } from '@/components/ui/button'
import configRoute from '@/config/route'
import { AlignJustify, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function Navbar() {
  return (
    <header className='fixed bg-white w-full h-[100px] shadow-md z-10'>
      <div className='container flex justify-between items-center h-full'>
        <Link href={configRoute.home}>
          <Image src={icons.logo} alt='Logo' width={100} height={100} className='object-contain cursor-pointer' />
        </Link>
        <nav className='pl-20 hidden lg:block'>
          <ul className='flex space-x-6 font-semibold text-primary cursor-pointer'>
            <Link href={configRoute.home}>
              <li className='hover:text-primary/80 flex items-center justify-center gap-1'>Trang chủ</li>
            </Link>
            <Link href={configRoute.course}>
              <li className='hover:text-primary/80 flex items-center justify-center gap-1'>
                Khóa học <ChevronDown />
              </li>
            </Link>
            <Link href={configRoute.knowledge}>
              <li className='hover:text-primary/80 flex items-center justify-center gap-1'>
                Kiến thức <ChevronDown />
              </li>
            </Link>
            <Link href={configRoute.about}>
              <li className='hover:text-primary/80 flex items-center justify-center gap-1'>Tổng quan</li>
            </Link>
            <Link href={configRoute.service}>
              <li className='hover:text-primary/80 flex items-center justify-center gap-1'>Dịch vụ</li>
            </Link>
            <Link href={configRoute.contact}>
              <li className='hover:text-primary/80 flex items-center justify-center gap-1'>Liên hệ</li>
            </Link>
          </ul>
        </nav>
        <div className='items-center justify-center gap-2 hidden lg:flex'>
          <Button asChild variant='link' className='font-semibold text-base hover:no-underline hover:text-primary/80'>
            <Link href={configRoute.register}>Đăng ký</Link>
          </Button>
          <Button asChild variant='default' className='rounded-[10px] text-base font-semibold h-[40px] px-4'>
            <Link href={configRoute.login}>Đăng nhập</Link>
          </Button>
        </div>

        <AlignJustify className='block lg:hidden w-10 h-10 cursor-pointer text-primary' />
      </div>
    </header>
  )
}

export default Navbar

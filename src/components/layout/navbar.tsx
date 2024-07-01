import icons from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

function Navbar() {
  return (
    <header className='fixed bg-white w-full h-[100px] shadow-md z-10'>
      <div className='container flex justify-between items-center h-full'>
        <Image
          src={icons.logo}
          alt='Logo'
          width={100}
          height={100}
          className='w-[100px] h-auto object-contain cursor-pointer'
        />
        <nav className='pl-20'>
          <ul className='flex space-x-6 font-semibold text-primary cursor-pointer'>
            <li className='hover:text-primary/80 flex items-center justify-center gap-1'>Trang chủ</li>
            <li className='hover:text-primary/80 flex items-center justify-center gap-1'>
              Khóa học <ChevronDown />
            </li>
            <li className='hover:text-primary/80 flex items-center justify-center gap-1'>
              Kiến thức <ChevronDown />
            </li>
            <li className='hover:text-primary/80 flex items-center justify-center gap-1'>Tổng quan</li>
            <li className='hover:text-primary/80 flex items-center justify-center gap-1'>Dịch vụ</li>
            <li className='hover:text-primary/80 flex items-center justify-center gap-1'>Liên hệ</li>
          </ul>
        </nav>
        <div className='flex items-center justify-center gap-2'>
          <Button variant='link' className='font-semibold text-base hover:no-underline hover:text-primary/80'>
            Đăng ký
          </Button>
          <Button variant='default' className='rounded-[10px] text-base font-semibold h-[40px] px-4'>
            Đăng nhập
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar

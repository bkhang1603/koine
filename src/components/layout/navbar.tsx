import icons from '@/assets/icons'
import DesktopNavbar from '@/components/layout/desktop-navbar'
import MobileNavbar from '@/components/layout/mobile-navbar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import configRoute from '@/config/route'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function Navbar() {
  return (
    <header className='fixed bg-white w-full h-[60px] md:h-[100px] shadow-md z-10'>
      <div className='container flex justify-between items-center h-full'>
        <Link href={configRoute.home}>
          <Image
            src={icons.logo}
            alt='Koine'
            width={100}
            height={100}
            className='w-[70px] md:w-[100px] object-contain cursor-pointer'
          />
        </Link>

        <DesktopNavbar />

        <div className='items-center justify-center gap-2 hidden lg:flex'>
          <Button asChild variant='link' className='font-semibold text-base hover:no-underline hover:text-primary/80'>
            <Link href={configRoute.register}>Đăng ký</Link>
          </Button>
          <Button asChild variant='default' className='rounded-[10px] text-base font-semibold h-[40px] px-4'>
            <Link href={configRoute.login}>Đăng nhập</Link>
          </Button>
        </div>

        <Sheet aria-describedby={undefined}>
          <SheetTrigger asChild>
            <AlignJustify className='block lg:hidden w-8 h-8 md:w-10 md:h-10 cursor-pointer text-primary' />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className='mb-5'>
                <Image src={icons.logo} alt='Logo' width={70} height={70} className='object-contain cursor-pointer' />
              </SheetTitle>
            </SheetHeader>
            <MobileNavbar />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Navbar

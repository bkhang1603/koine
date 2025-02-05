import icons from '@/assets/icons'
import KidNavbar from '@/components/layout/kid-navbar'
import MobileNavbar from '@/components/layout/mobile-navbar'
import AvatarNotification from '@/components/notification/avatar-nofication'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import configRoute from '@/config/route'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function KidHeader() {
  return (
    <header className='fixed bg-white w-screen h-[60px] md:h-[100px] shadow-md z-10'>
      <div className='container flex justify-between items-center h-full'>
        <Link href={configRoute.kid.dashboard}>
          <Image
            src={icons.logo}
            alt='Koine'
            width={1000}
            height={1000}
            quality={100}
            className='w-[70px] md:w-[100px] object-contain cursor-pointer'
          />
        </Link>

        <KidNavbar />

        <div className='ml-28'>
          <AvatarNotification />
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

export default KidHeader

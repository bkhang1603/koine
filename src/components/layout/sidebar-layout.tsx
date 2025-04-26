import { Menu } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import configRoute from '@/config/route'
import { Sidebar } from '@/types/sidebar'
import DropdownAvatar from '@/components/dropdown-avatar'
import SidebarMenu from '@/components/layout/sidebar-menu'
import Image from 'next/image'
import icons from '@/assets/icons'
import BellNotification from '@/components/notification/bell-notification'

export default function SidebarLayout({ children, sidebarData }: { children: React.ReactNode; sidebarData: Sidebar }) {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <Link href={configRoute.home} className='flex items-center gap-2 font-semibold text-primary text-xl'>
              <Image
                src={icons.logo}
                alt='Koine'
                width={1000}
                height={1000}
                quality={100}
                className='h-10 w-auto object-contain cursor-pointer'
              />
            </Link>
            <div className='ml-auto'>
              <BellNotification />
            </div>
          </div>
          <SidebarMenu sidebarData={sidebarData} />
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
                <Menu className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='flex flex-col'>
              <nav className='grid gap-2 text-lg font-medium'>
                <Link
                  href={configRoute.home}
                  className='flex items-center gap-2 text-2xl font-semibold text-primary mb-2'
                >
                  <Image
                    src={icons.logo}
                    alt='Koine'
                    width={1000}
                    height={1000}
                    quality={100}
                    className='h-10 w-auto object-contain cursor-pointer'
                  />
                </Link>
                <SidebarMenu sidebarData={sidebarData} />
              </nav>
            </SheetContent>
          </Sheet>
          <div className='flex flex-1 items-center justify-end gap-3'>
            <BellNotification />
            <DropdownAvatar />
          </div>
        </header>
        <ScrollArea className='w-full h-[calc(100vh-60px)] flex flex-col gap-4 '>
          <main className='p-4 lg:gap-6 lg:p-6'>{children}</main>
        </ScrollArea>
      </div>
    </div>
  )
}

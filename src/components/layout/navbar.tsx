'use client'

import icons from '@/assets/icons'
import { useAppStore } from '@/components/app-provider'
import DesktopNavbar from '@/components/layout/desktop-navbar'
import MobileNavbar from '@/components/layout/mobile-navbar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import configRoute from '@/config/route'
import { useAccountProfile } from '@/queries/useAccount'
import { useLogoutMutation } from '@/queries/useAuth'
import { AlignJustify, Bell, ChevronRight, LogOut, MessageCircleQuestion, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const dropMenuItems = [
  {
    title: 'Cài đặt',
    icon: <Settings />,
    href: configRoute.setting
  },
  {
    title: 'Trợ giúp',
    icon: <MessageCircleQuestion />,
    href: configRoute.setting
  },
  {
    title: 'Đăng xuất',
    icon: <LogOut />,
    href: null
  }
]

function Navbar() {
  const role = useAppStore((state) => state.role)
  const setRole = useAppStore((state) => state.setRole)

  // Tôi muốn chỉ gọi api account profile khi role có giá trị
  const { data } = useAccountProfile({
    enabled: !!role
  })

  const account = data?.payload.data
  const logoutMutation = useLogoutMutation()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      setRole()
      router.push(configRoute.home)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className='fixed bg-white w-full h-[60px] md:h-[100px] shadow-md z-10'>
      <div className='container flex justify-between items-center h-full'>
        <Link href={configRoute.home}>
          <Image
            src={icons.logo}
            alt='Koine'
            width={1000}
            height={1000}
            quality={100}
            className='w-[70px] md:w-[100px] object-contain cursor-pointer'
          />
        </Link>

        <DesktopNavbar />

        {!role && (
          <div className='items-center justify-center gap-2 hidden lg:flex'>
            <Button asChild variant='link' className='font-medium text-base hover:no-underline hover:text-primary/80'>
              <Link href={configRoute.register}>Đăng ký</Link>
            </Button>
            <Button asChild variant='default' className='rounded-[10px] text-base font-medium h-[40px] px-4'>
              <Link href={configRoute.login}>Đăng nhập</Link>
            </Button>
          </div>
        )}

        {role && (
          <div className='ml-10 flex items-center gap-4'>
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className='rounded-full bg-gray-50 w-10 h-10 flex justify-center
              items-center text-primary cursor-pointer'
                >
                  <Bell />
                </div>
              </PopoverTrigger>
              <PopoverContent>Thông báo</PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src={account?.avatarUrl} />
                  <AvatarFallback>
                    {account?.username.slice(0, 2).toUpperCase() || account?.email.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent align='end'>
                <div className='border border-gray-300 rounded-lg overflow-hidden shadow-lg p-2 space-y-2'>
                  <div className='flex items-center gap-2 hover:bg-gray-100 px-3 py-3 cursor-pointer rounded-lg'>
                    <Avatar className='cursor-pointer w-9 h-9'>
                      <AvatarImage src={account?.avatarUrl} />
                      <AvatarFallback>
                        {account?.username.slice(0, 2).toUpperCase() || account?.email.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <p className='font-medium text-base'>{account?.username || account?.email}</p>
                  </div>
                  <Separator />
                  <Button variant={'custom'} className='w-full'>
                    Xem các tài khoản quản lý
                  </Button>
                </div>

                <div className='flex flex-col mt-4 space-y-2'>
                  {dropMenuItems.map((item, index) =>
                    item.href ? (
                      <Link key={index} href={item.href}>
                        <div className='flex justify-between items-center hover:bg-gray-100 p-2 rounded-xl'>
                          <div className='flex items-center gap-2'>
                            {item.icon}
                            <p className='font-medium text-base'>{item.title}</p>
                          </div>

                          <ChevronRight />
                        </div>
                      </Link>
                    ) : (
                      <div
                        onClick={handleLogout}
                        key={index}
                        className='flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer rounded-lg'
                      >
                        {item.icon}
                        <p className='font-medium text-base'>{item.title}</p>
                      </div>
                    )
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}

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

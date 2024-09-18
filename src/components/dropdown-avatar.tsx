'use client'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { handleErrorApi, redirectSettingRole, translateRole } from '@/lib/utils'
import configRoute from '@/config/route'
import { useAppStore } from '@/components/app-provider'
import { useAccountProfile } from '@/queries/useAccount'
import { useLogoutMutation } from '@/queries/useAuth'
import { useRouter } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { ChevronRight, LogOut, MessageCircleQuestion, Settings } from 'lucide-react'

export default function DropdownAvatar() {
  const role = useAppStore((state) => state.role)
  const setRole = useAppStore((state) => state.setRole)

  // Tôi muốn chỉ gọi api account profile khi role có giá trị
  const { data } = useAccountProfile({
    enabled: !!role
  })

  const account = data?.payload.data
  const logoutMutation = useLogoutMutation()
  const router = useRouter()

  const dropMenuItems = [
    {
      title: 'Cài đặt',
      icon: <Settings />,
      href: redirectSettingRole(role!)
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

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      setRole()
      router.push(configRoute.home)
      router.refresh()
    } catch (error: any) {
      handleErrorApi(error)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className='cursor-pointer w-9 h-9'>
          <AvatarImage src={account?.avatarUrl} alt='avatar' />
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

            <div>
              <p className='font-medium text-base'>{account?.username || account?.email}</p>
              <p className='text-gray-400 text-xs'>{translateRole(account?.role!)}</p>
            </div>
          </div>
          <Separator />
          <Button asChild variant={'custom'} className='w-full'>
            <Link href={configRoute.home}>Quay trở lại trang chủ</Link>
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
  )
}

'use client'

import { useAppStore } from '@/components/app-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import configRoute from '@/config/route'
import { handleErrorApi } from '@/lib/utils'
import { useAccountProfile } from '@/queries/useAccount'
import { useLogoutMutation } from '@/queries/useAuth'
import { ChevronRight, LogOut, MessageCircleQuestion, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

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

function AvatarNotification() {
  const role = useAppStore((state) => state.role)
  const setRole = useAppStore((state) => state.setRole)
  const setAvatar = useAppStore((state) => state.setAvatar)
  const setUsername = useAppStore((state) => state.setUsername)
  const setUser = useAppStore((state) => state.setUser)

  // Tôi muốn chỉ gọi api account profile khi role có giá trị
  const { data } = useAccountProfile({
    enabled: !!role
  })
  const account = data?.payload.data

  useEffect(() => {
    if (account) {
      setAvatar(account.avatarUrl || '')
      setUsername(account.username || '')
      setUser(account)
    }
  }, [account, setAvatar, setUsername, setUser])

  const logoutMutation = useLogoutMutation()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      setRole()
      setAvatar()
      setUsername()
      setUser()
      router.push(configRoute.home)
      router.refresh()
    } catch (error: any) {
      handleErrorApi(error)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className='cursor-pointer select-none'>
          <AvatarImage src={account?.avatarUrl} alt='avatar' />
          <AvatarFallback>
            {account?.username.slice(0, 2).toUpperCase() || account?.email.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align='end'>
        <div className='border border-gray-300 rounded-lg overflow-hidden shadow-lg p-2 space-y-2'>
          <Link
            href={configRoute.profile}
            className='flex items-center gap-2 hover:bg-gray-100 px-3 py-3 cursor-pointer rounded-lg'
          >
            <Avatar className='cursor-pointer w-9 h-9'>
              <AvatarImage src={account?.avatarUrl} />
              <AvatarFallback>
                {account?.username.slice(0, 2).toUpperCase() || account?.email.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <p className='font-medium text-base line-clamp-1'>{account?.username || account?.email}</p>
          </Link>
          <Separator />
          <Button asChild variant={'custom'} className='w-full'>
            <Link href={configRoute.parent.dashboard}>Xem các tài khoản quản lý</Link>
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

export default AvatarNotification

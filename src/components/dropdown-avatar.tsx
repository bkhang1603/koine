'use client'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { formatRole, handleErrorApi, redirectSettingRole } from '@/lib/utils'
import configRoute from '@/config/route'
import { useAppStore } from '@/components/app-provider'
import { useAccountProfile } from '@/queries/useAccount'
import { useLogoutMutation } from '@/queries/useAuth'
import { useRouter } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronRight, LogOut, Settings } from 'lucide-react'
import { useEffect } from 'react'

export default function DropdownAvatar() {
  const role = useAppStore((state) => state.role)
  const setRole = useAppStore((state) => state.setRole)
  const setUser = useAppStore((state) => state.setUser)
  const setAvatar = useAppStore((state) => state.setAvatar)
  const setUsername = useAppStore((state) => state.setUsername)

  // Tôi muốn chỉ gọi api account profile khi role có giá trị
  const { data } = useAccountProfile({
    enabled: !!role
  })

  const account = data?.payload.data
  const logoutMutation = useLogoutMutation()
  const router = useRouter()

  useEffect(() => {
    if (account) {
      setAvatar(account.avatarUrl || '')
      setUsername(account.username || '')
      setUser(account)
    }
  }, [account, setAvatar, setUsername, setUser])

  const dropMenuItems = [
    {
      title: 'Cài đặt',
      icon: <Settings />,
      href: redirectSettingRole(role!)
    },
    // {
    //   title: 'Trợ giúp',
    //   icon: <MessageCircleQuestion />,
    //   href: configRoute.setting
    // },
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
              <p className='text-gray-400 text-xs'>{formatRole(account?.role!)}</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col mt-4 space-y-2'>
          {dropMenuItems.map((item, index) =>
            item.href ? (
              <Link key={index} href={typeof item.href === 'string' ? item.href : ''}>
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

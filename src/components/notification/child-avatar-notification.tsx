'use client'

import { useAppStore } from '@/components/app-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import configRoute from '@/config/route'
import { handleErrorApi } from '@/lib/utils'
import { useGetChildProfileQuery } from '@/queries/useAccount'
import { useLogoutMutation } from '@/queries/useAuth'
import { LogOut, BookOpen, GraduationCap, Medal, Home } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

// Simplified menu items
const childMenuItems = [
  {
    title: 'Trang chủ',
    icon: <Home className='w-5 h-5 text-blue-500' />,
    href: configRoute.kid.dashboard
  },
  {
    title: 'Khóa học của tôi',
    icon: <BookOpen className='w-5 h-5 text-green-500' />,
    href: configRoute.kid.course
  },
  {
    title: 'Bài học',
    icon: <GraduationCap className='w-5 h-5 text-amber-500' />,
    href: configRoute.kid.knowledge
  },
  {
    title: 'Thành tích',
    icon: <Medal className='w-5 h-5 text-purple-500' />,
    href: configRoute.kid.achievement
  }
]

function ChildAvatarNotification() {
  const role = useAppStore((state) => state.role)
  const setRole = useAppStore((state) => state.setRole)
  const setAvatar = useAppStore((state) => state.setAvatar)
  const setUsername = useAppStore((state) => state.setUsername)
  const setChildProfile = useAppStore((state) => state.setChildProfile)

  const { data } = useGetChildProfileQuery({
    enabled: !!role && role === 'CHILD'
  })
  const childAccount = data?.payload.data

  useEffect(() => {
    if (childAccount) {
      setAvatar(childAccount.avatarUrl || '')
      setUsername(`${childAccount.firstName || ''} ${childAccount.lastName || ''}`.trim() || '')
      setChildProfile(childAccount)
    }
  }, [childAccount, setAvatar, setUsername, setChildProfile])

  const logoutMutation = useLogoutMutation()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      setRole()
      setAvatar()
      setUsername()
      router.push(configRoute.login)
      router.refresh()
    } catch (error: any) {
      handleErrorApi(error)
    }
  }

  const getAvatarInitials = () => {
    if (childAccount?.firstName) {
      return childAccount.firstName.slice(0, 2).toUpperCase()
    }
    return 'KID'
  }

  // Ensure safe access to data
  const name = `${childAccount?.firstName || ''} ${childAccount?.lastName || ''}`.trim() || 'Học viên nhỏ'
  const level = childAccount?.level || '1'
  const courses = childAccount?.totalCourses || 0
  const learningTime = childAccount?.totalLearningTimes || 0
  const points = childAccount?.totalPoints || 0

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='relative cursor-pointer group'>
          <Avatar className='ring-2 ring-blue-100 group-hover:ring-blue-200 transition-all'>
            <AvatarImage src={childAccount?.avatarUrl} alt={name} />
            <AvatarFallback className='bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-500'>
              {getAvatarInitials()}
            </AvatarFallback>
          </Avatar>
          <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white'></span>
        </div>
      </PopoverTrigger>

      <PopoverContent className='w-80 p-0 shadow-lg border-0 rounded-lg overflow-hidden' align='end'>
        {/* Header */}
        <div className='bg-white border-b px-5 py-4'>
          <div className='flex items-center gap-3'>
            <Avatar className='h-14 w-14 ring-2 ring-blue-100'>
              <AvatarImage src={childAccount?.avatarUrl} alt={name} />
              <AvatarFallback className='bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-500 text-lg'>
                {getAvatarInitials()}
              </AvatarFallback>
            </Avatar>

            <div className='flex-1 min-w-0'>
              <h3 className='font-semibold text-base truncate'>{name}</h3>
              <div className='flex items-center mt-0.5 space-x-2'>
                <span className='px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-xs font-medium'>Cấp {level}</span>
                <span className='text-xs text-gray-500'>ID: {childAccount?.id?.slice(-6) || '000000'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-3 divide-x divide-gray-100 bg-gray-50 text-center'>
          <div className='py-3'>
            <div className='text-lg font-bold text-gray-800'>{courses}</div>
            <div className='text-xs text-gray-500'>Khóa học</div>
          </div>
          <div className='py-3'>
            <div className='text-lg font-bold text-gray-800'>{learningTime}</div>
            <div className='text-xs text-gray-500'>Phút học</div>
          </div>
          <div className='py-3'>
            <div className='text-lg font-bold text-gray-800'>{points}</div>
            <div className='text-xs text-gray-500'>Điểm</div>
          </div>
        </div>

        {/* Menu */}
        <div className='grid grid-cols-2 gap-2 p-3 bg-white'>
          {childMenuItems.map((item, i) => (
            <Link key={i} href={item.href}>
              <div className='flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-50 transition-colors text-center'>
                <div className='p-2 rounded-full bg-gray-50'>{item.icon}</div>
                <span className='text-sm text-gray-700'>{item.title}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className='bg-gray-50 p-3 border-t'>
          <Button
            variant={'outline'}
            onClick={handleLogout}
            className='w-full flex items-center justify-center gap-2 py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors'
          >
            <LogOut className='w-4 h-4' />
            <span className='text-sm font-medium'>Đăng xuất</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ChildAvatarNotification

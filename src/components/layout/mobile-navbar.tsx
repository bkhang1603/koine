'use client'

import { Book, Building2, Home, LibraryBig, LogOut, PackageSearch, Phone } from 'lucide-react'
import Link from 'next/link'
import configRoute from '@/config/route'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/components/app-provider'
import { handleErrorApi } from '@/lib/utils'
import { useLogoutMutation } from '@/queries/useAuth'

function MobileNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const role = useAppStore((state) => state.role)
  const setRole = useAppStore((state) => state.setRole)
  const setAvatar = useAppStore((state) => state.setAvatar)
  const setUsername = useAppStore((state) => state.setUsername)
  const setUser = useAppStore((state) => state.setUser)

  const logoutMutation = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      setRole()
      setAvatar()
      setUsername()
      setUser()
      router.push(configRoute.login)
      router.refresh()
    } catch (error: any) {
      handleErrorApi(error)
    }
  }

  const menuItems = [
    { name: 'Trang chủ', icon: Home, href: configRoute.home },
    { name: 'Sản phẩm', icon: PackageSearch, href: configRoute.product },
    { name: 'Khóa học', icon: LibraryBig, href: configRoute.course },
    { name: 'Kiến thức', icon: Book, href: configRoute.knowledge },
    { name: 'Tổng quan', icon: Building2, href: configRoute.about },
    // { name: 'Dịch vụ', icon: HandHelping, href: configRoute.service },
    { name: 'Liên hệ', icon: Phone, href: configRoute.contact }
  ]

  return (
    <div className='flex flex-col justify-between h-full'>
      {/* Menu Items */}
      <div className='space-y-1'>
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link key={index} href={item.href}>
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  'hover:bg-primary/5 active:bg-primary/10',
                  isActive ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:text-primary'
                )}
              >
                <item.icon className={cn('w-5 h-5', isActive ? 'text-primary' : 'text-gray-500')} />
                <span className='text-sm font-medium'>{item.name}</span>

                {/* Active Indicator */}
                {isActive && <div className='ml-auto w-1.5 h-1.5 rounded-full bg-primary' />}
              </div>
            </Link>
          )
        })}

        {role && (
          <button
            onClick={handleLogout}
            className={cn(
              'flex items-center gap-2 w-full px-3 py-2.5 rounded-lg transition-colors',
              'hover:bg-red-50 active:bg-red-100',
              'text-red-500 hover:text-red-600'
            )}
          >
            <LogOut className='w-5 h-5' />
            <span className='font-medium'>Đăng xuất</span>
          </button>
        )}
      </div>

      {/* Divider */}
      <div className='my-4 border-t border-gray-100' />

      {/* Additional Links */}
      <div className='space-y-2 text-sm text-gray-600'>
        <Link href={configRoute.help} className='block hover:text-primary'>
          Trung tâm hỗ trợ
        </Link>
        <Link href={configRoute.help} className='block hover:text-primary'>
          Điều khoản sử dụng
        </Link>
        <Link href={configRoute.help} className='block hover:text-primary'>
          Chính sách bảo mật
        </Link>
      </div>
    </div>
  )
}

export default MobileNavbar

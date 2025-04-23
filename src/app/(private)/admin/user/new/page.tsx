'use client'

import NewUserPage from '@/components/private/common/user/user-new'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

function Page() {
  return (
    <div className='container max-w-4xl mx-auto px-4 py-6'>
      {/* Breadcrumb */}
      <nav className='flex items-center space-x-1 text-sm text-muted-foreground mb-6'>
        <Link href='/admin/user' className='hover:text-primary transition-colors'>
          Người dùng
        </Link>
        <ChevronRight className='h-4 w-4' />
        <span className='font-medium text-foreground'>Tạo mới</span>
      </nav>
      <div>
        <NewUserPage baseUrl='/admin/user' />
      </div>
    </div>
  )
}

export default Page

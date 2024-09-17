import { SidebarNav } from '@/app/(public)/setting/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'

const sidebarNavItems = [
  {
    title: 'Hồ sơ',
    href: '/setting'
  },
  {
    title: 'Bảo mật',
    href: '/setting/password'
  }
]

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='container pt-32 pb-16'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>Cài đặt</h2>
        <p className='text-muted-foreground'>Đây là những thông tin sẽ hiển thị trên trang web.</p>
      </div>
      <Separator className='my-6' />
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='-mx-4 lg:w-1/5'>
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className='flex-1 lg:max-w-2xl'>{children}</div>
      </div>
    </div>
  )
}

export default layout

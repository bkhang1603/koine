import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thông tin cá nhân',
  description: 'Xem thông tin cá nhân của bạn tại đây.'
}

function ContactLayout({ children }: { children: React.ReactNode }) {
  return <div className='pt-[60px] md:pt-[100px] container'>{children}</div>
}

export default ContactLayout

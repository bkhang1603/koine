import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trang liên hệ với Koine',
  description:
    'Koine sẽ luôn lắng nghe và thấu hiểu bạn. Hãy để lại tin nhắn cho chúng tôi để chúng tôi có thể giúp đỡ bạn tốt nhất.'
}

function ContactLayout({ children }: { children: React.ReactNode }) {
  return <div className='pt-[60px] md:pt-[100px] container'>{children}</div>
}

export default ContactLayout

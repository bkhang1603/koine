import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trang dịch vụ và những chính sách của Koine',
  description:
    'Koine sẽ cung cấp cho bạn những dịch vụ và chính sách về giáo dục giới tính ở trẻ em, thanh thiếu niên. Góp phần chung tay bảo vệ trẻ em khỏi nguy cơ xâm hại tình dục.'
}

function ServiceLayout({ children }: { children: React.ReactNode }) {
  return <div className='pt-[100px] container'>{children}</div>
}

export default ServiceLayout

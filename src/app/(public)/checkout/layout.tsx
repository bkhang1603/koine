import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order của bạn',
  description: 'Kiểm tra và chỉnh sửa order của bạn trước khi tiến hành thanh toán.'
}

function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <div className='pt-[60px] md:pt-[100px] container'>{children}</div>
}

export default CheckoutLayout

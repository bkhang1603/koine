import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Giỏ hàng của bạn',
  description: 'Kiểm tra và chỉnh sửa giỏ hàng của bạn trước khi tiến hành thanh toán.'
}

function CartLayout({ children }: { children: React.ReactNode }) {
  return <div className='pt-[60px] md:pt-[100px] container'>{children}</div>
}

export default CartLayout

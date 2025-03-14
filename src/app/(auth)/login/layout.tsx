import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập vào tài khoản của bạn trên Koine'
}

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export default LoginLayout

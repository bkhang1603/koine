import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đăng ký',
  description: 'Đăng ký tài khoản mới trên Koine'
}

function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export default RegisterLayout

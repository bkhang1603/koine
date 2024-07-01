import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'Trang chủ - Koine',
  description: 'Koine là nền tảng học trực tuyến với các khóa học chất lượng cao từ các chuyên gia hàng đầu.',
  openGraph: {
    locale: 'vi_VN',
    type: 'website',
    siteName: 'Koine Company',
    title: 'Trang chủ - Koine',
    description: 'Koine là nền tảng học trực tuyến với các khóa học chất lượng cao từ các chuyên gia hàng đầu.',
    url: 'https://koine-xi.vercel.app/',
    images: [
      {
        url: '/images/welcome.png'
      }
    ]
  },
  alternates: {
    canonical: 'https://koine-xi.vercel.app/'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

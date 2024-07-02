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
  title: {
    template: '%s | Koine',
    default: 'Nền tảng giáo dục giới tính cho trẻ em | Koine'
  },
  description:
    'Koine là nền tảng giáo dục giới tính cho trẻ em với các khóa học chất lượng cao từ các chuyên gia hàng đầu.',
  authors: [{ name: 'Koine Company', url: 'https://koine.id.vn' }],
  keywords: [
    'Koine',
    'Koine Company',
    'Koine Online',
    'Koine Học trực tuyến',
    'Koine Giáo dục giới tính',
    'Koine Giáo dục trẻ em'
  ],
  creator: 'Koine Company',
  publisher: 'Koine Company',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    locale: 'vi_VN',
    type: 'website',
    siteName: 'Koine Company',
    title: 'Nền tảng giáo dục giới tính cho trẻ em | Koine',
    description:
      'Koine là nền tảng giáo dục giới tính cho trẻ em với các khóa học chất lượng cao từ các chuyên gia hàng đầu.',
    url: 'https://koine.id.vn',
    images: [
      {
        url: '/images/welcome.png'
      }
    ]
  },
  alternates: {
    canonical: 'https://koine.id.vn',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE'
    }
  },
  metadataBase: new URL('https://koine.id.vn')
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

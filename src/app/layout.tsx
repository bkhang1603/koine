import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import AppProvider from '@/components/app-provider'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['vietnamese', 'latin']
})

export const metadata: Metadata = {
  title: {
    template: '%s | Koine',
    default: 'Nền tảng giáo dục giới tính cho trẻ em | Koine'
  },
  description:
    'Koine là nền tảng giáo dục giới tính cho trẻ em với các khóa học chất lượng cao từ các chuyên gia hàng đầu. Hãy tham gia ngay để giúp con bạn phát triển toàn diện nhất!',
  authors: [{ name: 'Koine', url: 'https://koine.id.vn' }],
  keywords: ['Koine', 'Koine Giáo dục cho trẻ em', 'Koine Online', 'Koine Học trực tuyến', 'Koine Giáo dục giới tính'],
  creator: 'Koine',
  publisher: 'Koine',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    locale: 'vi_VN',
    type: 'website',
    siteName: 'Koine',
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
      'vi-VN': '/vi-VN',
      'en-US': '/en-US',
      'de-DE': '/de-DE'
    }
  },
  metadataBase: new URL('https://koine.id.vn')
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background antialiased', roboto.className)}>
        <AppProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  )
}

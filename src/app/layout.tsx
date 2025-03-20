import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import AppProvider from '@/components/app-provider'
import { Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import NextTopLoader from 'nextjs-toploader'

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
    'Koine là nền tảng giáo dục giới tính trực tuyến hàng đầu dành cho trẻ em. Chúng tôi cung cấp các khóa học chất lượng cao, được thiết kế bởi các chuyên gia giáo dục và tâm lý học.',
  authors: [{ name: 'Koine', url: 'https://koine.id.vn' }],
  keywords: [
    'Koine',
    'Website giáo dục giới tính',
    'Website giao duc gioi tinh',
    'Trẻ em',
    'Tre em',
    'Website giáo dục',
    'Website giao duc',
    'Website giáo dục cho trẻ em',
    'Website giao duc cho tre em',
    'Koine giáo dục cho trẻ em',
    'Koine giao duc cho tre em',
    'Koine Online',
    'Koine học trực tuyến',
    'Koine hoc truc tuyen',
    'Koine giáo dục giới tính',
    'Koine giao duc gioi tinh'
  ],
  creator: 'Koine',
  publisher: 'Koine',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: 'Koine - Nền tảng giáo dục giới tính cho trẻ em',
    description:
      'Koine là nền tảng giáo dục giới tính trực tuyến hàng đầu dành cho trẻ em. Chúng tôi cung cấp các khóa học chất lượng cao, được thiết kế bởi các chuyên gia giáo dục và tâm lý học.',
    url: 'https://koine.id.vn',
    siteName: 'Koine',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Koine - Nền tảng giáo dục giới tính cho trẻ em'
      }
    ],
    locale: 'vi_VN',
    type: 'website'
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
          {children}
          <NextTopLoader showSpinner={false} color='hsl(var(--primary))' />
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </AppProvider>
      </body>
    </html>
  )
}

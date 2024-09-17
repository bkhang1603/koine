import envConfig from '@/config'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/content-creator/',
        '/parent/',
        '/admin/',
        '/setting/',
        '/profile/',
        '/cart/',
        '/checkout/',
        '/order/',
        '/404',
        '/500'
      ]
    },
    sitemap: `${envConfig.NEXT_PUBLIC_URL}/sitemap.xml`
  }
}

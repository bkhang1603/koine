import envConfig from '@/config'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${envConfig.NEXT_PUBLIC_URL}/`,
      lastModified: new Date()
    }
  ]
}

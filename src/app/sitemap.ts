import blogApiRequest from '@/apiRequests/blog'
import productApiRequest from '@/apiRequests/product'
import courseApiRequest from '@/apiRequests/course'
import eventApiRequest from '@/apiRequests/event'
import envConfig, { locales } from '@/config'
import type { Blog, Product, Course, Event } from '@/types/api'
import type { MetadataRoute } from 'next'
import { wrapServerApi } from '@/lib/server-utils'

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: '',
    changeFrequency: 'monthly',
    priority: 1
  },
  {
    url: '/login',
    changeFrequency: 'yearly',
    priority: 0.5
  },
  {
    url: '/register',
    changeFrequency: 'yearly',
    priority: 0.5
  },
  {
    url: '/about',
    changeFrequency: 'yearly',
    priority: 0.5
  },
  {
    url: '/knowledge',
    changeFrequency: 'daily',
    priority: 0.9
  },
  {
    url: '/product',
    changeFrequency: 'daily',
    priority: 0.8
  },
  {
    url: '/course',
    changeFrequency: 'weekly',
    priority: 0.8
  },
  {
    url: '/event',
    changeFrequency: 'daily',
    priority: 0.7
  },
  {
    url: '/contact',
    changeFrequency: 'yearly',
    priority: 0.5
  }
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Lấy dữ liệu từ API với wrapServerApi
  const blogResult = await wrapServerApi(() => blogApiRequest.getBlogsCache({ page_index: 1, page_size: 1000 }))
  const blogList = blogResult?.payload?.data || []

  const productResult = await wrapServerApi(() =>
    productApiRequest.getProductsCache({ page_index: 1, page_size: 1000 })
  )
  const productList = productResult?.payload?.data || []

  const courseResult = await wrapServerApi(() => courseApiRequest.getCoursesCache({ page_index: 1, page_size: 1000 }))
  const courseList = courseResult?.payload?.data || []

  const eventResult = await wrapServerApi(() => eventApiRequest.getAllEvent())
  const eventList = eventResult?.payload?.data || []

  // Xử lý các route tĩnh
  const localizeStaticSiteMap = locales.reduce((acc) => {
    return [
      ...acc,
      ...staticRoutes.map((route) => {
        return {
          ...route,
          url: `${envConfig.NEXT_PUBLIC_URL}/${route.url}`,
          lastModified: new Date()
        }
      })
    ]
  }, [] as MetadataRoute.Sitemap)

  // Xử lý sitemap cho blog
  const blogSiteMap: MetadataRoute.Sitemap = blogList.map((blog: Blog) => ({
    url: `${envConfig.NEXT_PUBLIC_URL}/knowledge/${blog.slug}`,
    lastModified: blog.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }))

  // Xử lý sitemap cho sản phẩm
  const productSiteMap: MetadataRoute.Sitemap = productList.map((product: Product) => ({
    url: `${envConfig.NEXT_PUBLIC_URL}/product/${product.slug}`,
    lastModified: product.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // Xử lý sitemap cho khóa học
  const courseSiteMap: MetadataRoute.Sitemap = courseList.map((course: Course) => ({
    url: `${envConfig.NEXT_PUBLIC_URL}/course/${course.slug}`,
    lastModified: course.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // Xử lý sitemap cho sự kiện
  const eventSiteMap: MetadataRoute.Sitemap = eventList.map((event: Event) => ({
    url: `${envConfig.NEXT_PUBLIC_URL}/event/${event.id}`,
    lastModified: event.updateAt || new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7
  }))

  // Kết hợp tất cả các sitemap
  return [...localizeStaticSiteMap, ...blogSiteMap, ...productSiteMap, ...courseSiteMap, ...eventSiteMap]
}

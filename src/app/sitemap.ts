import blogApiRequest from '@/apiRequests/blog'
import productApiRequest from '@/apiRequests/product'
import courseApiRequest from '@/apiRequests/course'
import eventApiRequest from '@/apiRequests/event'
import envConfig, { locales } from '@/config'
import { wrapServerApi } from '@/lib/server-utils'
import type { ApiResponse, Blog, Product, Course, Event } from '@/types/api'
import type { MetadataRoute } from 'next'

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

// Hàm helper để lấy dữ liệu từ API một cách an toàn
async function getApiData<T>(apiCall: () => Promise<ApiResponse<T>>): Promise<T[]> {
  try {
    const result = await wrapServerApi(apiCall)
    return result?.payload?.data || []
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Lấy dữ liệu từ API với xử lý lỗi
  const [blogList, productList, courseList, eventList] = await Promise.all([
    getApiData<Blog>(() => blogApiRequest.getBlogsCache({ page_index: 1, page_size: 1000 })),
    getApiData<Product>(() => productApiRequest.getProductsCache({ page_index: 1, page_size: 1000 })),
    getApiData<Course>(() => courseApiRequest.getCoursesCache({ page_index: 1, page_size: 1000 })),
    getApiData<Event>(() => eventApiRequest.getAllEvent())
  ])

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
  const blogSiteMap: MetadataRoute.Sitemap = blogList.map((blog) => ({
    url: `${envConfig.NEXT_PUBLIC_URL}/knowledge/${blog.slug}`,
    lastModified: blog.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }))

  // Xử lý sitemap cho sản phẩm
  const productSiteMap: MetadataRoute.Sitemap = productList.map((product) => ({
    url: `${envConfig.NEXT_PUBLIC_URL}/product/${product.slug}`,
    lastModified: product.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // Xử lý sitemap cho khóa học
  const courseSiteMap: MetadataRoute.Sitemap = courseList.map((course) => ({
    url: `${envConfig.NEXT_PUBLIC_URL}/course/${course.slug}`,
    lastModified: course.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // Xử lý sitemap cho sự kiện
  const eventSiteMap: MetadataRoute.Sitemap = eventList.map((event) => ({
    url: `${envConfig.NEXT_PUBLIC_URL}/event/${event.id}`,
    lastModified: event.updateAt || new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7
  }))

  // Kết hợp tất cả các sitemap
  return [...localizeStaticSiteMap, ...blogSiteMap, ...productSiteMap, ...courseSiteMap, ...eventSiteMap]
}

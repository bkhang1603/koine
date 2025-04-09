import courseApiRequest from '@/apiRequests/course'
import Information from '@/components/public/parent/home/information'
import envConfig from '@/config'
import { htmlToTextForDescription, wrapServerApi } from '@/lib/server-utils'
import baseOpenGraphConfig from '@/open-graph-config'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const id = params.id
  const data = await wrapServerApi(() => courseApiRequest.getCourseCache(id))
  const course = data?.payload.data
  if (!course) {
    return {
      title: 'Không tìm thấy khóa học',
      description: 'Không tìm thấy khóa học'
    }
  }
  const url = envConfig.NEXT_PUBLIC_URL + `/${params.id}`
  const canonicalUrl = envConfig.NEXT_PUBLIC_URL + `/course/${params.id}`

  return {
    title: course.title,
    description: htmlToTextForDescription(course.description),
    openGraph: {
      ...baseOpenGraphConfig,
      title: course.title,
      description: course.description,
      url,
      images: [
        {
          url: course.imageUrl
        }
      ],
      publishedTime: course.createdAt,
      modifiedTime: course.updatedAt
    },
    alternates: {
      canonical: canonicalUrl
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title,
      description: course.description,
      images: [course.imageUrl]
    }
  }
}
function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
      <Information />
    </main>
  )
}

export default layout

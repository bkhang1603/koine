import courseApiRequest from '@/apiRequests/course'
import Information from '@/components/public/parent/home/information'
import envConfig from '@/config'
import { htmlToTextForDescription, wrapServerApi } from '@/lib/server-utils'
import baseOpenGraphConfig from '@/open-graph-config'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const slug = params.slug
  const data = await wrapServerApi(() => courseApiRequest.getCourseComboDetail(slug))
  const combo = data?.payload.data
  if (!combo) {
    return {
      title: 'Không tìm thấy combo',
      description: 'Không tìm thấy combo'
    }
  }
  const url = envConfig.NEXT_PUBLIC_URL + `/${params.slug}`
  const canonicalUrl = envConfig.NEXT_PUBLIC_URL + `/combo/${params.slug}`

  return {
    title: combo.name,
    description: htmlToTextForDescription(combo.description),
    openGraph: {
      ...baseOpenGraphConfig,
      title: combo.name,
      description: combo.description,
      url,
      images: [
        {
          url: combo.imageUrl
        }
      ],
      publishedTime: combo.createdAt,
      modifiedTime: combo.updatedAt
    },
    alternates: {
      canonical: canonicalUrl
    },
    twitter: {
      card: 'summary_large_image',
      title: combo.name,
      description: combo.description,
      images: [combo.imageUrl]
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

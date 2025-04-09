import eventApiRequest from '@/apiRequests/event'
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
  const data = await wrapServerApi(() => eventApiRequest.getEventById({ id }))
  const event = data?.payload.data
  if (!event) {
    return {
      title: 'Không tìm thấy sự kiện',
      description: 'Không tìm thấy sự kiện'
    }
  }
  const url = envConfig.NEXT_PUBLIC_URL + `/${params.id}`
  const canonicalUrl = envConfig.NEXT_PUBLIC_URL + `/event/${params.id}`

  return {
    title: event.title,
    description: htmlToTextForDescription(event.description),
    openGraph: {
      ...baseOpenGraphConfig,
      title: event.title,
      description: event.description,
      url,
      images: [
        {
          url: event.imageUrl
        }
      ],
      publishedTime: event.createdAt,
      authors: [event.hostInfo.fullName]
    },
    alternates: {
      canonical: canonicalUrl
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.description,
      images: [event.imageUrl]
    },
    authors: {
      name: event.hostInfo.fullName
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

import blogApiRequest from '@/apiRequests/blog'
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
  const data = await wrapServerApi(() => blogApiRequest.getBlogCache(id))
  const blog = data?.payload.data
  if (!blog) {
    return {
      title: 'Không tìm thấy bài viết',
      description: 'Không tìm thấy bài viết'
    }
  }
  const url = envConfig.NEXT_PUBLIC_URL + `/${params.id}`
  const canonicalUrl = envConfig.NEXT_PUBLIC_URL + `/knowledge/${params.id}`

  return {
    title: blog.title,
    description: htmlToTextForDescription(blog.description),
    openGraph: {
      ...baseOpenGraphConfig,
      title: blog.title,
      description: blog.description,
      url,
      images: [
        {
          url: blog.imageUrl
        }
      ],
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.creatorInfo.firstName]
    },
    alternates: {
      canonical: canonicalUrl
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: [blog.imageUrl]
    },
    authors: {
      name: blog.creatorInfo.firstName
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

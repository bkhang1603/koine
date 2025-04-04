import productApiRequest from '@/apiRequests/product'
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
  const data = await wrapServerApi(() => productApiRequest.getProductCache(id))
  const product = data?.payload.data
  if (!product) {
    return {
      title: 'Không tìm thấy sản phẩm',
      description: 'Không tìm thấy sản phẩm'
    }
  }
  const url = envConfig.NEXT_PUBLIC_URL + `/${params.id}`
  const canonicalUrl = envConfig.NEXT_PUBLIC_URL + `/product/${params.id}`

  return {
    title: product.name,
    description: htmlToTextForDescription(product.description),
    openGraph: {
      ...baseOpenGraphConfig,
      title: product.name,
      description: product.description,
      url,
      images: [
        {
          url: product.images[0].imageUrl
        }
      ],
      publishedTime: product.createdAt,
      modifiedTime: product.updatedAt
    },
    alternates: {
      canonical: canonicalUrl
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.images[0].imageUrl]
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

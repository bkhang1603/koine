import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ProductsResType } from '@/schemaValidations/product.schema'
import configRoute from '@/config/route'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import productApiRequest from '@/apiRequests/product'
import { wrapServerApi } from '@/lib/server-utils'

// ProductCard component theo mẫu
export function ProductCard({ product }: { product: ProductsResType['data'][0] }) {
  const changeCategoriesToString = (categories: string[]) => {
    return categories.join(', ')
  }

  return (
    <Link href={`${configRoute.product}/${product.id}`}>
      <article className='cursor-pointer group/product h-full'>
        <div className='w-full aspect-square rounded-lg overflow-hidden relative'>
          {product.images && product.images.length > 0 ? (
            <>
              <Image
                src={product.images[0].imageUrl === 'image' ? '/no-image.png' : product.images[0].imageUrl}
                alt={product.images[0].name}
                width={400}
                height={400}
                className='w-full h-full object-cover rounded-lg'
                priority={true}
              />

              {/* Discount Tag */}
              {product.discount > 0 && (
                <div
                  className='absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-red-500 to-rose-500 
                  text-white py-1 px-12 text-sm font-medium shadow-lg transform transition-transform'
                >
                  {product.discount * 100}% OFF
                </div>
              )}
            </>
          ) : (
            <div className='w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center'>
              <p>No Image</p>
            </div>
          )}

          <div
            className='absolute w-full h-10 bg-black/50 opacity-0 -bottom-10
            group-hover/product:bottom-0 group-hover/product:opacity-100
            flex justify-center items-center transition-all duration-500'
          >
            <p className='text-fourth'>Xem thêm</p>
          </div>
        </div>

        <div className='p-2'>
          <p className='text-xs text-gray-500 truncate'>
            {product.categories && changeCategoriesToString(product.categories.map((category) => category.name))}
          </p>
          <h3 className='text-lg font-semibold line-clamp-1'>{product.name}</h3>

          <div className='flex items-center gap-2 mt-2'>
            {product.discount > 0 ? (
              <>
                <span className='text-base font-semibold'>
                  {(product.price - product.price * product.discount).toLocaleString()}đ
                </span>
                <span className='text-sm text-gray-500 line-through'>{product.price.toLocaleString()}đ</span>
              </>
            ) : (
              <span className='text-base font-semibold'>{product.price.toLocaleString()}đ</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

type RecommendedProductsProps = {
  currentProductId: string
  categoryIds?: string[] | string
}

export default async function RecommendedProducts({ currentProductId, categoryIds }: RecommendedProductsProps) {
  // Xử lý categoryIds
  const formatCategories = () => {
    if (!categoryIds) return ''

    if (typeof categoryIds === 'string') return categoryIds

    return categoryIds.join('a%a')
  }

  // Lấy dữ liệu từ server
  const data = await wrapServerApi(() =>
    productApiRequest.getProducts({
      page_size: 12,
      page_index: 1,
      sort: 'pa',
      category: formatCategories()
    })
  )

  // Lọc sản phẩm
  const recommendedProducts = data?.payload?.data
    ? data.payload.data.filter((product) => product.id !== currentProductId)
    : []

  if (!data) {
    return null
  }

  return (
    <div className='mt-16 mb-10 relative'>
      <div>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>Sản phẩm tương tự</h2>
          <Link
            href={configRoute.product}
            className='flex items-center text-primary hover:text-primary/70 duration-300 gap-1'
          >
            <span>Xem tất cả</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        {recommendedProducts.length === 0 ? (
          <p className='text-gray-500 italic'>Không có sản phẩm tương tự</p>
        ) : (
          <Carousel
            opts={{
              align: 'start',
              loop: true
            }}
            className='w-full'
          >
            <CarouselContent className='-ml-2 md:-ml-3'>
              {recommendedProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className='pl-2 md:pl-3 basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-1/6'
                >
                  <div className='h-full'>
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className='bg-white hover:bg-white border border-gray-200 shadow-md' />
            <CarouselNext className='bg-white hover:bg-white border border-gray-200 shadow-md' />
          </Carousel>
        )}
      </div>
    </div>
  )
}

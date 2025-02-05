import productApiRequest from '@/apiRequests/product'
import CustomInput from '@/components/public/parent/home/custom-input'
import ProductSort from '@/components/public/parent/product/sort'
import configRoute from '@/config/route'
import { ProductsResType } from '@/schemaValidations/product.schema'
import { searchParams } from '@/types/query'
import Image from 'next/image'
import Link from 'next/link'

async function List({ searchParams }: { searchParams: searchParams | undefined }) {
  let products: ProductsResType['data'] = []
  const page_index = isNaN(Number(searchParams?.page_index)) ? 1 : Number(searchParams?.page_index)
  const search = searchParams?.search ?? ''
  const page_size = 12
  const sortOptions = ['pa', 'pd', 'na', 'nd'] as const
  const sort = sortOptions.includes(searchParams?.sort as any) ? searchParams?.sort : 'pa'
  const range = isNaN(Number(searchParams?.range)) ? undefined : Number(searchParams?.range)
  let category = searchParams?.category ?? ''
  category = (typeof category === 'string' ? category : '')
    .split(',')
    .map((cat) => encodeURIComponent(cat))
    .join('a%a')

  try {
    const { payload } = await productApiRequest.getProducts({ page_index, page_size, search, range, category, sort })
    products = payload.data
  } catch (error) {
    console.log(error)
  }

  const changeCategoriesToString = (categories: string[]) => {
    return categories.join(', ')
  }

  return (
    <div className='col-span-3'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <CustomInput className='w-full md:max-w-[400px] h-9' placeholder='Tìm kiếm sản phẩm...' />

        <ProductSort />
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
        {products &&
          products.map((item) => (
            <Link href={`${configRoute.product}/${item.slug}`} key={item.id}>
              <article className='cursor-pointer group/product'>
                <div className='w-full aspect-square rounded-lg overflow-hidden relative'>
                  {item.images && item.images.length > 0 ? (
                    <Image
                      src={item.images[0].imageUrl === 'image' ? '/no-image.png' : item.images[0].imageUrl}
                      alt={item.images[0].name}
                      width={400}
                      height={400}
                      className='w-full h-full object-cover rounded-lg'
                      priority={true}
                    />
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
                  <p className='text-xs text-gray-500'>
                    {changeCategoriesToString(item.categories.map((category) => category.name))}
                  </p>
                  <h3 className='text-lg font-semibold line-clamp-1'>{item.name}</h3>

                  <div className='flex items-center gap-2 mt-2'>
                    <span className='text-base font-semibold'>{item.price.toLocaleString()}đ</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}

        {products.length === 0 && (
          <p className='text-center text-lg text-gray-500 col-span-full'>Không tìm thấy sản phẩm</p>
        )}
      </div>
    </div>
  )
}

export default List

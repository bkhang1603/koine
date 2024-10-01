import productApiRequest from '@/apiRequests/product'
import CustomInput from '@/app/(public)/components/custom-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import configRoute from '@/config/route'
import { ProductsResType } from '@/schemaValidations/product.schema'
import { searchParams } from '@/types/query'
import Image from 'next/image'
import Link from 'next/link'

async function List({ searchParams }: { searchParams: searchParams | undefined }) {
  let products: ProductsResType['data'] = []
  const page_index = Number(searchParams?.page_index) ?? 1
  const search = searchParams?.search ?? ''

  try {
    const { payload } = await productApiRequest.getProducts({ page_index, search })
    products = payload.data
  } catch (error) {
    console.log(error)
  }

  return (
    <div className='col-span-3'>
      <div className='flex justify-between items-center gap-4'>
        <CustomInput className='max-w-[400px] h-9' placeholder='Tìm kiếm sản phẩm...' />

        <Select>
          <SelectTrigger className='w-[180px] focus:ring-0'>
            <SelectValue placeholder='Sắp xếp theo' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='price-asc'>Giá thấp đến cao</SelectItem>
            <SelectItem value='price-desc'>Giá cao đến thấp</SelectItem>
            <SelectItem value='most-popular'>Phổ biến nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
        {products &&
          products.map((item) => (
            <Link href={`${configRoute.product}/${item.id}`} key={item.id}>
              <article className='cursor-pointer group/product'>
                <div className='w-full aspect-square rounded-lg overflow-hidden relative'>
                  {item.images && item.images.length > 0 ? (
                    <Image
                      src={item.images[0]}
                      alt='koine image'
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
                  <p className='text-xs text-gray-500'>{item.category.name}</p>
                  <h3 className='text-lg font-semibold line-clamp-1'>{item.name}</h3>

                  <div className='flex items-center gap-2 mt-2'>
                    <span className='text-base font-semibold'>{item.price.toLocaleString()}đ</span>
                    {/* <span className='text-gray-400 text-sm line-through'>{item.oldPrice.toLocaleString()}đ</span> */}
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

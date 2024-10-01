import { Star, Heart, Share2, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import BreadCrumbCustom from '@/components/breadcrumb-custom'
import ProductImage from '@/app/(public)/product/[id]/components/product-image'
import productApiRequest from '@/apiRequests/product'
import { ProductResType } from '@/schemaValidations/product.schema'

export default async function ProductDetail({ params: { id } }: { params: { id: string } }) {
  let product: ProductResType['data'] | null = null

  try {
    console.log(1)
    const { payload } = await productApiRequest.getProduct(id)
    console.log(payload)
    product = payload.data
    console.log(product)
  } catch (error) {
    console.log(error)
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <section className='container py-8'>
      <BreadCrumbCustom />

      {/* Product details */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mt-6'>
        {/* Product images */}
        <ProductImage imageData={product.images} />

        {/* Product info */}
        <div>
          <p className='text-gray-500 mb-2'>{product.category.name}</p>
          <h2 className='text-4xl mb-4'>{product.name}</h2>
          <p className='text-2xl mb-4'>{product.price.toLocaleString()}đ</p>

          <p className='mb-6 line-clamp-3'>{product.description}</p>

          <div className='flex items-center mb-6'>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className='w-5 h-5 text-yellow-400 fill-current' />
            ))}
            <span className='ml-2 text-gray-600'>(154 nhận xét)</span>
            <Heart className='ml-4 w-5 h-5' />
            <Share2 className='ml-4 w-5 h-5' />
          </div>
          <div className='flex items-center space-x-4 mb-6'>
            <span>Số lượng</span>
            <Button variant='outline' size='icon'>
              <Minus className='h-4 w-4' />
            </Button>

            <Input type='text' defaultValue={1} className='w-16 text-center' />

            <Button variant='outline' size='icon'>
              <Plus className='h-4 w-4' />
            </Button>
          </div>

          <div className='flex justify-between gap-4'>
            <Button variant={'outlineSecondary'} className='w-full mb-6'>
              Thêm vào giỏ hàng
            </Button>

            <Button variant={'secondary'} className='w-full mb-6'>
              Mua ngay
            </Button>
          </div>

          <div className='space-y-2 text-sm'>
            <p>Mã số sản phẩm: {product.id}</p>
            <p>Thể loại: {product.category.name}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Star, Heart, Share2, Truck, RotateCcw, ShieldCheck } from 'lucide-react'
import BreadCrumbCustom from '@/components/breadcrumb-custom'
import ProductImage from '@/components/public/parent/product/product-image'
import productApiRequest from '@/apiRequests/product'
import AddToCartButton from '@/components/public/parent/product/add-to-cart-button'
import ProductDescription from '@/components/public/parent/product/product-description'
import { wrapServerApi } from '@/lib/server-utils'

export default async function ProductDetail(props: { params: Promise<{ id: string }> }) {
  const params = await props.params

  const { id } = params

  const data = await wrapServerApi(() => productApiRequest.getProduct(id))
  const product = data?.payload?.data
  const overallRating = data?.payload?.data.averageRating ?? 0

  if (!product) {
    return <div>Product not found</div>
  }

  const changeCategoriesToString = (categories: string[]) => {
    return categories.join(', ')
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
          <p className='text-gray-500 mb-2'>
            {product.categories && changeCategoriesToString(product.categories.map((category) => category.name))}
          </p>
          <h2 className='text-4xl mb-4'>{product.name}</h2>
          <p className='text-2xl mb-4'>{(product.price - product.price * product.discount).toLocaleString()}đ</p>

          <p className='mb-6 line-clamp-3'>{product.description}</p>

          <div className='flex items-center mb-6'>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i <= Math.ceil(overallRating) ? 'text-yellow-400 fill-current' : 'text-gray-400 fill-current'}`}
              />
            ))}
            <span className='ml-2 text-gray-600'>({product.totalRating} đánh giá)</span>
            <Heart className='ml-4 w-5 h-5' />
            <Share2 className='ml-4 w-5 h-5' />
          </div>

          <AddToCartButton product={product} />

          <div className='space-y-2 text-sm mt-6'>
            <p className='flex items-center gap-2'>
              <Truck className='w-4 h-4 text-primary' />
              <span>Giao hàng miễn phí cho đơn hàng trên 500.000đ</span>
            </p>
            <p className='flex items-center gap-2'>
              <RotateCcw className='w-4 h-4 text-primary' />
              <span>Đổi trả trong vòng 30 ngày</span>
            </p>
            <p className='flex items-center gap-2'>
              <ShieldCheck className='w-4 h-4 text-primary' />
              <span>Bảo hành chính hãng 12 tháng</span>
            </p>
          </div>
        </div>
      </div>

      <ProductDescription description={product.description} detail={product.detail} guide={product.guide} id={id} />
    </section>
  )
}

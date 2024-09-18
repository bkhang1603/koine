import Image from 'next/image'
import { Star, Heart, Share2, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import images from '@/assets/images'

export default function ProductDetail() {
  return (
    <section className='container px-4 py-8'>
      {/* Product details */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4'>
        {/* Product images */}
        <div className='flex flex-col gap-2'>
          <Image src={images.product} alt='' width={1000} height={1000} className='w-full h-auto' />
          <div className='grid grid-cols-4 gap-2'>
            {[1, 2, 3, 4].map((i) => (
              <Image
                key={i}
                src={images.product}
                alt={`Thumbnail ${i}`}
                width={1000}
                height={1000}
                className='w-full h-full object-cover cursor-pointer rounded-lg'
              />
            ))}
          </div>
        </div>

        {/* Product info */}
        <div>
          <p className='text-gray-500 mb-2'>Quà tặng</p>
          <h2 className='text-4xl mb-4'>&quot;Trưởng thành là gì?&quot;</h2>
          <p className='text-2xl mb-4'>299.000đ</p>

          <p className='mb-6'>
            Hộp trưởng thành là một món quà ý nghĩa dành cho những người thân yêu của bạn. Hãy để chúng tôi giúp bạn đem
            món quà này đến với họ. Hãy để họ biết rằng bạn luôn ở bên họ, luôn ủng hộ họ và luôn yêu thương họ.
          </p>

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

            <Input type='text' value={1} className='w-16 text-center' />

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
            <p>Mã số sản phẩm: GEM-015-8392</p>
            <p>Thể loại: Quà tặng</p>
          </div>
        </div>
      </div>
    </section>
  )
}

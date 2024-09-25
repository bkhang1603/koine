import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import images from '@/assets/images'

type Product = {
  id: number
  name: string
  price: number
  quantity: number
  image: StaticImageData | string
}

export default function CartPopover() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Áo thun Cotton', price: 100000, quantity: 1, image: images.product2 },
    { id: 2, name: 'Quần jean', price: 100000, quantity: 1, image: images.product },
    { id: 3, name: 'Giày sneaker', price: 100000, quantity: 1, image: images.product2 },
    { id: 4, name: 'Áo khoác da', price: 100000, quantity: 1, image: images.product },
    { id: 5, name: 'Áo sơ mi', price: 100000, quantity: 1, image: images.product2 },
    { id: 6, name: 'Áo len', price: 100000, quantity: 1, image: images.product }
  ])

  const removeProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0)

  return (
    <div className='py-2'>
      <h3 className='font-medium text-lg mb-4'>Giỏ hàng của bạn</h3>
      <ScrollArea className='h-[300px] pr-2'>
        {products.map((product) => (
          <div key={product.id} className='flex items-center space-x-4 mb-4 last:mb-0'>
            <Image
              src={product.image}
              alt={product.name}
              width={1000}
              height={1000}
              quality={100}
              className='rounded-md w-16 h-16 object-cover'
            />
            <div className='flex-1'>
              <h4 className='font-medium'>{product.name}</h4>
              <p className='text-sm text-gray-500'>Số lượng: {product.quantity}</p>
              <p className='text-secondary font-medium'>{product.price.toLocaleString()} đ</p>
            </div>
            <Button
              className='focus-visible:ring-0'
              variant='ghost'
              size='icon'
              onClick={() => removeProduct(product.id)}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        ))}
      </ScrollArea>
      <Separator className='my-4' />
      <div className='flex justify-between items-center font-semibold mb-4'>
        <span>Tổng cộng:</span>
        <span>{total.toLocaleString()} đ</span>
      </div>
      <div className='space-y-2'>
        <Link href='/cart' passHref>
          <Button className='w-full'>Xem giỏ hàng</Button>
        </Link>
      </div>
    </div>
  )
}

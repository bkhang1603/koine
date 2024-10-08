import { ShoppingBag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Image from 'next/image'
import { CartDetailResType } from '@/schemaValidations/cart-detail.schema'
import { useCartDetailDeleteMutation } from '@/queries/useCartDetail'

export default function CartPopover({ data }: { data: CartDetailResType['data'] }) {
  const deleteMutation = useCartDetailDeleteMutation()

  const handleDelete = async (id: string) => {
    if (deleteMutation.isPending) return

    try {
      await deleteMutation.mutateAsync({ id })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='py-2'>
      <h3 className='font-medium text-lg mb-4'>Giỏ hàng của bạn</h3>
      <ScrollArea className='h-[250px] pr-2'>
        {data['cartDetails'].length === 0 && (
          <div className='flex flex-col gap-2 items-center justify-center h-[250px]'>
            <ShoppingBag className='w-16 h-16 text-gray-300' />
            <p className='text-gray-500'>Giỏ hàng trống</p>
          </div>
        )}

        {data['cartDetails'].map((data) => (
          <div key={data.id} className='flex items-center space-x-4 mb-4 last:mb-0'>
            {data.product && data.product.imageUrls && (
              <>
                <Image
                  src={data.product.imageUrls[0].imageUrl}
                  alt={data.product.name}
                  width={1000}
                  height={1000}
                  quality={100}
                  className='rounded-md w-16 h-16 object-cover'
                />

                <div className='flex-1'>
                  <h4 className='font-medium line-clamp-1'>{data.product.name}</h4>
                  <p className='text-sm text-gray-500'>Số lượng: {data.quantity}</p>
                  <p className='text-secondary font-medium'>
                    {data.unitPrice === 0 ? 'Miễn phí' : data.totalPrice.toLocaleString() + ' đ'}
                  </p>
                </div>
              </>
            )}

            {data.course && data.course.imageUrl && (
              <>
                <Image
                  src={data.course.imageUrl}
                  alt={data.course.title}
                  width={1000}
                  height={1000}
                  quality={100}
                  className='rounded-md w-16 h-16 object-cover'
                />

                <div className='flex-1'>
                  <h4 className='font-medium'>{data.course.title}</h4>
                  <p className='text-sm text-gray-500'>Số lượng: {data.quantity}</p>
                  <p className='text-secondary font-medium'>
                    {data.unitPrice === 0 ? 'Miễn phí' : data.totalPrice.toLocaleString() + ' đ'}
                  </p>
                </div>
              </>
            )}

            <Button className='focus-visible:ring-0' variant='ghost' size='icon' onClick={() => handleDelete(data.id)}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        ))}
      </ScrollArea>
      <Separator className='my-4' />
      <div className='flex justify-between items-center font-semibold mb-4'>
        <span>Tổng cộng:</span>
        <span>{data.totalAmount.toLocaleString()} đ</span>
      </div>
      <div className='space-y-2'>
        <Link href='/cart' passHref>
          <Button className='w-full'>Xem giỏ hàng</Button>
        </Link>
      </div>
    </div>
  )
}

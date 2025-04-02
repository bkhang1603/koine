import { ShoppingBag, X, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { CartDetailResType } from '@/schemaValidations/cart-detail.schema'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import configRoute from '@/config/route'
import { useCartDetailDeleteListMutation, useCartDetailDeleteMultipleMutation } from '@/queries/useCartDetail'
import { handleErrorApi } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'

export default function CartPopover({ data }: { data: CartDetailResType['data'] }) {
  const deleteMutation = useCartDetailDeleteListMutation()
  const deleteMultipleMutation = useCartDetailDeleteMultipleMutation()

  const handleDelete = async (id: string) => {
    if (deleteMutation.isPending) return

    try {
      await deleteMutation.mutateAsync({ id })
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  const handleDeleteMultiple = async (ids: string[]) => {
    try {
      if (deleteMultipleMutation.isPending) return

      await deleteMultipleMutation.mutateAsync({ ids })

      toast({
        description: 'Đã xóa tất cả sản phẩm khỏi giỏ hàng'
      })
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  return (
    <div className='p-0 rounded-lg border shadow-lg overflow-hidden'>
      <div className='py-3 px-4 bg-white border-b sticky top-0 z-10 flex items-center justify-between'>
        <h3 className='font-semibold text-lg flex items-center gap-2'>
          <ShoppingBag className='h-4 w-4' />
          Giỏ hàng
          {(data?.totalItems ?? 0) > 0 && (
            <Badge variant='secondary' className='ml-1 text-xs font-semibold'>
              {data.totalItems} mới
            </Badge>
          )}
        </h3>
        {data['cartDetails'].length > 0 && (
          <Button
            variant='ghost'
            size='sm'
            className='text-xs h-8 hover:bg-gray-100 focus-visible:ring-0'
            onClick={() => handleDeleteMultiple(data['cartDetails'].map((item) => item.id))}
          >
            Xóa tất cả
          </Button>
        )}
      </div>

      <ScrollArea className='h-[320px]'>
        {data['cartDetails'].length === 0 ? (
          <div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
            <div className='bg-gray-100 rounded-full p-4 mb-3'>
              <ShoppingBag className='h-8 w-8 text-muted-foreground/60' />
            </div>
            <h4 className='font-medium text-gray-700 mb-1'>Giỏ hàng trống</h4>
            <p className='text-sm text-muted-foreground max-w-[220px]'>
              Thêm sản phẩm vào giỏ hàng để tiến hành thanh toán
            </p>
          </div>
        ) : (
          <div>
            {data['cartDetails'].map((item) => (
              <div key={item.id} className='relative hover:bg-gray-50 transition-colors'>
                <div className='p-4 flex gap-3'>
                  {item.product?.imageUrl || item.course?.imageUrl ? (
                    <Image
                      src={item.product?.imageUrl || item.course?.imageUrl || ''}
                      alt={item.product?.name || item.course?.title || ''}
                      width={500}
                      height={500}
                      className='rounded-md w-16 h-16 object-cover flex-shrink-0'
                    />
                  ) : (
                    <div className='w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center'>
                      <ShoppingBag className='h-6 w-6 text-gray-400' />
                    </div>
                  )}

                  <div className='flex-1 min-w-0'>
                    <div className='flex justify-between items-start gap-2'>
                      <h4 className='font-medium text-sm line-clamp-1'>{item.product?.name || item.course?.title}</h4>
                      <Button variant='ghost' size='icon' className='h-6 w-6' onClick={() => handleDelete(item.id)}>
                        <X className='h-4 w-4' />
                      </Button>
                    </div>
                    <p className='text-xs text-muted-foreground'>Số lượng: {item.quantity}</p>
                    <p className='text-sm font-medium text-secondary'>
                      {item.totalPrice === 0 ? 'Miễn phí' : `${item.unitPrice.toLocaleString()} đ`}
                    </p>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {data['cartDetails'].length > 0 && (
        <>
          <div className='px-4 pt-3 bg-white flex justify-between items-center'>
            <span className='text-sm font-medium'>Tổng cộng:</span>
            <span className='font-semibold text-secondary'>{data.totalAmount.toLocaleString()} đ</span>
          </div>
          <div className='px-4 pb-4 pt-2'>
            <Button className='w-full justify-between' size='sm' asChild>
              <Link href={configRoute.cart}>
                <span>Xem giỏ hàng</span>
                <ChevronRight className='h-4 w-4 ml-1' />
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

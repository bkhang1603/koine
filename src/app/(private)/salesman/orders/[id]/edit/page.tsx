'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockOrders } from '../../../_mock/data'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { Params } from '@/types/query'
import { use } from 'react'

export default function EditOrderPage(props: { params: Params }) {
  const params = use(props.params)
  const router = useRouter()
  const order = mockOrders.find((o) => o.id === params.id)

  if (!order) {
    return <div>Không tìm thấy đơn hàng</div>
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Update order:', order.id)
    router.push(`/salesman/orders/${order.id}`)
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      <Button variant='ghost' size='icon' asChild>
        <Link href={`/salesman/orders/${params.id}`}>
          <ArrowLeft className='w-4 h-4' />
        </Link>
      </Button>

      <div>
        <h1 className='text-2xl font-bold'>Cập nhật đơn hàng #{order.id}</h1>
        <p className='text-muted-foreground mt-1'>Cập nhật trạng thái và ghi chú đơn hàng</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='grid gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Trạng thái</label>
                <Select defaultValue={order.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='pending'>Chờ xử lý</SelectItem>
                    <SelectItem value='processing'>Đang xử lý</SelectItem>
                    <SelectItem value='completed'>Hoàn thành</SelectItem>
                    <SelectItem value='cancelled'>Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Ghi chú</label>
                <Textarea placeholder='Nhập ghi chú cho đơn hàng...' />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <div className='text-sm text-muted-foreground'>Khách hàng</div>
                <div className='font-medium'>Haha</div>
              </div>
              <div>
                <div className='text-sm text-muted-foreground'>Sản phẩm</div>
                <div className='font-medium'>Haha</div>
              </div>
              <div>
                <div className='text-sm text-muted-foreground'>Tổng tiền</div>
                <div className='font-medium'>{order.total}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='flex justify-end mt-6'>
          <div className='flex gap-2'>
            <Button variant='outline' asChild>
              <Link href={`/salesman/orders/${order.id}`}>Hủy</Link>
            </Button>
            <Button type='submit'>Cập nhật</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

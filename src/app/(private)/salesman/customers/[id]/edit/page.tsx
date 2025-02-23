'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockCustomers } from '../../../_mock/data'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const customer = mockCustomers.find((c) => c.id === params.id)

  if (!customer) {
    return <div>Không tìm thấy khách hàng</div>
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Update customer:', customer.id)
    router.push(`/salesman/customers/${customer.id}`)
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      <Button variant='ghost' size='icon' asChild>
        <Link href={`/salesman/customers/${params.id}`}>
          <ArrowLeft className='w-4 h-4' />
        </Link>
      </Button>

      <div>
        <h1 className='text-2xl font-bold'>Chỉnh sửa thông tin khách hàng</h1>
        <p className='text-muted-foreground mt-1'>Cập nhật thông tin khách hàng</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='grid gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Họ tên</label>
                <Input defaultValue={customer.name} />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Email</label>
                <Input defaultValue={customer.email} />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Số điện thoại</label>
                <Input defaultValue={customer.phone} />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Trạng thái</label>
                <Select defaultValue={customer.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='active'>Hoạt động</SelectItem>
                    <SelectItem value='inactive'>Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin mua hàng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <div className='text-sm text-muted-foreground'>Tổng đơn hàng</div>
                <div className='font-medium'>{customer.totalOrders}</div>
              </div>
              <div>
                <div className='text-sm text-muted-foreground'>Tổng chi tiêu</div>
                <div className='font-medium'>{customer.totalSpent}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='flex justify-end mt-6'>
          <div className='flex gap-2'>
            <Button variant='outline' asChild>
              <Link href={`/salesman/customers/${customer.id}`}>Hủy</Link>
            </Button>
            <Button type='submit'>Cập nhật</Button>
          </div>
        </div>
      </form>
    </div>
  )
} 
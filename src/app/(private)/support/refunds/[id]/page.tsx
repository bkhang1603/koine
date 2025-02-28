'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Clock, FileText, DollarSign, AlertCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { getRefund, getUser } from '../../_data/mock'
import { Params } from '@/types/query'
import { use } from 'react'

export default function RefundDetailPage(props: { params: Params }) {
  const params = use(props.params)
  const refund = getRefund(params.id)
  const user = refund ? getUser(refund.userId) : null

  if (!refund || !user) {
    return <div>Không tìm thấy yêu cầu hoàn tiền</div>
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Button variant='ghost' asChild>
          <Link href='/support/refunds'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Quay lại
          </Link>
        </Button>
        <h1 className='text-2xl font-bold'>Yêu cầu #{refund.id}</h1>
        <Badge variant={refund.status === 'pending' ? 'secondary' : 'default'}>
          {refund.status === 'pending' ? 'Chờ xử lý' : 'Đã duyệt'}
        </Badge>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        {/* Main Content */}
        <div className='col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết yêu cầu</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div>
                <h3 className='font-medium mb-2'>{refund.item}</h3>
                <p className='text-sm text-muted-foreground whitespace-pre-line'>{refund.reason}</p>
              </div>
              <Separator />
              <div className='flex justify-between text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <Clock className='w-4 h-4' />
                  <span>Ngày mua: {new Date(refund.purchaseDate).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='w-4 h-4' />
                  <span>Yêu cầu: {new Date(refund.createdAt).toLocaleString('vi-VN')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Note Box */}
          <Card>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <Textarea placeholder='Nhập ghi chú xử lý...' className='min-h-[100px]' />
                <div className='flex justify-end gap-2'>
                  <Button variant='outline'>Từ chối</Button>
                  <Button>Chấp nhận hoàn tiền</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* User Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin người yêu cầu</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-4'>
                <Avatar className='w-16 h-16'>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium'>{user.name}</p>
                  <p className='text-sm text-muted-foreground'>{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin hoàn tiền</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <FileText className='w-4 h-4' />
                  <span>Loại: {refund.type === 'course' ? 'Khóa học' : 'Sản phẩm'}</span>
                </div>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <DollarSign className='w-4 h-4' />
                  <span>Số tiền: {refund.amount.toLocaleString('vi-VN')}đ</span>
                </div>
                {refund.type === 'course' ? (
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <AlertCircle className='w-4 h-4' />
                    <span>Tiến độ học: {refund.progress}</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <AlertCircle className='w-4 h-4' />
                    <span>Tình trạng: {refund.condition === 'unopened' ? 'Chưa mở seal' : 'Đã mở'}</span>
                  </div>
                )}
              </div>
              <Separator />
              <div className='space-y-2'>
                <p className='text-sm text-muted-foreground'>Chính sách hoàn tiền</p>
                <p className='text-sm'>
                  {refund.type === 'course'
                    ? 'Học viên được hoàn tiền trong vòng 7 ngày kể từ ngày mua khóa học nếu hoàn thành dưới 30% khóa học.'
                    : 'Sản phẩm được hoàn tiền trong vòng 7 ngày nếu còn nguyên seal hoặc có lỗi từ nhà sản xuất.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

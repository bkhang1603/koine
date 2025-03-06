'use client'
import { use } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Phone, Mail, Clock, FileText } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { getTicket, getUser } from '../../_data/mock'

interface TicketDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function TicketDetailPage(props: TicketDetailPageProps) {
  const params = use(props.params)
  const ticket = getTicket(params.id)
  const user = ticket ? getUser(ticket.userId) : null

  if (!ticket || !user) {
    return <div>Không tìm thấy ticket</div>
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Button variant='ghost' asChild>
          <Link href='/support/tickets'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Quay lại
          </Link>
        </Button>
        <h1 className='text-2xl font-bold'>Ticket #{ticket.id}</h1>
        <Badge variant={ticket.status === 'pending' ? 'secondary' : 'default'}>
          {ticket.status === 'pending' ? 'Chờ xử lý' : 'Đang xử lý'}
        </Badge>
        <Badge variant={ticket.priority === 'high' ? 'destructive' : 'outline'}>
          {ticket.priority === 'high' ? 'Ưu tiên cao' : 'Bình thường'}
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
                <h3 className='font-medium mb-2'>{ticket.title}</h3>
                <p className='text-sm text-muted-foreground whitespace-pre-line'>{ticket.description}</p>
              </div>
              <Separator />
              <div className='flex justify-between text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <Clock className='w-4 h-4' />
                  <span>Tạo lúc: {new Date(ticket.createdAt).toLocaleString('vi-VN')}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='w-4 h-4' />
                  <span>Cập nhật: {new Date(ticket.lastUpdate).toLocaleString('vi-VN')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reply Box */}
          <Card>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <Textarea placeholder='Nhập phản hồi...' className='min-h-[100px]' />
                <div className='flex justify-end gap-2'>
                  <Button variant='outline'>Đánh dấu đã giải quyết</Button>
                  <Button>Gửi phản hồi</Button>
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
              <Separator />
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Phone className='w-4 h-4' />
                  <span>{user.phone}</span>
                </div>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Mail className='w-4 h-4' />
                  <span>{user.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin ticket</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <FileText className='w-4 h-4' />
                  <span>Danh mục: {ticket.category}</span>
                </div>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Phone className='w-4 h-4' />
                  <span>Liên hệ qua: {ticket.contactMethod === 'phone' ? 'Điện thoại' : 'Email'}</span>
                </div>
                {ticket.preferredTime && (
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <Clock className='w-4 h-4' />
                    <span>Thời gian phù hợp: {ticket.preferredTime}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

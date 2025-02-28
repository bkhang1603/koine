'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockCourses } from '../../_mock/data'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Tags, Users, Clock, Star, Trophy } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { PriceInfoCard } from '@/components/private/salesman/price-info-card'
import { Params } from '@/types/query'
import { use } from 'react'

export default function CourseDetailPage(props: { params: Params }) {
  const params = use(props.params)
  const course = mockCourses.find((c) => c.id === params.id)

  if (!course) {
    return <div>Không tìm thấy khóa học</div>
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' asChild>
            <Link href='/salesman/courses'>
              <ArrowLeft className='w-4 h-4' />
            </Link>
          </Button>
          <div>
            <h1 className='text-2xl font-bold'>Chi tiết khóa học</h1>
            <p className='text-sm text-muted-foreground'>Quản lý thông tin khóa học</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' asChild>
            <Link href={`/salesman/courses/${params.id}/edit`}>
              <Edit className='w-4 h-4 mr-2' />
              Chỉnh sửa
            </Link>
          </Button>
          <Button>
            <Tags className='w-4 h-4 mr-2' />
            Thêm khuyến mãi
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        {/* Thông tin cơ bản */}
        <Card className='col-span-2 space-y-6'>
          <CardHeader>
            <CardTitle>Thông tin khóa học</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex gap-6'>
              <div className='relative w-40 h-40 rounded-lg overflow-hidden'>
                <Image src={course.imageUrl} alt={course.title} fill className='object-cover' />
              </div>
              <div className='flex-1 space-y-4'>
                <div>
                  <div className='text-sm text-muted-foreground'>Tên khóa học</div>
                  <div className='text-lg font-medium'>{course.title}</div>
                </div>
                <div className='flex gap-2'>
                  <Badge variant='outline'>
                    {course.categories.some((category) => category.id === 'language') ? 'Ngoại ngữ' : 'Kỹ năng'}
                  </Badge>
                  {/* <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                    {course.status === 'active' ? 'Đang mở' : 'Tạm dừng'}
                  </Badge> */}
                </div>
              </div>
            </div>

            <Separator />

            {/* Thống kê */}
            <div className='grid grid-cols-3 gap-4'>
              <div className='p-4 bg-muted/50 rounded-lg space-y-1'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Users className='w-4 h-4' />
                  <span>Học viên</span>
                </div>
                <div className='text-2xl font-bold'>{course.totalEnrollment}</div>
              </div>
              <div className='p-4 bg-muted/50 rounded-lg space-y-1'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Trophy className='w-4 h-4' />
                  <span>Tỷ lệ hoàn thành</span>
                </div>
                <div className='text-2xl font-bold'>100%</div>
              </div>
              <div className='p-4 bg-muted/50 rounded-lg space-y-1'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Star className='w-4 h-4' />
                  <span>Đánh giá</span>
                </div>
                <div className='text-2xl font-bold'>{course.aveRating}</div>
              </div>
            </div>

            {/* Mô tả */}
            <div>
              <h3 className='font-medium mb-3'>Mô tả khóa học</h3>
              <div className='prose max-w-none'>
                <p className='text-muted-foreground'>{course.description}</p>
              </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className='grid grid-cols-2 gap-6'>
              <div>
                <h3 className='font-medium mb-3'>Thông tin chung</h3>
                <div className='space-y-2'>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Mã khóa học</span>
                    <span className='font-medium'>{course.id}</span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Giảng viên</span>
                    <span className='font-medium'>Haha</span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Thời lượng</span>
                    <span className='font-medium'>{course.durations}</span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Trình độ</span>
                    <span className='font-medium'>Cơ bản</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='font-medium mb-3'>Nội dung học tập</h3>
                <div className='space-y-2'>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Số bài giảng</span>
                    <span className='font-medium'>24 bài</span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Bài tập</span>
                    <span className='font-medium'>12 bài</span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Tài liệu</span>
                    <span className='font-medium'>15 file</span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Chứng chỉ</span>
                    <span className='font-medium'>Có</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview nội dung */}
            <div>
              <h3 className='font-medium mb-3'>Preview nội dung</h3>
              <div className='grid grid-cols-4 gap-4'>
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className='relative aspect-video rounded-lg overflow-hidden'>
                    <Image
                      src={`https://picsum.photos/seed/lesson${i}/400/225`}
                      alt={`Bài giảng ${i + 1}`}
                      fill
                      className='object-cover hover:scale-110 transition-transform'
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Thông tin giá */}
          <PriceInfoCard
            price={course.price.toString()}
            originalPrice={course.price.toString()}
            discount={course.discount.toString()}
            type='course'
          />

          {/* Thống kê chi tiết */}
          <Card>
            <CardHeader>
              <CardTitle>Thống kê chi tiết</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='text-sm text-muted-foreground'>Đánh giá trung bình</div>
                <div className='flex items-center gap-1'>
                  <span className='font-medium'>{course.aveRating}</span>
                  <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-sm text-muted-foreground'>Lượt đánh giá</div>
                <div className='font-medium'>100</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-sm text-muted-foreground'>Đăng ký trong tháng</div>
                <div className='font-medium'>100</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-sm text-muted-foreground'>Tỷ lệ hoàn thành</div>
                <div className='font-medium'>100%</div>
              </div>
            </CardContent>
          </Card>

          {/* Lịch sử cập nhật */}
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử cập nhật</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-3 text-sm'>
                <Clock className='w-4 h-4 text-muted-foreground' />
                <div className='flex-1'>Cập nhật giá bán</div>
                <div className='text-muted-foreground'>1 giờ trước</div>
              </div>
              <div className='flex items-center gap-3 text-sm'>
                <Clock className='w-4 h-4 text-muted-foreground' />
                <div className='flex-1'>Thêm bài giảng mới</div>
                <div className='text-muted-foreground'>2 giờ trước</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

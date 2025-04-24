import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Gift, PlayCircle, Sparkles, Tag, Users2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import configRoute from '@/config/route'

interface PurchasedCourseCardProps {
  courseItem: {
    course: {
      id: string
      title: string
      level: string
      durationDisplay: string
      price: number
      imageUrl: string
      createAtFormatted: string
      categories: { id: string; name: string }[]
    }
    quantityAtPurchase: number
    unusedQuantity: number
    assignedTo: { id: string; name: string; imageUrl: string }[]
  }
  childAccounts: { id: string; name: string }[]
}

export function PurchasedCourseCard({ courseItem, childAccounts }: PurchasedCourseCardProps) {
  const { course, unusedQuantity, assignedTo } = courseItem

  // Trạng thái khóa học
  const status = unusedQuantity > 0 ? 'not_activated' : assignedTo.length > 0 ? 'activated' : 'expired'
  const activationType = assignedTo.length > 0 ? 'child' : 'self'
  const activatedFor = assignedTo.length > 0 ? assignedTo[0].name : ''

  // Cấu hình hiển thị trạng thái
  const statusConfig = {
    not_activated: { label: 'Chưa kích hoạt', variant: 'secondary' as const, color: 'text-gray-600' },
    activated: { label: 'Đang hoạt động', variant: 'success' as const, color: 'text-green-600' },
    expired: { label: 'Đã hết hạn', variant: 'destructive' as const, color: 'text-red-600' }
  }

  // Lấy thông tin categoria đầu tiên nếu có
  const primaryCategory = course.categories?.[0]?.name || 'Không phân loại'

  return (
    <Card className='overflow-hidden border-gray-100 shadow-sm hover:shadow transition-all duration-300'>
      <CardContent className='p-0'>
        <div className='flex flex-col md:flex-row'>
          {/* Course Image */}
          <div className='relative h-48 md:h-auto md:w-64 flex-shrink-0 overflow-hidden'>
            <Image
              src={course.imageUrl || '/placeholder-course.jpg'}
              alt={course.title}
              fill
              sizes='(max-width: 768px) 100vw, 256px'
              className='object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent'>
              <div className='absolute bottom-0 p-4 w-full'>
                <div className='flex gap-2 flex-wrap mb-2'>
                  <Badge className='bg-white/20 backdrop-blur-sm text-white text-xs font-normal'>{course.level}</Badge>
                  <Badge className='bg-white/20 backdrop-blur-sm text-white text-xs font-normal'>
                    {course.durationDisplay}
                  </Badge>
                </div>
                <h3 className='text-white font-medium line-clamp-2'>{course.title}</h3>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className='flex-1 p-5 flex flex-col'>
            <div className='flex flex-wrap justify-between gap-y-4 pb-4 border-b border-gray-100'>
              {/* Category */}
              <div className='space-y-1'>
                <p className='text-xs text-gray-500 flex items-center'>
                  <Tag className='h-3.5 w-3.5 mr-1.5 text-gray-400' />
                  Danh mục
                </p>
                <p className='font-medium'>{primaryCategory}</p>
              </div>

              {/* Purchase Date */}
              <div className='space-y-1'>
                <p className='text-xs text-gray-500 flex items-center'>
                  <Calendar className='h-3.5 w-3.5 mr-1.5 text-gray-400' />
                  Ngày mua
                </p>
                <p className='font-medium'>{course.createAtFormatted}</p>
              </div>

              {/* Status */}
              <div className='space-y-1'>
                <p className='text-xs text-gray-500 flex items-center'>
                  <Clock className='h-3.5 w-3.5 mr-1.5 text-gray-400' />
                  Trạng thái
                </p>
                <p className={`font-medium ${statusConfig[status].color}`}>{statusConfig[status].label}</p>
              </div>
            </div>

            {/* Course details */}
            <div className='flex-grow space-y-4'>
              {/* Assignment Info */}
              <div className='flex justify-between py-3'>
                <div>
                  <span className='text-sm text-gray-700'>Số lượng: </span>
                  <span className='font-medium'>{courseItem.quantityAtPurchase}</span>
                </div>
                <div>
                  <span className='text-sm text-gray-700'>Còn lại: </span>
                  <span className='font-medium'>{unusedQuantity}</span>
                </div>
              </div>

              {/* Assigned Users */}
              {assignedTo.length > 0 && (
                <div className='mb-4'>
                  <p className='text-sm text-gray-700 mb-2'>Đã kích hoạt cho:</p>
                  <div className='flex flex-wrap gap-2'>
                    {assignedTo.map((user) => (
                      <div key={user.id} className='flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full text-sm'>
                        <div className='relative h-4 w-4 rounded-full overflow-hidden'>
                          <Image
                            src={user.imageUrl || '/placeholder-avatar.jpg'}
                            alt={user.name}
                            fill
                            className='object-cover'
                          />
                        </div>
                        {user.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div>
                {status === 'not_activated' ? (
                  <div className='flex gap-2'>
                    <Button className='flex-1 bg-gradient-to-r from-primary to-primary/90 shadow-sm'>
                      <Gift className='w-4 h-4 mr-2' />
                      Kích hoạt cho bản thân
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='outline'
                          size='icon'
                          className='border-gray-200 hover:border-primary/30 hover:bg-primary/5'
                        >
                          <Users2 className='w-4 h-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end' className='w-56'>
                        <DropdownMenuItem disabled className='text-gray-500 font-medium'>
                          Kích hoạt cho con
                        </DropdownMenuItem>
                        {childAccounts.map((child) => (
                          <DropdownMenuItem
                            key={child.id}
                            className='flex items-center gap-2 cursor-pointer hover:bg-primary/5'
                          >
                            <div className='h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center'>
                              <Users2 className='w-3 h-3 text-primary' />
                            </div>
                            {child.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : status === 'activated' ? (
                  activationType === 'self' ? (
                    <Button asChild className='w-full bg-gradient-to-r from-primary to-primary/90 shadow-sm'>
                      <Link href={`${configRoute.learn}/${course.id}`}>
                        <PlayCircle className='w-4 h-4 mr-2' />
                        Vào học ngay
                      </Link>
                    </Button>
                  ) : (
                    <div className='flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-100'>
                      <div className='flex items-center gap-2 text-sm text-gray-600'>
                        <Users2 className='w-4 h-4' />
                        Đã kích hoạt cho {activatedFor}
                      </div>
                      <Badge variant='outline' className='bg-white border-gray-200'>
                        Không thể truy cập
                      </Badge>
                    </div>
                  )
                ) : (
                  <Button className='w-full bg-gradient-to-r from-primary to-primary/90 shadow-sm'>
                    <Sparkles className='w-4 h-4 mr-2' />
                    Gia hạn khóa học
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

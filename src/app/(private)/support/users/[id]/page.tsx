'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Clock, DollarSign, Users, BookOpen, Package, Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { getUser } from '../../_data/mock'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface UserDetailPageProps {
  params: {
    id: string
  }
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const user = getUser(params.id)

  if (!user) {
    return <div>Không tìm thấy người dùng</div>
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Button variant='ghost' asChild>
          <Link href='/support/users'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Quay lại
          </Link>
        </Button>
        <h1 className='text-2xl font-bold'>Thông tin người dùng</h1>
        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
          {user.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
        </Badge>
      </div>

      <Tabs defaultValue='overview' className='space-y-6'>
        <TabsList>
          <TabsTrigger value='overview'>Tổng quan</TabsTrigger>
          {user.role === 'parent' && (
            <>
              <TabsTrigger value='courses'>Khóa học</TabsTrigger>
              <TabsTrigger value='orders'>Đơn hàng</TabsTrigger>
              <TabsTrigger value='children'>Tài khoản con</TabsTrigger>
            </>
          )}
          <TabsTrigger value='tickets'>Tickets</TabsTrigger>
        </TabsList>

        {/* Tab Tổng quan */}
        <TabsContent value='overview'>
          <div className='grid gap-6'>
            {/* Thông tin chung */}
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-base font-medium'>Thông tin học tập</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center gap-4'>
                    <div className='p-3 bg-blue-50 rounded-full'>
                      <BookOpen className='w-6 h-6 text-blue-500' />
                    </div>
                    <div>
                      <p className='text-sm text-muted-foreground'>Khóa học đang học</p>
                      <p className='text-2xl font-bold'>{user.courses?.length || 0}</p>
                    </div>
                  </div>
                  <div className='mt-4 space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>Hoàn thành</span>
                      <span className='font-medium'>
                        {user.courses?.filter((c) => c.status === 'completed').length || 0} khóa học
                      </span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>Điểm trung bình</span>
                      <span className='font-medium'>
                        {Math.round(
                          (user.courses?.reduce((acc, cur) => acc + (cur.score || 0), 0) || 0) /
                            (user.courses?.length || 1)
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {user.role === 'parent' && (
                <>
                  <Card>
                    <CardHeader className='pb-2'>
                      <CardTitle className='text-base font-medium'>Tài khoản con</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='flex items-center gap-4'>
                        <div className='p-3 bg-purple-50 rounded-full'>
                          <Users className='w-6 h-6 text-purple-500' />
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>Số tài khoản con</p>
                          <p className='text-2xl font-bold'>{user.childAccounts?.length || 0}</p>
                        </div>
                      </div>
                      <div className='mt-4 space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-muted-foreground'>Đang học</span>
                          <span className='font-medium'>
                            {user.childAccounts?.reduce((acc, cur) => acc + cur.activeCourses, 0)} khóa học
                          </span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-muted-foreground'>Đã hoàn thành</span>
                          <span className='font-medium'>
                            {user.childAccounts?.reduce((acc, cur) => acc + cur.completedCourses, 0)} khóa học
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className='pb-2'>
                      <CardTitle className='text-base font-medium'>Tổng chi tiêu</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='flex items-center gap-4'>
                        <div className='p-3 bg-green-50 rounded-full'>
                          <DollarSign className='w-6 h-6 text-green-500' />
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>Đã chi tiêu</p>
                          <p className='text-2xl font-bold'>{user.stats.totalSpent.toLocaleString()}đ</p>
                        </div>
                      </div>
                      <div className='mt-4 space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-muted-foreground'>Số đơn hàng</span>
                          <span className='font-medium'>{user.products?.length || 0} đơn</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-muted-foreground'>Trung bình/đơn</span>
                          <span className='font-medium'>
                            {Math.round(user.stats.totalSpent / (user.products?.length || 1)).toLocaleString()}đ
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* Khóa học gần đây */}
            <Card>
              <CardHeader>
                <CardTitle>Khóa học gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {user.courses?.slice(0, 3).map((course) => (
                    <div key={course.id} className='flex items-center gap-4 p-4 bg-muted rounded-lg'>
                      <div className='p-2 bg-blue-50 rounded-full'>
                        <BookOpen className='w-5 h-5 text-blue-500' />
                      </div>
                      <div className='flex-1'>
                        <div className='flex justify-between items-start'>
                          <div>
                            <h4 className='font-medium'>{course.name}</h4>
                            <p className='text-sm text-muted-foreground'>
                              Cập nhật:{' '}
                              {formatDistanceToNow(new Date(course.lastAccess), { addSuffix: true, locale: vi })}
                            </p>
                          </div>
                          <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                            {course.status === 'active' ? 'Đang học' : 'Hoàn thành'}
                          </Badge>
                        </div>
                        <div className='mt-2'>
                          <div className='flex justify-between text-sm mb-1'>
                            <span className='text-muted-foreground'>Tiến độ</span>
                            <div className='flex items-center gap-2'>
                              <span>{course.progress}%</span>
                              {course.score && (
                                <>
                                  <span>•</span>
                                  <div className='flex items-center gap-1'>
                                    <Star className='w-4 h-4 fill-yellow-400' />
                                    <span>{course.score} điểm</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <Progress value={course.progress} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Khóa học */}
        {user.role === 'parent' && (
          <TabsContent value='courses'>
            <div className='space-y-6'>
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {user.courses?.map((course) => (
                  <Card key={course.id} className='relative overflow-hidden'>
                    <div
                      className={cn(
                        'absolute inset-0 w-2',
                        course.status === 'active' ? 'bg-blue-500' : 'bg-green-500'
                      )}
                    />
                    <CardContent className='pt-6'>
                      <div className='flex justify-between items-start mb-4'>
                        <div>
                          <h4 className='font-medium'>{course.name}</h4>
                          <p className='text-sm text-muted-foreground'>
                            Bắt đầu: {new Date(course.startDate).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                          {course.status === 'active' ? 'Đang học' : 'Hoàn thành'}
                        </Badge>
                      </div>

                      <div className='space-y-4'>
                        <div>
                          <div className='flex justify-between text-sm mb-1'>
                            <span className='text-muted-foreground'>Tiến độ</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} />
                        </div>

                        <div className='flex items-center justify-between text-sm'>
                          <div className='flex items-center gap-2'>
                            <Clock className='w-4 h-4 text-muted-foreground' />
                            <span className='text-muted-foreground'>
                              Hoạt động cuối:{' '}
                              {formatDistanceToNow(new Date(course.lastAccess), { addSuffix: true, locale: vi })}
                            </span>
                          </div>
                          {course.score && (
                            <div className='flex items-center gap-1'>
                              <Star className='w-4 h-4 fill-yellow-400' />
                              <span className='font-medium'>{course.score} điểm</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        )}

        {/* Tab Tài khoản con */}
        <TabsContent value='children'>
          <div className='grid gap-6 md:grid-cols-2'>
            {user.childAccounts.map((child) => (
              <Card key={child.id}>
                <CardHeader>
                  <div className='flex items-center gap-4'>
                    <Avatar className='w-12 h-12'>
                      <AvatarImage src={child.avatar} />
                      <AvatarFallback>{child.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className='font-medium'>{child.name}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {child.age} tuổi • {child.grade} • {child.school}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='grid grid-cols-3 gap-4'>
                    <div className='p-4 bg-muted rounded-lg'>
                      <div className='flex items-center gap-2 text-sm text-muted-foreground mb-1'>
                        <BookOpen className='w-4 h-4' />
                        <span>Đang học</span>
                      </div>
                      <p className='text-2xl font-medium'>{child.activeCourses}</p>
                    </div>
                    <div className='p-4 bg-muted rounded-lg'>
                      <div className='flex items-center gap-2 text-sm text-muted-foreground mb-1'>
                        <Star className='w-4 h-4' />
                        <span>Hoàn thành</span>
                      </div>
                      <p className='text-2xl font-medium'>{child.completedCourses}</p>
                    </div>
                    <div className='p-4 bg-muted rounded-lg'>
                      <div className='flex items-center gap-2 text-sm text-muted-foreground mb-1'>
                        <Clock className='w-4 h-4' />
                        <span>Thời gian học</span>
                      </div>
                      <p className='text-2xl font-medium'>45p/ngày</p>
                    </div>
                  </div>

                  <div>
                    <h4 className='font-medium mb-4'>Khóa học gần đây</h4>
                    <div className='space-y-4'>
                      {child.courses.slice(0, 3).map((course) => (
                        <div key={course.id} className='flex items-center gap-4 p-4 bg-muted rounded-lg'>
                          <div className='flex-1'>
                            <div className='flex justify-between items-start'>
                              <div>
                                <h5 className='font-medium'>{course.name}</h5>
                                <div className='flex items-center gap-2 text-sm text-muted-foreground mt-1'>
                                  {course.score && (
                                    <div className='flex items-center gap-1'>
                                      <Star className='w-4 h-4 fill-yellow-400' />
                                      <span>{course.score} điểm</span>
                                    </div>
                                  )}
                                  <span>•</span>
                                  <span>{course.progress}% hoàn thành</span>
                                </div>
                              </div>
                              <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                                {course.status === 'active' ? 'Đang học' : 'Hoàn thành'}
                              </Badge>
                            </div>
                            <Progress value={course.progress} className='mt-2' />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab Orders */}
        {user.role === 'parent' && (
          <TabsContent value='orders'>
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử đơn hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã đơn</TableHead>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead>Ngày đặt</TableHead>
                      <TableHead>Giá tiền</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.products?.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className='font-medium'>{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{new Date(product.orderDate).toLocaleDateString('vi-VN')}</TableCell>
                        <TableCell>{product.price.toLocaleString()}đ</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              product.status === 'delivered'
                                ? 'green'
                                : product.status === 'processing'
                                  ? 'default'
                                  : 'destructive'
                            }
                          >
                            {product.status === 'delivered'
                              ? 'Đã giao'
                              : product.status === 'processing'
                                ? 'Đang xử lý'
                                : 'Đã hủy'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Tab Tickets */}
        <TabsContent value='tickets'>
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử hỗ trợ</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Độ ưu tiên</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className='font-medium'>{ticket.id}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>
                        <Badge variant={ticket.status === 'pending' ? 'secondary' : 'default'}>
                          {ticket.status === 'pending' ? 'Chờ xử lý' : 'Đã giải quyết'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={ticket.priority === 'high' ? 'destructive' : 'outline'}>
                          {ticket.priority === 'high' ? 'Cao' : 'Trung bình'}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(ticket.createdAt).toLocaleString('vi-VN')}</TableCell>
                      <TableCell>
                        <Button variant='ghost' size='sm' asChild>
                          <Link href={`/support/tickets/${ticket.id}`}>Xem chi tiết</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

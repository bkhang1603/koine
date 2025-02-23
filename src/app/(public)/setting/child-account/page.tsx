'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Search, Plus, Users, ChevronRight, BookOpen, BarChart2, Calendar } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CardHeader, CardTitle } from '@/components/ui/card'

interface SubAccount {
  id: string
  name: string
  email: string
  avatar: string
  courses: Course[]
  lastLogin: Date
  totalStudyTime: number
  recentActivities: Activity[]
}

interface Course {
  id: number
  title: string
  progress: number
  lastAccessed: Date
}

interface Activity {
  id: number
  type: 'course_progress' | 'course_completed' | 'quiz_completed'
  description: string
  date: Date
}

const MOCK_ACCOUNTS: SubAccount[] = [
  {
    id: '1',
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    courses: [
      { id: 1, title: 'Khóa học lập trình Python cơ bản', progress: 75, lastAccessed: new Date('2024-01-15') },
      { id: 2, title: 'Khóa học tiếng Anh giao tiếp', progress: 45, lastAccessed: new Date('2024-01-20') }
    ],
    lastLogin: new Date('2024-01-21'),
    totalStudyTime: 2160, // 36 hours
    recentActivities: [
      {
        id: 1,
        type: 'course_progress',
        description: 'Hoàn thành bài học "Biến và kiểu dữ liệu"',
        date: new Date('2024-01-21')
      }
    ]
  },
  {
    id: '2',
    name: 'Trần Thị Bình',
    email: 'tranbinh@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    courses: [
      { id: 3, title: 'Khóa học Toán nâng cao', progress: 90, lastAccessed: new Date('2024-01-19') },
      { id: 4, title: 'Khóa học Vật lý cơ bản', progress: 60, lastAccessed: new Date('2024-01-21') }
    ],
    lastLogin: new Date('2024-01-22'),
    totalStudyTime: 1800, // 30 hours
    recentActivities: [
      {
        id: 2,
        type: 'quiz_completed',
        description: 'Đạt điểm 9/10 trong bài kiểm tra Toán',
        date: new Date('2024-01-22')
      }
    ]
  },
  {
    id: '3',
    name: 'Lê Hoàng Cường',
    email: 'hoangcuong@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    courses: [{ id: 5, title: 'Khóa học Hóa học', progress: 30, lastAccessed: new Date('2024-01-20') }],
    lastLogin: new Date('2024-01-23'),
    totalStudyTime: 900, // 15 hours
    recentActivities: [
      {
        id: 3,
        type: 'course_completed',
        description: 'Bắt đầu khóa học Hóa học mới',
        date: new Date('2024-01-23')
      }
    ]
  }
]

export default function ChildAccountsPage() {
  const [accounts, setAccounts] = useState<SubAccount[]>(MOCK_ACCOUNTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [newAccount, setNewAccount] = useState({ name: '', email: '' })
  const { toast } = useToast()

  const handleCreateAccount = () => {
    if (!newAccount.name || !newAccount.email) {
      toast({
        title: 'Thông tin không đầy đủ',
        description: 'Vui lòng điền đầy đủ thông tin tài khoản.',
        variant: 'destructive'
      })
      return
    }
    // Add new account logic
  }

  const getActivityTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) return `${diffInHours} giờ trước`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return 'Hôm qua'
    if (diffInDays < 7) return `${diffInDays} ngày trước`
    return date.toLocaleDateString('vi-VN')
  }

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) return `${mins}p`
    if (mins === 0) return `${hours}g`
    return `${hours}g ${mins}p`
  }

  const getAverageProgress = (account: SubAccount) => {
    if (!account.courses.length) return 0
    return Math.round(account.courses.reduce((sum, course) => sum + course.progress, 0) / account.courses.length)
  }

  return (
    <div className='container mx-auto p-6 max-w-7xl'>
      {/* Header & Quick Stats */}
      <div className='space-y-6'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold'>Quản lý tài khoản con</h1>
            <p className='text-gray-500 mt-1'>Theo dõi và quản lý việc học tập của con</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='lg'>
                <Plus className='w-4 h-4 mr-2' /> Thêm tài khoản con
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo tài khoản con mới</DialogTitle>
                <DialogDescription>Điền thông tin để tạo tài khoản cho con của bạn</DialogDescription>
              </DialogHeader>
              <div className='space-y-4 py-4'>
                <div className='space-y-2'>
                  <label>Tên tài khoản</label>
                  <Input
                    placeholder='VD: Nguyễn Văn A'
                    value={newAccount.name}
                    onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  />
                </div>
                <div className='space-y-2'>
                  <label>Email</label>
                  <Input
                    type='email'
                    placeholder='email@example.com'
                    value={newAccount.email}
                    onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant='outline' onClick={() => setNewAccount({ name: '', email: '' })}>
                  Hủy
                </Button>
                <Button onClick={handleCreateAccount}>Tạo tài khoản</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <Card className='bg-gradient-to-br from-primary/80 to-primary text-white'>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-white/20 rounded-xl'>
                  <Users className='w-6 h-6' />
                </div>
                <div>
                  <p className='text-sm text-white/80'>Tổng tài khoản</p>
                  <p className='text-2xl font-bold'>{accounts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gradient-to-br from-orange-400 to-orange-500 text-white'>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-white/20 rounded-xl'>
                  <BookOpen className='w-6 h-6' />
                </div>
                <div>
                  <p className='text-sm text-white/80'>Tổng khóa học</p>
                  <p className='text-2xl font-bold'>{accounts.reduce((sum, acc) => sum + acc.courses.length, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gradient-to-br from-green-400 to-green-500 text-white'>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-white/20 rounded-xl'>
                  <BarChart2 className='w-6 h-6' />
                </div>
                <div>
                  <p className='text-sm text-white/80'>Tiến độ trung bình</p>
                  <p className='text-2xl font-bold'>
                    {Math.round(accounts.reduce((sum, acc) => sum + getAverageProgress(acc), 0) / accounts.length)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gradient-to-br from-blue-400 to-blue-500 text-white'>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-white/20 rounded-xl'>
                  <Calendar className='w-6 h-6' />
                </div>
                <div>
                  <p className='text-sm text-white/80'>Tổng thời gian học</p>
                  <p className='text-2xl font-bold'>
                    {formatStudyTime(accounts.reduce((sum, acc) => sum + acc.totalStudyTime, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className='mt-8'>
        <Tabs defaultValue='accounts' className='space-y-6'>
          <TabsList>
            <TabsTrigger value='accounts'>Tài khoản</TabsTrigger>
            <TabsTrigger value='activities'>Hoạt động gần đây</TabsTrigger>
            <TabsTrigger value='analytics'>Phân tích</TabsTrigger>
          </TabsList>

          <TabsContent value='accounts'>
            <div className='space-y-6'>
              {/* Search */}
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
                <Input
                  placeholder='Tìm kiếm tài khoản...'
                  className='pl-10'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Accounts Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {accounts.map((account) => (
                  <Link href={`/setting/child-account/${account.id}`} key={account.id}>
                    <Card className='hover:shadow-lg transition-all cursor-pointer group'>
                      <CardContent className='pt-6'>
                        <div className='flex items-start justify-between mb-6'>
                          <div className='flex items-center gap-3'>
                            <Avatar className='h-12 w-12 border-2 border-primary/10'>
                              <AvatarImage src={account.avatar} />
                              <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className='font-semibold group-hover:text-primary transition-colors'>
                                {account.name}
                              </h3>
                              <p className='text-sm text-gray-500'>{account.email}</p>
                            </div>
                          </div>
                          <ChevronRight className='w-5 h-5 text-gray-400 group-hover:text-primary transition-colors' />
                        </div>

                        <div className='space-y-4'>
                          <div className='grid grid-cols-2 gap-4 text-sm'>
                            <div>
                              <p className='text-gray-500'>Khóa học</p>
                              <p className='font-medium'>{account.courses.length} khóa học</p>
                            </div>
                            <div>
                              <p className='text-gray-500'>Thời gian học</p>
                              <p className='font-medium'>{formatStudyTime(account.totalStudyTime)}</p>
                            </div>
                          </div>

                          <div className='space-y-2'>
                            <div className='flex justify-between text-sm'>
                              <span className='text-gray-500'>Tiến độ trung bình</span>
                              <span className='font-medium'>{getAverageProgress(account)}%</span>
                            </div>
                            <Progress value={getAverageProgress(account)} className='h-2' />
                          </div>

                          <div className='pt-2 border-t'>
                            <p className='text-xs text-gray-500'>
                              Hoạt động cuối: {getActivityTimeAgo(account.lastLogin)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value='activities'>
            <div className='space-y-6'>
              {/* Activities Filter */}
              <div className='flex items-center gap-4'>
                <Select defaultValue='all'>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Loại hoạt động' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Tất cả hoạt động</SelectItem>
                    <SelectItem value='course_progress'>Tiến độ học tập</SelectItem>
                    <SelectItem value='quiz_completed'>Bài kiểm tra</SelectItem>
                    <SelectItem value='course_completed'>Hoàn thành khóa học</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Activities Timeline */}
              <div className='space-y-4'>
                {accounts.map((account) =>
                  account.recentActivities.map((activity) => (
                    <Card key={activity.id}>
                      <CardContent className='pt-6'>
                        <div className='flex items-start gap-4'>
                          <Avatar className='h-10 w-10'>
                            <AvatarImage src={account.avatar} />
                            <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className='flex-1'>
                            <div className='flex items-center justify-between'>
                              <p className='font-medium'>{account.name}</p>
                              <time className='text-sm text-gray-500'>{getActivityTimeAgo(activity.date)}</time>
                            </div>
                            <p className='text-sm text-gray-600 mt-1'>{activity.description}</p>
                            {activity.type === 'course_progress' && (
                              <div className='mt-3'>
                                <Progress value={75} className='h-2' />
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value='analytics'>
            <div className='space-y-8'>
              {/* Overview Cards */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg font-medium'>Thời gian học trung bình</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold text-primary'>
                      {formatStudyTime(accounts.reduce((sum, acc) => sum + acc.totalStudyTime, 0) / accounts.length)}
                    </div>
                    <p className='text-sm text-gray-500 mt-1'>Mỗi tài khoản / tuần</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg font-medium'>Tỷ lệ hoàn thành</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold text-green-500'>85%</div>
                    <p className='text-sm text-gray-500 mt-1'>Khóa học đã hoàn thành</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className='text-lg font-medium'>Điểm trung bình</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold text-orange-500'>8.5</div>
                    <p className='text-sm text-gray-500 mt-1'>Trên thang điểm 10</p>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Phân tích hiệu suất học tập</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='h-[300px] flex items-center justify-center text-gray-500'>
                    {/* Replace with actual chart component */}
                    <p>Biểu đồ thống kê hiệu suất học tập theo thời gian</p>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top học viên xuất sắc</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {accounts
                      .sort((a, b) => getAverageProgress(b) - getAverageProgress(a))
                      .slice(0, 3)
                      .map((account, index) => (
                        <div key={account.id} className='flex items-center gap-4'>
                          <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary'>
                            {index + 1}
                          </div>
                          <Avatar className='h-10 w-10'>
                            <AvatarImage src={account.avatar} />
                            <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className='flex-1'>
                            <p className='font-medium'>{account.name}</p>
                            <p className='text-sm text-gray-500'>{account.courses.length} khóa học</p>
                          </div>
                          <div className='text-right'>
                            <p className='font-medium'>{getAverageProgress(account)}%</p>
                            <p className='text-sm text-gray-500'>Tiến độ</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

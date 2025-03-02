'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { Users2, GraduationCap, Clock, Search, Plus, X, ChevronRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ChildAccount {
  id: string
  username: string
  avatar: string
  lastActive: string
  activeCourses: number
  completedCourses: number
  totalStudyTime: number
}

// Thêm interface cho filters
interface Filters {
  search: string
  status: 'all' | 'active' | 'inactive'
  sort: 'recent' | 'name' | 'courses'
}

export default function ChildAccountPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: 'all',
    sort: 'recent'
  })
  const { toast } = useToast()

  // Mock data
  const childAccounts: ChildAccount[] = [
    {
      id: '1',
      username: 'anna2024',
      avatar: '/avatars/01.png',
      lastActive: '5 phút trước',
      activeCourses: 2,
      completedCourses: 3,
      totalStudyTime: 45 // hours
    }
    // Thêm mock data...
  ]

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <h3 className='text-2xl font-semibold'>Tài khoản con</h3>
        <p className='text-sm text-gray-500 mt-1'>Quản lý và theo dõi tiến độ học tập của con</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='relative overflow-hidden border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10'>
          <CardContent className='pt-6'>
            <div className='flex items-center gap-4'>
              <div className='h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center'>
                <Users2 className='h-7 w-7 text-primary' />
              </div>
              <div className='relative'>
                <p className='text-sm text-gray-600 font-medium'>Tổng số tài khoản</p>
                <div className='flex items-baseline gap-1 mt-1'>
                  <span className='text-2xl font-bold text-gray-900'>{childAccounts.length}</span>
                  <span className='text-sm text-gray-500'>tài khoản</span>
                </div>
              </div>
            </div>
            <div className='absolute right-4 bottom-4 opacity-10'>
              <Users2 className='h-16 w-16 text-primary' />
            </div>
          </CardContent>
        </Card>

        <Card className='relative overflow-hidden border-none shadow-md bg-gradient-to-br from-green-50 to-green-100/50'>
          <CardContent className='pt-6'>
            <div className='flex items-center gap-4'>
              <div className='h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center'>
                <GraduationCap className='h-7 w-7 text-green-600' />
              </div>
              <div className='relative'>
                <p className='text-sm text-gray-600 font-medium'>Khóa học đang học</p>
                <div className='flex items-baseline gap-1 mt-1'>
                  <span className='text-2xl font-bold text-gray-900'>
                    {childAccounts.reduce((sum, account) => sum + account.activeCourses, 0)}
                  </span>
                  <span className='text-sm text-gray-500'>khóa học</span>
                </div>
              </div>
            </div>
            <div className='absolute right-4 bottom-4 opacity-10'>
              <GraduationCap className='h-16 w-16 text-green-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='relative overflow-hidden border-none shadow-md bg-gradient-to-br from-blue-50 to-blue-100/50'>
          <CardContent className='pt-6'>
            <div className='flex items-center gap-4'>
              <div className='h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center'>
                <Clock className='h-7 w-7 text-blue-600' />
              </div>
              <div className='relative'>
                <p className='text-sm text-gray-600 font-medium'>Tổng thời gian học</p>
                <div className='flex items-baseline gap-1 mt-1'>
                  <span className='text-2xl font-bold text-gray-900'>
                    {childAccounts.reduce((sum, account) => sum + account.totalStudyTime, 0)}
                  </span>
                  <span className='text-sm text-gray-500'>giờ</span>
                </div>
              </div>
            </div>
            <div className='absolute right-4 bottom-4 opacity-10'>
              <Clock className='h-16 w-16 text-blue-600' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className='flex flex-col gap-6'>
        <Card className='border-none shadow-md'>
          <CardContent className='p-6'>
            <div className='flex flex-col lg:flex-row gap-4'>
              {/* Search */}
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input
                  placeholder='Tìm kiếm theo tên tài khoản...'
                  value={filters.search}
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                  className='pl-9 border-gray-200 focus:border-primary/30 focus:ring-primary/20 w-full'
                />
              </div>

              {/* Filters */}
              <div className='flex flex-col sm:flex-row gap-4 lg:w-auto'>
                <Select
                  value={filters.status}
                  onValueChange={(value: Filters['status']) => setFilters((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className='w-full sm:w-[180px] border-gray-200'>
                    <SelectValue placeholder='Trạng thái' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Tất cả trạng thái</SelectItem>
                    <SelectItem value='active'>Đang hoạt động</SelectItem>
                    <SelectItem value='inactive'>Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={() => setShowAddDialog(true)}
                  className='bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary
                    shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20 w-full sm:w-auto'
                >
                  <Plus className='w-4 h-4 mr-2' />
                  Thêm tài khoản con
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.search || filters.status !== 'all' || filters.sort !== 'recent') && (
              <div className='flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100'>
                {filters.search && (
                  <Badge variant='secondary' className='gap-1'>
                    Tìm kiếm: {filters.search}
                    <X
                      className='w-3 h-3 cursor-pointer'
                      onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
                    />
                  </Badge>
                )}
                {filters.status !== 'all' && (
                  <Badge variant='secondary' className='gap-1'>
                    {filters.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                    <X
                      className='w-3 h-3 cursor-pointer'
                      onClick={() => setFilters((prev) => ({ ...prev, status: 'all' }))}
                    />
                  </Badge>
                )}
                {filters.sort !== 'recent' && (
                  <Badge variant='secondary' className='gap-1'>
                    Sắp xếp: {filters.sort === 'name' ? 'Theo tên' : 'Số khóa học'}
                    <X
                      className='w-3 h-3 cursor-pointer'
                      onClick={() => setFilters((prev) => ({ ...prev, sort: 'recent' }))}
                    />
                  </Badge>
                )}
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setFilters({ search: '', status: 'all', sort: 'recent' })}
                  className='text-sm text-gray-500 hover:text-gray-700'
                >
                  Xóa bộ lọc
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className='flex items-center justify-between px-2'>
          <p className='text-sm text-gray-500'>
            Hiển thị <span className='font-medium text-gray-900'>{childAccounts.length}</span> tài khoản
          </p>
          <p className='text-sm text-gray-500'>
            Cập nhật lần cuối: <span className='font-medium text-gray-900'>2 phút trước</span>
          </p>
        </div>
      </div>

      {/* Account List */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {childAccounts.map((account) => (
          <Link key={account.id} href={`/setting/child-account/${account.id}`}>
            <Card
              className='group border-none shadow-md hover:shadow-xl hover:-translate-y-0.5 
              transition-all duration-300 bg-white'
            >
              <CardContent className='p-0'>
                {/* Card Header with Avatar */}
                <div className='p-6 pb-4 border-b border-gray-100'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-10 w-10 ring-2 ring-primary/10'>
                      <AvatarImage src={account.avatar} alt={account.username} />
                      <AvatarFallback className='bg-primary/5 text-primary'>
                        {account.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-medium text-gray-900 truncate group-hover:text-primary transition-colors'>
                        {account.username}
                      </h3>
                      <p className='text-sm text-gray-500 flex items-center gap-1.5'>
                        <Clock className='w-3.5 h-3.5' />
                        {account.lastActive}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className='p-6 space-y-6'>
                  {/* Course Progress */}
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-gray-600'>Khóa học đang học</span>
                      <Badge variant='secondary' className='bg-primary/5 text-primary border-none font-medium'>
                        {account.activeCourses} khóa học
                      </Badge>
                    </div>
                    <div className='h-2 bg-gray-100 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-gradient-to-r from-primary to-primary/80 transition-all 
                        group-hover:from-primary/80 group-hover:to-primary'
                        style={{
                          width: `${(account.activeCourses / (account.activeCourses + account.completedCourses)) * 100}%`
                        }}
                      />
                    </div>
                    <div className='flex items-center justify-between text-xs text-gray-500'>
                      <span>Đang học</span>
                      <span>{account.completedCourses} khóa học đã hoàn thành</span>
                    </div>
                  </div>

                  {/* Learning Stats */}
                  <div className='grid grid-cols-2 gap-3 text-center'>
                    <div className='p-3 rounded-xl bg-gray-50'>
                      <p className='text-2xl font-semibold text-primary'>{account.totalStudyTime}</p>
                      <p className='text-xs text-gray-500 mt-1'>Giờ học</p>
                    </div>
                    <div className='p-3 rounded-xl bg-gray-50'>
                      <p className='text-2xl font-semibold text-green-600'>{account.completedCourses}</p>
                      <p className='text-xs text-gray-500 mt-1'>Đã hoàn thành</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant='ghost'
                    className='w-full bg-gray-50 hover:bg-primary/5 hover:text-primary border-none
                    transition-colors group/btn flex items-center justify-between'
                  >
                    <span>Xem chi tiết tài khoản</span>
                    <ChevronRight className='w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Add Account Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm tài khoản con mới</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Tên đăng nhập</label>
              <Input placeholder='Nhập tên đăng nhập' className='border-gray-200' />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Mật khẩu</label>
              <Input type='password' placeholder='Nhập mật khẩu' className='border-gray-200' />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Xác nhận mật khẩu</label>
              <Input type='password' placeholder='Nhập lại mật khẩu' className='border-gray-200' />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setShowAddDialog(false)}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: 'Thành công',
                  description: 'Đã tạo tài khoản con mới'
                })
                setShowAddDialog(false)
              }}
              className='bg-gradient-to-r from-primary to-primary/90'
            >
              Tạo tài khoản
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

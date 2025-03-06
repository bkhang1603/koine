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
import { GraduationCap, Search, Plus, ChevronRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGetChildAccount } from '@/queries/useAccount'
import { EmptyChildAccounts } from '@/components/public/parent/setting/empty-child-accounts'

// Thêm interface cho filters
type Filters = {
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

  const { data, isLoading } = useGetChildAccount()
  const childAccounts = data?.payload.data || []

  // Filter các account dựa trên query search
  const filteredAccounts = childAccounts.filter((account) =>
    account.childName.toLowerCase().includes(filters.search.toLowerCase())
  )

  function handleAddAccount() {
    setShowAddDialog(true)
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <h3 className='text-2xl font-semibold'>Tài khoản con</h3>
        <p className='text-sm text-gray-500 mt-1'>Quản lý và theo dõi tiến độ học tập của con</p>
      </div>

      {/* Search and Filters - Styled like my-course */}
      <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
        <div className='w-full md:w-auto relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
          <Input
            placeholder='Tìm kiếm tài khoản con...'
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            className='pl-9 md:w-[300px] border-gray-200 focus:border-primary/30 focus:ring-primary/20'
          />
        </div>

        <div className='flex flex-col sm:flex-row gap-4 w-full md:w-auto'>
          <Select
            value={filters.status}
            onValueChange={(value: any) => setFilters((prev) => ({ ...prev, status: value }))}
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

          <Select value={filters.sort} onValueChange={(value: any) => setFilters((prev) => ({ ...prev, sort: value }))}>
            <SelectTrigger className='w-full sm:w-[180px] border-gray-200'>
              <SelectValue placeholder='Sắp xếp theo' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='recent'>Gần đây nhất</SelectItem>
              <SelectItem value='name'>Tên</SelectItem>
              <SelectItem value='courses'>Số khóa học</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleAddAccount}
            className='w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/25'
          >
            <Plus className='mr-2 h-4 w-4' />
            Tạo tài khoản mới
          </Button>
        </div>
      </div>

      {/* Account List */}
      {isLoading ? (
        // Loading state
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {[1, 2].map((i) => (
            <Card key={i} className='border border-gray-100 shadow-sm animate-pulse'>
              <CardContent className='p-6 h-40'></CardContent>
            </Card>
          ))}
        </div>
      ) : childAccounts.length === 0 ? (
        // Empty state
        <EmptyChildAccounts onAddAccount={handleAddAccount} />
      ) : (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredAccounts.map((account) => (
            <Link key={account.childId} href={`/setting/child-account/${account.childId}`}>
              <Card
                className='border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 
                  transition-all duration-200 group h-full'
              >
                <CardContent className='p-6 flex flex-col gap-4'>
                  <div className='flex gap-4 items-center'>
                    <Avatar className='h-12 w-12 border-2 border-primary/10'>
                      <AvatarImage src={account.childImageUrl} alt={account.childName} />
                      <AvatarFallback className='bg-primary/10 text-primary'>
                        {account.childName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className='text-lg font-semibold group-hover:text-primary transition-colors'>
                        {account.childName}
                      </h4>
                      <div className='flex items-center text-sm text-gray-500 gap-1'>
                        <GraduationCap className='w-3.5 h-3.5' />
                        <span>{account.totalCourse} khóa học</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-600'>Khóa học đang học</span>
                      <Badge variant='secondary' className='bg-primary/5 text-primary border-none font-medium'>
                        {account.totalCoursesCompleted} khóa học
                      </Badge>
                    </div>
                    <div className='h-2 bg-gray-100 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-gradient-to-r from-primary to-primary/80 transition-all 
                        group-hover:from-primary/80 group-hover:to-primary'
                        style={{
                          width: `${(account.totalCoursesCompleted / (account.totalCoursesCompleted + account.totalCourse)) * 100}%`
                        }}
                      />
                    </div>
                    <div className='flex items-center justify-between text-xs text-gray-500'>
                      <span>Đang học</span>
                      <span>{account.totalCoursesCompleted} khóa học đã hoàn thành</span>
                    </div>
                  </div>

                  {/* Learning Stats */}
                  <div className='grid grid-cols-2 gap-3 text-center'>
                    <div className='p-3 rounded-xl bg-gray-50'>
                      <p className='text-2xl font-semibold text-primary'>10</p>
                      <p className='text-xs text-gray-500 mt-1'>Giờ học</p>
                    </div>
                    <div className='p-3 rounded-xl bg-gray-50'>
                      <p className='text-2xl font-semibold text-green-600'>{account.totalCoursesCompleted}</p>
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
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

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

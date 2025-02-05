'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/components/ui/use-toast'
import { Progress } from '@/components/ui/progress'
import { Plus, User, BookOpen, BarChart, Eye, Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Separator } from '@/components/ui/separator'

interface Course {
  id: number
  title: string
  progress: number
  lastAccessed: Date
}

interface SubAccount {
  id: string
  name: string
  email: string
  avatar: string
  courses: Course[]
  lastLogin: Date
  totalStudyTime: number // in minutes
}

export default function SubAccountsPage() {
  const [subAccounts, setSubAccounts] = useState<SubAccount[]>([
    {
      id: '1',
      name: 'Nguyễn Văn B',
      email: 'nguyenvanb@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      courses: [
        { id: 1, title: 'Kỹ năng giao tiếp hiệu quả', progress: 75, lastAccessed: new Date(2023, 5, 15) },
        { id: 2, title: 'Quản lý thời gian và năng suất', progress: 30, lastAccessed: new Date(2023, 5, 20) }
      ],
      lastLogin: new Date(2023, 5, 21),
      totalStudyTime: 720 // 12 hours
    },
    {
      id: '2',
      name: 'Trần Thị C',
      email: 'tranthic@example.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
      courses: [
        { id: 3, title: 'Kỹ năng thuyết trình chuyên nghiệp', progress: 50, lastAccessed: new Date(2023, 5, 18) },
        { id: 4, title: 'Tư duy phản biện', progress: 80, lastAccessed: new Date(2023, 5, 19) }
      ],
      lastLogin: new Date(2023, 5, 22),
      totalStudyTime: 540 // 9 hours
    },
    {
      id: '3',
      name: 'Lê Hoàng D',
      email: 'lehoangd@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
      courses: [
        { id: 5, title: 'Kỹ năng lãnh đạo', progress: 60, lastAccessed: new Date(2023, 5, 17) },
        { id: 6, title: 'Quản lý dự án', progress: 40, lastAccessed: new Date(2023, 5, 21) },
        { id: 7, title: 'Kỹ năng đàm phán', progress: 20, lastAccessed: new Date(2023, 5, 22) }
      ],
      lastLogin: new Date(2023, 5, 23),
      totalStudyTime: 900 // 15 hours
    }
  ])
  const [newSubAccountName, setNewSubAccountName] = useState('')
  const [newSubAccountEmail, setNewSubAccountEmail] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const { toast } = useToast()

  const handleCreateSubAccount = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSubAccountName || !newSubAccountEmail) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng điền đầy đủ thông tin tài khoản con.',
        variant: 'destructive'
      })
      return
    }

    const newSubAccount: SubAccount = {
      id: Date.now().toString(),
      name: newSubAccountName,
      email: newSubAccountEmail,
      avatar: `https://i.pravatar.cc/150?img=${subAccounts.length + 1}`,
      courses: [],
      lastLogin: new Date(),
      totalStudyTime: 0
    }

    setSubAccounts([...subAccounts, newSubAccount])
    setNewSubAccountName('')
    setNewSubAccountEmail('')

    toast({
      title: 'Thành công',
      description: 'Tài khoản con đã được tạo.'
    })
  }

  const getTotalProgress = (account: SubAccount) => {
    if (account.courses.length === 0) return 0
    const totalProgress = account.courses.reduce((sum, course) => sum + course.progress, 0)
    return Math.round(totalProgress / account.courses.length)
  }

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const filteredAndSortedAccounts = subAccounts
    .filter(
      (account) =>
        account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'lastLogin') return b.lastLogin.getTime() - a.lastLogin.getTime()
      if (sortBy === 'progress') return getTotalProgress(b) - getTotalProgress(a)
      return 0
    })

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Quản lý tài khoản con</h3>
        <p className='text-sm text-muted-foreground'>Xem và quản lý tài khoản con của bạn.</p>
      </div>
      <Separator />

      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='w-full lg:w-2/3 space-y-6'>
          <Card className='bg-gradient-to-r from-blue-500 to-purple-500 text-white'>
            <CardHeader>
              <CardTitle className='text-2xl'>Tổng quan tài khoản con</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <div className='flex flex-col items-center p-4 bg-white/20 rounded-lg backdrop-blur-lg'>
                  <User className='w-8 h-8 mb-2' />
                  <span className='text-2xl font-bold'>{subAccounts.length}</span>
                  <span className='text-sm'>Tài khoản con</span>
                </div>
                <div className='flex flex-col items-center p-4 bg-white/20 rounded-lg backdrop-blur-lg'>
                  <BookOpen className='w-8 h-8 mb-2' />
                  <span className='text-2xl font-bold'>
                    {subAccounts.reduce((sum, account) => sum + account.courses.length, 0)}
                  </span>
                  <span className='text-sm'>Khóa học đã đăng ký</span>
                </div>
                <div className='flex flex-col items-center p-4 bg-white/20 rounded-lg backdrop-blur-lg'>
                  <BarChart className='w-8 h-8 mb-2' />
                  <span className='text-2xl font-bold'>
                    {Math.round(
                      subAccounts.reduce((sum, account) => sum + getTotalProgress(account), 0) / subAccounts.length
                    )}
                    %
                  </span>
                  <span className='text-sm'>Tiến độ trung bình</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
            <div className='w-full sm:w-auto flex-1 relative'>
              <Input
                placeholder='Tìm kiếm tài khoản con...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10'
              />
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Sắp xếp theo' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='name'>Tên</SelectItem>
                <SelectItem value='lastLogin'>Đăng nhập gần đây</SelectItem>
                <SelectItem value='progress'>Tiến độ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {filteredAndSortedAccounts.map((account) => (
              <Card key={account.id} className='flex flex-col hover:shadow-lg transition-shadow duration-300'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center space-x-4'>
                    <Avatar className='h-12 w-12'>
                      <AvatarImage src={account.avatar} alt={account.name} />
                      <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{account.name}</CardTitle>
                      <CardDescription>{account.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <div className='space-y-4'>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-500'>Số khóa học:</span>
                      <span className='font-semibold'>{account.courses.length}</span>
                    </div>
                    <div className='space-y-1'>
                      <div className='flex justify-between items-center'>
                        <span className='text-sm text-gray-500'>Tiến độ trung bình:</span>
                        <span className='font-semibold'>{getTotalProgress(account)}%</span>
                      </div>
                      <Progress value={getTotalProgress(account)} className='w-full' />
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-500'>Tổng thời gian học:</span>
                      <span className='font-semibold'>{formatStudyTime(account.totalStudyTime)}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-500'>Đăng nhập gần nhất:</span>
                      <span className='font-semibold'>{account.lastLogin.toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardContent className='border-t pt-4'>
                  <Link href={`/account/sub-account/${account.id}`} passHref>
                    <Button variant='outline' className='w-full'>
                      <Eye className='w-4 h-4 mr-2' />
                      Xem chi tiết
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className='w-full lg:w-1/3'>
          <div className='lg:sticky lg:top-4'>
            <Card>
              <CardHeader>
                <CardTitle>Tạo tài khoản con</CardTitle>
                <CardDescription>Thêm tài khoản con mới</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateSubAccount} className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='subAccountName'>Tên tài khoản con</Label>
                    <Input
                      id='subAccountName'
                      value={newSubAccountName}
                      onChange={(e) => setNewSubAccountName(e.target.value)}
                      placeholder='Nhập tên tài khoản con'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='subAccountEmail'>Email tài khoản con</Label>
                    <Input
                      id='subAccountEmail'
                      type='email'
                      value={newSubAccountEmail}
                      onChange={(e) => setNewSubAccountEmail(e.target.value)}
                      placeholder='Nhập email tài khoản con'
                    />
                  </div>
                  <Button type='submit' className='w-full'>
                    <Plus className='w-4 h-4mr-2' />
                    Tạo tài khoản con
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

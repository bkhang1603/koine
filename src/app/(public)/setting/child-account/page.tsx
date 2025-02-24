'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Search, Plus, BookOpen, Users2, Clock, ChevronRight, Star } from 'lucide-react'

interface ChildAccount {
  id: string
  name: string
  avatar: string
  age: number
  grade: string
  totalCourses: number
  learningTime: number // in minutes
  lastActive: string
  level: number
  points: number
  activeCourses: {
    id: string
    name: string
    thumbnail: string
    progress: number
  }[]
}

const MOCK_ACCOUNTS: ChildAccount[] = [
  {
    id: '1',
    name: 'Nguyễn Minh An',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    age: 10,
    grade: 'Lớp 5',
    totalCourses: 5,
    learningTime: 1850,
    lastActive: '2024-03-15T08:30:00Z',
    level: 5,
    points: 850,
    activeCourses: [
      {
        id: 'course-1',
        name: 'Toán tư duy nâng cao',
        thumbnail: '/course-1.jpg',
        progress: 75
      },
      {
        id: 'course-2',
        name: 'Tiếng Anh giao tiếp',
        thumbnail: '/course-2.jpg',
        progress: 45
      }
    ]
  }
]

export default function ChildAccountPage() {
  const [accounts] = useState<ChildAccount[]>(MOCK_ACCOUNTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <div className='max-w-7xl mx-auto'>
      {/* Header Section */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h3 className='text-2xl font-semibold'>Tài khoản con</h3>
          <p className='text-sm text-gray-500 mt-1'>Quản lý việc học tập của con</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className='gap-2'>
          <Plus className='h-4 w-4' />
          Thêm tài khoản
        </Button>
      </div>

      {/* Quick Stats */}
      <div className='flex items-center gap-6 p-6 mb-8 bg-gray-50 rounded-xl'>
        <div className='flex items-center gap-3'>
          <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
            <Users2 className='h-5 w-5 text-primary' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Tổng tài khoản</p>
            <p className='text-xl font-semibold'>{accounts.length}</p>
          </div>
        </div>
        <div className='w-px h-10 bg-gray-200' />
        <div className='flex items-center gap-3'>
          <div className='h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center'>
            <BookOpen className='h-5 w-5 text-orange-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Khóa học</p>
            <p className='text-xl font-semibold'>{accounts.reduce((sum, acc) => sum + acc.totalCourses, 0)}</p>
          </div>
        </div>
        <div className='w-px h-10 bg-gray-200' />
        <div className='flex items-center gap-3'>
          <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center'>
            <Clock className='h-5 w-5 text-blue-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Thời gian học</p>
            <p className='text-xl font-semibold'>
              {Math.round(accounts.reduce((sum, acc) => sum + acc.learningTime, 0) / 60)}h
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className='relative max-w-md mb-8'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
        <Input
          placeholder='Tìm kiếm tài khoản...'
          className='pl-9'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Account List */}
      <div className='space-y-4'>
        {accounts.map((account) => (
          <Link href={`/setting/child-account/${account.id}`} key={account.id}>
            <Card className='overflow-hidden hover:shadow-lg transition-shadow duration-300'>
              <CardContent className='p-0'>
                <div className='flex'>
                  {/* Left Section */}
                  <div className='w-64 bg-gray-50 p-6 flex flex-col items-center text-center border-r'>
                    <Avatar className='h-20 w-20 mb-4'>
                      <AvatarImage src={account.avatar} />
                      <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h4 className='font-medium'>{account.name}</h4>
                    <p className='text-sm text-gray-500 mb-4'>
                      {account.age} tuổi • {account.grade}
                    </p>
                    <div className='flex items-center gap-1 text-yellow-500'>
                      <Star className='h-4 w-4 fill-current' />
                      <span className='text-sm font-medium'>Level {account.level}</span>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className='flex-1 p-6'>
                    <div className='flex items-center justify-between mb-6'>
                      <div className='space-y-1'>
                        <p className='text-sm text-gray-500'>Đang học</p>
                        <p className='font-medium'>{account.activeCourses.length} khóa học</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm text-gray-500'>Điểm tích lũy</p>
                        <p className='font-medium'>{account.points} điểm</p>
                      </div>
                      <div className='space-y-1'>
                        <p className='text-sm text-gray-500'>Thời gian học</p>
                        <p className='font-medium'>{Math.round(account.learningTime / 60)}h</p>
                      </div>
                      <Button variant='ghost' size='sm' className='text-primary'>
                        Chi tiết
                        <ChevronRight className='h-4 w-4 ml-1' />
                      </Button>
                    </div>

                    {account.activeCourses.length > 0 && (
                      <div>
                        <p className='text-sm font-medium mb-3'>Khóa học gần đây</p>
                        <div className='space-y-3'>
                          {account.activeCourses.map((course) => (
                            <div
                              key={course.id}
                              className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                            >
                              <div>
                                <p className='font-medium'>{course.name}</p>
                                <p className='text-sm text-gray-500'>Hoàn thành: {course.progress}%</p>
                              </div>
                              <Button variant='ghost' size='sm' className='h-8'>
                                Xem chi tiết
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
            <DialogTitle>Thêm tài khoản con</DialogTitle>
            <DialogDescription>Điền thông tin để tạo tài khoản mới cho con của bạn</DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Tên tài khoản</label>
              <Input placeholder='VD: Nguyễn Văn A' />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Tuổi</label>
              <Input type='number' placeholder='VD: 10' />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Lớp</label>
              <Input placeholder='VD: Lớp 5' />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setShowAddDialog(false)}>
              Hủy
            </Button>
            <Button>Tạo tài khoản</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

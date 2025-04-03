/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Clock, BarChart3, Users, Gift } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { AvatarGroup } from '@/components/ui/avatar-group'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useAppStore } from '@/components/app-provider'

interface PurchasedCourseCardProps {
  courseData: {
    course: {
      id: string
      title: string
      level: string
      durationDisplay: string
      price: number
      imageUrl: string
      createAtFormatted: string
      categories: Array<{
        id: string
        name: string
      }>
    }
    quantityAtPurchase: number
    unusedQuantity: number
    assignedTo: Array<{
      id: string
      name: string
      imageUrl: string
    }>
  }
  listChildAccount?: Array<{
    id: string
    name: string
    imageUrl?: string
  }>
  onActivate: (courseId: string, childId: string | null) => void
}

const getLevelConfig = (level: string) => {
  switch (level) {
    case 'BEGINNER':
      return {
        label: 'Cơ bản',
        color: 'bg-gradient-to-r from-emerald-500/90 to-emerald-600/90',
        textColor: 'text-white'
      }
    case 'INTERMEDIATE':
      return {
        label: 'Trung cấp',
        color: 'bg-gradient-to-r from-blue-500/90 to-blue-600/90',
        textColor: 'text-white'
      }
    case 'ADVANCED':
      return {
        label: 'Nâng cao',
        color: 'bg-gradient-to-r from-purple-500/90 to-purple-600/90',
        textColor: 'text-white'
      }
    default:
      return {
        label: 'Tất cả',
        color: 'bg-gradient-to-r from-gray-500/90 to-gray-600/90',
        textColor: 'text-white'
      }
  }
}

export function PurchasedCourseCard({ courseData, listChildAccount = [], onActivate }: PurchasedCourseCardProps) {
  const user = useAppStore((state) => state.user)

  const [showAlert, setShowAlert] = useState(false)
  const [selectedChild, setSelectedChild] = useState<string>()
  const { course, quantityAtPurchase, unusedQuantity, assignedTo } = courseData
  const levelConfig = getLevelConfig(course.level)
  const usedQuantity = quantityAtPurchase - unusedQuantity

  // Check if self is assigned - need to check both empty string and null
  const isSelfAssigned = assignedTo.some((account) => account.id === user?.id)

  // Filter out assigned children - also check for both empty string and null
  const availableChildren = listChildAccount.filter(
    (child) => !assignedTo.some((assigned) => assigned.id === child.id || assigned.id === '' || assigned.id === null)
  )

  const handleActivateSelf = () => {
    onActivate(course.id, null)
  }

  const handleActivateChild = () => {
    if (selectedChild) {
      onActivate(course.id, selectedChild)
      setSelectedChild(undefined)
      setShowAlert(false)
    }
  }

  return (
    <Card className='group relative overflow-hidden border-0 bg-white transition-all hover:shadow-lg hover:shadow-gray-200/80'>
      {/* Course Image Container */}
      <div className='relative'>
        <div className='aspect-[4/3] relative overflow-hidden'>
          <Image
            src={course.imageUrl || '/placeholder.png'}
            alt={course.title}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80' />
        </div>

        {/* Course Info Overlay */}
        <div className='absolute inset-x-0 bottom-0 p-4 text-white'>
          <h3 className='line-clamp-2 text-lg font-semibold leading-tight tracking-tight'>{course.title}</h3>

          <div className='mt-3 flex items-center gap-3 text-white/90'>
            <div className='flex items-center gap-1.5'>
              <Clock className='h-4 w-4' />
              <span className='text-sm'>{course.durationDisplay}</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <Users className='h-4 w-4' />
              <span className='text-sm'>
                {usedQuantity}/{quantityAtPurchase} đã gán
              </span>
            </div>
          </div>
        </div>

        {/* Level Badge */}
        <div
          className={cn(
            'absolute right-3 top-3 px-2.5 py-1 rounded-full text-xs font-medium',
            'flex items-center gap-1.5 backdrop-blur-sm',
            levelConfig.color,
            levelConfig.textColor
          )}
        >
          <BarChart3 className='h-3.5 w-3.5' />
          {levelConfig.label}
        </div>
      </div>

      {/* Course Details Section */}
      <div className='p-4 space-y-4'>
        {/* Categories */}
        <div className='flex flex-wrap gap-2'>
          {course.categories.map((category) => (
            <span
              key={category.id}
              className='inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600'
            >
              {category.name}
            </span>
          ))}
        </div>

        {/* Assigned Students */}
        {assignedTo.length > 0 && (
          <div className='flex items-center justify-between'>
            <span className='text-sm text-gray-500'>Học viên được gán:</span>
            <AvatarGroup>
              {assignedTo.map((student) => (
                <Avatar key={student.id} className='h-8 w-8'>
                  <AvatarImage src={student.imageUrl} alt={student.name} />
                </Avatar>
              ))}
            </AvatarGroup>
          </div>
        )}

        {unusedQuantity > 0 ? (
          <div className='flex gap-2'>
            <Button className='flex-1' onClick={() => handleActivateSelf()} disabled={isSelfAssigned}>
              {isSelfAssigned ? 'Đã kích hoạt' : 'Kích hoạt cho bản thân'}
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Select
                    value={selectedChild}
                    onValueChange={(value) => {
                      setSelectedChild(value)
                      setShowAlert(true)
                    }}
                    disabled={availableChildren.length === 0}
                  >
                    <SelectTrigger className='w-[50px] px-2'>
                      <Gift className='h-4 w-4' />
                    </SelectTrigger>
                    <SelectContent>
                      {availableChildren.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tặng khóa học{availableChildren.length === 0 ? ' (Đã gán hết)' : ''}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận kích hoạt khóa học</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bạn có chắc chắn muốn kích hoạt khóa học này cho{' '}
                    {listChildAccount.find((c) => c.id === selectedChild)?.name}?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setSelectedChild(undefined)}>Hủy</AlertDialogCancel>
                  <AlertDialogAction onClick={handleActivateChild}>Xác nhận</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <Button variant='outline' className='w-full' disabled>
            Đã gán hết
          </Button>
        )}
      </div>
    </Card>
  )
}

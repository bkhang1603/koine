'use client'

import { useState, useMemo } from 'react'
import { useGetAccountStore, useGetListChildAccount } from '@/queries/useAccount'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShoppingBag, Search, Gift } from 'lucide-react'
import { PurchasedCourseCard } from '@/components/public/parent/setting/courses/PurchasedCourseCard'
import { CoursesSkeleton } from '@/components/public/parent/setting/courses/CoursesSkeleton'
import { EmptyCourses } from '@/components/public/parent/setting/courses/EmptyCourses'
import { PurchasedCourseStatsHeader } from '@/components/public/parent/setting/courses/PurchasedCourseStatsHeader'
import { PurchasedCourseStatsHeaderSkeleton } from '@/components/public/parent/setting/courses/PurchasedCourseStatsHeaderSkeleton'
import { useActiveCourseMutation } from '@/queries/useCourse'
import { useCreateGift } from '@/queries/useGift'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

// Schema form validation
const giftFormSchema = z.object({
  courseId: z.string({
    required_error: 'Vui lòng chọn khóa học'
  }),
  receiverEmail: z.string().email({
    message: 'Email không hợp lệ'
  }),
  receiverName: z.string().min(1, {
    message: 'Vui lòng nhập tên người nhận'
  }),
  receiverPhone: z.string().min(10, {
    message: 'Số điện thoại không hợp lệ'
  }),
  quantity: z.number().min(1, {
    message: 'Số lượng phải lớn hơn 0'
  }),
  message: z.string().optional()
})

type GiftFormValues = z.infer<typeof giftFormSchema>

// Tabs constant
const courseTabs = [
  { value: 'all', label: 'Tất cả' },
  { value: 'available', label: 'Còn chỗ' },
  { value: 'full', label: 'Đã gán hết' }
]

export default function PurchasedCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('all')
  const [isGiftDialogOpen, setIsGiftDialogOpen] = useState(false)
  const [selectedCourseForGift, setSelectedCourseForGift] = useState<{
    id: string
    title: string
    unusedQuantity: number
  } | null>(null)

  // Fetch data
  const { data, isLoading } = useGetAccountStore()
  const { data: listChildAccount } = useGetListChildAccount()
  const activeAccountMutation = useActiveCourseMutation()
  const createGiftMutation = useCreateGift()

  // Form for gift
  const form = useForm<GiftFormValues>({
    resolver: zodResolver(giftFormSchema),
    defaultValues: {
      courseId: '',
      receiverEmail: '',
      receiverName: '',
      receiverPhone: '',
      quantity: 1,
      message: ''
    }
  })

  // Memoize purchasedCourses
  const purchasedCourses = useMemo(() => data?.payload.data?.details || [], [data])

  // Lọc courses theo tab
  const filteredCourses = useMemo(() => {
    let filtered = [...purchasedCourses]

    // Filter by tab (all, available, full)
    if (activeTab === 'available') {
      filtered = filtered.filter((item) => item.unusedQuantity > 0)
    } else if (activeTab === 'full') {
      filtered = filtered.filter((item) => item.unusedQuantity === 0)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((item) => item.course.title.toLowerCase().includes(query))
    }

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter((item) => item.course.categories.some((c) => c.id === category))
    }

    return filtered
  }, [purchasedCourses, activeTab, searchQuery, category])

  // Calculate stats
  const stats = useMemo(() => {
    const totalCourses = purchasedCourses.length
    const totalQuantity = purchasedCourses.reduce((sum, item) => sum + item.quantityAtPurchase, 0)
    const totalAssigned = purchasedCourses.reduce(
      (sum, item) => sum + (item.quantityAtPurchase - item.unusedQuantity),
      0
    )
    const totalUnused = purchasedCourses.reduce((sum, item) => sum + item.unusedQuantity, 0)

    return {
      totalCourses,
      totalQuantity,
      totalAssigned,
      totalUnused
    }
  }, [purchasedCourses])

  const handleActivateCourse = (courseId: string, childId: string | null) => {
    activeAccountMutation.mutate({ courseId, childId })
  }

  const openGiftDialog = (course: { id: string; title: string; unusedQuantity: number }) => {
    setSelectedCourseForGift(course)
    form.reset({
      courseId: course.id,
      receiverEmail: '',
      receiverName: '',
      receiverPhone: '',
      quantity: 1,
      message: ''
    })
    setIsGiftDialogOpen(true)
  }

  const onSubmitGiftForm = (values: GiftFormValues) => {
    if (!selectedCourseForGift) return

    // Kiểm tra số lượng tặng không vượt quá số lượng còn lại
    if (values.quantity > selectedCourseForGift.unusedQuantity) {
      toast({
        title: 'Lỗi',
        description: `Số lượng tặng không thể vượt quá số lượng còn lại (${selectedCourseForGift.unusedQuantity})`,
        variant: 'destructive'
      })
      return
    }

    // Đảm bảo message luôn là chuỗi
    const giftData = {
      ...values,
      message: values.message || ''
    }

    createGiftMutation.mutate(giftData, {
      onSuccess: () => {
        toast({
          title: 'Tặng khóa học thành công',
          description: `Đã gửi ${values.quantity} khóa học đến ${values.receiverName}`
        })
        setIsGiftDialogOpen(false)
      },
      onError: (error) => {
        toast({
          title: 'Lỗi khi tặng khóa học',
          description: error.message || 'Đã có lỗi xảy ra, vui lòng thử lại sau',
          variant: 'destructive'
        })
      }
    })
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <div className='flex items-center gap-2'>
          <ShoppingBag className='h-5 w-5 text-primary' />
          <h2 className='text-xl font-medium text-gray-900'>Khóa học đã mua</h2>
        </div>
        <p className='text-sm text-gray-500 mt-1 md:ml-7'>Quản lý các khóa học bạn đã mua và phân công học viên</p>
      </div>

      {isLoading ? (
        <>
          <PurchasedCourseStatsHeaderSkeleton />
          <CoursesSkeleton />
        </>
      ) : (
        <>
          <PurchasedCourseStatsHeader stats={stats} />
          <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
              <TabsList className='bg-gray-100/80'>
                {courseTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className='data-[state=active]:bg-white'>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className='flex flex-col sm:flex-row gap-3'>
                <div className='relative w-full sm:w-64'>
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                  <Input
                    placeholder='Tìm kiếm khóa học...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='pl-9 border-gray-200'
                  />
                </div>

                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className='w-full sm:w-48 border-gray-200'>
                    <SelectValue placeholder='Tất cả danh mục' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Tất cả danh mục</SelectItem>
                    {/* Populate with your categories */}
                    <SelectItem value='1'>Tên A-Z</SelectItem>
                    <SelectItem value='2'>Tên Z-A</SelectItem>
                    <SelectItem value='3'>Ngày mua từ gần đây nhất</SelectItem>
                    <SelectItem value='4'>Ngày mua từ xa nhất</SelectItem>
                  </SelectContent>
                </Select>
              </div>
                  </div>

            {filteredCourses.length > 0 ? (
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {filteredCourses.map((item) => (
                  <div key={item.course.id} className='relative'>
                    <PurchasedCourseCard
                      courseData={item}
                      listChildAccount={listChildAccount?.payload.data?.map((account) => ({
                        id: account.id,
                        name: account.userDetail.firstName,
                        imageUrl: account.userDetail.avatarUrl
                      }))}
                      onActivate={handleActivateCourse}
                    />
                    {item.unusedQuantity > 0 && (
                      <Button
                        size='sm'
                        variant='outline'
                        className='absolute top-4 right-4 flex items-center gap-1'
                        onClick={() =>
                          openGiftDialog({
                            id: item.course.id,
                            title: item.course.title,
                            unusedQuantity: item.unusedQuantity
                          })
                        }
                      >
                        <Gift className='h-4 w-4' />
                        <span>Tặng</span>
                      </Button>
                    )}
                  </div>
                ))}
                    </div>
                  ) : (
              <EmptyCourses
                title={`Không tìm thấy khóa học nào ${searchQuery ? 'phù hợp với tìm kiếm' : 'trong danh mục này'}`}
                description='Hãy thử tìm kiếm với từ khóa khác hoặc khám phá thêm các khóa học mới.'
              />
            )}
          </Tabs>
        </>
      )}

      {/* Gift Dialog */}
      <Dialog open={isGiftDialogOpen} onOpenChange={setIsGiftDialogOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Tặng khóa học</DialogTitle>
            <DialogDescription>
              {selectedCourseForGift &&
                `Bạn đang tặng khóa học "${selectedCourseForGift.title}" (còn ${selectedCourseForGift.unusedQuantity} chỗ)`}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitGiftForm)} className='space-y-4'>
              <FormField
                control={form.control}
                name='receiverEmail'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email người nhận</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập email...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='receiverName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên người nhận</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tên...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='receiverPhone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập số điện thoại...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='quantity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={1}
                        max={selectedCourseForGift?.unusedQuantity || 1}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Tối đa {selectedCourseForGift?.unusedQuantity || 0} chỗ</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lời nhắn</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Nhập lời nhắn cho người nhận...' className='resize-none' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type='button' variant='outline' onClick={() => setIsGiftDialogOpen(false)}>
                  Hủy
                </Button>
                <Button type='submit' disabled={createGiftMutation.isPending}>
                  {createGiftMutation.isPending && (
                    <div className='mr-2'>
                      <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent' />
                    </div>
                  )}
                  Tặng khóa học
                      </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

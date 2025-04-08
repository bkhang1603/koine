'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { Search, Plus, CalendarIcon, Eye, EyeOff, Users } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGetChildAccount, useRegisterChildAccountMutation } from '@/queries/useAccount'
import { EmptyChildAccounts } from '@/components/public/parent/setting/empty-child-accounts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { registerChildAccountBody, RegisterChildAccountBodyType } from '@/schemaValidations/account.schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { handleErrorApi } from '@/lib/utils'
import { ChildAccountCard } from '@/components/public/parent/setting/child-account/child-account-card'
import { ChildAccountListSkeleton } from '@/components/public/parent/setting/child-account/child-account-list-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

// Thêm interface cho filters
type Filters = {
  search: string
  sort: 'a-z' | 'z-a'
}

export default function ChildAccountPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    search: '',
    sort: 'a-z'
  })

  const { data, isLoading } = useGetChildAccount()
  const childAccounts = data?.payload.data || []

  const registerChildAccountMutation = useRegisterChildAccountMutation()

  // Filter các account dựa trên query search
  const filteredAccounts = childAccounts.filter((account) =>
    account.childName.toLowerCase().includes(filters.search.toLowerCase())
  )

  // Thêm form với react-hook-form và zod validation
  const form = useForm<RegisterChildAccountBodyType>({
    resolver: zodResolver(registerChildAccountBody),
    defaultValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      gender: 'MALE',
      dob: ''
    }
  })

  // Thêm state để quản lý việc hiển thị password
  const [showPassword, setShowPassword] = useState(false)

  // Xử lý khi submit form
  const onSubmit = async (values: RegisterChildAccountBodyType) => {
    try {
      await registerChildAccountMutation.mutateAsync(values)
      toast({
        description: 'Đã tạo tài khoản con mới'
      })
      setShowAddDialog(false)
      form.reset() // Reset form sau khi thành công
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  function handleAddAccount() {
    setShowAddDialog(true)
  }

  return (
    <div className='space-y-8'>
      {isLoading ? (
        <div>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-5 w-5' />
            <Skeleton className='h-5 w-20' />
          </div>
          <Skeleton className='h-4 w-40 mt-1' />
        </div>
      ) : (
        <>
          {/* Header */}
          <div>
            <div className='flex items-center gap-2'>
              <Users className='h-5 w-5 text-primary' />
              <h2 className='text-xl font-medium text-gray-900'>Tài khoản con</h2>
            </div>
            <p className='text-sm text-gray-500 mt-1 md:ml-7'>Quản lý và theo dõi tiến độ học tập của con</p>
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
                value={filters.sort}
                onValueChange={(value: any) => setFilters((prev) => ({ ...prev, sort: value }))}
              >
                <SelectTrigger className='w-full sm:w-[180px] border-gray-200'>
                  <SelectValue placeholder='Sắp xếp theo' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='a-z'>Tên</SelectItem>
                  <SelectItem value='z-a'>Số khóa học</SelectItem>
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
        </>
      )}

      {/* Account List */}
      {isLoading ? (
        <ChildAccountListSkeleton />
      ) : childAccounts.length === 0 ? (
        <EmptyChildAccounts onAddAccount={handleAddAccount} />
      ) : !isLoading && filteredAccounts.length === 0 ? (
        // Không tìm thấy tài khoản nào phù hợp với tìm kiếm
        <Card className='border-dashed border-2 shadow-sm'>
          <CardContent className='p-8 flex flex-col items-center justify-center text-center'>
            <div className='h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center mb-4'>
              <Search className='h-8 w-8 text-amber-500' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>Không tìm thấy tài khoản</h3>
            <p className='text-gray-500 max-w-md mb-6'>
              Không có tài khoản nào phù hợp với tiêu chí tìm kiếm của bạn. Vui lòng thử với từ khóa khác.
            </p>
            <Button
              variant='outline'
              onClick={() => {
                setFilters({
                  ...filters,
                  search: ''
                })
              }}
            >
              Xóa tìm kiếm
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredAccounts.map((account) => (
            <ChildAccountCard key={account.childId} account={account} />
          ))}

          {/* Card để thêm tài khoản mới */}
          <Card
            className='border-dashed border-2 shadow-sm hover:border-primary/30 transition-all duration-300 flex items-center justify-center cursor-pointer'
            onClick={handleAddAccount}
          >
            <CardContent className='p-8 flex flex-col items-center justify-center text-center'>
              <div className='h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center mb-3'>
                <Plus className='h-6 w-6 text-primary' />
              </div>
              <p className='text-gray-500'>Thêm tài khoản con</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Account Dialog - Cập nhật */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Thêm tài khoản con mới</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 py-2'>
              {/* Tên đăng nhập */}
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tên đăng nhập' className='border-gray-200' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs mt-1' />
                  </FormItem>
                )}
              />

              {/* Mật khẩu */}
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>Mật khẩu</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Nhập mật khẩu'
                          className='border-gray-200 pr-10'
                          {...field}
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className='h-4 w-4 text-gray-400' />
                          ) : (
                            <Eye className='h-4 w-4 text-gray-400' />
                          )}
                          <span className='sr-only'>{showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}</span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className='text-xs mt-1' />
                  </FormItem>
                )}
              />

              {/* Họ và tên đệm */}
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>Họ và tên đệm</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập họ và tên đệm' className='border-gray-200' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs mt-1' />
                  </FormItem>
                )}
              />

              {/* Tên */}
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>Tên</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tên' className='border-gray-200' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs mt-1' />
                  </FormItem>
                )}
              />

              {/* Giới tính */}
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>Giới tính</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex gap-6 mt-2'>
                        <FormItem className='flex items-center space-x-2 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='MALE' />
                          </FormControl>
                          <FormLabel className='text-sm font-normal cursor-pointer'>Nam</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-2 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='FEMALE' />
                          </FormControl>
                          <FormLabel className='text-sm font-normal cursor-pointer'>Nữ</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className='text-xs mt-1' />
                  </FormItem>
                )}
              />

              {/* Ngày sinh */}
              <FormField
                control={form.control}
                name='dob'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>Ngày sinh</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input placeholder='MM/DD/YYYY (VD: 01/15/2015)' className='border-gray-200' {...field} />
                        <CalendarIcon className='w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400' />
                      </div>
                    </FormControl>
                    <FormMessage className='text-xs mt-1' />
                    <p className='text-xs text-muted-foreground mt-1'>Nhập theo định dạng: Tháng/Ngày/Năm</p>
                  </FormItem>
                )}
              />

              <DialogFooter className='mt-6'>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => {
                    form.reset()
                    setShowAddDialog(false)
                  }}
                >
                  Hủy
                </Button>
                <Button
                  type='submit'
                  className='bg-gradient-to-r from-primary to-primary/90'
                  disabled={registerChildAccountMutation.isPending}
                >
                  {registerChildAccountMutation.isPending ? (
                    <>
                      <span className='w-4 h-4 border-2 border-white/30 border-t-white/90 rounded-full animate-spin mr-2' />
                      Đang tạo...
                    </>
                  ) : (
                    'Tạo tài khoản'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Loader2, Save } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateUserMutation } from '@/queries/useUser'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { createUserBody } from '@/schemaValidations/admin.schema'
import { Role } from '@/constants/type'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface NewUserPageProps {
  baseUrl: string
}

export default function NewUserPage({ baseUrl }: NewUserPageProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createUserMutation = useCreateUserMutation()

  // Initialize the form with React Hook Form
  const form = useForm({
    resolver: zodResolver(createUserBody),
    defaultValues: {
      email: '',
      username: '',
      password: 'P@5sWord',
      role: Role.Manager
    }
  })

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true)

      await createUserMutation.mutateAsync({
        email: data.email,
        username: data.username,
        password: data.password,
        role: data.role
      })

      toast({
        description: 'Người dùng đã được tạo thành công'
      })

      router.push(baseUrl)
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLoading = createUserMutation.isPending || isSubmitting

  // Filter only the staff roles we want to show
  const staffRoles = [Role.Manager, Role.ContentCreator, Role.Expert, Role.Salesman, Role.Supporter]

  return (
    <>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Tạo người dùng mới</h1>
          <p className='text-sm text-muted-foreground mt-1'>Thêm người dùng mới vào hệ thống</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button type='submit' disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className='mr-2 h-4 w-4' />
                Tạo người dùng
              </>
            )}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <div className='grid gap-6'>
          {/* Main Content */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin người dùng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='text-sm font-medium'>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập email người dùng' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='text-sm font-medium'>Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tên đăng nhập' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='text-sm font-medium'>Vai trò</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn vai trò người dùng' />
                        </SelectTrigger>
                        <SelectContent>
                          {staffRoles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role === 'MANAGER' && 'Quản lý'}
                              {role === 'CONTENT_CREATOR' && 'Người tạo nội dung'}
                              {role === 'EXPERT' && 'Chuyên gia'}
                              {role === 'SALESMAN' && 'Nhân viên bán hàng'}
                              {role === 'SUPPORTER' && 'Hỗ trợ'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
      </Form>
    </>
  )
}

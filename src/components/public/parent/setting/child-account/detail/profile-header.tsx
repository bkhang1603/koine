import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useUpdateChildProfileMutation } from '@/queries/useAccount'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { format, isValid, parse } from 'date-fns'

// Schema validation cho form
const childProfileSchema = z.object({
  firstName: z.string().min(1, 'Vui lòng nhập họ'),
  lastName: z.string().min(1, 'Vui lòng nhập tên'),
  dob: z.string().min(1, 'Vui lòng chọn ngày sinh'),
  gender: z.enum(['MALE', 'FEMALE']),
  avatarUrl: z.string().optional()
})

type ChildProfileFormValues = z.infer<typeof childProfileSchema>

interface ProfileHeaderProps {
  profile: {
    userId: string
    username: string
    fullName: string
    avatarUrl: string
    metadata: Array<{
      icon: ReactNode
      label: string
    }>
  }
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const [open, setOpen] = useState(false)

  // Lấy chữ cái đầu để hiển thị khi không có avatar
  const initials = profile.fullName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  // Hook mutation để cập nhật thông tin
  const updateChildProfileMutation = useUpdateChildProfileMutation({ id: profile.userId })

  // Parse thông tin từ metadata
  const gender =
    profile.metadata.find((item) => item.label === 'Nam' || item.label === 'Nữ')?.label === 'Nam' ? 'MALE' : 'FEMALE'

  // Lấy ngày sinh từ metadata và parse thành đúng format cho input date
  const dobLabel = profile.metadata.find((item) => !['Nam', 'Nữ'].includes(item.label))?.label || ''

  // Parse date từ format hiển thị sang format yyyy-MM-dd cho input type="date"
  const parseDobToDateFormat = (dobString: string) => {
    try {
      // Thử parse các format phổ biến
      let dateObj: Date | null = null

      // Thử format dd/MM/yyyy
      dateObj = parse(dobString, 'dd/MM/yyyy', new Date())
      if (isValid(dateObj)) {
        return format(dateObj, 'yyyy-MM-dd')
      }

      // Thử format MM/dd/yyyy
      dateObj = parse(dobString, 'MM/dd/yyyy', new Date())
      if (isValid(dateObj)) {
        return format(dateObj, 'yyyy-MM-dd')
      }

      // Thử format yyyy-MM-dd (có thể đã đúng format)
      dateObj = parse(dobString, 'yyyy-MM-dd', new Date())
      if (isValid(dateObj)) {
        return dobString
      }

      return ''
    } catch (error) {
      console.error('Error parsing date:', error)
      return ''
    }
  }

  // Form state
  const form = useForm<ChildProfileFormValues>({
    resolver: zodResolver(childProfileSchema),
    defaultValues: {
      firstName: profile.fullName.split(' ').slice(0, -1).join(' '), // Lấy tất cả trừ phần tử cuối cùng
      lastName: profile.fullName.split(' ').pop() || '', // Lấy phần tử cuối cùng
      dob: parseDobToDateFormat(dobLabel),
      gender: gender,
      avatarUrl: profile.avatarUrl
    }
  })

  // Submit form
  const onSubmit = async (values: ChildProfileFormValues) => {
    try {
      await updateChildProfileMutation.mutateAsync({
        id: profile.userId,
        body: {
          firstName: values.firstName,
          lastName: values.lastName,
          dob: values.dob,
          gender: values.gender,
          avatarUrl: values.avatarUrl || ''
        }
      })

      toast({
        description: 'Cập nhật thông tin tài khoản con thành công!'
      })

      setOpen(false)
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  return (
    <>
      <Card className='border-none shadow-sm bg-gradient-to-r from-gray-50 to-white'>
        <CardContent className='p-6'>
          <div className='flex flex-col md:flex-row gap-6 items-start md:items-center'>
            {/* Avatar Section */}
            <div className='relative'>
              <Avatar className='h-20 w-20 border-4 border-white shadow-md'>
                <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
                <AvatarFallback className='bg-primary/10 text-primary text-xl'>{initials}</AvatarFallback>
              </Avatar>
              <Button
                size='icon'
                variant='outline'
                className='absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-sm border-2 border-white'
                onClick={() => setOpen(true)}
              >
                <Pencil className='h-3.5 w-3.5' />
                <span className='sr-only'>Edit profile</span>
              </Button>
            </div>

            {/* Profile Info */}
            <div className='flex-1'>
              <div className='space-y-1 mb-3'>
                <h2 className='text-xl font-semibold text-gray-900'>{profile.fullName}</h2>
                <p className='text-sm text-gray-500'>@{profile.username}</p>
              </div>

              {/* Additional Metadata */}
              <div className='flex flex-wrap gap-4'>
                {profile.metadata.map((item, i) => (
                  <div key={i} className='flex items-center gap-1.5 text-sm'>
                    {item.icon}
                    <span className='text-gray-700'>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[450px]'>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin tài khoản con</DialogTitle>
            <DialogDescription>Thay đổi thông tin cá nhân của tài khoản con.</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 pt-2'>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='dob'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày sinh</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex space-x-4'>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='MALE' id='male' />
                          <Label htmlFor='male'>Nam</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='FEMALE' id='female' />
                          <Label htmlFor='female'>Nữ</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-end space-x-4 pt-4'>
                <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                  Hủy bỏ
                </Button>
                <Button type='submit' disabled={updateChildProfileMutation.isPending}>
                  {updateChildProfileMutation.isPending ? (
                    <>
                      <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent' />
                      Đang lưu...
                    </>
                  ) : (
                    'Lưu thay đổi'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil, Search } from 'lucide-react'
import { ReactNode } from 'react'

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
  // Lấy chữ cái đầu để hiển thị khi không có avatar
  const initials = profile.fullName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
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

          {/* Actions */}
          <div className='flex gap-2'>
            <Button className='md:self-start' variant='outline' size='sm'>
              <Pencil className='h-3.5 w-3.5 mr-1.5' />
              Chỉnh sửa thông tin
            </Button>
            <Button className='md:self-start' variant='secondary' size='sm'>
              <Search className='h-3.5 w-3.5 mr-1.5' />
              Tìm khóa học
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

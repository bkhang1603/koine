import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProfileSectionProps {
  childData: {
    avatarUrl?: string
    username: string
    firstName?: string
    lastName?: string
    dob?: string
    gender?: string
  }
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ childData }) => (
  <Card className='border-none shadow-sm'>
    <CardHeader className='pb-2'>
      <CardTitle>Thông tin cá nhân</CardTitle>
      <CardDescription>Thông tin cơ bản của {childData.firstName}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className='flex flex-col md:flex-row gap-6 items-start'>
        {/* Avatar */}
        <div className='flex-shrink-0 mb-4 md:mb-0'>
          <Avatar className='h-24 w-24 border border-gray-200'>
            <AvatarImage src={childData.avatarUrl || ''} alt={childData.username || ''} />
            <AvatarFallback className='bg-primary/10 text-primary text-xl font-bold'>
              {`${childData.firstName?.[0] || ''}${childData.lastName?.[0] || ''}`}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Thông tin cơ bản */}
        <div className='w-full md:w-auto flex-1 space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
            {/* Họ và tên */}
            <div>
              <p className='text-sm text-gray-500 mb-1'>Họ và tên</p>
              <p className='font-medium'>
                {childData.firstName} {childData.lastName}
              </p>
            </div>

            {/* Tài khoản */}
            <div>
              <p className='text-sm text-gray-500 mb-1'>Tài khoản</p>
              <p className='font-medium'>{childData.username}</p>
            </div>

            {/* Ngày sinh */}
            {childData.dob && (
              <div>
                <p className='text-sm text-gray-500 mb-1'>Ngày sinh</p>
                <p className='font-medium'>{childData.dob}</p>
              </div>
            )}

            {/* Giới tính */}
            {childData.gender && (
              <div>
                <p className='text-sm text-gray-500 mb-1'>Giới tính</p>
                <p className='font-medium'>{childData.gender}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

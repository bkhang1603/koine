import { ProfileForm } from '@/components/public/parent/setting/profile-form'
import { User } from 'lucide-react'

export default function SettingPage() {
  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <div className='flex items-center gap-2'>
          <User className='h-5 w-5 text-primary' />
          <h2 className='text-xl font-medium text-gray-900'>Hồ sơ cá nhân</h2>
        </div>
        <p className='text-sm text-gray-500 mt-1 md:ml-7'>
          Điền thông tin cá nhân của bạn để chúng tôi có thể hiển thị chính xác thông tin của bạn.
        </p>
      </div>

      <ProfileForm />
    </div>
  )
}

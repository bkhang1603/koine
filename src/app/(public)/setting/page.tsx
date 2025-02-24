import { ProfileForm } from '@/components/public/parent/setting/profile-form'
import { Separator } from '@/components/ui/separator'

export default function SettingPage() {
  return (
    <div className='max-w-4xl mx-auto space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-2xl font-semibold'>Hồ sơ cá nhân</h3>
          <p className='text-sm text-gray-500 mt-1'>
            Điền thông tin cá nhân của bạn để chúng tôi có thể hiển thị chính xác thông tin của bạn.
          </p>
        </div>
      </div>

      <Separator />

      <ProfileForm />
    </div>
  )
}

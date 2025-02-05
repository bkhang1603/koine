import { ProfileForm } from '@/components/public/parent/setting/profile-form'
import { Separator } from '@/components/ui/separator'

async function page() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Hồ sơ cá nhân</h3>
        <p className='text-sm text-muted-foreground'>
          Điền thông tin cá nhân của bạn để chúng tôi có thể hiển thị chính xác thông tin của bạn.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}

export default page

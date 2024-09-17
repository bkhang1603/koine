import { PasswordForm } from '@/app/(public)/setting/components/password-form'
import { Separator } from '@/components/ui/separator'

function page() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Thay đổi mật khẩu</h3>
        <p className='text-sm text-muted-foreground'>
          Để đảm bảo tài khoản của bạn an toàn, hãy chọn mật khẩu mạnh và không chia sẻ nó với người khác.
        </p>
      </div>
      <Separator />
      <PasswordForm />
    </div>
  )
}

export default page

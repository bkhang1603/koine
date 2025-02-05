import { PaymentForm } from '@/components/public/parent/setting/payment-form'
import { Separator } from '@/components/ui/separator'

function page() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Thay đổi thông tin thanh toán</h3>
        <p className='text-sm text-muted-foreground'>
          Thông tin thanh toán của bạn sẽ được sử dụng để thanh toán các đơn hàng trên website
        </p>
      </div>
      <Separator />
      <PaymentForm />
    </div>
  )
}

export default page

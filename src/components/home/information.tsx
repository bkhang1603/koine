import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

function Information({ className }: { className?: string }) {
  return (
    <section className={cn('container flex items-center justify-center flex-col py-36', className)}>
      <h2
        className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
        text-transparent bg-clip-text text-xl sm:text-3xl lg:text-4xl font-bold text-center'
      >
        Cập nhật những thông tin mới sớm nhất
      </h2>
      <p className='mt-11'>Hãy nhập email của bạn để chúng tôi có thể thông báo cho bạn sớm nhất.</p>

      <div className='flex items-center w-full sm:w-[500px] md:w-[600px] mt-9'>
        <Input className='focus-visible:ring-0 border-secondary rounded-lg' placeholder='Email' />
        <Button
          className='-ml-6 bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
        hover:bg-gradient-to-l rounded-lg'
        >
          Gửi liên hệ
        </Button>
      </div>
    </section>
  )
}

export default Information

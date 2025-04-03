import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import icons from '@/assets/icons'
import envConfig from '@/config'
import { useGetIpMutation } from '@/queries/useIp'

export function GoogleLoginButton() {
  const { data } = useGetIpMutation()
  const ipAddress = data?.payload.data.clientIp ?? ''

  return (
    <Button variant='outline' className='w-full md:w-[600px] text-base h-10 mt-5'>
      <Link
        href={`${envConfig.NEXT_PUBLIC_GOOGLE_URL}?deviceId=${ipAddress}`}
        className='flex items-center justify-center'
      >
        <Image src={icons.google} alt='Google' width={24} height={24} className='mr-3' />
        Đăng nhập với Google
      </Link>
    </Button>
  )
}

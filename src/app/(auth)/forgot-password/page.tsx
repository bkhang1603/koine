import icons from '@/assets/icons'
import images from '@/assets/images'
import ForgotPasswordForm from '@/components/form/forgot-password-form'
import { Button } from '@/components/ui/button'
import configRoute from '@/config/route'
import Image from 'next/image'
import Link from 'next/link'

function ForgotPasswordPage() {
  return (
    <section className='h-screen flex flex-col justify-between'>
      <div className='container min-h-[100px] flex items-center'>
        <Link href={configRoute.home}>
          <Image src={icons.logo} alt='Koine logo' width={100} height={100} />
        </Link>
      </div>

      <div className='container flex justify-center items-center flex-col relative mt-10 sm:mt-0'>
        <h1
          className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
        inline-block text-transparent bg-clip-text text-2xl sm:text-4xl lg:text-5xl font-bold lg:h-14'
        >
          Bạn đã quên mật khẩu?
        </h1>
        <p className='mt-6 font-semibold text-sm sm:text-base text-center'>Trên đời này có hai thứ không được bỏ lỡ</p>
        <p className='font-semibold text-sm sm:text-base text-center'>Đó là chuyến xe cuối cùng và mật khẩu của mình</p>

        <ForgotPasswordForm className='mt-10' />

        <div className='my-8 flex items-center w-full md:w-[600px]'>
          <div className='border-t border-sixth/80 w-full' />
          <span className='text-sixth text-sm font-medium px-4'>Hoặc</span>
          <div className='border-t border-sixth/80 w-full' />
        </div>

        <Button variant='outline' className='w-full md:w-[600px] text-base h-10'>
          <Image src={icons.facebook} alt='Google' width={24} height={24} className='mr-3' />
          Đăng nhập với Facebook
        </Button>

        <Button variant='outline' className='w-full md:w-[600px] text-base h-10 mt-5'>
          <Image src={icons.google} alt='Google' width={24} height={24} className='mr-3' />
          Đăng nhập với Google
        </Button>

        <p className='text-secondary font-semibold mt-4 text-center text-sm sm:text-base max-sm:max-w-[260px]'>
          Bạn đã nhớ ra tài khoản của mình? {''}
          <Link href={configRoute.login} className='text-sixth hover:text-sixth/80'>
            Đăng nhập
          </Link>
        </p>

        <Image
          src={icons.pinkStar}
          alt='Koine'
          width={35}
          height={35}
          className='hidden sm:block absolute -z-10 top-0 left-0 mt-16 ml-40'
        />
        <Image
          src={icons.blueStar}
          alt='Koine'
          width={25}
          height={25}
          className='hidden sm:block absolute -z-10 bottom-0 left-0 mb-52 ml-5'
        />
        <Image
          src={icons.lightBlueStar}
          alt='Koine'
          width={50}
          height={50}
          className='hidden sm:block absolute -z-10 bottom-0 left-0 ml-60 mb-10'
        />

        <Image
          src={icons.pinkStar}
          alt='Koine'
          width={40}
          height={40}
          className='hidden sm:block absolute -z-10 bottom-0 right-0 mr-5 mb-32'
        />
        <Image
          src={icons.lightBlueStar}
          alt='Koine'
          width={20}
          height={20}
          className='hidden sm:block absolute -z-10 top-0 right-0 mr-32 mt-32'
        />
        <Image
          src={icons.blueStar}
          alt='Koine'
          width={25}
          height={25}
          className='hidden sm:block absolute -z-10 bottom-0 right-0 mr-52'
        />
      </div>

      <Image src={images.loginVector} alt='Koine' width={1800} height={1800} className='w-[100vw] min-h-[200px]' />
    </section>
  )
}

export default ForgotPasswordPage

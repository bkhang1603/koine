import icons from '@/assets/icons'
import Image from 'next/image'

function Loading() {
  return (
    <section className='w-screen h-screen flex justify-center items-center'>
      <Image src={icons.loadingLogo} alt='Koine' width={200} height={200} className='animate-spin' />
    </section>
  )
}

export default Loading

import Filter from '@/app/(public)/product/components/filter'
import List from '@/app/(public)/product/components/list'
import images from '@/assets/images'
import Image from 'next/image'

function ProductPage() {
  return (
    <main className='pb-28'>
      <Image
        src={images.product}
        alt='Banner'
        width={1920}
        height={400}
        className='h-[30vh] w-full object-cover rounded-xl'
      />

      <div className='grid grid-cols-4 gap-6'>
        <Filter />

        <List />
      </div>
    </main>
  )
}

export default ProductPage

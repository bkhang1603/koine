import Filter from '@/app/(public)/product/components/filter'
import List from '@/app/(public)/product/components/list'
import images from '@/assets/images'
import { searchParams } from '@/types/query'
import Image from 'next/image'

function ProductPage({ searchParams }: { searchParams?: searchParams }) {
  return (
    <main className='pb-28'>
      <div className='h-[30vh] w-full'>
        <Image
          src={images.banner}
          alt='Banner'
          width={1920}
          height={400}
          quality={100}
          className='h-full w-full object-cover'
          priority={true}
        />
      </div>

      <div className='grid grid-cols-4 gap-6 mt-8 container'>
        <Filter />

        <List searchParams={searchParams} />
      </div>

      <section className='container pt-60'>
        <Image
          src={images.productPoster}
          alt='Product poster'
          width={1920}
          height={400}
          quality={100}
          className='w-full object-cover rounded-2xl'
        />
      </section>
    </main>
  )
}

export default ProductPage

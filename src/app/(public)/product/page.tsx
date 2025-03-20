import Filter from '@/components/public/parent/product/filter'
import List from '@/components/public/parent/product/list'
import images from '@/assets/images'
import { searchParams } from '@/types/query'
import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal } from 'lucide-react'
import MobileFilter from '@/components/public/parent/product/mobile-filter'

async function ProductPage(props: { searchParams?: Promise<searchParams> }) {
  const searchParams = await props.searchParams
  return (
    <main className='pb-28'>
      <div className='h-[15vh] md:h-[20vh] lg:h-[30vh] w-full'>
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

      <div className='container mt-8'>
        <div className='flex md:hidden justify-end mb-4'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' size='sm' className='gap-2'>
                <SlidersHorizontal className='w-4 h-4' />
                Bộ lọc
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-[300px] p-0 pb-16'>
              <SheetHeader className='p-4 border-b'>
                <SheetTitle>Bộ lọc sản phẩm</SheetTitle>
              </SheetHeader>
              <MobileFilter />
            </SheetContent>
          </Sheet>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <div className='hidden md:block'>
            <Filter />
          </div>
          <div className='col-span-1 md:col-span-3'>
            <List searchParams={searchParams} />
          </div>
        </div>
      </div>

      <section className='container pt-20 md:pt-60'>
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

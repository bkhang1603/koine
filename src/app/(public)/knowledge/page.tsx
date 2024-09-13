import { DataType } from '@/app/(public)/knowledge/[id]/page'
import images from '@/assets/images'
import CardBlog from '@/components/card-blog'
import Information from '@/app/(public)/components/information'
import Tag from '@/components/tag'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import configRoute from '@/config/route'
import data from '@/data/data'
import Image from 'next/image'
import Link from 'next/link'

function KnowledgePage() {
  const newData = data as unknown as DataType[]

  return (
    <main>
      <figure className='py-24 relative'>
        <Image
          src={images.knowledgeBackground}
          alt='Knowledge Background'
          width={2000}
          height={2000}
          className='hidden sm:block object-cover w-full'
        />

        <h1
          className='text-secondary font-bold text-xl sm:text-3xl lg:text-4xl text-center
        absolute inset-0 flex items-center justify-center mx-auto max-w-[700px]'
        >
          “Có kiến thức bảo vệ bản thân để tạo nên hạnh phúc”
          <Image
            src={images.underline}
            alt='Underline'
            width={500}
            height={500}
            className='w-40 lg:w-52 absolute top-[50%] right-[42%] transform
            translate-x-1/2 translate-y-8 z-[-1] hidden lg:block'
          />
        </h1>
      </figure>

      <ScrollArea className='w-full bg-fourth rounded-2xl'>
        <div className='flex items-center space-x-2 p-4'>
          <Tag className='bg-sixth hover:bg-sixth/80'>Tất cả</Tag>
          <Tag>Mới</Tag>
          <Tag>Cũ</Tag>
          <Tag>Phổ biến</Tag>
          <Tag>Thanh thiếu niên</Tag>
          <Tag>Trẻ em</Tag>
          <Tag>Bé gái</Tag>
          <Tag>Bé trai</Tag>
        </div>

        <ScrollBar orientation='horizontal' />
      </ScrollArea>

      <div className='w-full flex flex-col items-center py-10 gap-4'>
        {newData.map((item, index) => (
          <Link key={index} href={`${configRoute.knowledge}/${item?.id}`} className='w-full'>
            <CardBlog data={item} />
          </Link>
        ))}
      </div>

      {/* <PaginationCustom className='mt-16' totalPage={5} href='/knowledge' /> */}

      <Information className='mt-20' />
    </main>
  )
}

export default KnowledgePage

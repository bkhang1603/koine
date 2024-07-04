import images from '@/assets/images'
import CardBlog from '@/components/card-blog'
import Information from '@/components/home/information'
import PaginationCustom from '@/components/pagination-custom'
import Tag from '@/components/tag'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineTime
} from '@/components/timeline'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Image from 'next/image'

function KnowledgePage() {
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

      <div className='w-full flex items-center py-10'>
        <Timeline className='md:pl-28'>
          {[...Array(8)].map((_, index) => (
            <TimelineItem key={index}>
              <TimelineConnector />
              <TimelineHeader>
                <TimelineTime>2024-03-07</TimelineTime>
                <TimelineIcon />
              </TimelineHeader>
              <TimelineContent>
                <CardBlog />
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>

      <PaginationCustom className='mt-16' totalPage={5} href='/knowledge' />

      <Information className='mt-20' />
    </main>
  )
}

export default KnowledgePage

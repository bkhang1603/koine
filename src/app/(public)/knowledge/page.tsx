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
      <figure className='py-36 lg:py-48 flex items-center justify-center relative'>
        <Image
          src={images.knowledgeBackground}
          alt='Knowledge Background'
          width={2000}
          height={2000}
          className='object-cover w-full absolute -z-10'
        />

        <h1 className='text-secondary font-bold text-3xl md:text-4xl text-center relative py-10'>
          “Có kiến thức bảo vệ bản thân
          <br />
          để tạo nên hạnh phúc”
          <Image
            src={images.underline}
            alt='Underline'
            width={500}
            height={500}
            className='object-contain w-44 md:w-52 absolute bottom-2 md:bottom-0 right-12 md:right-16'
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

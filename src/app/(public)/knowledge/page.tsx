import images from '@/assets/images'
import CardBlog from '@/components/card-blog'
import Information from '@/app/(public)/components/information'
import Tag from '@/components/tag'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import configRoute from '@/config/route'
import Image from 'next/image'
import Link from 'next/link'
import blogApiRequest from '@/apiRequests/blog'
import { BlogsResType } from '@/schemaValidations/blog.schema'

async function KnowledgePage() {
  let blogs: BlogsResType['data'] = []

  try {
    const { payload } = await blogApiRequest.getBlogs({
      page_index: 1,
      search: ''
    })
    blogs = payload.data
  } catch (error) {
    console.log(error)
  }

  if (!blogs) {
    return <div>No blogs available</div>
  }

  return (
    <main>
      <Image
        src={images.blogBanner}
        alt='Banner'
        width={1920}
        height={400}
        quality={100}
        className='h-[30vh] w-full object-cover'
      />

      <section className='container mt-10'>
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
          {blogs.map((item, index) => (
            <Link key={index} href={`${configRoute.knowledge}/${item?.id}`} className='w-full'>
              <CardBlog blog={item} />
            </Link>
          ))}
        </div>

        <Information className='mt-20' />
      </section>
    </main>
  )
}

export default KnowledgePage

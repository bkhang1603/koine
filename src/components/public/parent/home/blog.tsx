import blogApiRequest from '@/apiRequests/blog'
import CardBlog from '@/components/card-blog'
import Tag from '@/components/tag'
import configRoute from '@/config/route'
import { BlogsResType } from '@/schemaValidations/blog.schema'
import Link from 'next/link'

async function Blog() {
  let blogs: BlogsResType['data'] = []

  try {
    const { payload } = await blogApiRequest.getBlogs({
      page_index: 1,
      page_size: 3,
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
    <div className='container flex justify-center items-center flex-col py-32'>
      <h3 className='font-semibold text-lg'>Bài viết mới nhất</h3>

      <h2
        className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
        text-transparent bg-clip-text text-2xl md:text-3xl lg:text-5xl lg:h-14 font-bold mt-10 text-center'
      >
        Những tin tức về giáo dục giới tính
      </h2>

      <Link href={configRoute.knowledge}>
        <div className='mt-5 hidden md:flex justify-center items-center gap-2'>
          <Tag>Cũ</Tag>

          <Tag>Mới</Tag>

          <Tag>Thanh thiếu niên</Tag>

          <Tag>Trẻ em</Tag>

          <Tag>Bé trai</Tag>

          <Tag>Bé gái</Tag>
        </div>
      </Link>

      <div className='mt-10 lg:w-full flex justify-center items-center flex-col gap-3'>
        {blogs.map((item, index) => (
          <Link key={index} href={`${configRoute.knowledge}/${item?.slug}`} className='w-full'>
            <CardBlog blog={item} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Blog

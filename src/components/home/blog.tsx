import { DataType } from '@/app/(public)/knowledge/[id]/page'
import CardBlog from '@/components/card-blog'
import Tag from '@/components/tag'
import configRoute from '@/config/route'
import topData from '@/data/topData'
import Link from 'next/link'

function Blog() {
  const newData = topData as unknown as DataType[]

  return (
    <div className='container flex justify-center items-center flex-col py-20'>
      <h3 className='font-semibold text-lg'>Bài viết mới nhất</h3>

      <h2
        className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
        text-transparent bg-clip-text text-2xl md:text-3xl lg:text-5xl lg:h-14 font-bold mt-10 text-center'
      >
        Những tin tức về giáo dục giới tính
      </h2>

      <div className='mt-5 hidden md:flex justify-center items-center gap-2'>
        <Tag>Cũ</Tag>
        <Tag>Mới</Tag>
        <Tag>Thanh thiếu niên</Tag>
        <Tag>Trẻ em</Tag>
        <Tag>Bé trai</Tag>
        <Tag>Bé gái</Tag>
      </div>

      <div className='mt-10 lg:w-full flex justify-center items-center flex-col gap-3'>
        {newData.map((item) => (
          <Link className='w-full' key={item?.id} href={`${configRoute.knowledge}/${item?.id}`}>
            <CardBlog data={item} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Blog

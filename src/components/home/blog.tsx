import { NewDataType } from '@/app/(public)/knowledge/[id]/page'
import CardBlog from '@/components/card-blog'
import Tag from '@/components/tag'
import data from '@/data/data'

function Blog() {
  const newData = data as NewDataType[]

  return (
    <section className='container flex justify-center items-center flex-col py-20'>
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
          <CardBlog key={item.id} data={item} />
        ))}
      </div>
    </section>
  )
}

export default Blog

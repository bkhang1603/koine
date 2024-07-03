import CardBlog from '@/components/card-blog'
import Tag from '@/components/tag'

function Blog() {
  return (
    <section className='container flex justify-center items-center flex-col py-20'>
      <h3 className='font-semibold text-lg'>Bài viết mới nhất</h3>

      <h2
        className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
        text-transparent bg-clip-text text-5xl font-bold h-[52px] mt-10 line-clamp-1'
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
        <CardBlog />
        <CardBlog />
        <CardBlog />
      </div>
    </section>
  )
}

export default Blog

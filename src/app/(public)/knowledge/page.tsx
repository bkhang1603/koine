import images from '@/assets/images'
import Information from '@/components/public/parent/home/information'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import configRoute from '@/config/route'
import Image from 'next/image'
import Link from 'next/link'
import blogApiRequest from '@/apiRequests/blog'
import { BlogsResType } from '@/schemaValidations/blog.schema'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const categories = [
  { id: 'all', name: 'Tất cả', featured: true },
  { id: 'new', name: 'Mới nhất' },
  { id: 'popular', name: 'Phổ biến' },
  { id: 'teen', name: 'Thanh thiếu niên' },
  { id: 'children', name: 'Trẻ em' },
  { id: 'girls', name: 'Bé gái' },
  { id: 'boys', name: 'Bé trai' }
]

async function KnowledgePage() {
  let blogs: BlogsResType['data'] = []

  try {
    const { payload } = await blogApiRequest.getBlogs({
      page_index: 1,
      page_size: 10,
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

      {/* Categories & Blogs */}
      <section className='py-20'>
        <div className='container'>
          {/* Section Title */}
          <div className='max-w-3xl mx-auto text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-[#FF597D] to-secondary text-transparent bg-clip-text'>
              Kiến Thức & Chia Sẻ
            </h2>
            <p className='text-gray-600 text-lg'>
              Khám phá những kiến thức bổ ích và câu chuyện thú vị về giáo dục giới tính
            </p>
          </div>

          {/* Categories */}
          <ScrollArea className='w-full bg-white rounded-2xl shadow-sm border border-gray-100/80'>
            <div className='flex items-center gap-2 p-4'>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-colors
                    ${
                      category.featured
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>

          {/* Blog Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
            {blogs.map((blog, index) => (
              <Link key={blog.id || index} href={`${configRoute.knowledge}/${blog?.slug}`} className='group'>
                <div
                  className='bg-white rounded-2xl overflow-hidden border border-gray-100
                  hover:shadow-xl transition-all duration-300'
                >
                  {/* Image */}
                  <div className='relative aspect-[16/9] overflow-hidden'>
                    <Image
                      src={blog.imageUrl || images.blogBanner}
                      alt={blog.title}
                      fill
                      className='object-cover transition-transform duration-500
                        group-hover:scale-105'
                    />
                  </div>

                  {/* Content */}
                  <div className='p-6'>
                    {/* Date & Stats */}
                    <div className='flex items-center gap-4 mb-4'>
                      <span className='text-primary text-sm font-medium'>
                        {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                      <span className='text-gray-500 text-sm'>
                        {blog.totalReact} lượt thích • {blog.totalComment} bình luận
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3
                      className='text-xl font-semibold mb-3 group-hover:text-primary
                      transition-colors line-clamp-2'
                    >
                      {blog.title}
                    </h3>
                    <p className='text-gray-600 line-clamp-3'>{blog.description}</p>

                    {/* Author */}
                    <div className='flex items-center gap-3 mt-6 pt-6 border-t border-gray-100'>
                      <div className='relative w-8 h-8 rounded-full overflow-hidden'>
                        <Avatar className='w-full h-full'>
                          <AvatarImage src={blog.creatorInfo.avatarUrl} />
                          <AvatarFallback>{blog.creatorInfo.firstName.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <span className='text-sm font-medium text-gray-700'>{blog.creatorInfo.firstName}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Information />
    </main>
  )
}

export default KnowledgePage

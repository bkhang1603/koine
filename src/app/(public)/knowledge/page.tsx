import images from '@/assets/images'
import Information from '@/components/public/parent/home/information'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import configRoute from '@/config/route'
import Image from 'next/image'
import Link from 'next/link'
import blogApiRequest from '@/apiRequests/blog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { wrapServerApi } from '@/lib/server-utils'
import { searchParams } from '@/types/query'

const categories = [
  { id: 'all', name: 'Tất cả', featured: true },
  { id: 'new', name: 'Mới nhất' },
  { id: 'popular', name: 'Phổ biến' },
  { id: 'teen', name: 'Thanh thiếu niên' },
  { id: 'children', name: 'Trẻ em' },
  { id: 'girls', name: 'Bé gái' },
  { id: 'boys', name: 'Bé trai' }
]

async function KnowledgePage(props: { searchParams?: Promise<searchParams> }) {
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams?.page) || 1
  const pageSize = 9 // 3 columns x 3 rows looks nice on desktop

  const data = await wrapServerApi(() =>
    blogApiRequest.getBlogs({
      page_index: currentPage,
      page_size: pageSize,
      search: ''
    })
  )

  const blogs = data?.payload?.data || []
  const totalPages = data?.payload?.pagination?.totalPage

  if (!blogs || blogs.length === 0) {
    return <div className='container py-20 text-center'>Không có bài viết nào</div>
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
          <div className='relative mb-8'>
            <ScrollArea className='w-full bg-white rounded-xl shadow-sm border border-gray-100/80 py-1'>
              <div className='flex items-center gap-2 p-3 sm:p-4'>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`whitespace-nowrap px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-colors
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
              <ScrollBar orientation='horizontal' className='h-2' />
            </ScrollArea>
          </div>

          {/* Blog Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
            {blogs.map((blog, index) => (
              <Link key={blog.id || index} href={`${configRoute.knowledge}/${blog?.slug}`} className='group'>
                <div
                  className='bg-white rounded-2xl overflow-hidden border border-gray-100
                  hover:shadow-xl transition-all duration-300 flex flex-col h-full'
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
                  <div className='p-6 flex flex-col flex-grow'>
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
                    <div className='text-gray-600 h-[4.5rem] overflow-hidden mb-auto'>
                      <p className='line-clamp-3'>{blog.description}</p>
                    </div>

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

          {/* Pagination */}
          {totalPages && totalPages > 1 && (
            <div className='flex justify-center mt-12'>
              <div className='flex items-center gap-2'>
                {currentPage > 1 && (
                  <Link
                    href={`/knowledge?page=${currentPage - 1}`}
                    className='px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors'
                  >
                    Trước
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={`/knowledge?page=${page}`}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === page ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </Link>
                ))}

                {currentPage < totalPages && (
                  <Link
                    href={`/knowledge?page=${currentPage + 1}`}
                    className='px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors'
                  >
                    Tiếp
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Information />
    </main>
  )
}

export default KnowledgePage

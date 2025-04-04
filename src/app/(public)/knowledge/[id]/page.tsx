import blogApiRequest from '@/apiRequests/blog'
import BlogComments from '@/components/public/parent/knowledge/blog-comments'
import { CalendarDays } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { wrapServerApi } from '@/lib/server-utils'
import { Breadcrumb } from '@/components/public/parent/setting/Breadcrumb'

async function BlogDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params

  const { id } = params

  const data = await wrapServerApi(() => blogApiRequest.getBlogCache(id))
  const blog = data?.payload?.data

  if (!blog) {
    return <div>Blog không tồn tại</div>
  }

  return (
    <main>
      {/* Blog Header */}
      <header className='relative bg-gradient-to-b from-gray-50/50'>
        <div className='container max-w-4xl pt-10 pb-12'>
          {/* Breadcrumb */}
          <Breadcrumb
            className='mb-8'
            items={[
              { title: 'Tin tức', href: '/knowledge' },
              { title: blog.title, href: `/knowledge/${id}` }
            ]}
          />

          {/* Author & Date */}
          <div className='flex items-center gap-4 mb-8'>
            <div className='relative w-14 h-14 rounded-full overflow-hidden border-4 border-white shadow-md'>
              <Avatar className='w-full h-full'>
                <AvatarImage src={blog.creatorInfo.avatarUrl} />
                <AvatarFallback>{blog.creatorInfo.firstName.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className='font-semibold text-gray-900'>{blog.creatorInfo.firstName}</div>
              <div className='flex items-center gap-3 text-sm text-gray-500 mt-0.5'>
                <time className='flex items-center gap-1.5'>
                  <CalendarDays className='w-4 h-4' />
                  {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                </time>
                <span>•</span>
                <span>5 phút đọc</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6'>{blog.title}</h1>

          {/* Description */}
          <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
            Khám phá những kiến thức bổ ích về giáo dục giới tính và phát triển bản thân.
          </p>
        </div>
      </header>

      {/* Blog Content */}
      <article className='bg-white'>
        <div className='container max-w-4xl'>
          {blog.content && (
            <div
              className='prose prose-lg max-w-none prose-headings:text-gray-900 
              prose-p:text-gray-600 prose-p:leading-relaxed'
            >
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          )}
        </div>
      </article>

      {/* Comments Section */}
      <section className='py-16'>
        <div className='container max-w-4xl'>
          <BlogComments id={id} />
        </div>
      </section>
    </main>
  )
}

export default BlogDetailPage

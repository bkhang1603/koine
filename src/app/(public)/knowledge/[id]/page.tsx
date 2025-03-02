import blogApiRequest from '@/apiRequests/blog'
import BlogComments from '@/components/public/parent/knowledge/blog-comments'
import { BlogResType } from '@/schemaValidations/blog.schema'
import { BookOpen, CalendarDays, ChevronRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

async function BlogDetailPage({ params: { id } }: { params: { id: string } }) {
  let blog: BlogResType['data'] | null = null

  try {
    const { payload } = await blogApiRequest.getBlog(id)
    blog = payload.data
  } catch (error) {
    console.log(error)
  }

  if (!blog) {
    return <div>Blog không tồn tại</div>
  }

  return (
    <main>
      {/* Breadcrumb Navigation */}
      <nav className='py-3 sm:py-4'>
        <div className='container max-w-4xl'>
          <div className='flex items-center text-sm text-muted-foreground'>
            <Link href='/knowledge' className='flex items-center hover:text-primary transition-colors'>
              <BookOpen className='w-3.5 h-3.5 mr-1' />
              <span>Kiến thức</span>
            </Link>
            <ChevronRight className='w-3.5 h-3.5 mx-2' />
            <span className='truncate max-w-[180px] sm:max-w-xs text-gray-600 font-medium'>{blog.title}</span>
          </div>
        </div>
      </nav>

      {/* Blog Header */}
      <header className='relative bg-gradient-to-b from-gray-50/50'>
        <div className='container max-w-4xl pt-10 pb-12'>
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
              <div className='tiptap-editor' dangerouslySetInnerHTML={{ __html: blog.content }} />
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

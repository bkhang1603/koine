import blogApiRequest from '@/apiRequests/blog'
import BlogComments from '@/app/(public)/knowledge/components/blog-comments'
import { BlogResType } from '@/schemaValidations/blog.schema'

async function page({ params: { id } }: { params: { id: string } }) {
  let blog: BlogResType['data'] | null = null

  try {
    const { payload } = await blogApiRequest.getBlog(id)
    blog = payload.data
  } catch (error) {
    console.log(error)
  }

  return (
    <div className='py-16 container max-w-5xl'>
      <h1
        className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
            text-transparent bg-clip-text text-2xl md:text-3xl lg:text-4xl font-bold text-center'
      >
        {blog?.title}
      </h1>

      <div className='mt-12 tiptap-editor' dangerouslySetInnerHTML={{ __html: blog?.content! }} />

      <BlogComments id={id} />
    </div>
  )
}

export default page

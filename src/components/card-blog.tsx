import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { changeTime } from '@/lib/utils'
import { BlogResType } from '@/schemaValidations/blog.schema'
import { Ellipsis } from 'lucide-react'
import Image from 'next/image'

function CardBlog({ blog }: { blog: BlogResType['data'] }) {
  return (
    <article className='w-full py-7 px-6 cursor-pointer hover:bg-fourth/80 shadow-lg rounded-2xl transition duration-500 ease-in-out'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <Avatar className='w-9 h-9'>
            <AvatarImage src={blog?.creatorInfo?.avatarUrl} />
            <AvatarFallback>{blog?.creatorInfo.firstName}</AvatarFallback>
          </Avatar>
          <span className='font-semibold'>{blog?.creatorInfo.firstName}</span>
        </div>

        <div className='flex items-center gap-4 text-secondary'>
          <Ellipsis />
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-between items-center gap-4 mt-3'>
        <div className='max-w-[800px] h-[150px] flex flex-col justify-between'>
          <h2
            className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
            text-transparent bg-clip-text text-2xl font-semibold line-clamp-1'
          >
            {blog?.title}
          </h2>
          <h4 className='line-clamp-2'>{blog?.description}</h4>
          <span className='font-medium text-sm'>{changeTime(blog?.createdAt!)}</span>
        </div>
        <Image
          src={blog?.imageUrl!}
          alt='blog'
          width={500}
          height={500}
          className='w-full md:w-[320px] h-[180px] object-cover rounded-xl'
        />
      </div>
    </article>
  )
}

export default CardBlog

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BlogResType } from '@/schemaValidations/blog.schema'
import { Ellipsis } from 'lucide-react'
import Image from 'next/image'

function CardBlog({ blog }: { blog: BlogResType['data'] }) {
  const changeDate = (createdAt: string) => {
    if (!createdAt) return 'Vừa xong'
    // Tôi đang có data là 14:00:00-10/01/2024, tôi muốn chuyển thành số giờ trước so với thời gian hiện tại
    // Ví dụ: 2 giờ trước
    const [time, date] = createdAt.split('-')
    const [hour, minute, second] = time.split(':').map(Number)
    const [day, month, year] = date.split('/').map(Number)
    const commentDate = new Date(year, month - 1, day, hour, minute, second)
    const currentDate = new Date()
    const diff = currentDate.getTime() - commentDate.getTime()

    if (diff < 0) {
      return 'Vừa xong'
    }

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    if (years) {
      return `${years} năm trước`
    }

    if (months) {
      return `${months} tháng trước`
    }

    if (days) {
      return `${days} ngày trước`
    }

    if (hours) {
      return `${hours} giờ trước`
    }

    if (minutes) {
      return `${minutes} phút trước`
    }

    if (seconds) {
      return `${seconds} giây trước`
    }

    return 'Vừa xong'
  }

  return (
    <article className='w-full py-7 px-6 cursor-pointer hover:bg-fourth/80 shadow-lg rounded-2xl transition duration-500 ease-in-out'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <Avatar className='w-9 h-9'>
            <AvatarImage src={blog?.creator?.avatarUrl} />
            <AvatarFallback>{blog?.creator.username}</AvatarFallback>
          </Avatar>
          <span className='font-semibold'>{blog?.creator.username}</span>
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
          <span className='font-medium text-sm'>{changeDate(blog?.createdAt!)}</span>
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

import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const EmptyBlogs = () => {
  return (
    <div className='flex flex-col items-center justify-center p-8 text-center'>
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-muted'>
        <FileQuestion className='h-10 w-10 text-muted-foreground' />
      </div>
      <h3 className='mt-4 text-lg font-semibold'>Không tìm thấy bài viết nào</h3>
      <p className='mb-4 mt-2 text-sm text-muted-foreground'>
        Bạn chưa có bài viết nào. Hãy bắt đầu bằng cách tạo bài viết mới!
      </p>
      <Button asChild>
        <Link href='/content-creator/blog/new'>Tạo bài viết mới</Link>
      </Button>
    </div>
  )
}

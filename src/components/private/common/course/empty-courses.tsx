import { Button } from '@/components/ui/button'
import { FileText, Plus } from 'lucide-react'
import Link from 'next/link'

export function EmptyCourses() {
  return (
    <div className='text-center py-12'>
      <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4'>
        <FileText className='w-8 h-8 text-primary' />
      </div>
      <h3 className='text-lg font-medium mb-2'>Không tìm thấy khóa học</h3>
      <p className='text-sm text-muted-foreground mb-4'>Thử thay đổi bộ lọc hoặc tạo khóa học mới</p>
      <Link href='/content-creator/course/new'>
        <Button>
          <Plus className='w-4 h-4 mr-2' />
          Tạo khóa học
        </Button>
      </Link>
    </div>
  )
}

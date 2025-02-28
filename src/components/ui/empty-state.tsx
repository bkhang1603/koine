import { FileX } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = 'Không có dữ liệu',
  description = 'Chưa có dữ liệu nào được tạo hoặc không tìm thấy kết quả phù hợp.'
}: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center h-[200px] text-center p-4'>
      <FileX className='w-12 h-12 text-muted-foreground mb-3' />
      <h3 className='font-medium'>{title}</h3>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  )
}

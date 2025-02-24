import { FileX2 } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({ 
  title = 'Không tìm thấy dữ liệu', 
  description = 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm khác.' 
}: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center py-12 border rounded-lg bg-muted/10'>
      <FileX2 className='w-12 h-12 text-muted-foreground mb-4' />
      <h3 className='text-lg font-medium'>{title}</h3>
      <p className='text-sm text-muted-foreground mt-1'>{description}</p>
    </div>
  )
} 
import { Badge } from '@/components/ui/badge'
import type { CourseStatus } from '@/app/(private)/salesman/_mock/data'

const statusConfig: Record<CourseStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  draft: {
    label: 'Đang tạo nội dung',
    variant: 'secondary'
  },
  pending_price: {
    label: 'Chờ thiết lập giá',
    variant: 'outline'
  },
  pending_review: {
    label: 'Chờ duyệt',
    variant: 'outline'
  },
  published: {
    label: 'Đã xuất bản',
    variant: 'default'
  },
  unpublished: {
    label: 'Tạm ẩn',
    variant: 'secondary'
  },
  rejected: {
    label: 'Bị từ chối',
    variant: 'destructive'
  }
}

export function CourseStatusBadge({ status }: { status: CourseStatus }) {
  const config = statusConfig[status]
  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  )
} 
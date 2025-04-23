import { Badge } from '@/components/ui/badge'
//import type { CourseStatus } from '@/app/(private)/salesman/_mock/data'

export type CourseStatus =
  | 'draft' // Đang tạo nội dung
  | 'pending_price' // Chờ thiết lập giá
  | 'pending_review' // Chờ duyệt
  | 'published' // Đã xuất bản
  | 'unpublished' // Tạm ẩn
  | 'rejected' // Bị từ chối

const statusConfig: Record<
  CourseStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
> = {
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
  return <Badge variant={config.variant}>{config.label}</Badge>
}

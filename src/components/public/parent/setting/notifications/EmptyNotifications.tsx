import { Bell, BookCopy, CheckCircle2 } from 'lucide-react'

interface EmptyNotificationsProps {
  type: string
}

export function EmptyNotifications({ type }: EmptyNotificationsProps) {
  // Hiển thị nội dung phù hợp với loại tab
  const getContent = () => {
    switch (type) {
      case 'unread':
        return {
          icon: <CheckCircle2 className='h-10 w-10 text-green-200' />,
          title: 'Không có thông báo chưa đọc',
          description: 'Bạn đã đọc tất cả thông báo. Chúng tôi sẽ thông báo khi có nội dung mới.'
        }
      case 'course':
        return {
          icon: <BookCopy className='h-10 w-10 text-blue-200' />,
          title: 'Không có thông báo khóa học',
          description: 'Bạn chưa có thông báo nào về khóa học. Hãy đăng ký thêm khóa học mới.'
        }
      case 'system':
        return {
          icon: <Bell className='h-10 w-10 text-amber-200' />,
          title: 'Không có thông báo hệ thống',
          description: 'Hiện không có thông báo nào từ hệ thống cho bạn.'
        }
      default:
        return {
          icon: <Bell className='h-10 w-10 text-gray-200' />,
          title: 'Không có thông báo nào',
          description: 'Bạn chưa có thông báo nào. Chúng tôi sẽ thông báo khi có nội dung mới.'
        }
    }
  }

  const content = getContent()

  return (
    <div className='text-center py-16 bg-gray-50/50'>
      <div className='flex flex-col items-center'>
        {content.icon}
        <h3 className='text-lg font-medium text-gray-800 mt-4 mb-1'>{content.title}</h3>
        <p className='text-sm text-gray-500 max-w-md'>{content.description}</p>
      </div>
    </div>
  )
}

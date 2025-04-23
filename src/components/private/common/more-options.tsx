'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Edit, MoreHorizontal, Trash, Eye, MessageSquare, CheckCircle, XCircle, Truck } from 'lucide-react'
import { useState } from 'react'

interface ItemType {
  id: string
  title: string
  status: string
  slug: string
  isVisible?: boolean
  isDraft?: boolean
  // other properties...
}

interface MoreOptionsProps {
  item: ItemType
  itemType: 'blog' | 'category' | 'course' | 'order' | 'user' | 'chapter' | 'lesson' | 'product' | 'ticket'
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onManageComments?: () => void
  onReview?: () => void
  onReject?: () => void
  onAccept?: () => void
  onConfirmDelivery?: () => void
  onToggleVisibility?: () => void
  onUpdateStatusCourse?: () => void
  onUpdateStatusBlog?: () => void
  onResolve?: () => void
  updateStatusLabel?: string
  isUpdateStatusEnabled?: boolean
  isActionEnabled?: boolean
}

export function MoreOptions({
  item,
  itemType,
  onView,
  onEdit,
  onDelete,
  onManageComments,
  onReview,
  onReject,
  onAccept,
  onConfirmDelivery,
  onToggleVisibility,
  onUpdateStatusCourse,
  onUpdateStatusBlog,
  onResolve,
  updateStatusLabel,
  isUpdateStatusEnabled = false,
  isActionEnabled = false
}: MoreOptionsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [showReviewAlert, setShowReviewAlert] = useState(false)
  const [showRejectAlert, setShowRejectAlert] = useState(false)
  const [showConfirmDeliveryAlert, setShowConfirmDeliveryAlert] = useState(false)
  const [showVisibilityAlert, setShowVisibilityAlert] = useState(false)
  const [showUpdateStatusAlert, setShowUpdateStatusAlert] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleDelete = () => {
    setIsDropdownOpen(false)
    setShowDeleteAlert(true)
  }

  const handleReview = () => {
    setIsDropdownOpen(false)
    setShowReviewAlert(true)
  }

  const handleReject = () => {
    setIsDropdownOpen(false)
    setShowRejectAlert(true)
  }

  const handleConfirmDelivery = () => {
    setIsDropdownOpen(false)
    setShowConfirmDeliveryAlert(true)
  }

  const handleToggleVisibility = () => {
    setIsDropdownOpen(false)
    setShowVisibilityAlert(true)
  }

  const handleUpdateStatus = () => {
    setIsDropdownOpen(false)
    setShowUpdateStatusAlert(true)
  }

  // Map hiển thị text tương ứng với từng loại
  const deleteTexts = {
    blog: 'Bài viết',
    category: 'Danh mục',
    course: 'Khóa học',
    order: 'Đơn hàng',
    user: 'Người dùng',
    chapter: 'Chương',
    lesson: 'Bài học',
    product: 'Sản phẩm',
    ticket: 'Yêu cầu hỗ trợ'
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button className='focus-visible:ring-0' variant='ghost' size='icon'>
            <MoreHorizontal className='w-4 h-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {onView && (
            <DropdownMenuItem onClick={onView}>
              <Eye className='w-4 h-4 mr-2' />
              Xem chi tiết
            </DropdownMenuItem>
          )}
          {onEdit && (
            <DropdownMenuItem onClick={onEdit}>
              <Edit className='w-4 h-4 mr-2' />
              Chỉnh sửa
            </DropdownMenuItem>
          )}

          {onManageComments && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onManageComments}>
                <MessageSquare className='w-4 h-4 mr-2' />
                Quản lý bình luận
              </DropdownMenuItem>
            </>
          )}

          {(onReview || onReject || onAccept) && (
            <>
              <DropdownMenuSeparator />
              <div>
                {onReview && (
                  <DropdownMenuItem
                    onClick={handleReview}
                    onSelect={(event) => {
                      event.preventDefault()
                    }}
                  >
                    <CheckCircle className='w-4 h-4 mr-2' />
                    Duyệt bài
                  </DropdownMenuItem>
                )}
                {onAccept && (
                  <DropdownMenuItem
                    onClick={onAccept}
                    disabled={!isActionEnabled}
                    onSelect={(event) => {
                      event.preventDefault()
                    }}
                  >
                    <CheckCircle className='w-4 h-4 mr-2' />
                    Chấp nhận
                  </DropdownMenuItem>
                )}
                {onReject && (
                  <DropdownMenuItem
                    onClick={handleReject}
                    className='text-red-600'
                    disabled={!isActionEnabled}
                    onSelect={(event) => {
                      event.preventDefault()
                    }}
                  >
                    <XCircle className='w-4 h-4 mr-2' />
                    Từ chối
                  </DropdownMenuItem>
                )}
              </div>
            </>
          )}

          {onConfirmDelivery && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleConfirmDelivery}
                onSelect={(event) => {
                  event.preventDefault()
                }}
              >
                <Truck className='w-4 h-4 mr-2' />
                Xác nhận giao hàng
              </DropdownMenuItem>
            </>
          )}

          {onResolve && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onResolve}
                onSelect={(event) => {
                  event.preventDefault()
                }}
              >
                <CheckCircle className='w-4 h-4 mr-2' />
                Xử lý yêu cầu
              </DropdownMenuItem>
            </>
          )}

          {onToggleVisibility && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleToggleVisibility}
                onSelect={(event) => {
                  event.preventDefault()
                }}
              >
                <Eye className='w-4 h-4 mr-2' />
                {item.isVisible ? 'Ẩn khóa học' : 'Hiện khóa học'}
              </DropdownMenuItem>
            </>
          )}

          {onUpdateStatusCourse && updateStatusLabel && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleUpdateStatus}
                disabled={!isUpdateStatusEnabled}
                onSelect={(event) => {
                  event.preventDefault()
                }}
              >
                <CheckCircle className='w-4 h-4 mr-2' />
                {updateStatusLabel}
              </DropdownMenuItem>
            </>
          )}

          {onUpdateStatusBlog && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleUpdateStatus}
                onSelect={(event) => {
                  event.preventDefault()
                }}
              >
                <CheckCircle className='w-4 h-4 mr-2' />
                {item.status === 'VISIBLE' ? 'Ẩn bài viết' : 'Hiển thị bài viết'}
              </DropdownMenuItem>
            </>
          )}

          {onDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDelete}
                className='text-red-600'
                onSelect={(event) => {
                  event.preventDefault()
                }}
              >
                <Trash className='w-4 h-4 mr-2' />
                Xóa
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. {deleteTexts[itemType]} sẽ bị xóa vĩnh viễn khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='focus-visible:ring-0'>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete?.()
                setShowDeleteAlert(false)
              }}
              className='bg-destructive hover:bg-destructive/90'
            >
              <Trash className='w-4 h-4 mr-2' />
              Xóa {deleteTexts[itemType]}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showReviewAlert} onOpenChange={setShowReviewAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn duyệt bài?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTexts[itemType]} sẽ được duyệt và hiển thị trên hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='focus-visible:ring-0'>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onReview?.()
                setShowReviewAlert(false)
              }}
              className='bg-green-600 hover:bg-green-700'
            >
              <CheckCircle className='w-4 h-4 mr-2' />
              Duyệt {deleteTexts[itemType]}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRejectAlert} onOpenChange={setShowRejectAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn từ chối?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTexts[itemType]} sẽ bị từ chối và không được hiển thị trên hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='focus-visible:ring-0'>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onReject?.()
                setShowRejectAlert(false)
              }}
              className='bg-red-600 hover:bg-red-700'
            >
              <XCircle className='w-4 h-4 mr-2' />
              Từ chối {deleteTexts[itemType]}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showConfirmDeliveryAlert} onOpenChange={setShowConfirmDeliveryAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận giao hàng</AlertDialogTitle>
            <AlertDialogDescription>Bạn có chắc chắn muốn xác nhận giao hàng cho đơn hàng này?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmDelivery}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showVisibilityAlert} onOpenChange={setShowVisibilityAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{item.isVisible ? 'Ẩn khóa học' : 'Hiện khóa học'}</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn {item.isVisible ? 'ẩn' : 'hiện'} khóa học &quot;{item.title}&quot;?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={onToggleVisibility}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showUpdateStatusAlert} onOpenChange={setShowUpdateStatusAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {onUpdateStatusBlog
                ? item.status === 'VISIBLE'
                  ? 'Ẩn bài viết'
                  : 'Hiển thị bài viết'
                : updateStatusLabel === 'Từ chối'
                  ? 'Xác nhận từ chối khóa học'
                  : `Xác nhận ${updateStatusLabel?.toLowerCase()}`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {onUpdateStatusBlog
                ? `Bạn có chắc chắn muốn ${item.status === 'VISIBLE' ? 'ẩn' : 'hiển thị'} bài viết "${item.title}"?`
                : updateStatusLabel === 'Từ chối'
                  ? 'Khóa học sẽ bị từ chối và chuyển về trạng thái nháp.'
                  : updateStatusLabel === 'Yêu cầu xét duyệt'
                    ? 'Khóa học sẽ được gửi đi xét duyệt.'
                    : updateStatusLabel === 'Chấp nhận'
                      ? 'Khóa học sẽ được chuyển sang trạng thái chờ định giá.'
                      : 'Khóa học sẽ được kích hoạt và hiển thị trên hệ thống.'}
            </AlertDialogDescription>
            {updateStatusLabel === 'Từ chối' && (
              <div className='mt-4'>
                <label htmlFor='rejectReason' className='block text-sm font-medium text-gray-700'>
                  Lý do từ chối
                </label>
                <textarea
                  id='rejectReason'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm'
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder='Nhập lý do từ chối khóa học...'
                />
              </div>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='focus-visible:ring-0'>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (onUpdateStatusBlog) {
                  onUpdateStatusBlog()
                } else {
                  onUpdateStatusCourse?.()
                }
                setShowUpdateStatusAlert(false)
                if (updateStatusLabel === 'Từ chối') {
                  setRejectReason('')
                }
              }}
              className={updateStatusLabel === 'Từ chối' ? 'bg-destructive hover:bg-destructive/90' : ''}
            >
              <CheckCircle className='w-4 h-4 mr-2' />
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

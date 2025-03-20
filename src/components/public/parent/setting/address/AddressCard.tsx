import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, CheckCircle2, MapPin, PenLine, Star, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

interface AddressCardProps {
  address: {
    id: string
    name: string
    phone: string
    address: string
    tag: string
    isDefault: boolean
  }
  onSetDefault: () => void
  onEdit: () => void
  onDelete: () => void
}

export function AddressCard({ address, onSetDefault, onEdit, onDelete }: AddressCardProps) {
  return (
    <Card
      className={`relative overflow-hidden transition-all duration-200 hover:shadow-md group ${
        address.isDefault ? 'border-primary/20 bg-primary/5' : 'border-gray-100 hover:border-gray-200'
      }`}
    >
      {address.isDefault && (
        <div className='absolute top-0 right-0'>
          <Star className='absolute top-4 right-4 h-3.5 w-3.5 text-primary' fill='currentColor' />
        </div>
      )}

      <CardContent className='p-0 flex flex-col h-full'>
        {/* Tag badge */}
        <div className='pt-4 px-4 flex'>
          <Badge
            variant='outline'
            className={`px-2.5 py-0.5 text-xs font-normal ${
              address.tag === 'Nhà riêng'
                ? 'bg-blue-50 text-blue-600 border-blue-100'
                : address.tag === 'Văn phòng'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  : 'bg-purple-50 text-purple-600 border-purple-100'
            }`}
          >
            {address.tag}
          </Badge>

          {address.isDefault && (
            <Badge
              variant='outline'
              className='ml-2 px-2.5 py-0.5 text-xs font-normal bg-amber-50 text-amber-600 border-amber-100'
            >
              Mặc định
            </Badge>
          )}
        </div>

        {/* Main content - set min-height to ensure uniform card height */}
        <div className='p-4 pb-3 flex-grow flex flex-col min-h-[140px]'>
          <div className='flex items-start gap-3 h-full'>
            <div
              className={`mt-1 flex-shrink-0 p-2 rounded-full ${address.isDefault ? 'bg-primary/10' : 'bg-gray-100'}`}
            >
              {address.isDefault ? (
                <MapPin className='h-4 w-4 text-primary' />
              ) : (
                <Building2 className='h-4 w-4 text-gray-500' />
              )}
            </div>

            <div className='flex-1 space-y-3 flex flex-col'>
              <div>
                <h3 className='font-medium text-gray-900 leading-tight'>{address.name}</h3>
                <p className='text-sm text-gray-600'>{address.phone}</p>
              </div>

              {/* Use line-clamp for long addresses */}
              <p className='text-sm text-gray-500 leading-relaxed line-clamp-3 overflow-hidden'>{address.address}</p>

              {/* Push actions to bottom with flex layout */}
              <div className='flex-grow'></div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex border-t border-gray-100 mt-auto'>
          <Button
            variant='ghost'
            size='sm'
            onClick={onEdit}
            className='flex-1 h-10 rounded-none text-xs font-normal text-gray-600 hover:text-primary hover:bg-gray-50'
          >
            <PenLine className='h-3.5 w-3.5 mr-1.5' />
            Chỉnh sửa
          </Button>

          {!address.isDefault ? (
            <Button
              variant='ghost'
              size='sm'
              onClick={onSetDefault}
              className='flex-1 px-4 h-10 rounded-none text-xs font-normal text-gray-600 hover:text-primary hover:bg-gray-50 border-l border-gray-100'
            >
              <CheckCircle2 className='h-3.5 w-3.5 mr-1.5' />
              Đặt mặc định
            </Button>
          ) : (
            <div className='h-10 px-4 flex-1 flex items-center justify-center text-xs text-gray-400 border-l border-gray-100 bg-gray-50'>
              <CheckCircle2 className='h-3.5 w-3.5 mr-1.5 text-primary' />
              Địa chỉ mặc định
            </div>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='h-10 px-4 rounded-none text-xs font-normal text-gray-600 hover:text-red-500 hover:bg-red-50 border-l border-gray-100'
              >
                <Trash2 className='h-3.5 w-3.5' />
                <span className='sr-only'>Xóa</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Xóa địa chỉ</AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn có chắc chắn muốn xóa địa chỉ này? Hành động này không thể hoàn tác.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} className='bg-red-500 hover:bg-red-600'>
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
}

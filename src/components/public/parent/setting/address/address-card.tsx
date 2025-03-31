import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AccountAddressBodyType } from '@/schemaValidations/account.schema'
import { MapPin, Star, PenSquare, Trash2, Home, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AddressCardProps {
  address: AccountAddressBodyType & { id: string }
  onEdit: () => void
  onDelete: () => void
  onSetDefault: () => void
}

export function AddressCard({ address, onEdit, onDelete, onSetDefault }: AddressCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden bg-white border-2 transition-all duration-200',
        address.isDefault ? 'border-primary/30 shadow' : 'border-gray-200 hover:border-gray-300/80'
      )}
    >
      {/* Card Content */}
      <div className='grid grid-cols-1 h-full'>
        {/* Header with Name, Phone and Badges */}
        <div className='p-4 pb-2 flex flex-wrap justify-between gap-2'>
          <div className='flex items-center gap-2 min-w-0'>
            <div
              className={cn(
                'w-8 h-8 flex-shrink-0 rounded-md flex items-center justify-center',
                address.isDefault ? 'bg-primary/10' : 'bg-gray-100'
              )}
            >
              {address.tag === 'HOME' ? (
                <Home className={cn('w-4 h-4', address.isDefault ? 'text-primary' : 'text-gray-600')} />
              ) : (
                <Building2 className={cn('w-4 h-4', address.isDefault ? 'text-primary' : 'text-gray-600')} />
              )}
            </div>
            <div className='truncate min-w-0'>
              <h3 className='font-semibold text-gray-900 truncate'>{address.name}</h3>
              <p className='text-xs text-gray-500 truncate'>{address.phone}</p>
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <span
              className={cn(
                'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md',
                address.tag === 'HOME' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
              )}
            >
              {address.tag}
            </span>

            {address.isDefault && (
              <span className='inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-md'>
                <Star className='w-3 h-3' />
                Mặc định
              </span>
            )}
          </div>
        </div>

        {/* Address with overflow handling */}
        <div className='px-4 pb-3'>
          <div className='flex items-start gap-2'>
            <MapPin className='w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0' />
            <p className='text-sm text-gray-600 break-words'>{address.address}</p>
          </div>
        </div>

        {/* Action Footer */}
        <div className='mt-auto border-t border-gray-100 px-4 py-3 bg-gray-50/50 flex justify-end gap-1'>
          {!address.isDefault && (
            <Button
              variant='outline'
              size='sm'
              onClick={onSetDefault}
              className='h-8 border-primary/20 text-primary hover:bg-primary/5'
            >
              <Star className='h-3.5 w-3.5 mr-1.5' />
              <span className='text-xs'>Mặc định</span>
            </Button>
          )}

          <Button variant='outline' size='sm' onClick={onEdit} className='h-8'>
            <PenSquare className='h-3.5 w-3.5 mr-1.5' />
            <span className='text-xs'>Sửa</span>
          </Button>

          <Button
            variant='outline'
            size='sm'
            onClick={onDelete}
            className='h-8 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30'
          >
            <Trash2 className='h-3.5 w-3.5 mr-1.5' />
            <span className='text-xs'>Xóa</span>
          </Button>
        </div>
      </div>

      {/* Left Border Indicator */}
      {address.isDefault && <div className='absolute left-0 top-0 w-1 h-full bg-primary' />}
    </Card>
  )
}

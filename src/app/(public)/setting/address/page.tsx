'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  useDeleteAccountAddressMutation,
  useGetAccountAddress,
  useUpdateAccountAddressMutation
} from '@/queries/useAccount'
import { Plus, Trash2, Building2, CheckCircle2, PenLine, MapPinnedIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import AddressForm from '@/components/public/parent/setting/address-form'
import { handleErrorApi } from '@/lib/utils'
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
import { AccountAddressBodyType, AccountOneAddressResType } from '@/schemaValidations/account.schema'
import { toast } from '@/components/ui/use-toast'

export default function AddressPage() {
  const { data } = useGetAccountAddress()
  const editMutation = useUpdateAccountAddressMutation()
  const deleteMutation = useDeleteAccountAddressMutation()

  const addresses = useMemo(() => data?.payload.data ?? [], [data?.payload.data])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<AccountOneAddressResType['data']>()

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id)

      toast({
        description: 'Xóa địa chỉ thành công'
      })
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  const handleSetDefault = async ({ id, address }: { id: string; address: AccountAddressBodyType }) => {
    try {
      console.log({ address })

      await editMutation.mutateAsync({
        id,
        name: address.name,
        phone: address.phone,
        address: address.address,
        tag: address.tag,
        isDefault: true
      })

      toast({
        description: 'Đặt mặc định thành công'
      })
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  return (
    <div className='max-w-4xl mx-auto space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-2xl font-semibold'>Địa chỉ của tôi</h3>
          <p className='text-sm text-gray-500 mt-1'>Quản lý địa chỉ giao hàng và thanh toán của bạn</p>
        </div>
        <Button className='bg-primary/5 text-primary hover:bg-primary/10 gap-2' onClick={() => setShowAddForm(true)}>
          <Plus className='w-4 h-4' />
          Thêm địa chỉ mới
        </Button>
      </div>

      <Separator />

      {/* Address List */}
      <div className='grid gap-6'>
        {addresses.map((address) => (
          <Card
            key={address.id}
            className={`p-6 ${address.isDefault ? 'border-2 border-primary/10 bg-primary/5' : ''}`}
          >
            <div className='flex items-start justify-between mb-6'>
              <div className='flex items-center gap-2 text-primary'>
                {address.isDefault ? <MapPinnedIcon className='w-5 h-5' /> : <Building2 className='w-5 h-5' />}
                <span className='font-medium'>{address.tag}</span>
              </div>
              <div className='flex items-center gap-2'>
                {!address.isDefault && (
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 text-gray-500 hover:text-primary'
                    onClick={() =>
                      handleSetDefault({
                        id: address.id,
                        address
                      })
                    }
                  >
                    <CheckCircle2 className='w-4 h-4 mr-1' />
                    Đặt mặc định
                  </Button>
                )}
                {address.isDefault && (
                  <span className='px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium'>
                    Mặc định
                  </span>
                )}
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 text-gray-500 hover:text-primary'
                  onClick={() => setEditingAddress(address)}
                >
                  <PenLine className='w-4 h-4' />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant='ghost' size='sm' className='h-8 text-gray-500 hover:text-red-500'>
                      <Trash2 className='w-4 h-4' />
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
                      <AlertDialogAction
                        onClick={() => handleDeleteAddress(address.id)}
                        className='bg-red-500 hover:bg-red-600'
                      >
                        Xóa
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
              <div className='space-y-4'>
                <div>
                  <Label className='text-gray-500 text-sm'>Họ và tên người nhận</Label>
                  <div className='font-medium mt-1'>{address.name}</div>
                </div>
                <div>
                  <Label className='text-gray-500 text-sm'>Số điện thoại</Label>
                  <div className='font-medium mt-1'>{address.phone}</div>
                </div>
              </div>
              <div className='space-y-4'>
                <div>
                  <Label className='text-gray-500 text-sm'>Địa chỉ</Label>
                  <div className='font-medium mt-1'>{address.address}</div>
                </div>
                <div>
                  <Label className='text-gray-500 text-sm'>Khu vực</Label>
                  <div className='font-medium mt-1'>Vietnam</div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {addresses.length === 0 && (
          <div className='text-center py-8 text-gray-500'>
            <p>Bạn chưa có địa chỉ nào</p>
            <Button
              className='mt-4 bg-primary/5 text-primary hover:bg-primary/10 gap-2'
              onClick={() => setShowAddForm(true)}
            >
              <Plus className='w-4 h-4' />
              Thêm địa chỉ mới
            </Button>
          </div>
        )}
      </div>

      {/* Add/Edit Address Form */}
      <AddressForm open={showAddForm} onOpenChange={setShowAddForm} mode='add' />

      <AddressForm
        open={!!editingAddress}
        onOpenChange={(open) => !open && setEditingAddress(undefined)}
        defaultValues={editingAddress}
        mode='edit'
      />
    </div>
  )
}

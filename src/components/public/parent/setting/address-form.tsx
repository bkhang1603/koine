/* eslint-disable no-unused-vars */
'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useAddAccountAddressMutation, useUpdateAccountAddressMutation } from '@/queries/useAccount'
import {
  accountAddressBody,
  AccountAddressBodyType,
  AccountOneAddressResType
} from '@/schemaValidations/account.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type AddressFormProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultValues?: AccountOneAddressResType['data']
  mode?: 'add' | 'edit'
}

export default function AddressForm({ open, onOpenChange, defaultValues, mode = 'add' }: AddressFormProps) {
  const form = useForm<AccountAddressBodyType>({
    resolver: zodResolver(accountAddressBody),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      tag: '',
      isDefault: false
    }
  })

  useEffect(() => {
    if (mode === 'edit' && defaultValues) {
      form.reset({
        name: defaultValues.name,
        phone: defaultValues.phone,
        address: defaultValues.address,
        tag: defaultValues.tag,
        isDefault: defaultValues.isDefault
      })
    }
  }, [defaultValues, mode, form])

  const addMutation = useAddAccountAddressMutation()
  const editMutation = useUpdateAccountAddressMutation()

  const handleAddAddress = async (values: AccountAddressBodyType) => {
    try {
      await addMutation.mutateAsync(values)

      toast({
        description: 'Thêm địa chỉ thành công'
      })
      onOpenChange(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditAddress = async (values: AccountAddressBodyType) => {
    try {
      await editMutation.mutateAsync({
        id: defaultValues?.id ?? '',
        ...values
      })

      toast({
        description: 'Chỉnh sửa địa chỉ thành công'
      })
      onOpenChange(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Thêm địa chỉ mới' : 'Chỉnh sửa địa chỉ'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(mode === 'add' ? handleAddAddress : handleEditAddress)}
            className='space-y-6'
          >
            <FormField
              control={form.control}
              name='tag'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập tag' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên người nhận</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập tên người nhận' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập số điện thoại' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập địa chỉ' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isDefault'
              render={({ field }) => (
                <>
                  <FormItem className='flex items-center space-x-3 space-y-0 !mt-8 '>
                    <FormControl>
                      <Checkbox
                        {...field}
                        value={'true'}
                        checked={field.value}
                        onCheckedChange={(value) => {
                          field.onChange({ target: { value: value, name: field.name } })
                        }}
                      />
                    </FormControl>
                    <FormLabel className='cursor-pointer'>
                      {mode === 'add' ? 'Đặt làm địa chỉ mặc định' : 'Đặt lại làm địa chỉ mặc định'}
                    </FormLabel>
                  </FormItem>
                  <FormMessage />
                </>
              )}
            />

            <div className='flex justify-end gap-2'>
              <Button variant='outline' type='button' onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button type='submit'>{mode === 'add' ? 'Thêm địa chỉ' : 'Lưu thay đổi'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

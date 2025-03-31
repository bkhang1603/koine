/* eslint-disable no-unused-vars */
'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useAddAccountAddressMutation, useUpdateAccountAddressMutation } from '@/queries/useAccount'
import {
  accountAddressBody,
  AccountAddressBodyType,
  AccountOneAddressResType
} from '@/schemaValidations/account.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { VIETNAM_PROVINCES } from '@/data/vietnam-provinces'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { MapPin, Home, Building } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

const addressSchema = z.object({
  name: z.string().min(1, { message: 'Vui lòng nhập họ tên' }),
  phone: z
    .string()
    .min(10, { message: 'Số điện thoại phải có ít nhất 10 số' })
    .max(11, { message: 'Số điện thoại không hợp lệ' })
    .regex(/^[0-9]+$/, { message: 'Số điện thoại chỉ được chứa số' }),
  provinceCode: z.string().min(1, { message: 'Vui lòng chọn tỉnh/thành phố' }),
  districtCode: z.string().min(1, { message: 'Vui lòng chọn quận/huyện' }),
  wardCode: z.string().min(1, { message: 'Vui lòng chọn phường/xã' }),
  streetAddress: z.string().min(1, { message: 'Vui lòng nhập địa chỉ chi tiết' }),
  tag: z.enum(['HOME', 'OFFICE'], { message: 'Vui lòng chọn loại địa chỉ' }),
  isDefault: z.boolean().default(false)
})

type AddressFormProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultValues?: AccountOneAddressResType['data']
  mode?: 'add' | 'edit'
  onSuccess?: (address: AccountOneAddressResType['data']) => void
}

export default function AddressForm({ open, onOpenChange, defaultValues, mode = 'add', onSuccess }: AddressFormProps) {
  const addMutation = useAddAccountAddressMutation()
  const editMutation = useUpdateAccountAddressMutation()

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const [districts, setDistricts] = useState<any[]>([])
  const [wards, setWards] = useState<any[]>([])

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: '',
      phone: '',
      provinceCode: '',
      districtCode: '',
      wardCode: '',
      streetAddress: '',
      tag: 'HOME',
      isDefault: false
    }
  })

  const onSubmit = async (values: z.infer<typeof addressSchema>) => {
    try {
      const provinceName = VIETNAM_PROVINCES.find((p) => p.code === values.provinceCode)?.name || ''
      const districtName = districts.find((d) => d.code === values.districtCode)?.name || ''
      const wardName = wards.find((w) => w.code === values.wardCode)?.name || ''

      const fullAddress = `${values.streetAddress}, ${wardName}, ${districtName}, ${provinceName}`

      if (mode === 'add') {
        const response = await addMutation.mutateAsync({
          name: values.name,
          phone: values.phone,
          address: fullAddress,
          tag: values.tag,
          isDefault: values.isDefault
        })
        toast({
          description: 'Thêm địa chỉ mới thành công'
        })
        onSuccess?.(response.payload.data)
      } else {
        if (!defaultValues?.id) return
        const response = await editMutation.mutateAsync({
          id: defaultValues.id,
          name: values.name,
          phone: values.phone,
          address: fullAddress,
          tag: values.tag,
          isDefault: values.isDefault
        })
        toast({
          description: 'Cập nhật địa chỉ thành công'
        })
        onSuccess?.(response.payload.data)
      }
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error('Lỗi khi xử lý form:', error)
    }
  }

  useEffect(() => {
    if (defaultValues && open) {
      setSelectedProvince(null)
      setSelectedDistrict(null)
      setDistricts([])
      setWards([])

      form.setValue('name', defaultValues.name)
      form.setValue('phone', defaultValues.phone)
      form.setValue('tag', defaultValues.tag as 'HOME' | 'OFFICE')
      form.setValue('isDefault', defaultValues.isDefault)

      try {
        let foundProvince = null
        let foundDistrict = null
        let foundWard = null
        let remainingAddress = defaultValues.address

        for (const province of VIETNAM_PROVINCES) {
          if (defaultValues.address.includes(province.name)) {
            foundProvince = province
            remainingAddress = remainingAddress.replace(new RegExp(`, ${province.name}$`, 'i'), '')
            break
          }
        }

        if (foundProvince) {
          form.setValue('provinceCode', foundProvince.code)
          setSelectedProvince(foundProvince.code)
          setDistricts(foundProvince.districts || [])

          for (const district of foundProvince.districts || []) {
            if (remainingAddress.includes(district.name)) {
              foundDistrict = district
              remainingAddress = remainingAddress.replace(new RegExp(`, ${district.name}`, 'i'), '')
              break
            }
          }

          if (foundDistrict) {
            form.setValue('districtCode', foundDistrict.code)
            setSelectedDistrict(foundDistrict.code)
            setWards(foundDistrict.wards || [])

            for (const ward of foundDistrict.wards || []) {
              if (remainingAddress.includes(ward.name)) {
                foundWard = ward
                remainingAddress = remainingAddress.replace(new RegExp(`, ${ward.name}`, 'i'), '')
                break
              }
            }

            if (foundWard) {
              form.setValue('wardCode', foundWard.code)
            }
          }
        }

        form.setValue('streetAddress', remainingAddress.replace(/^, /, '').replace(/, $/, ''))
      } catch (error) {
        console.error('Lỗi khi phân tích địa chỉ:', error)
        form.setValue('streetAddress', defaultValues.address)
      }
    } else if (!open) {
      form.reset()
    }
  }, [defaultValues, form, open])

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value)
    form.setValue('provinceCode', value)
    form.setValue('districtCode', '')
    form.setValue('wardCode', '')

    const province = VIETNAM_PROVINCES.find((p) => p.code === value)
    if (province) {
      setDistricts(province.districts || [])
      setSelectedDistrict(null)
      setWards([])
    }
  }

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value)
    form.setValue('districtCode', value)
    form.setValue('wardCode', '')

    const district = districts.find((d) => d.code === value)
    if (district) {
      setWards(district.wards || [])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md overflow-y-auto max-h-[80vh]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <MapPin className='h-5 w-5 text-primary' />
            {mode === 'add' ? 'Thêm địa chỉ mới' : 'Chỉnh sửa địa chỉ'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder='Nguyễn Văn A' {...field} />
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
                    <Input placeholder='0901234567' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='provinceCode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh/Thành phố</FormLabel>
                    <Select onValueChange={(value) => handleProvinceChange(value)} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn tỉnh/thành phố' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <ScrollArea className='h-[300px]'>
                          {VIETNAM_PROVINCES.map((province) => (
                            <SelectItem key={province.code} value={province.code}>
                              {province.name}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='districtCode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quận/Huyện</FormLabel>
                    <Select
                      onValueChange={(value) => handleDistrictChange(value)}
                      value={field.value}
                      disabled={!selectedProvince}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn quận/huyện' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <ScrollArea className='h-[300px]'>
                          {districts.map((district) => (
                            <SelectItem key={district.code} value={district.code}>
                              {district.name}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='wardCode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phường/Xã</FormLabel>
                    <Select
                      onValueChange={(value) => form.setValue('wardCode', value)}
                      value={field.value}
                      disabled={!selectedDistrict}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn phường/xã' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <ScrollArea className='h-[300px]'>
                          {wards.map((ward) => (
                            <SelectItem key={ward.code} value={ward.code}>
                              {ward.name}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='tag'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại địa chỉ</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className='flex space-x-4'>
                      <div className='flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 rounded-md px-3 py-2 transition-colors'>
                        <RadioGroupItem value='HOME' id='home' />
                        <Label htmlFor='home' className='flex items-center gap-1 cursor-pointer'>
                          {/* <Home className='h-3.5 w-3.5 text-slate-500' /> */}
                          <span>Nhà riêng</span>
                        </Label>
                      </div>
                      <div className='flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 rounded-md px-3 py-2 transition-colors'>
                        <RadioGroupItem value='OFFICE' id='office' />
                        <Label htmlFor='office' className='flex items-center gap-1 cursor-pointer'>
                          {/* <Building className='h-3.5 w-3.5 text-slate-500' /> */}
                          <span>Văn phòng</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='streetAddress'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ chi tiết</FormLabel>
                  <FormControl>
                    <Input placeholder='Số nhà, tên đường...' {...field} />
                  </FormControl>
                  <FormDescription className='text-xs'>
                    Nhập số nhà, tên đường, tòa nhà, địa điểm cụ thể
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='isDefault'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center space-x-3 space-y-0 rounded-md border border-primary/20 p-4 bg-primary/5 shadow-sm'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className='data-[state=checked]:bg-primary data-[state=checked]:border-primary'
                    />
                  </FormControl>
                  <div className='space-y-1'>
                    <FormLabel className='font-semibold text-slate-800'>Đặt làm địa chỉ mặc định</FormLabel>
                    <FormDescription className='text-xs'>
                      Địa chỉ này sẽ được sử dụng tự động cho các đơn hàng mới
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-2 pt-2'>
              <Button variant='outline' type='button' onClick={() => onOpenChange(false)} className='border-gray-200'>
                Hủy
              </Button>
              <Button
                type='submit'
                className='bg-gradient-to-r from-primary to-primary/90 shadow-sm'
                disabled={addMutation.isPending || editMutation.isPending}
              >
                {addMutation.isPending || editMutation.isPending
                  ? 'Đang xử lý...'
                  : mode === 'add'
                    ? 'Thêm địa chỉ'
                    : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

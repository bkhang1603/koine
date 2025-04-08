'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { CreateProductBodyType } from '@/schemaValidations/product.schema'
import Image from 'next/image'

interface ImageUploadProps {
  form: UseFormReturn<CreateProductBodyType>
}

export function ImageUpload({ form }: ImageUploadProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // Giả sử bạn có API upload ảnh và trả về URL
      // Ở đây tôi chỉ demo với URL tĩnh
      const imageUrls = Array.from(files).map(
        () => 'https://cdn.corporatefinanceinstitute.com/assets/products-and-services-1024x1024.jpeg'
      )
      form.setValue('imageUrlArray', imageUrls)
    }
  }

  return (
    <FormField
      control={form.control}
      name='imageUrlArray'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Hình ảnh sản phẩm</FormLabel>
          <FormControl>
            <div className='space-y-4'>
              <Input type='file' accept='image/*' multiple onChange={handleImageChange} />
              <div className='grid grid-cols-4 gap-4'>
                {field.value.map((url, index) => (
                  <div key={index} className='relative aspect-square'>
                    <Image src={url} alt={`Product image ${index + 1}`} fill className='object-cover rounded-md' />
                  </div>
                ))}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

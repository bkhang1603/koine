'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { CreateProductBodyType } from '@/schemaValidations/product.schema'
import Image from 'next/image'
import { Upload } from 'lucide-react'
import { useRef, useState } from 'react'

interface ImageUploadProps {
  form: UseFormReturn<CreateProductBodyType>
  // eslint-disable-next-line no-unused-vars
  onFilesChange?: (files: File[]) => void
}

export function ImageUpload({ form, onFilesChange }: ImageUploadProps) {
  // Store local previews (not uploaded yet)
  const [previews, setPreviews] = useState<string[]>([])
  // Store selected files for later upload
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    // Store files for future upload (when form is submitted)
    const newFiles = Array.from(selectedFiles)
    const updatedFiles = [...files, ...newFiles]
    setFiles(updatedFiles)

    // Update parent component with the files (but they won't be uploaded yet)
    if (onFilesChange) {
      onFilesChange(updatedFiles)
    }

    // Create local preview URLs
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews])

    // Set temporary placeholder URLs in form for validation only
    // These will be replaced with real URLs after upload during form submission
    const tempUrls = newPreviews.map((url) => url)
    form.setValue('imageUrlArray', [...(form.getValues().imageUrlArray || []), ...tempUrls])
  }

  const removeImage = (index: number) => {
    // Remove from local previews
    const newPreviews = [...previews]
    newPreviews.splice(index, 1)
    setPreviews(newPreviews)

    // Remove from files collection
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)

    // Update parent component
    if (onFilesChange) {
      onFilesChange(newFiles)
    }

    // Remove from form value
    const currentImages = form.getValues().imageUrlArray || []
    const newImages = [...currentImages]
    newImages.splice(index, 1)
    form.setValue('imageUrlArray', newImages)
  }

  return (
    <FormField
      control={form.control}
      name='imageUrlArray'
      // eslint-disable-next-line no-unused-vars
      render={({ field }) => (
        <FormItem>
          <FormLabel>Hình ảnh sản phẩm</FormLabel>
          <FormControl>
            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <div
                  className='flex aspect-square w-24 items-center justify-center rounded-md border border-dashed cursor-pointer'
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className='h-4 w-4 text-muted-foreground' />
                  <span className='sr-only'>Tải ảnh lên</span>
                </div>
                <Input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  multiple
                  className='hidden'
                  onChange={handleImageChange}
                />
                <div className='text-sm text-muted-foreground'>
                  <p>Tải lên các hình ảnh cho sản phẩm. Bạn có thể tải nhiều ảnh cùng lúc.</p>
                </div>
              </div>

              {previews.length > 0 && (
                <div className='grid grid-cols-5 gap-4'>
                  {previews.map((url, index) => (
                    <div key={index} className='relative aspect-square group'>
                      <Image
                        src={url}
                        alt={`Hình ảnh sản phẩm ${index + 1}`}
                        fill
                        className='object-cover rounded-md'
                      />
                      <div
                        className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity rounded-md'
                        onClick={() => removeImage(index)}
                      >
                        <span className='text-white text-sm'>Xóa</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

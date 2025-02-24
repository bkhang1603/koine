/* eslint-disable no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Upload } from 'lucide-react'
import Image from 'next/image'

interface CourseMediaProps {
  banner: string
  thumbnail: string
  onImageUpload: (field: 'banner' | 'thumbnail', e: React.ChangeEvent<HTMLInputElement>) => void
}

export function CourseMedia({ banner, thumbnail, onImageUpload }: CourseMediaProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hình ảnh khóa học</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <ImageUpload
          label='Ảnh banner'
          image={banner}
          onChange={(e) => onImageUpload('banner', e)}
          id='banner-upload'
          resolution='1920x1080px'
        />
        <ImageUpload
          label='Ảnh thumbnail'
          image={thumbnail}
          onChange={(e) => onImageUpload('thumbnail', e)}
          id='thumbnail-upload'
          resolution='1280x720px'
        />
      </CardContent>
    </Card>
  )
}

interface ImageUploadProps {
  label: string
  image: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  resolution: string
}

function ImageUpload({ label, image, onChange, id, resolution }: ImageUploadProps) {
  return (
    <div className='space-y-4'>
      <Label>{label}</Label>
      <div className='aspect-video relative overflow-hidden rounded-lg border-2 border-dashed'>
        {image ? (
          <div className='group relative h-full'>
            <Image src={image} alt={label} fill className='object-cover' />
            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
              <Label htmlFor={id} className='cursor-pointer'>
                <div className='bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg'>Thay đổi ảnh</div>
              </Label>
            </div>
          </div>
        ) : (
          <Label
            htmlFor={id}
            className='absolute inset-0 flex flex-col items-center justify-center gap-2 cursor-pointer'
          >
            <Upload className='w-8 h-8 text-muted-foreground' />
            <span className='text-sm text-muted-foreground'>Click để tải lên {label.toLowerCase()}</span>
            <span className='text-xs text-muted-foreground'>Kích thước đề xuất: {resolution}</span>
          </Label>
        )}
        <Input id={id} type='file' accept='image/*' className='hidden' onChange={onChange} />
      </div>
    </div>
  )
}

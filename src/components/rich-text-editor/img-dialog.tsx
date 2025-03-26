import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useState, useEffect, useRef } from 'react'
import { Editor } from '@tiptap/core'
import { default as NextImage } from 'next/image'
import { X } from 'lucide-react'

export function ImgDialog({
  editor,
  open,
  setOpen
}: {
  editor: Editor
  open: boolean
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void
}) {
  const [imageUrl, setImageUrl] = useState('')
  const [uploadPreview, setUploadPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) {
      // Reset form state when dialog closes
      setImageUrl('')
      setUploadPreview(null)
    }
  }, [open])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const preview = URL.createObjectURL(file)
      setUploadPreview(preview)
    }
  }

  const insertImage = () => {
    if (editor) {
      if (uploadPreview) {
        editor.chain().focus().setImage({ src: uploadPreview }).run()
      } else if (imageUrl) {
        editor.chain().focus().setImage({ src: imageUrl }).run()
      }

      // Reset
      setImageUrl('')
      setUploadPreview(null)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Thêm hình ảnh</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue='upload' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='upload'>Tải lên</TabsTrigger>
            <TabsTrigger value='url'>URL</TabsTrigger>
          </TabsList>

          <TabsContent value='upload' className='space-y-4'>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='image-upload'>Chọn hình ảnh</Label>
              <Input id='image-upload' type='file' accept='image/*' ref={fileInputRef} onChange={handleFileChange} />
            </div>

            {uploadPreview && (
              <div className='relative mt-4'>
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm cursor-pointer'
                  onClick={() => setUploadPreview(null)}
                >
                  <X className='w-4 h-4 text-gray-500' />
                </Button>
                <NextImage
                  src={uploadPreview}
                  alt='Preview'
                  className='max-h-60 object-contain border rounded-md'
                  width={400}
                  height={300}
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%' }}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value='url' className='space-y-4'>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='url'>URL hình ảnh</Label>
              <Input
                id='url'
                type='url'
                placeholder='https://example.com/image.jpg'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            {imageUrl && (
              <div className='mt-2'>
                <NextImage
                  src={imageUrl}
                  alt='Preview'
                  className='max-h-60 object-contain border rounded-md'
                  width={400}
                  height={300}
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%' }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/400x300?text=Invalid+Image'
                  }}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className='flex justify-end gap-2 mt-4'>
          <Button type='button' variant='outline' onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button type='button' onClick={insertImage} disabled={!uploadPreview && !imageUrl}>
            Chèn ảnh
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

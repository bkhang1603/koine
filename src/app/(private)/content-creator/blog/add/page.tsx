'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { X, Upload, ArrowLeft } from 'lucide-react'
import RichTextEditor from '@/components/rich-text-editor'
import Image from 'next/image'
import Link from 'next/link'

export default function AddBlogPost() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleRemoveImage = () => {
    setImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(image)

    router.push('/content-creator/blog')
  }

  return (
    <div className='max-w-5xl mx-auto space-y-6'>
      <div className='flex justify-between items-center'>
        <Button variant='outline' asChild>
          <Link href={`/content-creator/blog`}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Post
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-8'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter the blog post title'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='category'>Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder='Select a category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Technology'>Technology</SelectItem>
                  <SelectItem value='Travel'>Travel</SelectItem>
                  <SelectItem value='Food'>Food</SelectItem>
                  <SelectItem value='Lifestyle'>Lifestyle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='image'>Featured Image</Label>
              <div
                className='border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors duration-200 ease-in-out hover:border-primary'
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {imagePreview ? (
                  <div className='relative'>
                    <Image
                      src={imagePreview}
                      alt='Preview'
                      width={600}
                      height={600}
                      className='mx-auto max-h-64 rounded-lg shadow-lg'
                    />
                    <Button
                      type='button'
                      variant='destructive'
                      size='icon'
                      className='absolute -top-2 -right-2 rounded-full'
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveImage()
                      }}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                ) : (
                  <div className='py-8'>
                    <Upload className='mx-auto h-12 w-12 text-gray-400' />
                    <p className='mt-2 text-sm text-gray-500'>Drag and drop an image here, or click to select a file</p>
                  </div>
                )}
              </div>
              <Input
                id='image'
                type='file'
                ref={fileInputRef}
                className='hidden'
                onChange={handleImageUpload}
                accept='image/*'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='excerpt'>Excerpt</Label>
              <Textarea
                id='excerpt'
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder='Enter a short excerpt for the blog post'
                rows={3}
              />
            </div>

            <div className='space-y-2'>
              <Label>Content</Label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>

            <div className='flex items-center space-x-2'>
              <Switch id='published' checked={isPublished} onCheckedChange={setIsPublished} />
              <Label htmlFor='published'>Publish immediately</Label>
            </div>

            <div className='flex justify-end space-x-2'>
              <Button type='button' variant='outline' onClick={() => router.push('/content-creator/blog')}>
                Cancel
              </Button>
              <Button type='submit'>{isPublished ? 'Publish' : 'Save Draft'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

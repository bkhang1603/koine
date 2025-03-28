/* eslint-disable no-unused-vars */
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  List,
  WrapText,
  ListOrdered,
  Columns,
  Link,
  Image as ImageIcon
} from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { LinkDialog } from './link-dialog'
import { ImgDialog } from '@/components/rich-text-editor/img-dialog'

export default function Toolbar({ editor }: { editor: any }) {
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)

  if (!editor) return null

  const options = [
    {
      icon: <Heading1 className='w-4 h-4' />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive('heading', { level: 1 }),
      tooltip: 'Heading 1'
    },
    {
      icon: <Heading2 className='w-4 h-4' />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive('heading', { level: 2 }),
      tooltip: 'Heading 2'
    },
    {
      icon: <Heading3 className='w-4 h-4' />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive('heading', { level: 3 }),
      tooltip: 'Heading 3'
    },
    {
      icon: <Bold className='w-4 h-4' />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive('bold'),
      tooltip: 'Bold'
    },
    {
      icon: <Italic className='w-4 h-4' />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive('italic'),
      tooltip: 'Italic'
    },
    {
      icon: <Strikethrough className='w-4 h-4' />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive('strike'),
      tooltip: 'Strikethrough'
    },
    {
      icon: <AlignLeft className='w-4 h-4' />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      pressed: editor.isActive({ textAlign: 'left' }),
      tooltip: 'Align Left'
    },
    {
      icon: <AlignCenter className='w-4 h-4' />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      pressed: editor.isActive({ textAlign: 'center' }),
      tooltip: 'Align Center'
    },
    {
      icon: <AlignRight className='w-4 h-4' />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      pressed: editor.isActive({ textAlign: 'right' }),
      tooltip: 'Align Right'
    },
    {
      icon: <List className='w-4 h-4' />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive('bulletList'),
      tooltip: 'Bullet List'
    },
    {
      icon: <ListOrdered className='w-4 h-4' />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive('orderedList'),
      tooltip: 'Ordered List'
    },
    {
      icon: <Highlighter className='w-4 h-4' />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive('highlight'),
      tooltip: 'Highlight'
    },
    {
      icon: <Columns className='w-4 h-4' />,
      onClick: () => editor.chain().focus().setColumns().run(),
      pressed: false,
      tooltip: 'Add Columns'
    }
  ]

  return (
    <div className='flex flex-wrap gap-1 p-1.5 bg-white border-b'>
      {options.map((option, i) => (
        <TooltipProvider key={i}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={option.pressed}
                onPressedChange={option.onClick}
                className={option.pressed ? 'bg-gray-100' : 'hover:bg-gray-100'}
              >
                {option.icon}
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>{option.tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size='sm'
              pressed={editor.isActive('link')}
              onPressedChange={() => setShowLinkDialog(true)}
              disabled={editor.state.selection.empty}
            >
              <Link className='w-4 h-4' />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Add Link</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle size='sm' onPressedChange={() => setShowImageDialog(true)}>
              <ImageIcon className='w-4 h-4' />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Add Image</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Dialogs */}
      <LinkDialog editor={editor} open={showLinkDialog} setOpen={setShowLinkDialog} />
      <ImgDialog editor={editor} open={showImageDialog} setOpen={setShowImageDialog} />
    </div>
  )
}

const LinkForm = ({ onSubmit, editor }: { onSubmit: (url: string) => void; editor: any }) => {
  const [url, setUrl] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(url)
      }}
    >
      {editor.state.selection.empty ? (
        <p className='text-red-500 mb-2'>Please select some text before adding a link.</p>
      ) : null}
      <Input type='url' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Enter URL' className='mb-4' />
      <Button type='submit' disabled={editor.state.selection.empty}>
        Add Link
      </Button>
    </form>
  )
}

const ImageForm = ({ onSubmit }: { onSubmit: (file: File) => void }) => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (file) onSubmit(file)
      }}
      className='space-y-4'
    >
      <div className='flex items-center space-x-4'>
        <label className='flex-1'>
          <div className='flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'>
            <span className='flex items-center space-x-2'>
              <ImageIcon className='w-6 h-6 text-gray-600' />
              <span className='font-medium text-gray-600'>{file ? file.name : 'Click to upload image'}</span>
            </span>
            <input type='file' accept='image/*' className='hidden' onChange={handleFileChange} />
          </div>
        </label>
        {preview && (
          <div className='w-1/2 h-32 border rounded-md overflow-hidden'>
            <Image src={preview} width={1000} height={1000} alt='Preview' className='w-full h-full object-cover' />
          </div>
        )}
      </div>
      <Button type='submit' className='w-full' disabled={!file}>
        Add Image
      </Button>
    </form>
  )
}

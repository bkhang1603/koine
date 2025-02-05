/* eslint-disable no-unused-vars */
'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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

export default function ToolBar({ editor }: { editor: any }) {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  if (!editor) return null

  const Options = [
    {
      icon: <Heading1 className='size-4' />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive('heading', { level: 1 }),
      tooltip: 'Heading 1'
    },
    {
      icon: <Heading2 className='size-4' />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive('heading', { level: 2 }),
      tooltip: 'Heading 2'
    },
    {
      icon: <Heading3 className='size-4' />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive('heading', { level: 3 }),
      tooltip: 'Heading 3'
    },
    {
      icon: <Bold className='size-4' />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive('bold'),
      tooltip: 'Bold'
    },
    {
      icon: <Italic className='size-4' />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive('italic'),
      tooltip: 'Italic'
    },
    {
      icon: <Strikethrough className='size-4' />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive('strike'),
      tooltip: 'Strikethrough'
    },
    {
      icon: <AlignLeft className='size-4' />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      pressed: editor.isActive({ textAlign: 'left' }),
      tooltip: 'Align Left'
    },
    {
      icon: <AlignCenter className='size-4' />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      pressed: editor.isActive({ textAlign: 'center' }),
      tooltip: 'Align Center'
    },
    {
      icon: <AlignRight className='size-4' />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      pressed: editor.isActive({ textAlign: 'right' }),
      tooltip: 'Align Right'
    },
    {
      icon: <List className='size-4' />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive('bulletList'),
      tooltip: 'Bullet List'
    },
    {
      icon: <ListOrdered className='size-4' />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive('orderedList'),
      tooltip: 'Ordered List'
    },
    {
      icon: <Highlighter className='size-4' />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive('highlight'),
      tooltip: 'Highlight'
    },
    {
      // HardBreak
      icon: <WrapText className='size-4' />,
      onClick: () => editor.chain().focus().setHardBreak().run(),
      pressed: false,
      tooltip: 'Wrap Text'
    },
    {
      // CustomColumn
      icon: <Columns className='size-4' />,
      onClick: () => editor.chain().focus().setColumns().run(),
      pressed: false,
      tooltip: 'Columns'
    }
  ]

  return (
    // <div className='border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky top-10 z-50'>
    <div className='sticky top-10 z-40 flex flex-wrap gap-1 p-1.5 mb-1 bg-white border rounded-md shadow-sm'>
      {Options.map((option, i) => (
        <TooltipProvider key={i}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size='sm'
                pressed={option.pressed}
                onPressedChange={option.onClick}
                className={`
                ${option.pressed ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
              >
                {option.icon}
              </Toggle>
            </TooltipTrigger>
            <TooltipContent className='bg-white text-black border border-gray-300'>
              <p>{option.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size='sm'
              onClick={() => setIsLinkModalOpen(true)}
              data-state={editor.isActive('link') ? 'on' : 'off'}
              disabled={editor.state.selection.empty}
            >
              <Link className='size-4' />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add Link</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
            <DialogDescription>Enter the URL for the link</DialogDescription>
          </DialogHeader>
          <LinkForm
            editor={editor}
            onSubmit={(url) => {
              if (!editor.state.selection.empty) {
                editor.chain().focus().setLink({ href: url }).run()
              }
              setIsLinkModalOpen(false)
            }}
          />
        </DialogContent>
      </Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle size='sm' onClick={() => setIsImageModalOpen(true)} data-state={'off'}>
              <ImageIcon className='size-4' />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent className='bg-white text-black border border-gray-300'>
            <p>Add Image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Image</DialogTitle>
            <DialogDescription>Enter the URL of the image</DialogDescription>
          </DialogHeader>
          <ImageForm
            onSubmit={(file) => {
              const reader = new FileReader()
              reader.onload = (e) => {
                const result = e.target?.result
                if (typeof result === 'string') {
                  editor.chain().focus().setImage({ src: result }).run()
                }
              }
              reader.readAsDataURL(file)
              setIsImageModalOpen(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
    // <div className='border rounded-md flex space-x-1'>
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

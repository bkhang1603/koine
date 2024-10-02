import { BubbleMenu } from '@tiptap/react'
import { Editor } from '@tiptap/core'
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
  ListOrdered,
  WrapText
} from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

export default function CustomBubbleMenu({ editor }: { editor: Editor }) {
  if (!editor) return null

  const options = [
    {
      icon: <Heading1 className='size-4' />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run()
    },
    {
      icon: <Heading2 className='size-4' />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run()
    },
    {
      icon: <Heading3 className='size-4' />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run()
    },
    {
      icon: <Bold className='size-4' />,
      onClick: () => editor.chain().focus().toggleBold().run()
    },
    {
      icon: <Italic className='size-4' />,
      onClick: () => editor.chain().focus().toggleItalic().run()
    },
    {
      icon: <Strikethrough className='size-4' />,
      onClick: () => editor.chain().focus().toggleStrike().run()
    },
    {
      icon: <AlignLeft className='size-4' />,
      onClick: () => editor.chain().focus().setTextAlign('left').run()
    },
    {
      icon: <AlignCenter className='size-4' />,
      onClick: () => editor.chain().focus().setTextAlign('center').run()
    },
    {
      icon: <AlignRight className='size-4' />,
      onClick: () => editor.chain().focus().setTextAlign('right').run()
    },
    {
      icon: <Highlighter className='size-4' />,
      onClick: () => editor.chain().focus().toggleHighlight().run()
    },
    {
      icon: <List className='size-4' />,
      onClick: () => editor.chain().focus().toggleBulletList().run()
    },
    {
      icon: <ListOrdered className='size-4' />,
      onClick: () => editor.chain().focus().toggleOrderedList().run()
    },
    {
      icon: <WrapText className='size-4' />,
      onClick: () => editor.chain().focus().setHardBreak().run()
    }
  ]

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className='flex space-x-2 bg-white p-2 rounded shadow min-w-fit'>
        {options.map((option, index) => (
          <Toggle key={index} onClick={option.onClick}>
            {option.icon}
          </Toggle>
        ))}
      </div>
    </BubbleMenu>
  )
}

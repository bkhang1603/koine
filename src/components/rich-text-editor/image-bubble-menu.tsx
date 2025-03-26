import { BubbleMenu } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import { AlignLeft, AlignCenter, AlignRight, Trash } from 'lucide-react'

export default function ImageBubbleMenu({ editor }: { editor: Editor }) {
  if (!editor) return null

  return (
    <BubbleMenu
      className='flex items-center gap-1 p-1 rounded-md border bg-white shadow-md'
      editor={editor}
      tippyOptions={{ duration: 100 }}
      shouldShow={({ editor }) => editor.isActive('image')}
    >
      <button
        type='button'
        onClick={() => editor.chain().focus().updateAttributes('image', { textAlign: 'left' }).run()}
        className={`p-1.5 rounded ${editor.isActive('image', { textAlign: 'left' }) ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
      >
        <AlignLeft className='w-4 h-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().updateAttributes('image', { textAlign: 'center' }).run()}
        className={`p-1.5 rounded ${editor.isActive('image', { textAlign: 'center' }) ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
      >
        <AlignCenter className='w-4 h-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().updateAttributes('image', { textAlign: 'right' }).run()}
        className={`p-1.5 rounded ${editor.isActive('image', { textAlign: 'right' }) ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
      >
        <AlignRight className='w-4 h-4' />
      </button>

      <div className='w-px h-5 bg-slate-200 mx-1'></div>

      <button
        type='button'
        onClick={() => editor.chain().focus().deleteSelection().run()}
        className='p-1.5 rounded hover:bg-red-100 hover:text-red-500'
      >
        <Trash className='w-4 h-4' />
      </button>
    </BubbleMenu>
  )
}

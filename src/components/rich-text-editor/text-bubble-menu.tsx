import { BubbleMenu } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import { Bold, Italic, Underline, Highlighter, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react'

export default function TextBubbleMenu({ editor }: { editor: Editor }) {
  if (!editor) return null

  return (
    <BubbleMenu
      className='flex items-center gap-1 p-1 rounded-md border bg-white shadow-md'
      editor={editor}
      tippyOptions={{ duration: 100 }}
      shouldShow={({ editor }) =>
        !editor.isActive('image') && !editor.isActive('columns') && !editor.state.selection.empty
      }
    >
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded ${editor.isActive('bold') ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
      >
        <Bold className='w-4 h-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded ${editor.isActive('italic') ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
      >
        <Italic className='w-4 h-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1 rounded ${editor.isActive('underline') ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
      >
        <Underline className='w-4 h-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`p-1 rounded ${editor.isActive('highlight') ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
      >
        <Highlighter className='w-4 h-4' />
      </button>

      <div className='w-px h-5 bg-slate-200 mx-1'></div>

      <button
        type='button'
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-1 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
      >
        <AlignLeft className='w-4 h-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-1 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
      >
        <AlignCenter className='w-4 h-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-1 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
      >
        <AlignRight className='w-4 h-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`p-1 rounded ${editor.isActive({ textAlign: 'justify' }) ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
      >
        <AlignJustify className='w-4 h-4' />
      </button>
    </BubbleMenu>
  )
}

'use client'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import HardBreak from '@tiptap/extension-hard-break'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ImageResize from 'tiptap-extension-resize-image'
import ColumnMenu from './column-menu'
import Toolbar from './toolbar'
import TextBubbleMenu from './text-bubble-menu'
import ImageBubbleMenu from './image-bubble-menu'
import { useEffect, useState } from 'react'
import FileHandler from '@tiptap-pro/extension-file-handler'
import { Column, Columns } from '@/components/rich-text-editor/custom-extension'

interface RichTextEditorProps {
  content: string
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({
  content = '',
  onChange,
  placeholder = 'Viết nội dung...'
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [localContent, setLocalContent] = useState(content)

  // Khởi tạo editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline'
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-md'
        }
      }),
      ImageResize,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
        alignments: ['left', 'center', 'right', 'justify']
      }),
      Placeholder.configure({
        placeholder
      }),
      Highlight,
      HardBreak,
      TextStyle,
      Color,
      Column,
      Columns,
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result
                  }
                })
                .focus()
                .run()
            }
          })
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) return false
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result
                  }
                })
                .focus()
                .run()
            }
          })
        }
      })
    ],
    content: localContent,
    editorProps: {
      attributes: {
        class:
          'prose prose-slate max-w-none p-4 min-h-[200px] max-h-[600px] overflow-y-auto bg-white focus:outline-none'
      }
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    }
  })

  // Cập nhật nội dung khi prop content thay đổi từ bên ngoài
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      console.log('Setting editor content to:', content)
      setLocalContent(content)
      editor.commands.setContent(content, false)
    }
  }, [content, editor])

  // Giải quyết lỗi hydration (CSR/SSR)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className='min-h-[200px] border rounded-md p-4 bg-slate-50'></div>
  }

  return (
    <div className='border rounded-md overflow-hidden'>
      {editor && <Toolbar editor={editor} />}

      <div className='relative'>
        <EditorContent editor={editor} />

        {/* Bubble menus */}
        {editor && (
          <>
            <TextBubbleMenu editor={editor} />
            <ImageBubbleMenu editor={editor} />

            <BubbleMenu
              editor={editor}
              tippyOptions={{ duration: 100 }}
              shouldShow={({ editor }) => editor.isActive('columns')}
            >
              <ColumnMenu editor={editor} />
            </BubbleMenu>
          </>
        )}
      </div>
    </div>
  )
}

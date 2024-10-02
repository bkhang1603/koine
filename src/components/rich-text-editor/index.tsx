'use client'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ImageResize from 'tiptap-extension-resize-image'
import ToolBar from '@/components/rich-text-editor/toolbar'
import FileHandler from '@tiptap-pro/extension-file-handler'
import HardBreak from '@tiptap/extension-hard-break'
import { Column, Columns } from '@/components/rich-text-editor/custom-extension'
import ColumnsMenu from '@/components/rich-text-editor/column-menu'

export default function RichTextEditor({ content, onChange }: { content: any; onChange: any }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      HardBreak.configure(),
      Heading.configure({
        levels: [1, 2, 3]
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-3'
        }
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'ml-3'
        }
      }),
      Highlight,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-md'
        }
      }),
      ImageResize,
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
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent) // eslint-disable-line no-console
              return false
            }

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
      }),
      Column,
      Columns
      // CustomColumn
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'max-h-[500px] overflow-scroll border rounded-md bg-slate-50 pb-2 pt-7 px-4 focus-visible:outline-none'
      }
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    }
  })

  return (
    <div>
      {/* {editor && <CustomBubbleMenu editor={editor} />} */}
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100, moveTransition: 'transform 0.2s ease-out' }}
          shouldShow={({ editor }) => editor.isActive('columns')}
        >
          <ColumnsMenu editor={editor} />
        </BubbleMenu>
      )}
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

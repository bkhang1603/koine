import { ColumnLayout } from '@/components/rich-text-editor/custom-extension'
import { Columns2, PanelLeft, PanelRight, Trash2 } from 'lucide-react'
import { Editor } from '@tiptap/core'

const ColumnsMenu = ({ editor }: { editor: Editor }) => {
  //   const setLayout = (layout: ColumnLayout) => {
  //     editor.chain().focus().updateAttributes('columns', { layout }).run()
  //   }

  const setLayout = (layout: ColumnLayout) => {
    editor.chain().focus().updateAttributes('columns', { layout }).run()
  }

  const deleteColumns = () => {
    editor.chain().focus().deleteNode('columns').run()
  }

  return (
    <div className='flex space-x-2 bg-white border rounded-md p-2'>
      <button onClick={() => setLayout(ColumnLayout.SidebarLeft)} className='p-1 hover:bg-gray-100 rounded'>
        <PanelLeft className='w-4 h-4' />
      </button>
      <button onClick={() => setLayout(ColumnLayout.TwoColumn)} className='p-1 hover:bg-gray-100 rounded'>
        <Columns2 className='w-4 h-4' />
      </button>
      <button onClick={() => setLayout(ColumnLayout.SidebarRight)} className='p-1 hover:bg-gray-100 rounded'>
        <PanelRight className='w-4 h-4' />
      </button>
      <button onClick={deleteColumns} className='p-1 hover:bg-gray-100 rounded'>
        <Trash2 className='w-4 h-4' />
      </button>
    </div>
  )
}

export default ColumnsMenu

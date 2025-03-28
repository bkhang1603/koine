import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'
import { Editor } from '@tiptap/core'

export function LinkDialog({
  editor,
  open,
  setOpen
}: {
  editor: Editor
  open: boolean
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void
}) {
  const [url, setUrl] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && inputRef.current) {
      const currentUrl = editor?.getAttributes('link').href || ''
      setUrl(currentUrl)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, editor])

  const applyLink = () => {
    if (editor) {
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run()
      } else {
        editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run()
      }
      setOpen(false)
      setUrl('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Thêm liên kết</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            applyLink()
          }}
          className='space-y-4'
        >
          <Input
            ref={inputRef}
            type='url'
            placeholder='https://example.com'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button type='submit'>Chèn liên kết</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

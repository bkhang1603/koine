'use client'

import { useState } from 'react'
import RichTextEditor from '@/components/rich-text-editor'

function Page() {
  const [htmlContent, setHtmlContent] = useState('')

  const handleCopy = () => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, 'text/html')
    const serializedContent = new XMLSerializer().serializeToString(doc.body)
    const contentWithSingleQuotes = serializedContent.replace(/"/g, "'")
    navigator.clipboard.writeText(contentWithSingleQuotes)
  }

  return (
    <>
      <RichTextEditor content='' onChange={setHtmlContent} />
      <div className='mt-4 p-4 border rounded-md bg-white'>
        <h2 className='text-lg font-bold mb-2'>Rendered Content:</h2>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
      <button onClick={handleCopy} className='mt-4 p-2 bg-blue-500 text-white rounded'>
        Copy Content
      </button>
    </>
  )
}

export default Page

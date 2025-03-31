'use client'

import { useEffect, useState } from 'react'

interface CommentContentProps {
  content: string
  className?: string
}

export function CommentContent({ content, className }: CommentContentProps) {
  const [sanitizedContent, setSanitizedContent] = useState('')

  useEffect(() => {
    const sanitizeContent = (htmlContent: string) => {
      // Tạo một div wrapper để chứa nội dung
      const wrapper = document.createElement('div')
      wrapper.innerHTML = htmlContent

      // Chuyển đổi các thẻ p lồng nhau thành div
      const nestedParagraphs = wrapper.getElementsByTagName('p')
      Array.from(nestedParagraphs).forEach((p) => {
        if (p.getElementsByTagName('p').length > 0) {
          const div = document.createElement('div')
          div.innerHTML = p.innerHTML
          p.parentNode?.replaceChild(div, p)
        }
      })

      // Chuyển đổi các heading trong p thành div
      const paragraphs = wrapper.getElementsByTagName('p')
      Array.from(paragraphs).forEach((p) => {
        const headings = p.querySelectorAll('h1, h2, h3, h4, h5, h6')
        if (headings.length > 0) {
          const div = document.createElement('div')
          div.innerHTML = p.innerHTML
          p.parentNode?.replaceChild(div, p)
        }
      })

      return wrapper.innerHTML
    }

    setSanitizedContent(sanitizeContent(content))
  }, [content])

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
}

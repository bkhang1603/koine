'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface EventContentProps {
  content: string
}

export function EventContent({ content }: EventContentProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={cn(
        'prose prose-sm sm:prose lg:prose-lg xl:prose-xl',
        'prose-headings:font-semibold',
        'prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl',
        'prose-p:text-gray-600',
        'prose-a:text-primary hover:prose-a:text-primary/80',
        'prose-strong:text-gray-900',
        'prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
        'prose-pre:bg-gray-900 prose-pre:text-gray-100',
        'prose-blockquote:border-l-4 prose-blockquote:border-gray-200 prose-blockquote:pl-4',
        'prose-img:rounded-lg',
        'prose-ul:list-disc prose-ol:list-decimal',
        'prose-li:marker:text-gray-400'
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

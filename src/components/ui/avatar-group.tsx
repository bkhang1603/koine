import * as React from 'react'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function AvatarGroup({ className, children, ...props }: AvatarGroupProps) {
  const items = React.Children.toArray(children)

  return (
    <div className={cn('flex -space-x-2', className)} {...props}>
      {items.slice(0, 4).map((item, index) => (
        <div key={index} className='ring-2 ring-white rounded-full'>
          {item}
        </div>
      ))}
      {items.length > 4 && (
        <Avatar className='h-8 w-8 bg-gray-100 ring-2 ring-white'>
          <span className='text-xs text-gray-600'>+{items.length - 4}</span>
        </Avatar>
      )}
    </div>
  )
}

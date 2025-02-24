import * as React from 'react'
import { cn } from '@/lib/utils'

const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => <ol ref={ref} className={cn('flex flex-col gap-12', className)} {...props} />
)
Timeline.displayName = 'Timeline'

const TimelineItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('relative flex flex-col md:pl-8 pt-0', className)} {...props} />
  )
)
TimelineItem.displayName = 'TimelineItem'

const TimelineTime = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'hidden md:block absolute -left-32 font-medium text-base text-gray-500',
        'bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gray-100/80',
        'group-hover:text-primary group-hover:border-primary/20 transition-colors duration-300',
        className
      )}
      {...props}
    />
  )
)
TimelineTime.displayName = 'TimelineTime'

const TimelineConnector = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <>
      <div
        ref={ref}
        className={cn(
          'hidden md:block absolute top-0 left-0 h-full w-[2px]',
          'bg-gradient-to-b from-primary/20 via-primary/10 to-transparent',
          className
        )}
        {...props}
      />
      {/* Decorative Dot */}
      <div
        className='hidden md:block absolute top-0 left-0 -translate-x-[5px] w-3 h-3 rounded-full 
        bg-white border-2 border-primary/30 group-hover:border-primary 
        transition-colors duration-300'
      />
    </>
  )
)
TimelineConnector.displayName = 'TimelineConnector'

const TimelineHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-4 mb-4',
        'relative before:absolute before:-left-8 before:top-1/2 before:-translate-y-1/2',
        'before:w-6 before:h-[2px] before:bg-gradient-to-r before:from-primary/30 before:to-transparent',
        className
      )}
      {...props}
    />
  )
)
TimelineHeader.displayName = 'TimelineHeader'

const TimelineIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'hidden md:flex items-center justify-center',
        'w-8 h-8 rounded-full bg-white',
        'border-2 border-primary/20 group-hover:border-primary/40',
        'shadow-sm group-hover:shadow-md',
        'transition-all duration-300',
        className
      )}
      {...props}
    >
      <div
        className='w-2 h-2 rounded-full bg-primary/40 
        group-hover:bg-primary group-hover:scale-110 
        transition-all duration-300'
      />
    </div>
  )
)
TimelineIcon.displayName = 'TimelineIcon'

const TimelineContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex flex-col md:pl-8',
        'before:absolute before:-left-0 before:top-0 before:bottom-0',
        'before:w-[1px] before:bg-gradient-to-b before:from-primary/10 before:to-transparent',
        className
      )}
      {...props}
    />
  )
)
TimelineContent.displayName = 'TimelineContent'

export { Timeline, TimelineItem, TimelineConnector, TimelineHeader, TimelineIcon, TimelineContent, TimelineTime }

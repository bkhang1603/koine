import { cn } from '@/lib/utils'

function Loading({ className }: { className?: string }) {
  return (
    <div className={cn('flex space-x-1', className)} role='status' aria-label='Loading'>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )
}

export default Loading

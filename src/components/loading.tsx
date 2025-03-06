import { cn } from '@/lib/utils'

function Loading({ className, color }: { className?: string; color?: string }) {
  return (
    <div className={cn('flex space-x-1', className)} role='status' aria-label='Loading'>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full animate-bounce ${color || ' bg-blue-500'}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )
}

export default Loading

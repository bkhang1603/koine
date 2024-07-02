import { cn } from '@/lib/utils'

function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'py-1 px-4 bg-secondary hover:bg-secondary/80 cursor-pointer rounded-lg inline-block text-white',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Tag

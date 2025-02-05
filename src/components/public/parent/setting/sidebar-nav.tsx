// 'use client'

// import Link from 'next/link'
// import { usePathname } from 'next/navigation'

// import { cn } from '@/lib/utils'
// import { buttonVariants } from '@/components/ui/button'

// interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
//   items: {
//     href: string
//     title: string
//   }[]
// }

// export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
//   const pathname = usePathname()

//   return (
//     <nav className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)} {...props}>
//       {items.map((item) => (
//         <Link
//           key={item.href}
//           href={item.href}
//           className={cn(
//             buttonVariants({ variant: 'ghost' }),
//             pathname === item.href ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline',
//             'justify-start'
//           )}
//         >
//           {item.title}
//         </Link>
//       ))}
//     </nav>
//   )
// }

// 'use client'

// import Link from 'next/link'
// import { usePathname } from 'next/navigation'

// import { cn } from '@/lib/utils'
// import { buttonVariants } from '@/components/ui/button'
// import { ChevronDown, ChevronRight } from 'lucide-react'
// import { useState } from 'react'

// interface NavItem {
//   href: string
//   title: string
//   children?: NavItem[]
// }

// interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
//   items: NavItem[]
// }

// export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
//   const pathname = usePathname()

//   return (
//     <nav className={cn('flex flex-col space-y-1', className)} {...props}>
//       {items.map((item) => (
//         <NavItem key={item.href} item={item} pathname={pathname} />
//       ))}
//     </nav>
//   )
// }

// function NavItem({ item, pathname }: { item: NavItem; pathname: string }) {
//   const [isOpen, setIsOpen] = useState(false)
//   const isActive = pathname === item.href
//   const hasChildren = item.children && item.children.length > 0

//   return (
//     <div>
//       <Link
//         href={item.href}
//         className={cn(
//           buttonVariants({ variant: 'ghost' }),
//           isActive ? 'bg-muted hover:bg-muted w-full' : 'hover:bg-transparent hover:underline w-full',
//           'justify-between',
//           hasChildren ? '' : '',
//           'text-sm'
//         )}
//         onClick={(e) => {
//           if (hasChildren) {
//             e.preventDefault()
//             setIsOpen(!isOpen)
//           }
//         }}
//       >
//         {item.title}
//         {hasChildren && (
//           <span className='ml-auto'>
//             {isOpen ? <ChevronDown className='h-4 w-4' /> : <ChevronRight className='h-4 w-4' />}
//           </span>
//         )}
//       </Link>
//       {hasChildren && isOpen && (
//         <div className='ml-4 mt-1 flex flex-col space-y-1'>
//           {item.children?.map((child) => <NavItem key={child.href} item={child} pathname={pathname} />)}
//         </div>
//       )}
//     </div>
//   )
// }

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export interface NavItem {
  href?: string
  title?: string
  icon?: React.ReactNode
  children?: NavItem[]
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex flex-col space-y-1', className)} {...props}>
      {items.map((item, index) => (
        <NavItem key={item.href || `item-${index}`} item={item} pathname={pathname} />
      ))}
    </nav>
  )
}

function NavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const isActive = item.href && pathname === item.href
  const hasChildren = item.children && item.children.length > 0

  const content = (
    <div
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        isActive ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline',
        'justify-between w-full text-sm select-none',
        item.title ? '' : 'pointer-events-none'
      )}
      onClick={() => {
        if (hasChildren) {
          setIsOpen(!isOpen)
        }
      }}
    >
      <span className='flex items-center'>
        {item.icon && <span>{item.icon}</span>}
        {item.title || 'Untitled'}
      </span>
      {hasChildren && (
        <span className='ml-auto'>
          {isOpen ? <ChevronDown className='h-4 w-4' /> : <ChevronRight className='h-4 w-4' />}
        </span>
      )}
    </div>
  )

  return (
    <div>
      {item.href && item.title ? <Link href={item.href}>{content}</Link> : content}
      {hasChildren && isOpen && (
        <div className='ml-4 mt-1 flex flex-col space-y-1'>
          {item.children?.map((child, index) => (
            <NavItem key={child.href || `child-${index}`} item={child} pathname={pathname} />
          ))}
        </div>
      )}
    </div>
  )
}

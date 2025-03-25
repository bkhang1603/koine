import Link from 'next/link'
import { ReactNode } from 'react'

interface ActionButtonProps {
  href: string
  label: string
  icon?: ReactNode
}

export const ActionButton = ({ href, label, icon }: ActionButtonProps) => (
  <Link href={href}>
    <button className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all'>
      {icon}
      <span>{label}</span>
    </button>
  </Link>
)

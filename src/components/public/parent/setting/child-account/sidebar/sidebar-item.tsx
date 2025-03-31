import React from 'react'

interface SidebarItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  active: boolean
  onClick: () => void
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 p-2 rounded-lg w-full transition-colors ${
      active ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'
    }`}
    type='button'
  >
    <Icon className='h-5 w-5' />
    <span>{label}</span>
  </button>
)

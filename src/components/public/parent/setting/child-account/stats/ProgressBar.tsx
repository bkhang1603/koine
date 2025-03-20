import React from 'react'

interface ProgressBarProps {
  value: number
  label: string
  color: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, label, color }) => (
  <div className='space-y-1'>
    <div className='flex justify-between text-sm'>
      <span className='font-medium text-gray-700'>{label}</span>
      <span className='text-gray-600'>{value}%</span>
    </div>
    <div className='w-full h-2 bg-gray-100 rounded-full'>
      <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  </div>
)

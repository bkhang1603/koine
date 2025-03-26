'use client'

import * as React from 'react'
import { X, Check, ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Option = {
  value: string
  label: string
}

type MultiSelectProps = {
  options: Option[]
  selected: Option[]
  // eslint-disable-next-line no-unused-vars
  onChange: (selected: Option[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({ options, selected, onChange, placeholder = 'Chọn mục...', className }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleUnselect = (option: Option) => {
    onChange(selected.filter((item) => item.value !== option.value))
  }

  const handleSelect = (option: Option) => {
    onChange([...selected, option])
    setSearchValue('')
    // Focus input after selection
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const filteredOptions = options
    .filter((option) => !selected.some((item) => item.value === option.value))
    .filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <div className={cn('relative w-full', className)} ref={containerRef}>
      <div
        className={cn(
          'flex flex-wrap items-center gap-1.5 w-full rounded-md border bg-background px-3 py-1.5 text-sm',
          'min-h-10 focus-within:ring-1 focus-within:ring-ring focus-within:border-input cursor-text'
        )}
        onClick={() => {
          setOpen(true)
          inputRef.current?.focus()
        }}
      >
        {selected.map((option) => (
          <Badge key={option.value} variant='secondary' className='px-2 py-1 h-7 gap-1 bg-slate-100 hover:bg-slate-200'>
            {option.label}
            <button
              type='button'
              className='rounded-full h-4 w-4 inline-flex items-center justify-center hover:bg-slate-300 transition-colors'
              onClick={(e) => {
                e.stopPropagation()
                handleUnselect(option)
              }}
            >
              <X className='h-3 w-3' />
            </button>
          </Badge>
        ))}

        <div className='flex-1 flex items-center'>
          <Input
            ref={inputRef}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder={selected.length === 0 ? placeholder : ''}
            className='border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-1 h-7'
          />
        </div>

        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation()
            setOpen(!open)
            if (!open) inputRef.current?.focus()
          }}
          className='ml-auto rounded p-1 hover:bg-slate-100 transition-colors'
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {open && (
        <div
          className='absolute left-0 z-[9999] w-full mt-1 py-1 rounded-md border border-slate-200 bg-white shadow-md max-h-60 overflow-auto'
          style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
        >
          {filteredOptions.length === 0 ? (
            <div className='px-3 py-6 text-sm text-center text-muted-foreground'>
              {searchValue ? 'Không tìm thấy kết quả' : 'Không còn lựa chọn nào khác'}
            </div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className='px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 flex items-center transition-colors'
                onClick={() => handleSelect(option)}
              >
                <div className='w-5 h-5 mr-2 rounded-sm border border-slate-200 flex items-center justify-center'>
                  {selected.some((item) => item.value === option.value) && (
                    <Check className='h-3.5 w-3.5 text-primary' />
                  )}
                </div>
                <span className='font-medium'>{option.label}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

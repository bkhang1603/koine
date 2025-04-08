'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimePickerInputProps {
  value?: number
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: number) => void
  min?: number
  max?: number
  placeholder?: string
}

export function TimePickerInput({ value, onChange, min = 0, max = 59, placeholder }: TimePickerInputProps) {
  const [stringValue, setStringValue] = useState(value?.toString() || '')

  useEffect(() => {
    if (value !== undefined) {
      setStringValue(value.toString().padStart(2, '0'))
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setStringValue(newValue)

    const numberValue = Number.parseInt(newValue, 10)
    if (!isNaN(numberValue) && numberValue >= min && numberValue <= max) {
      onChange?.(numberValue)
    }
  }

  return (
    <Input
      value={stringValue}
      onChange={handleChange}
      placeholder={placeholder}
      className='w-16 text-center'
      inputMode='numeric'
      maxLength={2}
    />
  )
}

interface TimePickerDemoProps {
  setHours: (hours: number) => void
  setMinutes: (minutes: number) => void
  initHours: number
  initMinutes: number
  onTimeChange: (hours: number, minutes: number) => void
}

export function TimePickerDemo({ setHours, setMinutes, initHours, initMinutes, onTimeChange }: TimePickerDemoProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5)

  return (
    <div className='p-4 space-y-4'>
      <div className='flex items-center gap-2'>
        <Clock className='h-4 w-4 text-muted-foreground' />
        <span className='text-sm font-medium'>Chọn thời gian</span>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <label className='text-sm text-muted-foreground'>Giờ</label>
          <div className='grid grid-cols-4 gap-2'>
            {hours.map((hour) => (
              <Button
                key={hour}
                variant={initHours === hour ? 'default' : 'outline'}
                size='sm'
                className={cn('w-full', initHours === hour && 'bg-primary text-primary-foreground')}
                onClick={() => {
                  setHours(hour)
                  onTimeChange(hour, initMinutes)
                }}
              >
                {hour.toString().padStart(2, '0')}
              </Button>
            ))}
          </div>
        </div>
        <div className='space-y-2'>
          <label className='text-sm text-muted-foreground'>Phút</label>
          <div className='grid grid-cols-3 gap-2'>
            {minutes.map((minute) => (
              <Button
                key={minute}
                variant={initMinutes === minute ? 'default' : 'outline'}
                size='sm'
                className={cn('w-full', initMinutes === minute && 'bg-primary text-primary-foreground')}
                onClick={() => {
                  setMinutes(minute)
                  onTimeChange(initHours, minute)
                }}
              >
                {minute.toString().padStart(2, '0')}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TimePickerInputProps {
  value?: number
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
  const [hours, setHoursLocal] = useState(initHours)
  const [minutes, setMinutesLocal] = useState(initMinutes)

  useEffect(() => {
    setHoursLocal(initHours)
    setMinutesLocal(initMinutes)
  }, [initHours, initMinutes])

  const handleHoursChange = (value: number) => {
    setHoursLocal(value)
    setHours(value)
    onTimeChange(value, minutes)
  }

  const handleMinutesChange = (value: number) => {
    setMinutesLocal(value)
    setMinutes(value)
    onTimeChange(hours, value)
  }

  return (
    <div className='flex items-center space-x-2'>
      <div className='grid gap-1 text-center'>
        <Label htmlFor='hours' className='text-xs'>
          Giờ
        </Label>
        <TimePickerInput value={hours} onChange={handleHoursChange} min={0} max={23} placeholder='00' />
      </div>
      <div className='grid gap-1 text-center'>
        <Label htmlFor='minutes' className='text-xs'>
          Phút
        </Label>
        <TimePickerInput value={minutes} onChange={handleMinutesChange} min={0} max={59} placeholder='00' />
      </div>
    </div>
  )
}

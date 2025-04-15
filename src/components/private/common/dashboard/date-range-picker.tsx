'use client'

import { format, startOfMonth, subMonths, subYears, addDays, isAfter, isFuture } from 'date-fns'
import { CalendarIcon, ChevronDown } from 'lucide-react'
import { DateRange, DayPicker } from 'react-day-picker'
import { vi } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import 'react-day-picker/dist/style.css'
import { useCallback, useEffect, useState } from 'react'

export type { DateRange }

type RangeType = 'DAY' | 'THIS_MONTH' | '3_MONTH' | '6_MONTH' | '1_YEAR' | '2_YEARS' | '3_YEARS'
type SelectedOptionType = RangeType | 'CUSTOM'

interface DateRangePickerProps {
  value: DateRange | undefined
  // eslint-disable-next-line no-unused-vars
  onChange: (value: DateRange | undefined) => void
  className?: string
  // eslint-disable-next-line no-unused-vars
  onRangeTypeChange: (rangeType: RangeType) => void
  /** Initial selected option from URL params */
  initialSelectedOption?: RangeType
}

export function DateRangePicker({
  value,
  onChange,
  className,
  onRangeTypeChange,
  initialSelectedOption = '3_MONTH'
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  // Initialize selectedOption from props or default to 3_MONTH
  const [selectedOption, setSelectedOption] = useState<SelectedOptionType>(
    initialSelectedOption === 'DAY' ? 'CUSTOM' : initialSelectedOption
  )

  // Initialize with default range on first render if needed
  useEffect(() => {
    if (!value?.from && !value?.to) {
      const today = new Date()
      let fromDate: Date

      // Create date range based on initial selected option
      switch (initialSelectedOption) {
        case 'THIS_MONTH':
          fromDate = startOfMonth(today)
          break
        case '3_MONTH':
          fromDate = subMonths(today, 3)
          break
        case '6_MONTH':
          fromDate = subMonths(today, 6)
          break
        case '1_YEAR':
          fromDate = subYears(today, 1)
          break
        case '2_YEARS':
          fromDate = subYears(today, 2)
          break
        case '3_YEARS':
          fromDate = subYears(today, 3)
          break
        default:
          fromDate = subMonths(today, 3) // Default to 3 months
      }

      onChange({
        from: fromDate,
        to: today
      })
    }
  }, [onChange, initialSelectedOption, value?.from, value?.to])

  // Update selected option when initialSelectedOption changes
  useEffect(() => {
    if (initialSelectedOption) {
      setSelectedOption(initialSelectedOption === 'DAY' ? 'CUSTOM' : initialSelectedOption)
    }
  }, [initialSelectedOption])

  // Function to check if a date is disabled
  const isDateDisabled = useCallback(
    (date: Date) => {
      // Disable future dates
      if (isFuture(date)) {
        return true
      }

      // If start date is selected, disable dates that are more than 30 days after it
      if (value?.from && isAfter(date, value.from)) {
        const maxDate = addDays(value.from, 30) // 30 days including from date
        return isAfter(date, maxDate)
      }

      return false
    },
    [value?.from]
  )

  // Modified onSelect handler to allow date selection without closing the calendar
  const handleSelect = (range: DateRange | undefined) => {
    // If no range, just update state
    if (!range) {
      onChange(range)
      return
    }

    // If only start date is selected, update state and keep picker open
    if (range.from && !range.to) {
      onChange(range)
      return
    }

    // If end date is selected, enforce the 30-day limit
    if (range.from && range.to) {
      const maxEndDate = addDays(range.from, 30) // 30 days including from date

      // If the selected end date is after the max allowed, cap it
      if (isAfter(range.to, maxEndDate)) {
        onChange({ from: range.from, to: maxEndDate })
      } else {
        onChange(range)
      }

      // We don't finalize the selection here or close the calendar
      // The user will need to click "Apply" or "Quay lại" to finalize
    }
  }

  // Handler to apply the custom date range selection
  const handleApplyCustomRange = () => {
    if (value?.from && value?.to) {
      // Set range type to DAY for custom selections
      onRangeTypeChange('DAY')
      setSelectedOption('CUSTOM')
      setShowCalendar(false) // Close the calendar view
    }
  }

  // Handler to cancel the custom selection and go back to preset options
  const handleCancelCustomRange = () => {
    setShowCalendar(false) // Just close the calendar without applying changes
  }

  // Preset handlers
  const handleThisMonth = () => {
    const today = new Date()
    const fromDate = startOfMonth(today)
    const toDate = today

    onChange({
      from: fromDate,
      to: toDate
    })
    onRangeTypeChange('THIS_MONTH')
    setSelectedOption('THIS_MONTH')
    setIsOpen(false)
  }

  const handle3Months = () => {
    const today = new Date()
    const fromDate = subMonths(today, 3)

    onChange({
      from: fromDate,
      to: today
    })
    onRangeTypeChange('3_MONTH')
    setSelectedOption('3_MONTH')
    setIsOpen(false)
  }

  const handle6Months = () => {
    const today = new Date()
    const fromDate = subMonths(today, 6)

    onChange({
      from: fromDate,
      to: today
    })
    onRangeTypeChange('6_MONTH')
    setSelectedOption('6_MONTH')
    setIsOpen(false)
  }

  const handle1Year = () => {
    const today = new Date()
    const fromDate = subYears(today, 1)

    onChange({
      from: fromDate,
      to: today
    })
    onRangeTypeChange('1_YEAR')
    setSelectedOption('1_YEAR')
    setIsOpen(false)
  }

  const handle2Years = () => {
    const today = new Date()
    const fromDate = subYears(today, 2)

    onChange({
      from: fromDate,
      to: today
    })
    onRangeTypeChange('2_YEARS')
    setSelectedOption('2_YEARS')
    setIsOpen(false)
  }

  const handle3Years = () => {
    const today = new Date()
    const fromDate = subYears(today, 3)

    onChange({
      from: fromDate,
      to: today
    })
    onRangeTypeChange('3_YEARS')
    setSelectedOption('3_YEARS')
    setIsOpen(false)
  }

  // Helper function to get the button style based on selected option
  const getButtonStyle = (option: SelectedOptionType) => {
    const baseStyle = 'justify-center text-sm py-3 h-11 rounded-none border-b border-gray-100 font-normal'

    if (option === selectedOption) {
      return `${baseStyle} hover:bg-blue-600 text-white bg-blue-500`
    }

    return `${baseStyle} hover:bg-gray-50 text-gray-700`
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant='outline'
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground',
              'bg-white hover:bg-gray-50 flex items-center h-10 border border-gray-200 shadow-sm'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4 text-gray-500' />
            <span className='text-sm'>
              {value?.from ? (
                value.to ? (
                  <>
                    {format(value.from, 'dd/MM/yyyy')} - {format(value.to, 'dd/MM/yyyy')}
                  </>
                ) : (
                  format(value.from, 'dd/MM/yyyy')
                )
              ) : (
                <span>Chọn khoảng thời gian</span>
              )}
            </span>
            <div className='ml-auto opacity-50'>
              <ChevronDown className='h-4 w-4' />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0 shadow-md border border-gray-200' align='start'>
          {showCalendar ? (
            <div className='p-0'>
              <div className='flex justify-between items-center p-3 border-b bg-gray-50'>
                <Button variant='ghost' size='sm' className='h-8 px-2 text-xs' onClick={handleCancelCustomRange}>
                  « Quay lại
                </Button>
                <div className='text-sm font-medium'>Chọn ngày (tối đa 30 ngày)</div>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 px-2 text-xs text-blue-600 hover:text-blue-800'
                  onClick={handleApplyCustomRange}
                  disabled={!value?.from || !value?.to}
                >
                  Áp dụng
                </Button>
              </div>
              <div className='p-3 text-xs text-gray-500 border-b bg-gray-50'>
                Chọn ngày bắt đầu và kết thúc, sau đó nhấn &ldquo;Áp dụng&rdquo; để xác nhận.
              </div>
              <DayPicker
                mode='range'
                defaultMonth={value?.from}
                selected={value}
                onSelect={handleSelect}
                numberOfMonths={2}
                locale={vi}
                disabled={isDateDisabled}
                modifiers={{
                  disabled: isDateDisabled
                }}
                className='p-3'
                styles={{
                  day_selected: { backgroundColor: '#3b82f6', color: 'white' },
                  day_today: { fontWeight: 'bold', color: '#3b82f6' }
                }}
              />
              {value?.from && value?.to && (
                <div className='flex justify-end p-3 border-t'>
                  <Button variant='outline' size='sm' className='mr-2' onClick={handleCancelCustomRange}>
                    Hủy
                  </Button>
                  <Button variant='default' size='sm' onClick={handleApplyCustomRange}>
                    Áp dụng
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className='min-w-[280px]'>
              {/* Date input/display row */}
              <div className='p-3 border-b bg-gray-50 flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <div className='text-sm'>
                    <span className='text-gray-500 mr-1'>Từ</span>
                    <span className='font-medium'>{value?.from ? format(value.from, 'dd/MM/yyyy') : '--/--/----'}</span>
                  </div>
                  <div className='text-gray-300'>—</div>
                  <div className='text-sm'>
                    <span className='text-gray-500 mr-1'>Đến</span>
                    <span className='font-medium'>{value?.to ? format(value.to, 'dd/MM/yyyy') : '--/--/----'}</span>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 w-8 p-0 rounded-full hover:bg-gray-200'
                  onClick={() => setShowCalendar(true)}
                >
                  <CalendarIcon className='h-4 w-4 text-gray-600' />
                </Button>
              </div>

              {/* Preset options */}
              <div className='grid grid-cols-1 divide-y divide-gray-100'>
                <Button className={getButtonStyle('THIS_MONTH')} variant='ghost' onClick={handleThisMonth}>
                  Tháng này
                </Button>
                <Button className={getButtonStyle('3_MONTH')} variant='ghost' onClick={handle3Months}>
                  3 tháng gần đây
                </Button>
                <Button className={getButtonStyle('6_MONTH')} variant='ghost' onClick={handle6Months}>
                  6 tháng gần đây
                </Button>
                <Button className={getButtonStyle('1_YEAR')} variant='ghost' onClick={handle1Year}>
                  1 năm gần đây
                </Button>
                <Button className={getButtonStyle('2_YEARS')} variant='ghost' onClick={handle2Years}>
                  2 năm gần đây
                </Button>
                <Button className={getButtonStyle('3_YEARS')} variant='ghost' onClick={handle3Years}>
                  3 năm gần đây
                </Button>
                {selectedOption === 'CUSTOM' && (
                  <Button className={getButtonStyle('CUSTOM')} variant='ghost' onClick={() => setShowCalendar(true)}>
                    Tùy chỉnh
                  </Button>
                )}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

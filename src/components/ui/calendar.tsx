/* eslint-disable no-unused-vars */
'use client'

import * as React from 'react'
import DatePicker from 'react-datepicker'
import { vi } from 'date-fns/locale'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'

import 'react-datepicker/dist/react-datepicker.css'

export interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date | null) => void
  disabled?: (date: Date) => boolean
  mode?: 'single' | 'range' | 'multiple'
  className?: string
  initialFocus?: boolean
}

function Calendar({ selected, onSelect, disabled, className, initialFocus = false }: CalendarProps) {
  // Hàm xử lý đặc biệt để hiện thị style theo ngày
  const getDayClassName = (date: Date) => {
    const baseStyle =
      'w-9 h-9 rounded-full transition-colors duration-200 mx-0.5 text-sm font-medium flex items-center justify-center'

    const isToday = date.toDateString() === new Date().toDateString()
    const isSelected = selected && date.toDateString() === selected.toDateString()

    if (isSelected) {
      return cn(baseStyle, 'bg-primary text-white hover:bg-primary-dark')
    }

    if (isToday) {
      return cn(baseStyle, 'bg-primary/10 text-primary hover:bg-primary/20')
    }

    return cn(baseStyle, 'hover:bg-gray-100')
  }

  return (
    <div className={cn('p-4 bg-white rounded-lg shadow-sm border border-gray-100', className)}>
      <style jsx global>{`
        /* Tùy chỉnh CSS toàn cục cho react-datepicker */
        .react-datepicker {
          font-family: inherit;
          border: none;
          border-radius: 0.5rem;
          box-shadow: none;
          width: 100%;
        }
        .react-datepicker__header {
          background-color: transparent;
          border-bottom: none;
          padding-top: 0.5rem;
        }
        .react-datepicker__day-names {
          margin-top: 1rem;
          border-top: 1px solid #f1f5f9;
          padding-top: 0.5rem;
        }
        .react-datepicker__day-name {
          color: #64748b;
          font-weight: 500;
          width: 2.25rem;
          margin: 0;
        }
        .react-datepicker__month {
          margin: 0;
        }
        .react-datepicker__day {
          margin: 0.15rem 0;
          width: 2.25rem;
          height: 2.25rem;
          line-height: 2.25rem;
          border-radius: 9999px;
        }
        .react-datepicker__day:hover {
          background-color: #f1f5f9;
          border-radius: 9999px;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: #000;
          color: white;
        }
        .react-datepicker__day--selected {
          background-color: #000;
          color: white;
        }
        .react-datepicker__day--selected:not([aria-disabled='true']):hover {
          background-color: #363636;
          color: white;
        }
        .react-datepicker__day--today {
          font-weight: 600;
          color: #000;
        }
      `}</style>

      <DatePicker
        selected={selected}
        onChange={(date) => onSelect?.(date as Date)}
        inline
        locale={vi}
        dateFormat='dd/MM/yyyy'
        filterDate={(date) => (disabled ? !disabled(date) : true)}
        showMonthDropdown
        showYearDropdown
        dropdownMode='select'
        previousMonthButtonLabel={<ChevronLeft className='h-4 w-4' />}
        nextMonthButtonLabel={<ChevronRight className='h-4 w-4' />}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        }) => (
          <div className='flex items-center justify-center'>
            <div className='flex items-center'>
              <Button
                variant='ghost'
                size='icon'
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className='h-7 w-7 rounded-full hover:bg-gray-100'
              >
                <ChevronLeft className='h-4 w-4 text-gray-600' />
              </Button>

              <div className='flex items-center gap-1 mx-2'>
                <select
                  value={date.getMonth()}
                  onChange={({ target: { value } }) => changeMonth(parseInt(value))}
                  className='text-sm bg-transparent border-0 rounded px-1 py-0.5 cursor-pointer focus:ring-1 focus:ring-primary/20 outline-none appearance-none'
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0.5 0.5 16 16'%3E%3Cpath fill='%23555' d='M5 7l3 3 3-3z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.1rem center',
                    backgroundSize: '16px 16px',
                    paddingRight: '1.5rem'
                  }}
                >
                  {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                    <option key={month} value={month}>
                      {format(new Date(date.getFullYear(), month), 'MMMM', { locale: vi })}
                    </option>
                  ))}
                </select>

                <select
                  value={date.getFullYear()}
                  onChange={({ target: { value } }) => changeYear(parseInt(value))}
                  className='text-sm bg-transparent border-0 rounded px-1 py-0.5 cursor-pointer focus:ring-1 focus:ring-primary/20 outline-none appearance-none'
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0.5 0.5 16 16'%3E%3Cpath fill='%23555' d='M5 7l3 3 3-3z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.1rem center',
                    backgroundSize: '16px 16px',
                    paddingRight: '1.5rem'
                  }}
                >
                  {Array.from({ length: 50 }, (_, i) => date.getFullYear() - 30 + i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                variant='ghost'
                size='icon'
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className='h-7 w-7 rounded-full hover:bg-gray-100'
              >
                <ChevronRight className='h-4 w-4 text-gray-600' />
              </Button>
            </div>
          </div>
        )}
        className='!border-none'
        calendarClassName='bg-white rounded-md shadow-none'
        dayClassName={getDayClassName}
        autoFocus={initialFocus}
      />
    </div>
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }

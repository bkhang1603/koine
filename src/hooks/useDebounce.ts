import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Tạo timeout để cập nhật giá trị debounced sau độ trễ đã chỉ định
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Xóa timeout khi giá trị thay đổi hoặc component unmount
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CategorySelectProps {
  categories: any[]
  selectedCategories: string[]
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string[]) => void
}

export function CategorySelect({ categories, selectedCategories, onChange }: CategorySelectProps) {
  const handleSelect = (value: string) => {
    if (selectedCategories.includes(value)) {
      onChange(selectedCategories.filter((id) => id !== value))
    } else {
      onChange([...selectedCategories, value])
    }
  }

  return (
    <Select onValueChange={handleSelect} value={selectedCategories[selectedCategories.length - 1] || ''}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Chọn danh mục' />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            <div className='flex items-center gap-2'>
              <input type='checkbox' checked={selectedCategories.includes(category.id)} readOnly />
              <span>{category.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

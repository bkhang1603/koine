'use client'

import { MultiSelect } from '@/components/ui/multi-select'

interface CategorySelectProps {
  categories: any[]
  selectedCategories: string[]
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string[]) => void
}

export function CategorySelect({ categories, selectedCategories, onChange }: CategorySelectProps) {
  return (
    <MultiSelect
      options={categories.map((category) => ({
        value: category.id,
        label: category.name
      }))}
      placeholder='Chọn danh mục'
      selected={selectedCategories.map((id) => {
        const category = categories.find((cat) => cat.id === id)
        return category ? { value: category.id, label: category.name } : { value: id, label: id }
      })}
      onChange={(selected) => {
        onChange(selected.map((item) => item.value))
      }}
    />
  )
}

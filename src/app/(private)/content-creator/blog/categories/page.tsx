'use client'

import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { blogCategories } from '@/app/(private)/content-creator/_mock/data'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { CategoryTable } from '@/components/private/content-creator/blog/category-table'
import { CreateCategoryDialog } from '@/components/private/content-creator/blog/create-category-dialog'

export default function BlogCategoriesPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredCategories = blogCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='container mx-auto px-4 py-6 space-y-8'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý danh mục Blog</h1>
          <p className='text-sm text-muted-foreground mt-1'>Quản lý các danh mục cho bài viết blog</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className='w-4 h-4 mr-2' />
          Thêm danh mục
        </Button>
      </div>

      {/* Search and Filters */}
      <div className='flex flex-col sm:flex-row gap-4 mb-6'>
        <div className='relative flex-1 max-w-[500px]'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Tìm kiếm danh mục...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-9'
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả trạng thái</SelectItem>
            <SelectItem value='active'>Đang hoạt động</SelectItem>
            <SelectItem value='inactive'>Không hoạt động</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CategoryTable data={filteredCategories} searchQuery={searchQuery} statusFilter={statusFilter} />

      <CreateCategoryDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  )
}

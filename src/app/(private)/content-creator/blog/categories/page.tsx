'use client'

import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { CategoryTable } from '@/components/private/content-creator/blog/category-table'
import { CreateCategoryDialog } from '@/components/private/content-creator/blog/create-category-dialog'
import Loading from '@/components/loading'
import {
  useCategoryBlogCreateMutation,
  useCategoryBlogDeleteMutation,
  useCategoryBlogDetailQuery,
  useCategoryBlogQuery,
  useCategoryBlogUpdateMutation
} from '@/queries/useBlog'
import { CategoryBlogData } from '@/schemaValidations/blog.schema'
import { useToast } from '@/components/ui/use-toast'

type CategoryFormData = {
  name: string
  description: string
}

export default function BlogCategoriesPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingCategory, setEditingCategory] = useState<
    { id: string; name: string; description: string } | undefined
  >()

  const { toast } = useToast()
  const { data: categoriesResponse, isLoading } = useCategoryBlogQuery()
  const { data: categoryDetail } = useCategoryBlogDetailQuery({ id: editingCategory?.id || '' })
  const createCategoryMutation = useCategoryBlogCreateMutation()
  const updateCategoryMutation = useCategoryBlogUpdateMutation()
  const deleteCategoryMutation = useCategoryBlogDeleteMutation()

  const categories = categoriesResponse?.payload?.data || []

  const filteredCategories = categories.filter((category: typeof CategoryBlogData._type) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (category.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())

    if (statusFilter === 'all') return matchesSearch
    return matchesSearch
  })

  const handleCreateUpdate = async (data: CategoryFormData) => {
    try {
      if (editingCategory) {
        await updateCategoryMutation.mutateAsync({
          id: editingCategory.id,
          data: {
            name: data.name,
            description: data.description
          }
        })
        toast({
          title: 'Thành công',
          description: 'Cập nhật danh mục thành công'
        })
      } else {
        await createCategoryMutation.mutateAsync(data)
        toast({
          title: 'Thành công',
          description: 'Thêm danh mục mới thành công'
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Có lỗi xảy ra',
        description: 'Vui lòng thử lại sau'
      })
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCategoryMutation.mutateAsync(id)
      toast({
        title: 'Thành công',
        description: 'Xóa danh mục thành công'
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Có lỗi xảy ra',
        description: 'Vui lòng thử lại sau'
      })
      throw error
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[calc(100vh-10rem)]'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-8'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý danh mục Blog</h1>
          <p className='text-sm text-muted-foreground mt-1'>Quản lý các danh mục cho bài viết blog</p>
        </div>
        <Button
          onClick={() => {
            setEditingCategory(undefined)
            setCreateDialogOpen(true)
          }}
        >
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

      <CategoryTable
        data={filteredCategories}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onEdit={(category) => {
          setEditingCategory(category)
          setCreateDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <CreateCategoryDialog
        open={createDialogOpen}
        onOpenChange={(open) => {
          setCreateDialogOpen(open)
          if (!open) setEditingCategory(undefined)
        }}
        initialData={editingCategory}
        onSubmit={handleCreateUpdate}
        isLoading={createCategoryMutation.isPending || updateCategoryMutation.isPending}
      />
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { CategoryTable } from '@/components/private/content-creator/blog/category-table'
import { CreateCategoryDialog } from '@/components/private/content-creator/blog/create-category-dialog'
import { EditCategoryDialog } from '@/components/private/content-creator/blog/edit-category-dialog'
import Loading from '@/components/loading'
import {
  useCategoryBlogCreateMutation,
  useCategoryBlogDeleteMutation,
  useCategoryBlogDetailQuery,
  useCategoryBlogQuery,
  useCategoryBlogUpdateMutation
} from '@/queries/useBlog'
import { useToast } from '@/components/ui/use-toast'

type CategoryFormData = {
  name: string
  description: string
}

export default function BlogCategoriesPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingCategoryId, setEditingCategoryId] = useState<string | undefined>()

  const { toast } = useToast()
  const { data: categoriesResponse, isLoading } = useCategoryBlogQuery()

  // Chỉ query category detail khi đang edit và có ID
  const { data: categoryDetailResponse } = useCategoryBlogDetailQuery({
    id: editingCategoryId || '',
    enabled: !!editingCategoryId
  })

  const createCategoryMutation = useCategoryBlogCreateMutation()
  const updateCategoryMutation = useCategoryBlogUpdateMutation()
  const deleteCategoryMutation = useCategoryBlogDeleteMutation()

  const categories = categoriesResponse?.payload?.data || []
  const categoryDetail = categoryDetailResponse?.payload?.data

  const handleCreate = async (data: CategoryFormData) => {
    // Trim dữ liệu trước khi gửi
    const trimmedData = {
      name: data.name.trim(),
      description: data.description.trim()
    }

    try {
      await createCategoryMutation.mutateAsync(trimmedData)
      toast({
        title: 'Thành công',
        description: 'Thêm danh mục mới thành công'
      })
      setCreateDialogOpen(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Có lỗi xảy ra',
        description: 'Vui lòng thử lại sau'
      })
    }
  }

  const handleUpdate = async (data: CategoryFormData) => {
    if (!editingCategoryId || !categoryDetail) return

    // Trim dữ liệu từ form
    const trimmedData = {
      name: data.name.trim(),
      description: data.description.trim()
    }

    // So sánh với dữ liệu gốc
    const originalData = {
      name: categoryDetail.name,
      description: categoryDetail.description
    }

    // Kiểm tra xem có thay đổi gì không
    const hasChanges = trimmedData.name !== originalData.name || trimmedData.description !== originalData.description

    // Nếu không có thay đổi, đóng dialog và thông báo
    if (!hasChanges) {
      toast({
        title: 'Thông báo',
        description: 'Không có thay đổi nào để cập nhật',
        variant: 'default'
      })
      setEditDialogOpen(false)
      setTimeout(() => setEditingCategoryId(undefined), 300)
      return
    }

    try {
      await updateCategoryMutation.mutateAsync({
        id: editingCategoryId,
        data: trimmedData // Sử dụng dữ liệu đã trim
      })
      toast({
        title: 'Thành công',
        description: 'Cập nhật danh mục thành công'
      })
      setEditDialogOpen(false)
      setTimeout(() => setEditingCategoryId(undefined), 300)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Có lỗi xảy ra',
        description: 'Vui lòng thử lại sau'
      })
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
    }
  }

  // Hàm xử lý khi ấn nút Edit
  const handleEdit = (id: string) => {
    setEditingCategoryId(id)
    setTimeout(() => setEditDialogOpen(true), 100)
  }

  // Xử lý khi đóng dialog
  const handleCloseEditDialog = (open: boolean) => {
    if (!open) {
      setEditDialogOpen(false)
      setTimeout(() => setEditingCategoryId(undefined), 300)
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
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className='w-4 h-4 mr-2' />
          Thêm danh mục
        </Button>
      </div>

      {/* Search and Filters */}
      <div className='flex flex-col sm:flex-row gap-4 mb-6 w-full justify-start md:justify-between'>
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

      <CategoryTable data={categories} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Dialog tạo mới */}
      <CreateCategoryDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
        isLoading={createCategoryMutation.isPending}
      />

      {/* Dialog chỉnh sửa */}
      {editDialogOpen && (
        <EditCategoryDialog
          categoryDetail={categoryDetail}
          open={editDialogOpen}
          onOpenChange={handleCloseEditDialog}
          onSubmit={handleUpdate}
          isLoading={updateCategoryMutation.isPending}
        />
      )}
    </div>
  )
}

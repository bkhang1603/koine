'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { CreateCategoryDialog } from '@/components/private/common/blog/create-category-dialog'
import { EditCategoryDialog } from '@/components/private/common/blog/edit-category-dialog'
import {
  useCategoryBlogCreateMutation,
  useCategoryBlogDeleteMutation,
  useCategoryBlogDetailQuery,
  useCategoryBlogQuery,
  useCategoryBlogUpdateMutation
} from '@/queries/useBlog'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { TableCustom, dataListType } from '@/components/table-custom'
import { useRouter, useSearchParams } from 'next/navigation'
import { MoreOptions } from '@/components/private/common/more-options'

type CategoryFormData = {
  name: string
  description: string
}

export default function BlogCategoriesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get values from searchParams or use default values
  const currentKeyword = searchParams.get('keyword') || ''
  const currentPageSize = Number(searchParams.get('page_size')) || 5
  const currentPageIndex = Number(searchParams.get('page_index')) || 1

  // Function to update URL when values change
  const updateSearchParams = (newParams: { keyword?: string; page_size?: number; page_index?: number }) => {
    const params = new URLSearchParams(searchParams.toString())

    if (newParams.keyword !== undefined) {
      if (newParams.keyword === '') {
        params.delete('keyword')
      } else {
        params.set('keyword', newParams.keyword)
      }
    }

    if (newParams.page_size !== undefined) {
      params.set('page_size', newParams.page_size.toString())
    }

    if (newParams.page_index !== undefined) {
      params.set('page_index', newParams.page_index.toString())
    }

    router.push(`?${params.toString()}`)
  }

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingCategoryId, setEditingCategoryId] = useState<string | undefined>()
  const [, setDeleteDialogOpen] = useState(false)
  const [, setDeleteCategoryId] = useState<string | undefined>()

  const { data: categoriesResponse, isLoading } = useCategoryBlogQuery({
    page_index: currentPageIndex,
    page_size: currentPageSize,
    keyword: currentKeyword
  })

  const { data: categoryDetailResponse } = useCategoryBlogDetailQuery({
    id: editingCategoryId || '',
    enabled: !!editingCategoryId
  })

  const createCategoryMutation = useCategoryBlogCreateMutation()
  const updateCategoryMutation = useCategoryBlogUpdateMutation()
  const deleteCategoryMutation = useCategoryBlogDeleteMutation()

  const categories = categoriesResponse?.payload?.data || []
  const categoryDetail = categoryDetailResponse?.payload?.data

  const handleOpenCreateModal = () => {
    setCreateDialogOpen(true)
  }

  const handleCreate = async (data: CategoryFormData) => {
    const trimmedData = {
      name: data.name.trim(),
      description: data.description.trim()
    }

    try {
      await createCategoryMutation.mutateAsync(trimmedData)
      toast({
        description: 'Thêm danh mục mới thành công'
      })
      setCreateDialogOpen(false)
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  const handleEdit = (id: string) => {
    setEditingCategoryId(id)
    setTimeout(() => setEditDialogOpen(true), 100)
  }

  const handleCloseEditDialog = (open: boolean) => {
    if (!open) {
      setEditDialogOpen(false)
      setTimeout(() => setEditingCategoryId(undefined), 300)
    }
  }

  const handleUpdate = async (data: CategoryFormData) => {
    if (!editingCategoryId || !categoryDetail) return

    const trimmedData = {
      name: data.name.trim(),
      description: data.description.trim()
    }

    const originalData = {
      name: categoryDetail.name,
      description: categoryDetail.description
    }

    const hasChanges = trimmedData.name !== originalData.name || trimmedData.description !== originalData.description

    if (!hasChanges) {
      toast({
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
        data: trimmedData
      })
      toast({
        description: 'Cập nhật danh mục thành công'
      })
      setEditDialogOpen(false)
      setTimeout(() => setEditingCategoryId(undefined), 300)
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  const handleDeleteConfirm = async ({ id }: { id: string }) => {
    if (!id) return
    try {
      if (deleteCategoryMutation.isPending) return
      await deleteCategoryMutation.mutateAsync(id)
      toast({
        description: 'Xóa danh mục thành công'
      })
      setDeleteDialogOpen(false)
      setTimeout(() => setDeleteCategoryId(undefined), 300)
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  // Column configuration for the table
  const headerColumn = [
    { id: 1, name: 'Tên danh mục' },
    { id: 2, name: 'Mô tả' },
    { id: 3, name: 'Ngày tạo' },
    { id: 4, name: 'Ngày cập nhật' },
    { id: 5, name: '' }
  ]

  const bodyColumn = [
    {
      id: 1,
      render: (category: any) => <div className='font-medium'>{category.name}</div>
    },
    {
      id: 2,
      render: (category: any) => (
        <div className='text-muted-foreground text-sm'>
          <div className='truncate max-w-[400px]' title={category.description || 'Không có mô tả'}>
            {category.description || 'Không có mô tả'}
          </div>
        </div>
      )
    },
    {
      id: 3,
      render: (category: any) => (
        <div className='min-w-[120px]'>
          <div className='text-sm'>{format(new Date(category.createdAt), 'dd/MM/yyyy', { locale: vi })}</div>
          <div className='text-xs text-muted-foreground'>
            {format(new Date(category.createdAt), 'HH:mm', { locale: vi })}
          </div>
        </div>
      )
    },
    {
      id: 4,
      render: (category: any) => (
        <div className='min-w-[120px]'>
          <div className='text-sm'>{format(new Date(category.updatedAt), 'dd/MM/yyyy', { locale: vi })}</div>
          <div className='text-xs text-muted-foreground'>
            {format(new Date(category.updatedAt), 'HH:mm', { locale: vi })}
          </div>
        </div>
      )
    },
    {
      id: 5,
      render: (category: any) => (
        <div className='flex justify-end'>
          <MoreOptions
            item={{
              id: category.id,
              title: category.name,
              status: 'VISIBLE',
              slug: category.name.toLowerCase().replace(/\s+/g, '-')
            }}
            itemType='category'
            onEdit={() => handleEdit(category.id)}
            onDelete={() => handleDeleteConfirm({ id: category.id })}
          />
        </div>
      )
    }
  ]

  const tableData: dataListType = {
    data: categories,
    message: categoriesResponse?.payload.message || '',
    pagination: categoriesResponse?.payload.pagination || {
      pageSize: 0,
      totalItem: 0,
      currentPage: 0,
      totalPage: 0,
      maxPageSize: 0
    }
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý danh mục</h1>
          <p className='text-muted-foreground mt-1'>Thêm, sửa, xóa các danh mục cho bài viết</p>
        </div>
        <Button onClick={handleOpenCreateModal}>
          <Plus className='w-4 h-4 mr-2' />
          Tạo danh mục
        </Button>
      </div>

      {/* Search */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <Input
          placeholder='Tìm kiếm danh mục...'
          className='w-full sm:w-[300px]'
          value={currentKeyword}
          onChange={(e) => updateSearchParams({ keyword: e.target.value, page_index: 1 })}
        />
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href={'/content-creator/blog/categories'}
        loading={isLoading}
      />

      <CreateCategoryDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
        isLoading={createCategoryMutation.isPending}
      />

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

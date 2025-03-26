'use client'

import { Button } from '@/components/ui/button'
import { Plus, Search, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useEffect, useRef } from 'react'
import { CreateCategoryDialog } from '@/components/private/content-creator/blog/create-category-dialog'
import { EditCategoryDialog } from '@/components/private/content-creator/blog/edit-category-dialog'
import { DeleteCategoryDialog } from '@/components/private/content-creator/blog/delete-category-dialog'
import {
  useCategoryBlogCreateMutation,
  useCategoryBlogDeleteMutation,
  useCategoryBlogDetailQuery,
  useCategoryBlogQuery,
  useCategoryBlogUpdateMutation
} from '@/queries/useBlog'
import { toast } from '@/components/ui/use-toast'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { handleErrorApi } from '@/lib/utils'

// Component Skeleton cho bảng categories cập nhật với cột mô tả
const CategoryTableSkeleton = () => (
  <div className='w-full'>
    <div className='flex items-center justify-between py-4'>
      <Skeleton className='h-10 w-64' />
      <Skeleton className='h-10 w-28' />
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className='h-5 w-32' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-5 w-40' />
          </TableHead>
          <TableHead className='text-right'>
            <Skeleton className='h-5 w-24 ml-auto' />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className='h-5 w-40' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-5 w-64' />
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex justify-end'>
                  <Skeleton className='h-9 w-9 rounded' />
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </div>
)

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | undefined>()

  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const { data: categoriesResponse, isLoading } = useCategoryBlogQuery()

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
        title: 'Thành công',
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
        data: trimmedData
      })
      toast({
        title: 'Thành công',
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

  const handleOpenDeleteDialog = (id: string) => {
    setDeleteCategoryId(id)
    setTimeout(() => setDeleteDialogOpen(true), 100)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteCategoryId) return

    try {
      await deleteCategoryMutation.mutateAsync(deleteCategoryId)
      toast({
        title: 'Thành công',
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

  return (
    <div className='container mx-auto px-4 py-6'>
      <nav className='flex items-center space-x-1 text-sm text-muted-foreground mb-6'>
        <Link href='/content-creator/blog' className='hover:text-primary transition-colors'>
          Blog
        </Link>
        <ChevronRight className='h-4 w-4' />
        <span className='font-medium text-foreground'>Danh mục</span>
      </nav>

      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý danh mục</h1>
          <p className='text-sm text-muted-foreground mt-1'>Thêm, sửa, xóa các danh mục cho bài viết</p>
        </div>
        <Button onClick={handleOpenCreateModal}>
          <Plus className='mr-2 h-4 w-4' />
          Tạo danh mục
        </Button>
      </div>

      <Card className='mb-6'>
        <CardHeader className='pb-3'>
          <CardTitle>Tìm kiếm và lọc</CardTitle>
          <CardDescription>Tìm kiếm danh mục theo tên hoặc lọc theo trạng thái</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col sm:flex-row gap-4 w-full justify-between'>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-3'>
          <CardTitle>Danh sách danh mục</CardTitle>
          <CardDescription>Quản lý tất cả danh mục trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <CategoryTableSkeleton />
          ) : categories.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[30%]'>Tên danh mục</TableHead>
                  <TableHead className='w-[60%]'>Mô tả</TableHead>
                  <TableHead className='w-[10%] text-right'>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className='font-medium'>{category.name}</TableCell>
                    <TableCell className='text-muted-foreground text-sm'>
                      <div className='truncate max-w-[400px]' title={category.description || 'Không có mô tả'}>
                        {category.description || 'Không có mô tả'}
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon'>
                            <MoreHorizontal className='h-4 w-4' />
                            <span className='sr-only'>More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem onClick={() => handleEdit(category.id)}>Chỉnh sửa</DropdownMenuItem>
                          <DropdownMenuItem
                            className='text-destructive focus:text-destructive'
                            onClick={() => handleOpenDeleteDialog(category.id)}
                          >
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className='text-center py-10'>
              <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4'>
                <Search className='h-6 w-6 text-muted-foreground' />
              </div>
              <h3 className='text-lg font-semibold mb-1'>Không tìm thấy danh mục</h3>
              <p className='text-muted-foreground'>Chưa có danh mục nào hoặc không tìm thấy kết quả phù hợp.</p>
              <Button
                variant='outline'
                className='mt-4'
                onClick={() => {
                  setSearchQuery('')
                  setStatusFilter('all')
                }}
              >
                Xóa tìm kiếm
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

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

      {deleteDialogOpen && (
        <DeleteCategoryDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          isLoading={deleteCategoryMutation.isPending}
        />
      )}
    </div>
  )
}

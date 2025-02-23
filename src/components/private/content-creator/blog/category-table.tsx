'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Pencil, Trash, Check, X } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

interface CategoryTableProps {
  data: Array<{
    id: string
    name: string
    description: string
    status?: 'active' | 'inactive'
  }>
  searchQuery: string
  statusFilter: string
}

export function CategoryTable({ data, searchQuery, statusFilter }: CategoryTableProps) {
  const filteredData = data.filter((category) => {
    if (statusFilter !== 'all' && category.status !== statusFilter) {
      return false
    }
    return true
  })

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên danh mục</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className='w-[100px]'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className='text-center h-24 text-muted-foreground'>
                Không tìm thấy danh mục nào
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Badge
                    variant={category.status === 'active' ? 'default' : 'secondary'}
                    className='flex w-fit items-center gap-1'
                  >
                    {category.status === 'active' ? (
                      <>
                        <Check className='h-3 w-3' />
                        Hoạt động
                      </>
                    ) : (
                      <>
                        <X className='h-3 w-3' />
                        Không hoạt động
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon'>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem>
                        <Pencil className='mr-2 h-4 w-4' />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem className='text-destructive'>
                        <Trash className='mr-2 h-4 w-4' />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

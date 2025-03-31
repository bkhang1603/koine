/* eslint-disable no-unused-vars */
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
  onEdit: (id: string) => void
  onDelete: (id: string) => Promise<void>
}

export function CategoryTable({ onEdit, onDelete, data }: CategoryTableProps) {
  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px]'>Tên danh mục</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead className='w-[220px]'>Trạng thái</TableHead>
            <TableHead className='w-[80px]'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className='text-center h-24 text-muted-foreground'>
                Không tìm thấy danh mục nào
              </TableCell>
            </TableRow>
          ) : (
            data.map((category) => (
              <TableRow key={category.id}>
                <TableCell className='font-medium'>{category.name}</TableCell>
                <TableCell>
                  <div className='line-clamp-2' title={category.description}>
                    {category.description}
                  </div>
                </TableCell>
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
                      <DropdownMenuItem onClick={() => onEdit(category.id)}>
                        <Pencil className='mr-2 h-4 w-4' />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem className='text-destructive' onClick={() => onDelete(category.id)}>
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

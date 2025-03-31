import PaginationTable from '@/components/pagination-table'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import type { JSX } from 'react'

type headerColumnType = {
  id: number
  name: string | JSX.Element
  className?: string
}

type bodyColumnType = {
  id: number
  className?: string
  // eslint-disable-next-line no-unused-vars
  render: (item: any) => string | JSX.Element
}

export type dataListType = {
  data: any[]
  message: string
  pagination: {
    pageSize: number
    totalItem: number
    currentPage: number
    totalPage: number
    maxPageSize: number
  }
}

export function TableCustom({
  data,
  headerColumn,
  bodyColumn,
  href,
  loading = false
}: {
  data: dataListType
  headerColumn: headerColumnType[]
  bodyColumn: bodyColumnType[]
  href: string
  loading?: boolean
}) {
  const renderSkeleton = () => {
    return (
      <>
        {/* Tạo 5 dòng skeleton */}
        {[1, 2, 3, 4, 5].map((index) => (
          <TableRow key={index}>
            {headerColumn.map((col) => (
              <TableCell key={col.id} className={col.className}>
                {/* Tùy chỉnh skeleton cho từng cột dựa vào id */}
                {col.id === 1 && <Skeleton className='w-24 h-6' />}
                {col.id === 2 && (
                  <div className='space-y-1'>
                    <Skeleton className='w-20 h-4' />
                    <Skeleton className='w-16 h-3' />
                  </div>
                )}
                {col.id === 3 && (
                  <div className='space-y-1'>
                    <Skeleton className='w-32 h-4' />
                    <Skeleton className='w-24 h-3' />
                  </div>
                )}
                {col.id === 4 && (
                  <div className='flex items-center gap-2'>
                    <Skeleton className='w-4 h-4 rounded-full' />
                    <Skeleton className='w-8 h-4' />
                  </div>
                )}
                {col.id === 5 && (
                  <div className='flex items-center gap-2'>
                    <Skeleton className='w-4 h-4 rounded-full' />
                    <Skeleton className='w-8 h-4' />
                  </div>
                )}
                {col.id === 6 && (
                  <div className='space-y-1'>
                    <Skeleton className='w-24 h-4' />
                    <Skeleton className='w-20 h-3' />
                  </div>
                )}
                {col.id === 7 && (
                  <div className='flex items-center gap-2'>
                    <Skeleton className='w-4 h-4 rounded-full' />
                    <Skeleton className='w-32 h-4' />
                  </div>
                )}
                {col.id === 8 && <Skeleton className='w-20 h-6 rounded-full' />}
                {col.id === 9 && <Skeleton className='w-8 h-8 rounded-full' />}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    )
  }

  return (
    <Card>
      <CardContent className='p-6'>
        <Table>
          <TableHeader>
            <TableRow>
              {headerColumn.map((col) => (
                <TableHead key={col.id} className={col.className ?? ''}>
                  {col.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? renderSkeleton()
              : data.data.map((item, index) => (
                  <TableRow key={index}>
                    {bodyColumn.map((col) => (
                      <TableCell key={col.id} className={col.className ?? ''}>
                        {col.render(item)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className='flex justify-between items-center w-full'>
          <div className='text-xs text-muted-foreground'>
            {loading ? (
              <Skeleton className='w-32 h-4' />
            ) : (
              <p>
                Hiện <strong>{data.data.length}</strong> trên <strong>{data.pagination.totalItem}</strong> kết quả
              </p>
            )}
          </div>

          <div>
            {loading ? (
              <div className='flex items-center gap-1'>
                <Skeleton className='w-8 h-8 rounded-md' />
                <Skeleton className='w-8 h-8 rounded-md' />
                <Skeleton className='w-8 h-8 rounded-md' />
              </div>
            ) : (
              <PaginationTable href={href} totalPage={data.pagination.totalPage} />
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

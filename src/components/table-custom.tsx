import PaginationTable from '@/components/pagination-table'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Search, Inbox } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { JSX, ReactNode } from 'react'

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

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

// Table Search component
function TableSearch({
  searchParamName = 'keyword',
  placeholder = 'Tìm kiếm...'
}: {
  searchParamName?: string
  placeholder?: string
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [searchValue, setSearchValue] = useState(searchParams.get(searchParamName)?.toString() || '')

  const debouncedSearchValue = useDebounce(searchValue, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (debouncedSearchValue) {
      params.set(searchParamName, debouncedSearchValue)
    } else {
      params.delete(searchParamName)
    }

    replace(`${pathname}?${params.toString()}`)
  }, [debouncedSearchValue, pathname, replace, searchParams, searchParamName])

  return (
    <div className='relative w-full max-w-[400px]'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <Search className='h-4 w-4 text-muted-foreground' />
      </div>
      <Input
        type='search'
        placeholder={placeholder}
        className='pl-10 rounded-lg'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        name={searchParamName}
      />
    </div>
  )
}

export function TableCustom({
  data,
  headerColumn,
  bodyColumn,
  href,
  loading = false,
  filterComponent,
  description,
  showSearch = false,
  searchParamName = 'keyword',
  searchPlaceholder = 'Tìm kiếm...'
}: {
  data: dataListType
  headerColumn: headerColumnType[]
  bodyColumn: bodyColumnType[]
  href: string
  loading?: boolean
  filterComponent?: ReactNode
  description?: string
  showSearch?: boolean
  searchParamName?: string
  searchPlaceholder?: string
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

  const hasHeaderContent = filterComponent || description || showSearch

  return (
    <Card>
      {hasHeaderContent && (
        <CardHeader className='px-6 space-y-4'>
          <div className='flex flex-col md:flex-row justify-between items-start gap-4'>
            {showSearch && <TableSearch searchParamName={searchParamName} placeholder={searchPlaceholder} />}
            {filterComponent && <div>{filterComponent}</div>}
          </div>
          {description && <p className='text-sm text-muted-foreground'>{description}</p>}
        </CardHeader>
      )}
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
            {loading ? (
              renderSkeleton()
            ) : data.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={headerColumn.length} className='h-32'>
                  <div className='flex flex-col items-center justify-center gap-2 text-muted-foreground'>
                    <Inbox className='h-8 w-8' />
                    <p className='text-sm font-medium'>Không có dữ liệu</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((item, index) => (
                <TableRow key={index}>
                  {bodyColumn.map((col) => (
                    <TableCell key={col.id} className={col.className ?? ''}>
                      {col.render(item)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
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

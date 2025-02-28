import PaginationTable from '@/components/pagination-table'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { JSX } from 'react'

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
            {loading ? (
              <TableRow>
                <TableCell colSpan={headerColumn.length}>
                  <Skeleton className='w-full h-24' />
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
              <Skeleton className='w-20 h-6' />
            ) : (
              <p>
                Hiện <strong>{data.data.length}</strong> trên <strong>{data.pagination.totalItem}</strong> kết quả
              </p>
            )}
          </div>

          <div>{loading ? null : <PaginationTable href={href} totalPage={data.pagination.totalPage} />}</div>
        </div>
      </CardFooter>
    </Card>
  )
}

import PaginationTable from '@/components/pagination-table'
import SearchTable from '@/components/search-table'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

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
  title,
  loading,
  button,
  href,
  searchShow = true
}: {
  data: dataListType
  headerColumn: headerColumnType[]
  bodyColumn: bodyColumnType[]
  title: string
  loading?: boolean
  button?: JSX.Element
  href: string
  searchShow?: boolean
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl mb-4'>{title}</CardTitle>
        {(searchShow || button) && (
          <div className='flex justify-between items-center'>
            <SearchTable />
            {button}
          </div>
        )}
      </CardHeader>
      <CardContent>
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
              Array.from({ length: data.pagination.pageSize }, (_, i) => i).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={headerColumn.length} className='text-center'>
                    <Skeleton className='w-full h-[40px]' />
                  </TableCell>
                </TableRow>
              ))
            ) : data.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={headerColumn.length} className='text-center'>
                  <p className='h-[40px] flex items-center justify-center text-gray-500 text-base'>Không có dữ liệu</p>
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
                {/* {title.toLowerCase()} */}
              </p>
            )}
          </div>

          <div>{loading ? null : <PaginationTable href={href} totalPage={data.pagination.totalPage} />}</div>
        </div>
      </CardFooter>
    </Card>
  )
}

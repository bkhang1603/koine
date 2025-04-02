'use client'

import { useSearchParams } from 'next/navigation'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

function PaginationCustom({ totalPage, href, className }: { totalPage: number; href: string; className?: string }) {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page_index')) || 1
  // Thêm tất cả params vào sau href nhưng phải trừ đi page_index
  const params = searchParams.toString().replace('page_index=' + currentPage, '')

  return (
    <Pagination className={cn('', className)}>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem className='hidden sm:block'>
            {/* <PaginationPrevious href={href + '?page_index=' + (currentPage - 1) + (search && `&search=${search}`)} /> */}
            <PaginationPrevious href={href + '?page_index=' + (currentPage - 1) + params} />
          </PaginationItem>
        )}
        {totalPage > 1 &&
          Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => {
            if (page === currentPage) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink href={href + '?page_index=' + page + params} isActive>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            }

            if (page === 1 || page === totalPage || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink href={href + '?page_index=' + page + params}>{page}</PaginationLink>
                </PaginationItem>
              )
            }
            // If the page have more than 1 PaginationEllipsis, it will appear only once
            if (page === currentPage - 2 || page === currentPage + 2) {
              return <PaginationEllipsis key={page} />
            }
          })}
        {currentPage < totalPage && (
          <PaginationItem className='hidden sm:block'>
            <PaginationNext href={href + '?page_index=' + (currentPage + 1) + params} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationCustom

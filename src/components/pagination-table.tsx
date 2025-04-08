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

function PaginationTable({ totalPage, href }: { totalPage: number; href: string }) {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page_index')) || 1
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') || ''

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={
                href +
                '?page_index=' +
                (currentPage - 1) +
                (search && `&search=${search}`) +
                (status && `&status=${status}`)
              }
            />
          </PaginationItem>
        )}
        {totalPage > 1 &&
          Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => {
            if (page === currentPage) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={
                      href + '?page_index=' + page + (search && `&search=${search}`) + (status && `&status=${status}`)
                    }
                    isActive
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            }

            if (page === 1 || page === totalPage || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={
                      href + '?page_index=' + page + (search && `&search=${search}`) + (status && `&status=${status}`)
                    }
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            }
            // If the page have more than 1 PaginationEllipsis, it will appear only once
            if (page === currentPage - 2 || page === currentPage + 2) {
              return <PaginationEllipsis key={page} />
            }
          })}
        {currentPage < totalPage && (
          <PaginationItem>
            <PaginationNext
              href={
                href +
                '?page_index=' +
                (currentPage + 1) +
                (search && `&search=${search}`) +
                (status && `&status=${status}`)
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationTable

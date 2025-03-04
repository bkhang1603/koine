'use client'

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface PaginationProps {
  currentPage: number
  totalPages: number
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault() // Ngăn hành vi mặc định
    onPageChange(page)
  }

  const renderPageNumbers = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    // Calculate range around current page
    let start = Math.max(2, currentPage - 1)
    let end = Math.min(totalPages - 1, currentPage + 1)

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push('ellipsis1')
    }

    // Add pages around current page
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push('ellipsis2')
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <PaginationRoot className={className}>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem className='hidden sm:block'>
            <PaginationPrevious onClick={(e) => handlePageClick(e, currentPage - 1)} />
          </PaginationItem>
        )}

        {renderPageNumbers().map((page, index) => {
          if (page === 'ellipsis1' || page === 'ellipsis2') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink onClick={(e) => handlePageClick(e, Number(page))} isActive={currentPage === page}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {currentPage < totalPages && (
          <PaginationItem className='hidden sm:block'>
            <PaginationNext onClick={(e) => handlePageClick(e, currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationRoot>
  )
}

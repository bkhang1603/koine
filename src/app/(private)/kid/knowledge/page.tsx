'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useBlogQuery } from '@/queries/useBlog'
import { Book, Search, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'

const categories = [
  { name: 'Tất cả', icon: '✨', color: 'slate' },
  { name: 'Bé trai', icon: '👦', color: 'blue' },
  { name: 'Bé gái', icon: '👧', color: 'pink' },
  { name: 'Thanh thiếu niên', icon: '🎓', color: 'purple' },
  { name: 'Phụ huynh', icon: '👨‍👩‍👧‍👦', color: 'emerald' }
]

const BlogCardSkeleton = () => (
  <Card className='h-full border-none bg-white'>
    <Skeleton className='h-48 rounded-t-lg' />
    <div className='p-6'>
      <div className='flex gap-2 mb-3'>
        <Skeleton className='h-6 w-20 rounded-lg' />
        <Skeleton className='h-6 w-20 rounded-lg' />
      </div>
      <Skeleton className='h-7 w-3/4 mb-2' />
      <Skeleton className='h-7 w-1/2 mb-4' />
      <Skeleton className='h-4 w-full mb-2' />
      <Skeleton className='h-4 w-2/3 mb-4' />
      <div className='flex items-center gap-3'>
        <Skeleton className='h-8 w-8 rounded-full' />
        <div className='flex-1'>
          <Skeleton className='h-4 w-24 mb-1' />
          <Skeleton className='h-3 w-16' />
        </div>
      </div>
    </div>
  </Card>
)

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number
  totalPages: number
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void
}) => {
  const renderPageNumbers = () => {
    const pages = []
    const maxVisible = 5 // Số trang hiển thị tối đa
    const halfVisible = Math.floor(maxVisible / 2)

    let startPage = Math.max(1, currentPage - halfVisible)
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    // Nút trang đầu
    if (startPage > 1) {
      pages.push(
        <Button key={1} variant='outline' className='h-9 w-9 rounded-lg' onClick={() => onPageChange(1)}>
          1
        </Button>
      )
      if (startPage > 2) pages.push(<span key='start-dots'>...</span>)
    }

    // Các trang giữa
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? 'default' : 'outline'}
          className={`h-9 w-9 rounded-lg ${currentPage === i ? 'bg-blue-100 text-blue-700 border-blue-200' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>
      )
    }

    // Nút trang cuối
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(<span key='end-dots'>...</span>)
      pages.push(
        <Button
          key={totalPages}
          variant='outline'
          className='h-9 w-9 rounded-lg'
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>
      )
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className='flex items-center justify-center gap-2 mt-12'>
      <Button
        variant='outline'
        size='icon'
        className='h-9 w-9 rounded-lg'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>
      {renderPageNumbers()}
      <Button
        variant='outline'
        size='icon'
        className='h-9 w-9 rounded-lg'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  )
}

function KnowledgePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const { data, isLoading } = useBlogQuery({
    page_index: currentPage,
    page_size: itemsPerPage,
    search: debouncedSearch
  })

  const blogs = useMemo(() => data?.payload?.data || [], [data?.payload?.data])
  const totalPages = data?.payload.pagination.totalPage || 0

  // Chỉ giữ lại debounce search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Chuyển logic filter thành computed value với useMemo
  const filteredBlogs = useMemo(() => {
    let filtered = [...blogs]

    if (selectedCategory !== 'Tất cả') {
      filtered = filtered.filter((blog) =>
        blog.categories?.some((cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase())
      )
    }

    return filtered
  }, [blogs, selectedCategory])

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Pastel Banner */}
      <div className='relative overflow-hidden rounded-3xl mb-12'>
        <div className='absolute inset-0 bg-gradient-to-r from-rose-100 via-sky-100 to-violet-100'></div>

        {/* Soft Decorative Elements */}
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-0 w-full h-full bg-white/40'></div>
          <div className='absolute -top-20 -left-20 w-72 h-72 bg-pink-200/50 rounded-full mix-blend-multiply filter blur-3xl'></div>
          <div className='absolute -bottom-20 -right-20 w-72 h-72 bg-blue-200/50 rounded-full mix-blend-multiply filter blur-3xl'></div>
        </div>

        <div className='relative px-8 py-20'>
          <div className='max-w-4xl mx-auto text-center'>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className='inline-flex items-center bg-white/70 rounded-full px-4 py-2 mb-6 backdrop-blur-sm shadow-sm'
            >
              <Sparkles className='w-5 h-5 text-amber-400 mr-2' />
              <span className='text-slate-700 font-medium'>Khám phá thế giới tri thức</span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='text-4xl md:text-5xl font-bold text-slate-800 mb-6'
            >
              Học Hỏi và Khám Phá
              <br />
              <span className='text-blue-600'>Điều Thú Vị Mỗi Ngày</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='text-lg text-slate-600 max-w-2xl mx-auto'
            >
              Cùng bắt đầu hành trình khám phá kiến thức mới với những bài viết hấp dẫn
            </motion.p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className='mb-12'>
        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-4'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5' />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder='Tìm kiếm bài viết...'
                  className='pl-10 h-12 bg-slate-50 border-slate-200'
                />
              </div>
            </div>
            <div className='flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide'>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant='outline'
                  className={`
                    min-w-[120px] h-12 rounded-xl border-2 transition-colors
                    ${
                      category.name === selectedCategory
                        ? `bg-${category.color}-50 border-${category.color}-200 text-${category.color}-700`
                        : 'border-transparent hover:border-slate-200'
                    }
                  `}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <span className='text-xl mr-2'>{category.icon}</span>
                  <span className='font-medium'>{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        {isLoading ? (
          Array(6)
            .fill(0)
            .map((_, index) => <BlogCardSkeleton key={index} />)
        ) : filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link href={`/kid/knowledge/${blog.slug}`} key={blog.id}>
              <Card className='group h-full hover:shadow-lg transition-all border-none bg-white'>
                <div className='relative h-48'>
                  <Image src={blog.imageUrl} alt={blog.title} fill className='object-cover rounded-t-lg' />
                </div>
                <div className='p-6'>
                  <div className='flex gap-2 mb-3'>
                    {blog.categories?.map((category: any) => (
                      <span
                        key={category.id}
                        className='px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium'
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                  <h3 className='text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2'>
                    {blog.title}
                  </h3>
                  <p className='text-slate-600 mb-4 line-clamp-2'>{blog.description}</p>

                  <div className='flex items-center gap-3'>
                    <Image
                      src={blog.creatorInfo.avatarUrl}
                      alt={blog.creatorInfo.firstName}
                      width={32}
                      height={32}
                      className='rounded-full'
                    />
                    <div>
                      <div className='font-medium text-slate-800'>{blog.creatorInfo.firstName}</div>
                      <div className='text-sm text-slate-500'>
                        {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <div className='col-span-full text-center py-12'>
            <Book className='w-12 h-12 text-slate-300 mx-auto mb-4' />
            <h3 className='text-xl font-bold text-slate-800 mb-2'>Không tìm thấy bài viết</h3>
            <p className='text-slate-600'>Thử tìm kiếm với từ khóa khác hoặc chọn chủ đề khác</p>
          </div>
        )}
      </div>

      {/* Replace old pagination with new component */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default KnowledgePage

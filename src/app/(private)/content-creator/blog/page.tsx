'use client'

import { Button } from '@/components/ui/button'
import { Plus, Settings } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BlogCard } from '@/components/private/content-creator/blog/blog-card'
import { BlogFilters } from '@/components/private/content-creator/blog/blog-filters'
import { blogPosts } from '@/app/(private)/content-creator/_mock/data'
import { EmptyBlogs } from '@/components/private/content-creator/blog/empty-blogs'
import { DeleteBlogDialog } from '@/components/private/content-creator/blog/delete-blog-dialog'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null)
  const router = useRouter()

  const filteredBlogs = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleDelete = (blogId: string) => {
    setSelectedBlog(blogId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    console.log('Deleting blog:', selectedBlog)
    setDeleteDialogOpen(false)
    setSelectedBlog(null)
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold'>Bài viết của bạn</h1>
          <p className='text-sm text-muted-foreground mt-1'>Quản lý và tạo mới các bài viết</p>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='outline' asChild>
            <Link href='/content-creator/blog/categories'>
              <Settings className='w-4 h-4 mr-2' />
              Quản lý danh mục
            </Link>
          </Button>
          <Button asChild>
            <Link href='/content-creator/blog/new'>
              <Plus className='w-4 h-4 mr-2' />
              Viết bài mới
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className='mb-6'>
        <BlogFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          statusFilter={statusFilter}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onStatusFilterChange={setStatusFilter}
        />
      </div>

      {/* Blog List */}
      <div className='grid grid-cols-3 gap-6'>
        {filteredBlogs.map((post) => (
          <BlogCard key={post.id} post={post} onDelete={handleDelete} onNavigate={router.push} />
        ))}
      </div>

      {/* Empty State */}
      {filteredBlogs.length === 0 && <EmptyBlogs />}

      {/* Delete Dialog */}
      <DeleteBlogDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} />
    </div>
  )
}

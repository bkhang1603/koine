'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'

const allPosts = [
  {
    id: 1,
    title: 'Khám phá vũ trụ cùng các nhà du hành 🚀',
    description: 'Cùng tìm hiểu về các hành tinh trong hệ mặt trời và những điều thú vị về vũ trụ bao la',
    image: '/images/space-blog.png',
    category: 'Khoa học',
    readTime: '5 phút',
    level: 'Dễ',
    publishDate: '15/03/2024'
  },
  {
    id: 2,
    title: 'Thế giới động vật kỳ thú 🦁',
    description: 'Khám phá cuộc sống của các loài động vật hoang dã và những điều thú vị về chúng',
    image: '/images/animals-blog.png',
    category: 'Sinh học',
    readTime: '7 phút',
    level: 'Dễ',
    publishDate: '14/03/2024'
  }
  // Thêm nhiều bài viết khác...
]

const categories = [
  { name: 'Tất cả', icon: '✨' },
  { name: 'Khoa học', icon: '🔬' },
  { name: 'Sinh học', icon: '🌱' },
  { name: 'Lịch sử', icon: '📚' },
  { name: 'Nghệ thuật', icon: '🎨' },
  { name: 'Công nghệ', icon: '💻' }
]

const levels = ['Tất cả', 'Dễ', 'Trung bình', 'Khó']

function AllKnowledgePage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Thư viện kiến thức 📚</h1>
        <p className='text-gray-600'>Khám phá tất cả bài viết thú vị dành cho bạn</p>
      </div>

      {/* Search and Filters */}
      <div className='bg-white rounded-2xl p-6 shadow-sm mb-8'>
        <div className='flex flex-col md:flex-row gap-4 mb-6'>
          <div className='flex-1'>
            <Input placeholder='🔍 Tìm kiếm bài viết...' className='rounded-full bg-gray-50' />
          </div>
          <div className='flex gap-4'>
            <select className='rounded-full px-4 py-2 bg-gray-50 border border-gray-200'>
              <option value=''>📅 Sắp xếp theo</option>
              <option value='newest'>Mới nhất</option>
              <option value='oldest'>Cũ nhất</option>
            </select>
            <select className='rounded-full px-4 py-2 bg-gray-50 border border-gray-200'>
              <option value=''>⭐ Cấp độ</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className='flex gap-3 overflow-x-auto pb-2'>
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={category.name === 'Tất cả' ? 'default' : 'outline'}
              className='rounded-full whitespace-nowrap'
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        {allPosts.map((post) => (
          <Link href={`/kid/knowledge/${post.id}`} key={post.id}>
            <Card className='h-full hover:shadow-lg transition-shadow overflow-hidden'>
              <div className='relative h-48'>
                <Image src={post.image} alt={post.title} fill className='object-cover' />
                <div className='absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium'>
                  {post.readTime}
                </div>
              </div>
              <div className='p-6'>
                <div className='flex items-center gap-2 mb-3'>
                  <span className='bg-primary/10 text-primary text-sm px-3 py-1 rounded-full'>{post.category}</span>
                  <span className='bg-secondary/10 text-secondary text-sm px-3 py-1 rounded-full'>{post.level}</span>
                </div>
                <h3 className='text-xl font-bold mb-2'>{post.title}</h3>
                <p className='text-gray-600 mb-4 line-clamp-2'>{post.description}</p>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-500'>{post.publishDate}</span>
                  <Button variant='ghost' className='rounded-full'>
                    Đọc thêm →
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center gap-2'>
        <Button variant='outline' className='rounded-full' disabled>
          ← Trước
        </Button>
        <Button variant='outline' className='rounded-full bg-primary/10'>
          1
        </Button>
        <Button variant='outline' className='rounded-full'>
          2
        </Button>
        <Button variant='outline' className='rounded-full'>
          3
        </Button>
        <Button variant='outline' className='rounded-full'>
          Sau →
        </Button>
      </div>

      {/* Quick Categories */}
      <div className='mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {categories.map((category) => (
          <Card key={category.name} className='p-4 text-center hover:shadow-md transition-shadow cursor-pointer'>
            <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3'>
              <span className='text-2xl'>{category.icon}</span>
            </div>
            <p className='font-medium'>{category.name}</p>
            <p className='text-sm text-gray-500'>12 bài viết</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AllKnowledgePage

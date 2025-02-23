'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

const featuredPosts = [
  {
    id: 1,
    title: 'Khám phá vũ trụ cùng các nhà du hành 🚀',
    description: 'Cùng tìm hiểu về các hành tinh trong hệ mặt trời và những điều thú vị về vũ trụ bao la',
    image: '/images/space-blog.png',
    category: 'Khoa học',
    readTime: '5 phút',
    level: 'Dễ'
  },
  {
    id: 2,
    title: 'Thế giới động vật kỳ thú 🦁',
    description: 'Khám phá cuộc sống của các loài động vật hoang dã và những điều thú vị về chúng',
    image: '/images/animals-blog.png',
    category: 'Sinh học',
    readTime: '7 phút',
    level: 'Dễ'
  }
]

const blogCategories = [
  { name: 'Tất cả', icon: '✨' },
  { name: 'Khoa học', icon: '🔬' },
  { name: 'Sinh học', icon: '🌱' },
  { name: 'Lịch sử', icon: '📚' },
  { name: 'Nghệ thuật', icon: '🎨' },
  { name: 'Công nghệ', icon: '💻' }
]

const recentPosts = [
  {
    id: 3,
    title: 'Bí mật của các kim tự tháp',
    description: 'Khám phá những điều bí ẩn về các kim tự tháp cổ đại của Ai Cập',
    image: '/images/pyramid-blog.png',
    category: 'Lịch sử',
    readTime: '6 phút',
    level: 'Dễ'
  },
  {
    id: 4,
    title: 'Robot và Trí tuệ nhân tạo',
    description: 'Tìm hiểu về thế giới robot và cách chúng giúp đỡ con người',
    image: '/images/robot-blog.png',
    category: 'Công nghệ',
    readTime: '8 phút',
    level: 'Dễ'
  },
  {
    id: 5,
    title: 'Nghệ thuật vẽ tranh số',
    description: 'Học cách vẽ tranh trên máy tính với các công cụ đơn giản',
    image: '/images/digital-art-blog.png',
    category: 'Nghệ thuật',
    readTime: '5 phút',
    level: 'Dễ'
  }
]

function KnowledgePage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Header Section */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-4'>Khám phá kiến thức 🎯</h1>
        <p className='text-lg text-gray-600'>Cùng đọc và học những điều thú vị mới mỗi ngày!</p>
      </div>

      {/* Categories */}
      <div className='flex gap-4 mb-12 overflow-x-auto pb-4'>
        {blogCategories.map((category) => (
          <Button
            key={category.name}
            variant={category.name === 'Tất cả' ? 'default' : 'outline'}
            className='rounded-full whitespace-nowrap'
          >
            {category.icon} {category.name}
          </Button>
        ))}
      </div>

      {/* Featured Posts */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-6'>Bài viết nổi bật ⭐️</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {featuredPosts.map((post) => (
            <Link href={`/kid/knowledge/${post.id}`} key={post.id}>
              <Card className='h-full hover:shadow-lg transition-shadow overflow-hidden'>
                <div className='relative h-64'>
                  <Image src={post.image} alt={post.title} fill className='object-cover' />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                  <div className='absolute bottom-4 left-4 right-4 text-white'>
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='bg-white/20 px-3 py-1 rounded-full text-sm'>{post.category}</span>
                      <span className='bg-white/20 px-3 py-1 rounded-full text-sm'>{post.readTime}</span>
                    </div>
                    <h3 className='text-xl font-bold mb-2'>{post.title}</h3>
                    <p className='text-sm opacity-90'>{post.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className='mb-12'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold'>Bài viết mới 📚</h2>
          <Button variant='ghost' className='rounded-full'>
            Xem tất cả ➜
          </Button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {recentPosts.map((post) => (
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
                  </div>
                  <h3 className='text-xl font-bold mb-2'>{post.title}</h3>
                  <p className='text-gray-600 mb-4'>{post.description}</p>
                  <Button variant='outline' className='w-full rounded-full'>
                    Đọc ngay 📖
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Topics Section */}
      <section className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='p-6 bg-gradient-to-r from-primary/10 to-secondary/10'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
              <span className='text-2xl'>🔬</span>
            </div>
            <div>
              <h3 className='font-bold mb-1'>Khoa học</h3>
              <p className='text-sm text-gray-600'>12 bài viết</p>
            </div>
          </div>
        </Card>
        <Card className='p-6 bg-gradient-to-r from-green-100 to-blue-100'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
              <span className='text-2xl'>🌍</span>
            </div>
            <div>
              <h3 className='font-bold mb-1'>Địa lý</h3>
              <p className='text-sm text-gray-600'>8 bài viết</p>
            </div>
          </div>
        </Card>
        <Card className='p-6 bg-gradient-to-r from-yellow-100 to-red-100'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
              <span className='text-2xl'>🎨</span>
            </div>
            <div>
              <h3 className='font-bold mb-1'>Nghệ thuật</h3>
              <p className='text-sm text-gray-600'>15 bài viết</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}

export default KnowledgePage

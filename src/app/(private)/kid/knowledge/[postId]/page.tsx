'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

// Add these types at the top of the file
type ContentBlock = {
  type: 'paragraph' | 'image' | 'subtitle' | 'funFact'
  content?: string
  url?: string
  caption?: string
  title?: string
}

const postDetail = {
  id: 1,
  title: 'Khám phá vũ trụ cùng các nhà du hành 🚀',
  description: 'Cùng tìm hiểu về các hành tinh trong hệ mặt trời và những điều thú vị về vũ trụ bao la',
  content: [
    {
      type: 'paragraph',
      content:
        'Bạn có bao giờ nhìn lên bầu trời đêm và tự hỏi về những ngôi sao lấp lánh không? Hôm nay, chúng ta sẽ cùng nhau khám phá những điều thú vị về vũ trụ bao la!'
    },
    {
      type: 'image',
      url: '/images/space-detail-1.png',
      caption: 'Các hành tinh trong hệ mặt trời của chúng ta'
    },
    {
      type: 'subtitle',
      content: 'Hành tinh trong hệ mặt trời 🌍'
    },
    {
      type: 'paragraph',
      content:
        'Trong hệ mặt trời của chúng ta có 8 hành tinh chính: Sao Thủy, Sao Kim, Trái Đất, Sao Hỏa, Sao Mộc, Sao Thổ, Sao Thiên Vương và Sao Hải Vương.'
    },
    {
      type: 'funFact',
      title: 'Bạn có biết?',
      content: 'Sao Mộc là hành tinh lớn nhất trong hệ mặt trời, to gấp 1.300 lần Trái Đất!'
    },
    {
      type: 'image',
      url: '/images/space-detail-2.png',
      caption: 'Các phi hành gia trong không gian'
    },
    {
      type: 'subtitle',
      content: 'Cuộc sống của các phi hành gia 👨‍🚀'
    },
    {
      type: 'paragraph',
      content:
        'Các phi hành gia sống và làm việc trong trạm vũ trụ quốc tế ISS. Họ thực hiện nhiều thí nghiệm khoa học và quan sát Trái Đất từ không gian.'
    }
  ],
  image: '/images/space-blog.png',
  category: 'Khoa học',
  readTime: '5 phút',
  level: 'Dễ',
  author: 'Giáo viên An',
  publishDate: '15/03/2024',
  relatedPosts: [
    {
      id: 2,
      title: 'Khám phá sao Hỏa 🔴',
      image: '/images/mars-blog.png',
      category: 'Khoa học',
      readTime: '4 phút'
    },
    {
      id: 3,
      title: 'Bí mật của các ngôi sao ⭐',
      image: '/images/stars-blog.png',
      category: 'Khoa học',
      readTime: '6 phút'
    }
  ]
}

function KnowledgeDetailPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Header Image */}
      <div className='relative h-[400px] rounded-3xl overflow-hidden mb-8'>
        <Image src={postDetail.image} alt={postDetail.title} fill className='object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
        <div className='absolute bottom-8 left-8 right-8 text-white'>
          <div className='flex items-center gap-3 mb-4'>
            <span className='bg-primary/20 px-4 py-1.5 rounded-full text-sm backdrop-blur-sm'>
              {postDetail.category}
            </span>
            <span className='bg-white/20 px-4 py-1.5 rounded-full text-sm backdrop-blur-sm'>{postDetail.readTime}</span>
          </div>
          <h1 className='text-4xl font-bold mb-4'>{postDetail.title}</h1>
          <p className='text-lg opacity-90 mb-4'>{postDetail.description}</p>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm'>
                👩‍🏫
              </div>
              <span>{postDetail.author}</span>
            </div>
            <span>•</span>
            <span>{postDetail.publishDate}</span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {postDetail.content.map((block, index) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p key={index} className='text-lg text-gray-700 leading-relaxed'>
                    {block.content}
                  </p>
                )
              case 'subtitle':
                return (
                  <h2 key={index} className='text-2xl font-bold mt-8 mb-4'>
                    {block.content}
                  </h2>
                )
              case 'image':
                return (
                  <div key={index} className='my-8'>
                    <div className='relative h-[300px] rounded-xl overflow-hidden'>
                      <Image src={block.url || ''} alt={block.caption || ''} fill className='object-cover' />
                    </div>
                    <p className='text-center text-sm text-gray-500 mt-2'>{block.caption}</p>
                  </div>
                )
              case 'funFact':
                return (
                  <Card key={index} className='p-6 bg-primary/5 border-none'>
                    <div className='flex items-start gap-4'>
                      <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0'>
                        <span className='text-2xl'>💡</span>
                      </div>
                      <div>
                        <h3 className='font-bold text-lg mb-2'>{block.title}</h3>
                        <p className='text-gray-700'>{block.content}</p>
                      </div>
                    </div>
                  </Card>
                )
              default:
                return null
            }
          })}

          {/* Interactive Elements */}
          <div className='flex items-center gap-4 my-8'>
            <Button className='rounded-full'>
              <span className='mr-2'>👍</span> Thích bài viết
            </Button>
            <Button variant='outline' className='rounded-full'>
              <span className='mr-2'>🎯</span> Làm bài tập
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className='space-y-8'>
          {/* Quick Navigation */}
          <Card className='p-6'>
            <h3 className='font-bold text-lg mb-4'>Trong bài này có gì? 📑</h3>
            <ul className='space-y-3'>
              <li>
                <Button variant='ghost' className='w-full justify-start rounded-full'>
                  🌍 Hành tinh trong hệ mặt trời
                </Button>
              </li>
              <li>
                <Button variant='ghost' className='w-full justify-start rounded-full'>
                  👨‍🚀 Cuộc sống của các phi hành gia
                </Button>
              </li>
            </ul>
          </Card>

          {/* Related Posts */}
          <div>
            <h3 className='font-bold text-lg mb-4'>Bài viết liên quan 📚</h3>
            <div className='space-y-4'>
              {postDetail.relatedPosts.map((post) => (
                <Link href={`/kid/knowledge/${post.id}`} key={post.id}>
                  <Card className='p-4 hover:shadow-md transition-shadow'>
                    <div className='flex gap-4'>
                      <div className='relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0'>
                        <Image src={post.image} alt={post.title} fill className='object-cover' />
                      </div>
                      <div>
                        <h4 className='font-bold mb-1'>{post.title}</h4>
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Learning Resources */}
          <Card className='p-6 bg-gradient-to-r from-primary/10 to-secondary/10'>
            <h3 className='font-bold text-lg mb-4'>Tài liệu học tập 🎯</h3>
            <div className='space-y-4'>
              <Button variant='outline' className='w-full rounded-full'>
                <span className='mr-2'>📥</span> Tải tranh tô màu
              </Button>
              <Button variant='outline' className='w-full rounded-full'>
                <span className='mr-2'>🎮</span> Chơi game học tập
              </Button>
              <Button variant='outline' className='w-full rounded-full'>
                <span className='mr-2'>📝</span> Làm bài tập
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default KnowledgeDetailPage

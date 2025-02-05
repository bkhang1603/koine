'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PlusCircle, Edit, Trash, Eye, MoreHorizontal, Search, Calendar } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function BlogManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for Learning a New Language',
      content: 'Learning a new language can be challenging, but with these tips...',
      image: '/images/language-learning.jpg',
      status: 'Published',
      date: '2023-06-15',
      category: 'Language Learning',
      author: 'John Doe'
    },
    {
      id: 2,
      title: 'The Benefits of Bilingualism',
      content: 'Being bilingual has numerous cognitive and social benefits...',
      image: '/images/bilingualism.jpg',
      status: 'Draft',
      date: '2023-06-10',
      category: 'Language Science',
      author: 'Jane Smith'
    },
    {
      id: 3,
      title: 'Common Mistakes in English Grammar',
      content: 'Even native speakers make these common grammar mistakes...',
      image: '/images/english-grammar.jpg',
      status: 'Published',
      date: '2023-06-05',
      category: 'Grammar',
      author: 'Emily Brown'
    },
    {
      id: 4,
      title: 'How to Improve Your Listening Skills',
      content: "Effective listening is crucial for language learning. Here's how to improve...",
      image: '/images/listening-skills.jpg',
      status: 'Draft',
      date: '2023-06-01',
      category: 'Language Skills',
      author: 'Michael Wilson'
    },
    {
      id: 5,
      title: 'The Best Language Learning Apps',
      content: 'These language learning apps are perfect for beginners and advanced learners...',
      image: '/images/language-learning-apps.jpg',
      status: 'Published',
      date: '2023-05-25',
      category: 'Language Learning',
      author: 'Sarah Johnson'
    }
  ]

  const filteredPosts = blogPosts.filter(
    (post) =>
      (filterCategory === 'all' || post.category === filterCategory) &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Blog Management</h1>
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex space-x-4 items-center'>
          <div className='relative'>
            <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Search posts...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-8 w-[350px]'
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button asChild>
          <Link href='/content-creator/blog/add'>
            <PlusCircle className='mr-2 h-4 w-4' />
            New Blog Post
          </Link>
        </Button>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {filteredPosts.map((post) => (
          <Card key={post.id} className='flex flex-col'>
            <Image
              src={`https://picsum.photos/seed/${post.id}/400/200`}
              width={400}
              height={400}
              alt={post.title}
              className='w-full h-48 object-cover'
            />
            <CardContent className='flex-grow p-4'>
              <div className='flex justify-between items-start mb-2'>
                <Badge variant='outline' className='mb-2'>
                  {post.category}
                </Badge>
                <Badge variant={post.status === 'Published' ? 'default' : 'secondary'}>{post.status}</Badge>
              </div>
              <h3 className='text-lg font-semibold mb-2'>{post.title}</h3>
              <p className='text-sm text-muted-foreground mb-4 line-clamp-2'>{post.content.substring(0, 100)}</p>
              <div className='flex items-center text-sm text-muted-foreground'>
                <Calendar className='mr-1 h-4 w-4' />
                <span>{post.date}</span>
              </div>
            </CardContent>
            <CardFooter className='p-4 border-t flex items-center justify-between'>
              <div className='flex items-center'>
                <Avatar className='h-8 w-8 mr-2'>
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${post.author}`} alt={post.author} />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <span className='text-sm font-medium'>{post.author}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='sm' className='ml-auto focus-visible:ring-0'>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href={`/content-creator/blog/${post.id}`}>
                      <Eye className='mr-2 h-4 w-4' />
                      View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/content-creator/blog/${post.id}/edit`}>
                      <Edit className='mr-2 h-4 w-4' />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='text-red-600'>
                    <Trash className='mr-2 h-4 w-4' />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

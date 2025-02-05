'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import RichTextEditor from '@/components/rich-text-editor'

export default function EditBlogPost({ params }: { params: { id: string } }) {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted', post)
  }

  const [post, setPost] = useState(blogPosts.find((post) => post.id === parseInt(params.id, 10)))

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className='max-w-5xl mx-auto space-y-6'>
      <div className='flex justify-between items-center'>
        <Button variant='outline' asChild>
          <Link href={`/content-creator/blog/${post.id}`}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Post
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='category'>Category</Label>
              <Select value={post.category} onValueChange={(value) => setPost({ ...post, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder='Select a category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Language Learning'>Language Learning</SelectItem>
                  <SelectItem value='Grammar'>Grammar</SelectItem>
                  <SelectItem value='Vocabulary'>Vocabulary</SelectItem>
                  <SelectItem value='Culture'>Culture</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Content</Label>
              {/* <TiptapEditor content={post.content} onChange={(content) => setPost({ ...post, content })} /> */}
              <RichTextEditor content={post.content} onChange={(content: any) => setPost({ ...post, content })} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='status'>Status</Label>
              <Select
                value={post.status}
                onValueChange={(value: 'Published' | 'Draft') => setPost({ ...post, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Draft'>Draft</SelectItem>
                  <SelectItem value='Published'>Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type='submit'>Update Post</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

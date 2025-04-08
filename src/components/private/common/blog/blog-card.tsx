/* eslint-disable no-unused-vars */
import { MoreHorizontal, ThumbsUp, MessageSquare, Edit, Trash } from 'lucide-react'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Card, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

interface BlogCardProps {
  post: any
  onDelete: (id: string) => void
  onNavigate: (url: string) => void
  baseUrl: string
}

export function BlogCard({ post, onDelete, onNavigate, baseUrl }: BlogCardProps) {
  return (
    <Link href={`${baseUrl}/${post.id}`}>
      <Card className='overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-200 cursor-pointer'>
        {/* Card Image */}
        <div className='relative h-48 w-full overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10' />
          <Image
            src={post.imageUrl || '/images/placeholder-image.jpg'}
            alt={post.title}
            fill
            className='object-cover transition-transform duration-300 hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          {post.status === 'published' && (
            <Badge className='absolute top-3 left-3 z-20 bg-green-500 border-0'>Đã xuất bản</Badge>
          )}
          {post.status === 'draft' && (
            <Badge variant='outline' className='absolute top-3 left-3 z-20 bg-background'>
              Bản nháp
            </Badge>
          )}
        </div>

        <div className='flex flex-col flex-grow p-4'>
          {/* Categories */}
          <div className='flex flex-wrap gap-1.5 mb-3 min-h-[24px]'>
            {post.categories?.slice(0, 3).map((category: any) => (
              <Badge variant='secondary' key={category.id} className='font-normal text-xs'>
                {category.name}
              </Badge>
            ))}
            {post.categories?.length > 3 && (
              <Badge variant='outline' className='font-normal text-xs'>
                +{post.categories.length - 3}
              </Badge>
            )}
          </div>

          {/* Title - fixed height */}
          <h3 className='font-bold text-lg line-clamp-2 min-h-[56px] mb-2'>{post.title}</h3>

          {/* Description - fixed height */}
          <p className='text-muted-foreground text-sm line-clamp-2 min-h-[40px] mb-auto'>{post.description}</p>

          {/* Author info */}
          <div className='flex items-center mt-4 gap-2'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={post.creatorInfo?.avatarUrl} alt={post.creatorInfo?.firstName} />
              <AvatarFallback>{post.creatorInfo?.firstName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className='text-sm'>
              <p className='font-medium'>{post.creatorInfo?.firstName || 'Người dùng'}</p>
              <p className='text-xs text-muted-foreground'>{formatDate(post.createdAt)}</p>
            </div>
          </div>
        </div>

        <CardFooter className='p-4 border-t flex justify-between items-center bg-muted/10'>
          {/* Chỉ hiển thị dữ liệu thực có trong API */}
          <div className='flex items-center gap-4 text-xs text-muted-foreground'>
            <div className='flex items-center'>
              <ThumbsUp className='mr-1 h-3.5 w-3.5' />
              <span>{post.totalReact || 0}</span>
            </div>
            <div className='flex items-center'>
              <MessageSquare className='mr-1 h-3.5 w-3.5' />
              <span>{post.totalComment || 0}</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 rounded-full dropdown-trigger focus-visible:ring-0'
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className='h-4 w-4' />
                <span className='sr-only'>Mở menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  onNavigate(`${baseUrl}/${post.id}/edit`)
                }}
              >
                <Edit className='h-4 w-4 mr-2' />
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-destructive focus:text-destructive'
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(post.id)
                }}
              >
                <Trash className='h-4 w-4 mr-2' />
                Xóa bài viết
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </Link>
  )
}

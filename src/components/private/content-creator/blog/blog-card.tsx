/* eslint-disable no-unused-vars */
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MoreVertical, Eye, Edit, Trash2, ThumbsUp, MessageSquare, Clock, Tags } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

type Post = {
  id: string
  title: string
  description: string
  imageUrl: string
  creatorInfo: {
    id: string
    firstName: string
    avatarUrl: string
  }
  totalReact: number
  totalComment: number
  createdAt: string
  updatedAt: string
  categories?: {
    id: string
    name: string
  }[]
  status?: string
}

export interface BlogCardProps {
  post: Post
  onDelete: (id: string) => void
  onNavigate: (url: string) => void
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onDelete, onNavigate }) => {
  return (
    <Card className='group overflow-hidden transition-all hover:shadow-md'>
      <div className='relative aspect-video'>
        <Image src={post.imageUrl} alt={post.title} fill className='object-cover' />
        <Badge className='absolute top-4 right-4' variant={post.status === 'VISIBLE' ? 'default' : 'secondary'}>
          {post.status === 'VISIBLE' ? 'Đã xuất bản' : 'Bản nháp'}
        </Badge>
      </div>

      <CardContent className='p-6'>
        <div className='flex items-center gap-2 mb-4'>
          <Tags className='w-4 h-4 text-muted-foreground' />
          <div className='flex flex-wrap gap-1.5'>
            {post.categories?.map((cat, index) => (
              <Badge key={index} variant='outline' className='px-2 py-0.5 text-xs font-normal'>
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>

        <h3 className='font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors mb-4'>
          {post.title}
        </h3>

        <p className='text-sm text-muted-foreground line-clamp-2 mb-6'>{post.description}</p>

        <div className='flex items-center gap-3'>
          <Avatar className='h-9 w-9 border-2 border-muted'>
            <AvatarImage src={post.creatorInfo.avatarUrl} />
            <AvatarFallback>{post.creatorInfo.firstName[0]}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className='text-sm font-medium'>{post.creatorInfo.firstName}</span>
            <span className='text-xs text-muted-foreground'>
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: vi })}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className='px-6 py-4 border-t bg-muted/50'>
        <div className='flex items-center justify-between w-full text-sm text-muted-foreground'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1.5'>
              <ThumbsUp className='w-4 h-4' />
              <span>{post.totalReact}</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <MessageSquare className='w-4 h-4' />
              <span>{post.totalComment}</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <MoreVertical className='w-4 h-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
              <DropdownMenuItem onClick={() => onNavigate(`/content-creator/blog/${post.id}`)}>
                <Eye className='w-4 h-4 mr-2' />
                Xem bài viết
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate(`/content-creator/blog/${post.id}/edit`)}>
                <Edit className='w-4 h-4 mr-2' />
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(post.id)} className='text-destructive focus:text-destructive'>
                <Trash2 className='w-4 h-4 mr-2' />
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  )
}

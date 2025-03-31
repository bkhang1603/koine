import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const UseBlog = () => {
  const headerColumns = [
    {
      id: 0,
      name: 'Stt',
      className: 'hidden w-[5%] sm:table-cell'
    },
    {
      id: 1,
      name: 'Tiêu đề',
      className: 'hidden lg:table-cell w-[20%]'
    },
    {
      id: 2,
      name: 'Ảnh bìa',
      className: 'hidden lg:table-cell w-[20%]'
    },
    {
      id: 3,
      name: 'Trạng thái',
      className: 'hidden lg:table-cell w-[10%]'
    },
    {
      id: 4,
      name: 'Ngày tạo',
      className: 'w-[15%]'
    },
    {
      id: 5,
      name: 'Tương tác',
      className: 'w-[10%]'
    },
    {
      id: 5,
      name: 'Bình luận',
      className: 'w-[10%]'
    },
    {
      id: 6,
      name: <span className='sr-only'>Actions</span>,
      className: 'w-[10%]'
    }
  ]

  const bodyColumns = [
    {
      id: 0,
      render: (data: any) => <span>{data.code}</span>
    },
    {
      id: 1,
      render: (data: any) => <span>{data.name}</span>
    },
    {
      id: 2,
      render: (data: any) => (
        <Image src={data.imageBanner} width={100} height={100} quality={100} className='object-cover' alt='image' />
      )
    },
    {
      id: 3,
      render: (data: any) => <span>{data.status}</span>
    },
    {
      id: 4,
      render: (data: any) => <span>{data.createAt}</span>
    },
    {
      id: 5,
      render: (data: any) => <span>{data.interact}</span>
    },
    {
      id: 6,
      render: (data: any) => <span>{data.comment}</span>
    },
    {
      id: 7,
      render: (data: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0 focus-visible:ring-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem asChild>
              <Link href={`/content-creator/blog/${data.id}`}>
                <Eye className='mr-2 h-4 w-4' />
                <span>View</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/content-creator/blog/${data.id}/edit`}>
                <Edit className='mr-2 h-4 w-4' />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash className='mr-2 h-4 w-4' />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return {
    headerColumns,
    bodyColumns
  }
}

export default UseBlog

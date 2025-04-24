import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Search } from 'lucide-react'
import Link from 'next/link'
import configRoute from '@/config/route'

interface EmptyPurchasedCoursesProps {
  isEmpty: boolean
  searchTerm: string
  filterMode: string
}

export function EmptyPurchasedCourses({ isEmpty, searchTerm, filterMode }: EmptyPurchasedCoursesProps) {
  // Nếu đang tìm kiếm nhưng không có kết quả
  if (searchTerm) {
    return (
      <Card className='border-dashed border border-gray-200 shadow-none bg-gray-50/50'>
        <CardContent className='p-8 flex flex-col items-center justify-center text-center'>
          <div className='h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
            <Search className='h-7 w-7 text-gray-400' />
          </div>
          <h3 className='text-lg font-medium text-gray-800 mb-2'>Không tìm thấy khóa học</h3>
          <p className='text-sm text-gray-500 max-w-md mb-5'>
            Không tìm thấy khóa học nào phù hợp với từ khóa &quot;{searchTerm}&quot;.
          </p>
          <Button variant='outline' onClick={() => window.location.reload()}>
            Xóa bộ lọc
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Nếu đang lọc nhưng không có kết quả trong tab hiện tại
  if (filterMode !== 'all' && !isEmpty) {
    const filterName = filterMode === 'activated' ? 'đã kích hoạt' : 'chưa kích hoạt'

    return (
      <Card className='border-dashed border border-gray-200 shadow-none bg-gray-50/50'>
        <CardContent className='p-8 flex flex-col items-center justify-center text-center'>
          <div className='h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
            <Search className='h-7 w-7 text-gray-400' />
          </div>
          <h3 className='text-lg font-medium text-gray-800 mb-2'>Không có khóa học {filterName}</h3>
          <p className='text-sm text-gray-500 max-w-md mb-5'>Bạn chưa có khóa học nào trong danh mục {filterName}.</p>
          <Button variant='outline' onClick={() => window.location.reload()}>
            Xem tất cả khóa học
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Nếu chưa có khóa học nào
  return (
    <Card className='border-dashed border border-gray-200 shadow-none bg-gray-50/50'>
      <CardContent className='p-8 flex flex-col items-center justify-center text-center'>
        <div className='h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center mb-4'>
          <ShoppingCart className='h-7 w-7 text-blue-400' />
        </div>
        <h3 className='text-lg font-medium text-gray-800 mb-2'>Chưa có khóa học nào</h3>
        <p className='text-sm text-gray-500 max-w-md mb-5'>
          Bạn chưa mua khóa học nào. Hãy khám phá danh sách khóa học để tìm nội dung phù hợp với bạn.
        </p>
        <Button asChild variant='outline' className='shadow-sm border-gray-200 hover:border-primary/20'>
          <Link href={configRoute.course}>
            <Search className='h-3.5 w-3.5 mr-2' />
            Khám phá khóa học
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

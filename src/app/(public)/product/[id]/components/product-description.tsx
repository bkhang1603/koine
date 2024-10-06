import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star } from 'lucide-react'

function ProductDescription({ description }: { description: string }) {
  const overallRating = 4.5
  const totalReviews = 100
  const ratingCounts = { 5: 60, 4: 30, 3: 5, 2: 3, 1: 2 }
  const reviews = [
    {
      id: 1,
      name: 'Nguyễn Phương',
      rating: 5,
      comment: 'Tôi đã học được rất nhiều điều mới mẻ, những kiến thức mà trước đây tôi chưa từng biết.',
      verified: true,
      date: '2 ngày trước'
    },
    {
      id: 2,
      name: 'Minh Hằng',
      rating: 4,
      comment: 'Trải nghiệm cùng với Koine thật sự tuyệt vời. Tôi rất hài lòng với khóa học này.',
      verified: true,
      date: '4 ngày trước'
    },
    {
      id: 3,
      name: 'Mai Anh',
      rating: 3,
      comment: 'Đây là một khóa học rất tuyệt vời, tôi chưa từng thấy khóa học nào tốt như vậy trước đây.',
      verified: false,
      date: '1 ngày trước'
    },
    {
      id: 4,
      name: 'Ngọc Hằng',
      rating: 2,
      comment: 'Đây là lần đầu tiên tôi thấy có một khóa học phù hợp với bé nhỏ của tôi như vậy.',
      verified: true,
      date: '5 ngày trước'
    }
  ]

  return (
    <div className='mt-12 space-y-20'>
      <Tabs defaultValue='description'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='description'>Mô tả sản phẩm</TabsTrigger>
          <TabsTrigger value='usage'>Hướng dẫn sử dụng</TabsTrigger>
          <TabsTrigger value='details'>Chi tiết sản phẩm</TabsTrigger>
        </TabsList>
        <TabsContent value='description' className='mt-4'>
          <h3 className='text-lg font-semibold mb-2'>Mô tả sản phẩm:</h3>
          <p>{description}</p>
        </TabsContent>
        <TabsContent value='usage' className='mt-4'>
          <h3 className='text-lg font-semibold mb-2'>Hướng dẫn sử dụng:</h3>
          <ol className='list-decimal list-inside space-y-2'>
            <li>Đọc từng chương theo thứ tự để hiểu rõ các giai đoạn phát triển.</li>
            <li>Thảo luận nội dung sách cùng cha mẹ hoặc người lớn đáng tin cậy.</li>
            <li>Thực hành các bài tập và hoạt động được đề xuất trong sách.</li>
            <li>Sử dụng sách như một tài liệu tham khảo khi có thắc mắc.</li>
            <li>Chia sẻ kiến thức học được với bạn bè cùng lứa tuổi.</li>
          </ol>
        </TabsContent>
        <TabsContent value='details' className='mt-4'>
          <h3 className='text-lg font-semibold mb-2'>Chi tiết sản phẩm:</h3>
          <ul className='list-disc list-inside space-y-2'>
            <li>Tác giả: Nguyễn Văn A</li>
            <li>Nhà xuất bản: NXB Trẻ</li>
            <li>Năm xuất bản: 2023</li>
            <li>Số trang: 200</li>
            <li>Kích thước: 14 x 20 cm</li>
            <li>Bìa: Bìa mềm</li>
            <li>Độ tuổi phù hợp: 10-15 tuổi</li>
          </ul>
        </TabsContent>
      </Tabs>

      <div>
        <h3 className='text-2xl font-semibold mb-4'>Đánh giá sản phẩm</h3>
        <div className='bg-gray-50 p-6 rounded-lg'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <div className='text-5xl font-bold'>{overallRating.toFixed(1)}</div>
              <div className='flex mt-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className='w-5 h-5 fill-yellow-400 text-yellow-400' />
                ))}
              </div>
              <div className='text-sm text-gray-500 mt-1'>({totalReviews} đánh giá)</div>
            </div>
            <div className='flex-grow ml-6'>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className='flex items-center mb-1'>
                  <div className='w-12 text-sm text-gray-600'>{rating} sao</div>
                  <Progress
                    value={(ratingCounts[rating as keyof typeof ratingCounts] / totalReviews) * 100}
                    className='h-2 w-full mx-2'
                  />
                  <div className='w-12 text-sm text-gray-600 text-right'>
                    {ratingCounts[rating as keyof typeof ratingCounts]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='space-y-2'>
            {['Mới nhất', 'Có hình ảnh', '5 sao', '4 sao', '3 sao', '2 sao', '1 sao'].map((filter) => (
              <Button key={filter} variant='outline' size='sm' className='mr-2 mb-2'>
                {filter}
              </Button>
            ))}
          </div>
        </div>
        <div className='mt-6 space-y-6'>
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className='p-6'>
                <div className='flex items-center mb-2'>
                  <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-3'>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className='font-semibold'>{review.name}</div>
                    <div className='flex items-center mb-2'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {review.verified && (
                  <div className='flex items-center text-green-600 text-sm mb-2'>
                    <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Đã mua hàng
                  </div>
                )}
                <p className='text-gray-600 mb-2'>{review.comment}</p>
                <div className='text-sm text-gray-500'>Đánh giá vào {review.date}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDescription

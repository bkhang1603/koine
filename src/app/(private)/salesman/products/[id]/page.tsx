'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockProducts } from '../../_mock/data'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Tags, Package, ShoppingCart, Truck, Clock, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { PriceInfoCard } from '@/components/private/salesman/price-info-card'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id === params.id)

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' asChild>
            <Link href='/salesman/products'>
              <ArrowLeft className='w-4 h-4' />
            </Link>
          </Button>
          <div>
            <h1 className='text-2xl font-bold'>Chi tiết sản phẩm</h1>
            <p className='text-sm text-muted-foreground'>Quản lý thông tin sản phẩm</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' asChild>
            <Link href={`/salesman/products/${params.id}/edit`}>
              <Edit className='w-4 h-4 mr-2' />
              Chỉnh sửa
            </Link>
          </Button>
          <Button>
            <Tags className='w-4 h-4 mr-2' />
            Thêm khuyến mãi
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        {/* Thông tin cơ bản */}
        <Card className='col-span-2 space-y-6'>
          <CardHeader>
            <CardTitle>Thông tin sản phẩm</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex gap-6'>
              <div className='relative w-40 h-40 rounded-lg overflow-hidden'>
                <Image src={product.image} alt={product.name} fill className='object-cover' />
              </div>
              <div className='flex-1 space-y-4'>
                <div>
                  <div className='text-sm text-muted-foreground'>Tên sản phẩm</div>
                  <div className='text-lg font-medium'>{product.name}</div>
                </div>
                <div className='flex gap-2'>
                  <Badge variant='outline'>{product.category === 'book' ? 'Sách' : 'Thiết bị'}</Badge>
                  <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                    {product.status === 'active' ? 'Còn hàng' : 'Hết hàng'}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Thống kê */}
            <div className='grid grid-cols-3 gap-4'>
              <div className='p-4 bg-muted/50 rounded-lg space-y-1'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Package className='w-4 h-4' />
                  <span>Tồn kho</span>
                </div>
                <div className='text-2xl font-bold'>{product.stock}</div>
              </div>
              <div className='p-4 bg-muted/50 rounded-lg space-y-1'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <ShoppingCart className='w-4 h-4' />
                  <span>Đã bán</span>
                </div>
                <div className='text-2xl font-bold'>{product.sold}</div>
              </div>
              <div className='p-4 bg-muted/50 rounded-lg space-y-1'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Truck className='w-4 h-4' />
                  <span>Đang giao</span>
                </div>
                <div className='text-2xl font-bold'>0</div>
              </div>
            </div>

            {/* Thêm phần mô tả chi tiết */}
            <div>
              <h3 className='font-medium mb-3'>Mô tả chi tiết</h3>
              <div className='prose max-w-none'>
                <p className='text-muted-foreground'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>

            {/* Thêm thông tin chi tiết */}
            <div className='grid grid-cols-2 gap-6'>
              <div>
                <h3 className='font-medium mb-3'>Thông tin bổ sung</h3>
                <div className='space-y-2'>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Mã sản phẩm</span>
                    <span className='font-medium'>{product.id}</span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Nhà cung cấp</span>
                    <span className='font-medium'>Công ty ABC</span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Xuất xứ</span>
                    <span className='font-medium'>Việt Nam</span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Thương hiệu</span>
                    <span className='font-medium'>Brand XYZ</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='font-medium mb-3'>Thông số kỹ thuật</h3>
                <div className='space-y-2'>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Kích thước</span>
                    <span className='font-medium'>20 x 15 x 5 cm</span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Trọng lượng</span>
                    <span className='font-medium'>300g</span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Chất liệu</span>
                    <span className='font-medium'>Giấy định lượng 100gsm</span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span className='text-muted-foreground'>Số trang</span>
                    <span className='font-medium'>200 trang</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thêm hình ảnh chi tiết */}
            <div>
              <h3 className='font-medium mb-3'>Hình ảnh chi tiết</h3>
              <div className='grid grid-cols-4 gap-4'>
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className='relative aspect-square rounded-lg overflow-hidden'>
                    <Image
                      src={`https://picsum.photos/seed/${i}/400/400`}
                      alt={`Hình ảnh ${i + 1}`}
                      fill
                      className='object-cover hover:scale-110 transition-transform'
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Thông tin giá */}
        <div className='space-y-6'>
          <PriceInfoCard
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            type='product'
          />

          {/* Thêm card thống kê bán hàng */}
          <Card>
            <CardHeader>
              <CardTitle>Thống kê bán hàng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='text-sm text-muted-foreground'>Đánh giá trung bình</div>
                <div className='flex items-center gap-1'>
                  <span className='font-medium'>4.5</span>
                  <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-sm text-muted-foreground'>Lượt đánh giá</div>
                <div className='font-medium'>128</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-sm text-muted-foreground'>Lượt mua trong tháng</div>
                <div className='font-medium'>45</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-sm text-muted-foreground'>Tỷ lệ hoàn hàng</div>
                <div className='font-medium'>2%</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lịch sử cập nhật</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-3 text-sm'>
                <Clock className='w-4 h-4 text-muted-foreground' />
                <div className='flex-1'>Cập nhật giá bán</div>
                <div className='text-muted-foreground'>1 giờ trước</div>
              </div>
              <div className='flex items-center gap-3 text-sm'>
                <Clock className='w-4 h-4 text-muted-foreground' />
                <div className='flex-1'>Cập nhật tồn kho</div>
                <div className='text-muted-foreground'>2 giờ trước</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

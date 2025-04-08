'use client'
import { use } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Package, AlertCircle, Star, DollarSign, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useProductDetailAdminQuery } from '@/queries/useProduct'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { vi } from 'date-fns/locale'
import { format } from 'date-fns'

export default function AdminProductDetail(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { isLoading, error, data } = useProductDetailAdminQuery({ productId: params.id })
  const product = data?.payload.data

  // State for selected image
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Handle image click
  const openImageDialog = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  if (isLoading) {
    return (
      <div className='container max-w-7xl mx-auto py-6 space-y-8'>
        {/* Back button skeleton */}
        <Skeleton className='w-[200px] h-10' />

        {/* Header skeleton */}
        <div>
          <div className='flex items-center justify-between mb-4'>
            <Skeleton className='w-[300px] h-8' />
            <Skeleton className='w-[80px] h-6' />
          </div>
          <div className='flex items-center gap-6'>
            <Skeleton className='w-[100px] h-5' />
            <Skeleton className='w-[80px] h-5' />
            <Skeleton className='w-[120px] h-5' />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-6'>
          <div className='col-span-2 space-y-6'>
            {/* Product images skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent className='space-y-6'>
                {/* Main image skeleton */}
                <div>
                  <div className='text-sm text-gray-500 mb-2'>
                    <Skeleton className='w-[80px] h-4' />
                  </div>
                  <Skeleton className='w-full h-[300px] rounded-lg' />
                </div>

                {/* Thumbnails skeleton */}
                <div>
                  <div className='text-sm text-gray-500 mb-2'>
                    <Skeleton className='w-[120px] h-4' />
                  </div>
                  <div className='flex gap-2 flex-wrap'>
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className='w-24 h-24 rounded-lg' />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-full h-20' />
              </CardContent>
            </Card>

            {/* Detail skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-full h-[200px]' />
              </CardContent>
            </Card>

            {/* Guide skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[200px] h-6' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-full h-[150px]' />
              </CardContent>
            </Card>
          </div>

          {/* Product info skeleton */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <Skeleton className='w-[100px] h-5' />
                    <Skeleton className='w-[80px] h-5' />
                  </div>
                  <div className='flex justify-between'>
                    <Skeleton className='w-[100px] h-5' />
                    <Skeleton className='w-[60px] h-5' />
                  </div>
                </div>

                <Skeleton className='w-full h-px' />

                <div className='space-y-3'>
                  {[1, 2, 3].map((item) => (
                    <div key={item} className='flex justify-between'>
                      <Skeleton className='w-[120px] h-5' />
                      <Skeleton className='w-[100px] h-5' />
                    </div>
                  ))}
                </div>

                <Skeleton className='w-full h-px' />

                <div className='space-y-3'>
                  <Skeleton className='w-[100px] h-5' />
                  <div className='flex flex-wrap gap-2'>
                    <Skeleton className='w-[80px] h-6 rounded-full' />
                    <Skeleton className='w-[60px] h-6 rounded-full' />
                    <Skeleton className='w-[70px] h-6 rounded-full' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action buttons skeleton */}
            <div className='space-y-3'>
              <Skeleton className='w-full h-10 rounded-md' />
              <Skeleton className='w-full h-10 rounded-md' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
        <AlertCircle className='w-12 h-12 text-red-500' />
        <div className='text-center'>
          <h3 className='text-lg font-medium text-gray-900 mb-1'>Không tìm thấy sản phẩm</h3>
          <p className='text-gray-500'>Sản phẩm không tồn tại hoặc đã bị xóa</p>
        </div>
        <Button variant='outline' asChild>
          <Link href='/admin/product'>Quay lại danh sách sản phẩm</Link>
        </Button>
      </div>
    )
  }

  // Calculate final price after discount
  const finalPrice = product.price * (1 - product.discount / 100)

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Back button */}
      <Button variant='ghost' asChild className='gap-2 hover:bg-gray-100'>
        <Link href='/admin/product'>
          <ArrowLeft className='h-4 w-4' />
          Quay lại danh sách sản phẩm
        </Link>
      </Button>

      {/* Header */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>{product.name}</h1>
          <Badge variant={product.stockQuantity > 0 ? 'secondary' : 'destructive'}>
            {product.stockQuantity > 0 ? 'Còn hàng' : 'Hết hàng'}
          </Badge>
        </div>
        <div className='flex items-center gap-6 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <Star className='h-4 w-4' />
            {product.averageRating} ({product.totalRating} đánh giá)
          </div>
          <div className='flex items-center gap-2'>
            <ShoppingCart className='h-4 w-4' />
            {product.stockQuantity} sản phẩm còn lại
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-2 space-y-6'>
          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle>Hình ảnh sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Main Image */}
              <div>
                <p className='text-sm text-gray-500 mb-2 font-medium'>Ảnh hiển thị chính</p>
                <div className='relative w-full h-[400px]'>
                  <Image
                    src={product.images[0]?.imageUrl || '/placeholder-image.jpg'}
                    alt={product.name}
                    fill
                    className='object-contain rounded-lg'
                  />
                </div>
              </div>

              {/* All Images */}
              <div>
                <p className='text-sm text-gray-500 mb-2 font-medium'>Tất cả hình ảnh</p>
                <div className='grid grid-cols-5 gap-4'>
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className='relative w-full h-24 cursor-pointer border rounded-lg overflow-hidden'
                      onClick={() => openImageDialog(image.imageUrl)}
                    >
                      <Image
                        src={image.imageUrl}
                        alt={`${product.name} - ${index + 1}`}
                        fill
                        className='object-cover hover:scale-105 transition-transform'
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Description */}
          <Card>
            <CardHeader>
              <CardTitle>Mô tả sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600'>{product.description}</p>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Package className='w-5 h-5' />
                Chi tiết sản phẩm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: product.detail }} />
            </CardContent>
          </Card>

          {/* Usage Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Hướng dẫn sử dụng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: product.guide }} />
            </CardContent>
          </Card>
        </div>

        {/* Product Info */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Giá gốc</span>
                  <span>{product.price.toLocaleString()}đ</span>
                </div>
                {product.discount > 0 && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Giảm giá</span>
                    <span className='text-red-500'>{product.discount}%</span>
                  </div>
                )}
                {product.discount > 0 && (
                  <div className='flex justify-between text-sm font-medium'>
                    <span className='text-muted-foreground'>Giá sau giảm</span>
                    <span className='text-green-600'>{finalPrice.toLocaleString()}đ</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Số lượng tồn kho</span>
                  <span>{product.stockQuantity} sản phẩm</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Đánh giá trung bình</span>
                  <span>{product.averageRating} / 5 ⭐</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Lượt đánh giá</span>
                  <span>{product.totalRating} đánh giá</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Ngày tạo</span>
                  <span>{format(new Date(product.createdAt), 'dd/MM/yyyy', { locale: vi })}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Cập nhật lần cuối</span>
                  <span>{format(new Date(product.updatedAt), 'dd/MM/yyyy', { locale: vi })}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className='text-sm font-medium mb-2'>Danh mục</h3>
                <div className='flex flex-wrap gap-2'>
                  {product.categories.map((category) => (
                    <Badge key={category.id} variant='outline'>
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className='space-y-3'>
            <Button className='w-full' variant='default'>
              Chỉnh sửa sản phẩm
            </Button>
            <Button className='w-full' variant='outline'>
              {product.stockQuantity > 0 ? 'Đánh dấu hết hàng' : 'Đánh dấu còn hàng'}
            </Button>
          </div>
        </div>
      </div>

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className='max-w-3xl max-h-[80vh]'>
          <DialogHeader>
            <DialogTitle>Hình ảnh sản phẩm</DialogTitle>
            <DialogDescription>{product.name}</DialogDescription>
          </DialogHeader>

          <div className='relative w-full h-[500px]'>
            {selectedImage && <Image src={selectedImage} alt={product.name} fill className='object-contain' />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

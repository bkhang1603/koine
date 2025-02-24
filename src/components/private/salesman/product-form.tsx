'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { mockProducts, type ComboProduct } from '@/app/(private)/salesman/_mock/data'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, X, ImagePlus, Upload } from 'lucide-react'
import Link from 'next/link'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ProductFormProps {
  initialData?: {
    name: string
    category: string
    price: string
    originalPrice: string
    stock: number
    status: string
    description?: string
    isCombo?: boolean
    comboProducts?: ComboProduct[]
    images?: string[]
  }
  onSubmit: (data: any) => void
  isEdit?: boolean
}

export function ProductForm({ initialData, onSubmit, isEdit }: ProductFormProps) {
  const [isCombo, setIsCombo] = useState(initialData?.isCombo || false)
  const [selectedProducts, setSelectedProducts] = useState<ComboProduct[]>(initialData?.comboProducts || [])
  const [images, setImages] = useState<string[]>(initialData?.images || [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4 pb-6 border-b'>
        <Button variant='ghost' size='icon' asChild>
          <Link href='/salesman/products'>
            <ArrowLeft className='w-4 h-4' />
          </Link>
        </Button>
        <div>
          <h1 className='text-2xl font-bold'>{isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h1>
          <p className='text-muted-foreground'>{isEdit ? 'Cập nhật thông tin sản phẩm' : 'Tạo một sản phẩm mới'}</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit({})
        }}
      >
        <div className='grid gap-6 lg:grid-cols-6'>
          {/* Main Content - 4 cols */}
          <div className='lg:col-span-4 space-y-6'>
            {/* Basic Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin sản phẩm</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4'>
                  <div>
                    <Label>Tên sản phẩm</Label>
                    <Input defaultValue={initialData?.name} />
                  </div>
                  <div>
                    <Label>Mô tả</Label>
                    <Textarea defaultValue={initialData?.description} className='min-h-[120px]' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images Card */}
            <Card>
              <CardHeader>
                <CardTitle>Hình ảnh sản phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {images.map((image, index) => (
                    <div key={index} className='relative aspect-square rounded-lg overflow-hidden group border'>
                      <img src={image} alt={`Product ${index + 1}`} className='w-full h-full object-cover' />
                      <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='text-white hover:text-white hover:bg-red-500/20'
                          onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                        >
                          <X className='w-5 h-5' />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <label className='aspect-square rounded-lg border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer'>
                    <input type='file' multiple accept='image/*' className='hidden' onChange={handleImageUpload} />
                    <ImagePlus className='w-8 h-8 text-muted-foreground' />
                    <span className='text-sm text-muted-foreground'>Thêm hình ảnh</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Combo Products Card */}
            {isCombo && (
              <Card>
                <CardHeader>
                  <CardTitle>Sản phẩm trong combo</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <Select
                    onValueChange={(value) => {
                      const product = mockProducts.find((p) => p.id === value)
                      if (product) {
                        setSelectedProducts((prev) => [
                          ...prev,
                          {
                            id: `CP${Date.now()}`,
                            productId: product.id,
                            quantity: 1
                          }
                        ])
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Thêm sản phẩm vào combo' />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProducts
                        .filter((p) => !p.isCombo && !selectedProducts.find((sp) => sp.productId === p.id))
                        .map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <div className='space-y-3'>
                    {selectedProducts.map((item) => {
                      const product = mockProducts.find((p) => p.id === item.productId)
                      return (
                        <div key={item.id} className='flex gap-4 bg-muted/50 p-3 rounded-lg'>
                          {/* Product Image */}
                          <div className='w-20 h-20 rounded-md border overflow-hidden flex-shrink-0'>
                            <img
                              src={product?.images?.[0] || '/placeholder-product.png'}
                              alt={product?.name}
                              className='w-full h-full object-cover'
                            />
                          </div>

                          {/* Product Info */}
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-start justify-between gap-2'>
                              <div>
                                <h4 className='font-medium truncate'>{product?.name}</h4>
                                <div className='mt-1 space-y-1 text-sm text-muted-foreground'>
                                  <p>Giá: {product?.price}</p>
                                  <p>Tồn kho: {product?.stock}</p>
                                </div>
                              </div>
                              <div className='flex items-center gap-2'>
                                <div className='flex flex-col items-end gap-1'>
                                  <Label className='text-xs'>Số lượng</Label>
                                  <Input
                                    type='number'
                                    value={item.quantity}
                                    onChange={(e) => {
                                      setSelectedProducts((prev) =>
                                        prev.map((p) =>
                                          p.id === item.id ? { ...p, quantity: parseInt(e.target.value) || 1 } : p
                                        )
                                      )
                                    }}
                                    className='w-20 h-8'
                                    min={1}
                                  />
                                </div>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='h-8 w-8 text-muted-foreground hover:text-red-500'
                                  onClick={() => setSelectedProducts((prev) => prev.filter((p) => p.id !== item.id))}
                                >
                                  <X className='w-4 h-4' />
                                </Button>
                              </div>
                            </div>

                            {/* Price Summary */}
                            <div className='mt-2 text-sm'>
                              <span className='text-muted-foreground'>Thành tiền:</span>
                              <span className='ml-1 font-medium'>
                                {new Intl.NumberFormat('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND'
                                }).format(parseInt(product?.price?.replace(/\D/g, '') || '0') * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Combo Summary */}
                  {selectedProducts.length > 0 && (
                    <div className='mt-6 pt-4 border-t'>
                      <div className='flex justify-between items-center text-sm'>
                        <span className='font-medium'>Tổng giá trị combo:</span>
                        <span className='font-medium'>
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(
                            selectedProducts.reduce((total, item) => {
                              const product = mockProducts.find((p) => p.id === item.productId)
                              return total + parseInt(product?.price?.replace(/\D/g, '') || '0') * item.quantity
                            }, 0)
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - 2 cols */}
          <div className='lg:col-span-2 space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Thông tin bán hàng</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <Label>Danh mục</Label>
                  <Select defaultValue={initialData?.category}>
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn danh mục' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='book'>Sách</SelectItem>
                      <SelectItem value='equipment'>Thiết bị</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Giá bán</Label>
                  <Input defaultValue={initialData?.price} />
                </div>
                <div>
                  <Label>Giá gốc</Label>
                  <Input defaultValue={initialData?.originalPrice} />
                </div>
                <div>
                  <Label>Số lượng tồn kho</Label>
                  <Input type='number' defaultValue={initialData?.stock} />
                </div>
                <div>
                  <Label>Trạng thái</Label>
                  <Select defaultValue={initialData?.status}>
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn trạng thái' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='active'>Còn hàng</SelectItem>
                      <SelectItem value='inactive'>Hết hàng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='flex items-center justify-between pt-2'>
                  <Label>Sản phẩm combo</Label>
                  <Switch checked={isCombo} onCheckedChange={setIsCombo} />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className='flex flex-col gap-2'>
              <Button type='submit'>{isEdit ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm'}</Button>
              <Button variant='outline' asChild>
                <Link href='/salesman/products'>Hủy</Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

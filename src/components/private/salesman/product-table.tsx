'use client'

import { useState, useEffect, useMemo } from 'react'
import { TableCustom } from '@/components/table-custom'
import { Badge } from '@/components/ui/badge'
import { mockProducts, Product } from '@/app/(private)/salesman/_mock/data'
import { MoreOptions } from './more-options'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { EmptyState } from '@/components/empty-state'

interface ProductTableProps {
  search: string
  category: string
  priceRange: string
}

export function ProductTable({ search, category, priceRange }: ProductTableProps) {
  const router = useRouter()
  const [data, setData] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setData(mockProducts)
    setLoading(false)
  }, [])

  const headerColumn = [
    { id: 1, name: 'Ảnh' },
    { id: 2, name: 'Tên sản phẩm' },
    { id: 3, name: 'Danh mục' },
    { id: 4, name: 'Giá gốc' },
    { id: 5, name: 'Giảm giá' },
    { id: 6, name: 'Giá bán' },
    { id: 7, name: 'Tồn kho' },
    { id: 8, name: 'Đã bán' },
    { id: 9, name: 'Trạng thái' },
    { id: 10, name: '' }
  ]

  const bodyColumn = useMemo(
    () => [
      {
        id: 1,
        render: (product: Product) => (
          <div className='relative w-16 h-16 rounded-lg overflow-hidden border'>
            <Image src={product.image} alt={product.name} fill className='object-cover' />
            {product.isCombo && (
              <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-0.5'>
                {product.comboProducts?.length || 0} sản phẩm
              </div>
            )}
          </div>
        )
      },
      {
        id: 2,
        render: (product: Product) => (
          <div>
            <div className='font-medium line-clamp-2'>{product.name}</div>
            {product.isCombo && (
              <div className='mt-1 space-y-0.5'>
                {product.comboProducts?.map((item) => {
                  const comboProduct = mockProducts.find((p) => p.id === item.productId)
                  return (
                    <div key={item.id} className='text-xs text-muted-foreground flex items-center gap-1'>
                      <span>• {comboProduct?.name}</span>
                      <Badge variant='outline' className='text-[10px] h-4'>
                        x{item.quantity}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      },
      {
        id: 3,
        render: (product: Product) => (
          <Badge variant='outline'>{product.category === 'book' ? 'Sách' : 'Thiết bị'}</Badge>
        )
      },
      {
        id: 4,
        render: (product: Product) => <div className='text-muted-foreground line-through'>{product.originalPrice}</div>
      },
      {
        id: 5,
        render: (product: Product) => (
          <Badge variant='secondary' className='text-xs'>
            -{product.discount}
          </Badge>
        )
      },
      {
        id: 6,
        render: (product: Product) => <div className='font-medium'>{product.price}</div>
      },
      {
        id: 7,
        render: (product: Product) => product.stock.toString()
      },
      {
        id: 8,
        render: (product: Product) => product.sold.toString()
      },
      {
        id: 9,
        render: (product: Product) => (
          <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
            {product.status === 'active' ? 'Còn hàng' : 'Hết hàng'}
          </Badge>
        )
      },
      {
        id: 10,
        render: (product: Product) => (
          <MoreOptions
            type='product'
            onView={() => router.push(`/salesman/products/${product.id}`)}
            onEdit={() => router.push(`/salesman/products/${product.id}/edit`)}
            onDelete={() => console.log('Delete:', product.id)}
          />
        )
      }
    ],
    [router]
  )

  const filteredData = data.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(search.toLowerCase())
    const categoryMatch = category === 'all' || product.category === category
    const priceMatch =
      priceRange === 'all' ||
      (priceRange === '0-500000' && parseInt(product.price.replace(/\D/g, '')) <= 500000) ||
      (priceRange === '500000-1000000' &&
        parseInt(product.price.replace(/\D/g, '')) > 500000 &&
        parseInt(product.price.replace(/\D/g, '')) <= 1000000) ||
      (priceRange === '1000000+' && parseInt(product.price.replace(/\D/g, '')) > 1000000)

    return nameMatch && categoryMatch && priceMatch
  })

  if (!loading && filteredData.length === 0) {
    return <EmptyState title='Không tìm thấy sản phẩm' description='Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm khác.' />
  }

  return (
    <TableCustom
      data={{
        data: filteredData.slice(0, 10),
        message: '',
        pagination: {
          pageSize: 10,
          totalItem: filteredData.length,
          currentPage: 1,
          totalPage: Math.ceil(filteredData.length / 10),
          maxPageSize: 10
        }
      }}
      loading={loading}
      headerColumn={headerColumn}
      bodyColumn={bodyColumn}
      href='/salesman/products'
    />
  )
}

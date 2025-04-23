import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package2, BookOpen } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface Product {
  name: string
  quantity: number | string
  revenue: number
  id?: string
}

interface ProductsProps {
  products: Product[]
  title: string
  icon: React.ReactNode
  onItemClick?: (product: Product) => void
}

// Common component for rendering a list of products
function ProductList({ items, onItemClick }: { items: Product[]; onItemClick?: (product: Product) => void }) {
  // Limit to 5 items to match distribution charts
  const displayItems = items.slice(0, 5)

  // Function to safely convert quantity to number
  const formatQuantity = (quantity: number | string): string => {
    if (typeof quantity === 'number') {
      return quantity.toLocaleString()
    }

    // Try to parse the string to a number
    const parsedQuantity = parseInt(quantity, 10)
    return isNaN(parsedQuantity) ? '0' : parsedQuantity.toLocaleString()
  }

  return (
    <div className='space-y-5'>
      {displayItems.map((item, index) => (
        <div
          key={index}
          className='flex justify-between items-center border-b pb-3 cursor-pointer hover:bg-gray-50 rounded p-2 transition-colors relative group'
          onClick={() => onItemClick?.(item)}
        >
          <div className='max-w-[70%]'>
            <p className='font-medium truncate'>{item.name}</p>
            <p className='text-sm text-muted-foreground'>Đã bán: {formatQuantity(item.quantity)}</p>
          </div>
          <div className='text-right'>
            <p className='font-medium'>{formatCurrency(item.revenue)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Generic product card component
function ProductCard({ products, title, icon, onItemClick }: ProductsProps) {
  // Validate data to prevent NaN errors
  const safeProducts = products.map((product) => ({
    ...product,
    quantity: typeof product.quantity === 'number' && !isNaN(product.quantity) ? product.quantity : 0,
    revenue: typeof product.revenue === 'number' && !isNaN(product.revenue) ? product.revenue : 0
  }))

  return (
    <Card className='h-full'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-base'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <ProductList items={safeProducts} onItemClick={onItemClick} />
      </CardContent>
    </Card>
  )
}

// Physical Products Component
export function BestSellingPhysicalProducts({
  products,
  onItemClick
}: {
  products: Product[]
  onItemClick?: (product: Product) => void
}) {
  return (
    <ProductCard
      products={products}
      title='Sản Phẩm Bán Chạy'
      icon={<Package2 className='h-4 w-4 text-muted-foreground' />}
      onItemClick={onItemClick}
    />
  )
}

// Digital Courses Component
export function BestSellingCourses({
  courses,
  onItemClick
}: {
  courses: Product[]
  onItemClick?: (course: Product) => void
}) {
  return (
    <ProductCard
      products={courses}
      title='Khóa Học Bán Chạy'
      icon={<BookOpen className='h-4 w-4 text-muted-foreground' />}
      onItemClick={onItemClick}
    />
  )
}

// Legacy component for backward compatibility
export function BestSellingProducts({
  products,
  courses,
  onProductClick,
  onCourseClick
}: {
  products: Product[]
  courses: Product[]
  onProductClick?: (product: Product) => void
  onCourseClick?: (course: Product) => void
}) {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <BestSellingPhysicalProducts products={products} onItemClick={onProductClick} />
      <BestSellingCourses courses={courses} onItemClick={onCourseClick} />
    </div>
  )
}

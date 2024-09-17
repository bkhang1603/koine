import CustomInput from '@/app/(public)/components/custom-input'
import images from '@/assets/images'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Gift } from 'lucide-react'
import Image from 'next/image'

const listData = [
  {
    id: 1,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Khóa học, Trẻ em'
  },
  {
    id: 2,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Quà tặng'
  },
  {
    id: 3,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Quà tặng'
  },
  {
    id: 4,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Khóa học, Trẻ em'
  },
  {
    id: 5,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Quà tặng'
  },
  {
    id: 6,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Quà tặng'
  },
  {
    id: 7,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Khóa học, Trẻ em'
  },
  {
    id: 8,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Khóa học, Trẻ em'
  },
  {
    id: 9,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Khóa học, Trẻ em'
  },
  {
    id: 10,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Quà tặng'
  },
  {
    id: 11,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Quà tặng'
  },
  {
    id: 12,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Khóa học, Trẻ em'
  }
]

function List() {
  return (
    <div className='col-span-3'>
      <div className='flex justify-between items-center gap-4'>
        <CustomInput className='max-w-[400px] h-9' placeholder='Tìm kiếm sản phẩm...' />

        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Sắp xếp theo' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='price-asc'>Giá thấp đến cao</SelectItem>
            <SelectItem value='price-desc'>Giá cao đến thấp</SelectItem>
            <SelectItem value='most-popular'>Phổ biến nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
        {listData.map((item) => (
          <article key={item.id} className='cursor-pointer  group/product'>
            <div className='w-full aspect-square rounded-lg overflow-hidden relative'>
              <Image
                src={images.product}
                alt=''
                width={400}
                height={400}
                className='w-full aspect-square object-cover rounded-lg'
              />

              <div
                className='absolute w-full h-10 bg-black/50 opacity-0 -bottom-10
              group-hover/product:bottom-0 group-hover/product:opacity-100
              flex justify-center items-center transition-all duration-500'
              >
                <p className='text-fourth'>Xem thêm</p>
              </div>

              {item.category === 'Quà tặng' && (
                <div
                  className='absolute top-0 right-0 bg-secondary text-white
              w-7 h-7 flex justify-center items-center rounded-bl-md'
                >
                  <Gift />
                </div>
              )}
            </div>

            <div className='p-2'>
              <p className='text-xs text-gray-500'>{item.category}</p>
              <h3 className='text-lg font-semibold'>{item.title}</h3>

              <div className='flex items-center gap-2 mt-2'>
                <span className='text-base font-semibold'>{item.price.toLocaleString()}đ</span>
                <span className='text-gray-400 text-sm line-through'>{item.oldPrice.toLocaleString()}đ</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default List

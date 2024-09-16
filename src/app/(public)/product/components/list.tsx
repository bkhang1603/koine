import images from '@/assets/images'
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
    category: 'Khóa học, Trẻ em'
  },
  {
    id: 3,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Khóa học, Trẻ em'
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
    category: 'Khóa học, Trẻ em'
  },
  {
    id: 6,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Khóa học, Trẻ em'
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
    category: 'Khóa học, Trẻ em'
  },
  {
    id: 11,
    title: 'Thấu hiểu bản thân',
    price: 100000,
    oldPrice: 200000,
    category: 'Khóa học, Trẻ em'
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
      <div className='grid grid-cols-4 gap-4'>
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
                <p className='text-fourth'>Xem them</p>
              </div>
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

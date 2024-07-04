import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

function CardCategory({ title, images }: { title: string; images: string | StaticImport }) {
  return (
    <div
      className='relative rounded-2xl overflow-hidden group
        cursor-pointer'
    >
      <Image
        src={images}
        alt='Học cùng Koine'
        width={1000}
        height={1000}
        className='object-cover h-[120px] md:h-[220px] w-full'
      />

      <div className='absolute inset-0 bg-gray-800 opacity-40' />
      <div className='absolute inset-0 flex items-center justify-center'>
        <h2 className='text-white md:text-3xl font-bold'>{title}</h2>
      </div>

      <div
        className='transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100
    absolute bottom-0 right-0 z-10 bg-secondary px-3 py-1 rounded-md'
      >
        <h3 className='text-center font-normal text-white'>Xem thêm</h3>
      </div>
    </div>
  )
}

export default CardCategory

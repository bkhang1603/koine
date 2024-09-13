import images from '@/assets/images'
import Image from 'next/image'

const viewData = [
  {
    id: 1,
    image: images.about1,
    className: 'row-span-4 col-span-4'
  },
  {
    id: 2,
    image: images.about2,
    className: 'row-span-2 col-span-3'
  },
  {
    id: 3,
    image: images.about3,
    className: 'row-span-2 col-span-3'
  },
  {
    id: 4,
    image: images.about4,
    className: 'row-span-1 col-span-2'
  },
  {
    id: 5,
    image: images.about6,
    className: 'row-span-3 col-span-5'
  },
  {
    id: 6,
    image: images.about5,
    className: 'row-span-1 col-span-3'
  }
]

function View() {
  return (
    <section className='container grid grid-rows-4 grid-cols-12 grid-flow-col gap-4 h-[300px] lg:h-[600px] mt-20'>
      {viewData.map((data, index) => (
        <div key={index} className={data.className}>
          <Image
            src={data.image}
            alt='Image 1'
            width={500}
            height={500}
            quality={100}
            className='w-full h-full object-cover rounded-xl'
          />
        </div>
      ))}
    </section>
  )
}

export default View

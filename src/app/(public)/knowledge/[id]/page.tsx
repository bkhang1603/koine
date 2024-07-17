import images from '@/assets/images'
import data from '@/data/data'
import { Bookmark, Ellipsis, Forward, Heart, MessageCircle } from 'lucide-react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

type Paragraph = {
  row: string
}

type ContentItem = {
  title: string
  paragraph: Paragraph[]
  image?: string | StaticImport | null
  content?: ContentItem[] // Nếu có nội dung lồng nhau
}

type ContentSection = {
  title: string
  content: ContentItem[]
}

type DataItem = {
  id: string
  title: string
  description: string
  date: string | number | Date
  image: string | StaticImport
  content: ContentSection[]
}

export type DataType = DataItem | undefined

function page({ params }: { params: { id: string } }) {
  const newData = data.find((item) => item.id === params.id) as DataType

  return (
    <div className='py-20 border-b-4 border-fifth'>
      <section className='flex justify-between items-center pb-10'>
        <article className='flex items-center gap-4'>
          <Image
            src={images.avatar}
            alt='avatar'
            width={50}
            height={50}
            className='w-10 h-10 md:w-12 md:h-12 object-cover'
          />
          <span className='font-semibold text-lg md:text-xl'>Koine Company</span>
        </article>

        <div className='flex items-center gap-4 text-secondary'>
          <Bookmark className='md:w-8 md:h-8 cursor-pointer hover:fill-secondary' />
          <Ellipsis className='md:w-8 md:h-8 cursor-pointer' />
        </div>
      </section>

      <h1
        className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
            text-transparent bg-clip-text text-2xl md:text-3xl lg:text-4xl font-bold text-center'
      >
        {newData?.title}
      </h1>

      {newData?.content.map((item, index) => (
        <section key={index} className='pt-6'>
          <h2 className='font-semibold text-lg md:text-xl'>{item.title}</h2>
          {item.content &&
            item.content.map((c, index) => (
              <div key={index}>
                <div className='mt-4'>
                  {c.title && <h3 className='font-semibold text-lg md:text-xl pl-8'>{c.title}</h3>}
                  {c.content &&
                    c.content.map((c, index) => {
                      c.paragraph && (
                        <div key={index} className='grid grid-cols-1 gap-2 pl-8'>
                          {c.paragraph.map((p, index) => (
                            <p key={index} className='text-lg'>
                              {p.row}
                            </p>
                          ))}
                        </div>
                      )
                      return null // Add this line to return a value
                    })}

                  {c.paragraph && (
                    <div className='grid grid-cols-1 gap-2'>
                      {c.paragraph.map((p, index) => (
                        <p key={index} className='text-lg'>
                          {p.row}
                        </p>
                      ))}
                    </div>
                  )}

                  {c.image && (
                    <article className='mt-10 flex justify-center items-center'>
                      <Image
                        src={c.image}
                        alt='image'
                        width={2000}
                        height={2000}
                        className='w-full lg:max-w-[600px] object-cover rounded-2xl shadow-xl mb-6'
                      />
                    </article>
                  )}
                </div>

                {c.content &&
                  c.content.map((c, index) => (
                    <div key={index}>
                      <h3 className='font-semibold text-lg md:text-xl pl-8'>{c.title}</h3>
                      {c.paragraph && (
                        <div className='mt-4 grid grid-cols-1 gap-2 pl-8'>
                          {c.paragraph.map((p, index) => (
                            <p key={index} className='text-lg'>
                              {p.row}
                            </p>
                          ))}
                        </div>
                      )}
                      {c.image && (
                        <article className='mt-10 flex justify-center items-center'>
                          <Image
                            src={c.image}
                            alt='image'
                            width={2000}
                            height={2000}
                            className='w-full lg:max-w-[600px] object-cover rounded-2xl shadow-xl mb-6'
                          />
                        </article>
                      )}
                      {c.content &&
                        c.content.map((c, index) => (
                          <div key={index}>
                            <h3 className='font-semibold text-lg md:text-xl pl-8'>{c.title}</h3>
                            <div className='mt-4 grid grid-cols-1 gap-2 pl-8'>
                              {c.paragraph.map((p, index) => (
                                <p key={index} className='text-lg'>
                                  {p.row}
                                </p>
                              ))}
                            </div>
                            {c.image && (
                              <article className='mt-10 flex justify-center items-center'>
                                <Image
                                  src={c.image}
                                  alt='image'
                                  width={2000}
                                  height={2000}
                                  className='w-full lg:max-w-[600px] object-cover rounded-2xl shadow-xl mb-6'
                                />
                              </article>
                            )}
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            ))}
        </section>
      ))}

      <section className='pt-20 flex justify-between items-center'>
        <div className='flex items-center gap-4 text-secondary'>
          <Heart className='md:w-8 md:h-8 cursor-pointer hover:fill-secondary' />
          <MessageCircle className='md:w-8 md:h-8 cursor-pointer hover:fill-secondary' />
        </div>

        <div className='flex items-center gap-2 text-secondary cursor-pointer hover:text-secondary/80'>
          <p className='text-lg md:text-xl font-semibold'>Share</p>
          <Forward className='md:w-8 md:h-8' />
        </div>
      </section>
    </div>
  )
}

export default page

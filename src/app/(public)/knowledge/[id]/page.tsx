import images from '@/assets/images'
import data from '@/data/data'
import { Bookmark, Ellipsis, Forward, Heart, MessageCircle } from 'lucide-react'
import Image from 'next/image'

export type Paragraph = {
  text: {
    text: string
  }[]
  image?: string
}

export type Content = {
  title: string
  paragraphs: Paragraph[]
}

export type NewDataType = {
  id: string
  title: string
  date: string
  image: string
  content: (Content & {
    content?: Content[]
  })[]
}

function page({ params }: { params: { id: string } }) {
  const newData = data.find((item) => item.id === params.id) as NewDataType | undefined

  return (
    <div className='py-20 border-b-4 border-fifth'>
      <section className='flex justify-between items-center pb-10'>
        <article className='flex items-center gap-4'>
          <Image src={images.avatar} alt='avatar' width={50} height={50} />
          <span className='font-semibold text-xl'>Koine Company</span>
        </article>

        <div className='flex items-center gap-4 text-secondary'>
          <Bookmark className='w-8 h-8 cursor-pointer hover:fill-secondary' />
          <Ellipsis className='w-8 h-8 cursor-pointer' />
        </div>
      </section>

      <h1
        className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
            text-transparent bg-clip-text text-2xl lg:text-4xl lg:h-14 font-bold line-clamp-1 text-center'
      >
        {newData?.title}
      </h1>

      {newData?.content.map((item, index) => (
        <section key={index} className='pt-10'>
          <h2 className='font-semibold text-xl mt-4'>{item.title}</h2>
          {item.paragraphs &&
            item.paragraphs.map((paragraph, index) => (
              <div key={index} className='mt-6'>
                <div className='grid grid-cols-1 gap-2'>
                  {paragraph.text.map((text, index) => (
                    <p key={index} className='text-lg'>
                      {text.text}
                    </p>
                  ))}
                </div>

                {paragraph.image && (
                  <article className='mt-10 flex justify-center items-center'>
                    <Image
                      src={paragraph.image}
                      alt='image'
                      width={2000}
                      height={2000}
                      quality={100}
                      className='max-w-[800px] object-cover rounded-2xl'
                    />
                  </article>
                )}
              </div>
            ))}

          {item.content &&
            item.content.map((content, index) => (
              <div key={index} className='mt-6'>
                <h3 className='font-semibold text-lg mt-4 pl-6'>{content.title}</h3>
                {content.paragraphs.map((paragraph, index) => (
                  <div key={index} className='mt-6'>
                    <div className='grid grid-cols-1 gap-2 pl-6'>
                      {paragraph.text.map((text, index) => (
                        <p key={index} className='text-lg'>
                          {text.text}
                        </p>
                      ))}
                    </div>

                    {paragraph.image && (
                      <article className='mt-10 flex justify-center items-center'>
                        <Image
                          src={paragraph.image}
                          alt='image'
                          width={2000}
                          height={2000}
                          quality={100}
                          className='max-w-[800px] object-cover rounded-2xl'
                        />
                      </article>
                    )}
                  </div>
                ))}
              </div>
            ))}
        </section>
      ))}

      <section className='pt-20 flex justify-between items-center'>
        <div className='flex items-center gap-4 text-secondary'>
          <Heart className='w-8 h-8 cursor-pointer hover:fill-secondary' />
          <MessageCircle className='w-8 h-8 cursor-pointer hover:fill-secondary' />
        </div>

        <div className='flex items-center gap-2 text-secondary cursor-pointer hover:text-secondary/80'>
          <p className='text-xl font-semibold'>Share</p>
          <Forward className='w-8 h-8' />
        </div>
      </section>
    </div>
  )
}

export default page

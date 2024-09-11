import icons from '@/assets/icons'
import images from '@/assets/images'
import Information from '@/components/home/information'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineTime
} from '@/components/timeline'
import Image from 'next/image'
import Link from 'next/link'

function AboutPage() {
  const data = [
    {
      date: '2024-03-06',
      content:
        'Ngày khởi đầu của một hành trình mới - một hành trình đầy thách thức và khó khăn. Ngày mà Koine được sinh ra, mang trong mình sứ mệnh bảo bọc và giúp đỡ tất cả trẻ em trên khắp mọi miền đất nước.'
    },
    {
      date: '2024-15-06',
      content: 'Koine chập chững bước từng bước trên hành trình gây dựng một nền tảng giáo dục tốt nhất cho trẻ em.'
    },
    {
      date: '2024-30-06',
      content: 'Fanpage đầu tiên của Koine được tạo ra, đánh dấu sự xuất hiện của Koine trên mạng xã hội.'
    },
    {
      date: '2024-04-07',
      content:
        'Koine chính thức xuất hiện trên website, góp phần giúp trẻ em tiếp cận kiến thức một cách dễ dàng hơn. Đồng thời cũng bắt đầu tiếp nhận những góp ý từ tất cả mọi người.'
    },
    {
      date: '2024-10-07',
      content:
        'Koine bắt đầu đăng tải những bài viết đầu tiên, bao gồm những kiến thức bổ ích và những câu chuyện chia sẻ do chính những thành viên của Koine đã từng trải qua.'
    }
  ]

  const teamData = [
    {
      name: 'Lê Bảo Khang',
      role: 'CEO',
      image: images.zyzy,
      phone: '0123456789',
      facebook: 'https://www.facebook.com/bong.ca.7315720'
    },
    {
      name: 'Phạm Tường Vy',
      role: 'CMO',
      image: images.zyzy,
      phone: '0123456789',
      facebook: 'https://www.facebook.com/bong.ca.7315720'
    },
    {
      name: 'Lê Văn Đào',
      role: 'CTO',
      image: images.momo,
      phone: '0123456789',
      facebook: 'https://www.facebook.com/bong.ca.7315720'
    }
  ]

  return (
    <main>
      <section className='container space-y-6 mt-24 flex flex-col items-center justify-center'>
        <h2 className='text-gray-400 font-semibold text-xl'>Tổng quan về Koine</h2>
        <h1
          className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
          text-transparent bg-clip-text text-xl md:text-2xl lg:text-4xl font-bold text-center'
        >
          Hành trình phát triển và những điều cần biết về Koine
        </h1>
        <p className='text-lg max-w-[600px] text-center'>
          Mang trong mình một sứ mệnh cao cả, Koine đã và đang không ngừng phát triển để giúp đỡ trẻ em trên khắp mọi
          miền đất nước.
        </p>
      </section>

      <section className='container mt-28'>
        <h2 className='text-secondary text-7xl font-bold'>2024</h2>

        <div className='container w-full flex items-center py-10'>
          <Timeline className='md:pl-28'>
            {data.map((e, index) => (
              <TimelineItem key={index}>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineTime>{e.date}</TimelineTime>
                  <TimelineIcon />
                </TimelineHeader>
                <TimelineContent>
                  <div className='md:hidden font-semibold text-lg text-primary'>{e.date}</div>
                  <div className='min-h-20 text-lg'>{e.content}</div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </section>

      <section className='container'>
        <h2
          className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
            text-transparent bg-clip-text text-xl md:text-2xl
            lg:text-4xl font-bold text-center mt-24 lg:h-14'
        >
          Những hình ảnh hoạt động của Koine
        </h2>
        <p className='text-center'>Những chặng đường và các hoạt động mà Koine đã trải qua.</p>
      </section>

      <section className='container grid grid-rows-4 grid-cols-12 grid-flow-col gap-4 h-96 mt-20'>
        <div className='row-span-4 col-span-4'>
          <Image
            src={images.children}
            alt='Image 1'
            width={500}
            height={500}
            className='w-full h-full object-cover rounded-xl'
          />
        </div>
        <div className='row-span-2 col-span-3'>
          <Image
            src={images.children}
            alt='Image 1'
            width={500}
            height={500}
            className='w-full h-full object-cover rounded-xl'
          />
        </div>
        <div className='row-span-2 col-span-3'>
          <Image
            src={images.children}
            alt='Image 1'
            width={500}
            height={500}
            className='w-full h-full object-cover rounded-xl'
          />
        </div>
        <div className='row-span-1 col-span-2'>
          <Image
            src={images.children}
            alt='Image 1'
            width={500}
            height={500}
            className='w-full h-full object-cover rounded-xl'
          />
        </div>
        <div className='row-span-3 col-span-5'>
          <Image
            src={images.children}
            alt='Image 1'
            width={500}
            height={500}
            className='w-full h-full object-cover rounded-xl'
          />
        </div>
        <div className='row-span-1 col-span-3'>
          <Image
            src={images.children}
            alt='Image 1'
            width={500}
            height={500}
            className='w-full h-full object-cover rounded-xl'
          />
        </div>
      </section>

      <section className='container mt-24 space-y-2'>
        <p className='text-center font-semibold text-gray-400'>Thành viên</p>
        <h2
          className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
              text-transparent bg-clip-text text-xl md:text-2xl
              lg:text-4xl font-bold text-center lg:h-14'
        >
          Các nhà sáng lập của Koine
        </h2>
      </section>

      <section className='bg-fourth mt-20 py-28'>
        <div className='container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8'>
          {teamData.map((e, index) => (
            <div
              key={index}
              className='flex flex-col justify-center items-center gap-4
              cursor-pointer group'
            >
              <div className='h-80 w-full rounded-xl overflow-hidden'>
                <Image
                  src={e.image}
                  alt='Koine'
                  height={1000}
                  width={1000}
                  className='object-cover h-full w-full group-hover:scale-105 duration-700'
                />
              </div>

              <div className='flex justify-between items-center flex-col'>
                <p className='font-medium'>{e.role}</p>
                <h3 className='text-lg font-semibold'>{e.name}</h3>

                <div className='flex items-center justify-center gap-3 mt-4'>
                  <Link href={'https://www.facebook.com/bong.ca.7315720'}>
                    <Image
                      src={icons.phone}
                      alt='phone'
                      height={1000}
                      width={1000}
                      className='cursor-pointer w-6 h-6'
                    />
                  </Link>
                  <Link href={'https://www.facebook.com/bong.ca.7315720'}>
                    <Image
                      src={icons.facebook}
                      alt='facebook'
                      height={1000}
                      width={1000}
                      className='cursor-pointer w-6 h-6'
                    />
                  </Link>
                  <Link href={'https://www.facebook.com/bong.ca.7315720'}>
                    <Image
                      src={icons.instagram}
                      alt='instagram'
                      height={1000}
                      width={1000}
                      className='cursor-pointer w-6 h-6'
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Information className='mt-20' />
    </main>
  )
}

export default AboutPage

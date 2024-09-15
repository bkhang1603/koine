import Team from '@/app/(public)/about/components/team'
import View from '@/app/(public)/about/components/view'
import Information from '@/app/(public)/components/information'
import images from '@/assets/images'
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

  return (
    <main>
      <section className='bg-fourth py-24 relative'>
        <Image
          src={images.knowledgeBackground}
          alt='Knowledge Background'
          width={2000}
          height={2000}
          className='hidden sm:block object-cover w-full container'
        />

        <div className='container space-y-6 flex flex-col items-center justify-center absolute inset-0'>
          <h2 className='text-primary font-semibold text-xl'>Tổng quan về Koine</h2>
          <h1
            className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
            text-transparent bg-clip-text text-xl md:text-2xl lg:text-4xl font-bold text-center'
          >
            Hành trình phát triển và những điều cần biết về Koine
          </h1>
          <p className='text-lg max-w-[600px] text-center text-gray-600'>
            Mang trong mình một sứ mệnh cao cả, Koine đã và đang không ngừng phát triển để giúp đỡ trẻ em trên khắp mọi
            miền đất nước.
          </p>
        </div>
      </section>

      <section className='container mt-28'>
        <h2 className='text-secondary text-7xl font-bold'>2024</h2>

        <div className='w-full flex items-center py-10'>
          <Timeline className='md:pl-28'>
            {data.map((e, index) => (
              <TimelineItem key={index}>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineTime>{e.date}</TimelineTime>
                  <TimelineIcon />
                </TimelineHeader>
                <TimelineContent>
                  <div className='md:hidden font-semibold text-sm sm:text-xl text-primary'>{e.date}</div>
                  <div className='min-h-20 text-xs sm:text-lg'>{e.content}</div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </section>

      <Team />

      <View />

      <div className='container py-10 border-fifth border-b-4'></div>

      <Information className='mt-20' />
    </main>
  )
}

export default AboutPage

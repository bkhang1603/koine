import Team from '@/app/(public)/about/components/team'
import View from '@/app/(public)/about/components/view'
import Information from '@/components/public/parent/home/information'
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
import { Users, BookOpen, Trophy, Heart } from 'lucide-react'

function AboutPage() {
  const stats = [
    { icon: <Users className='w-6 h-6' />, value: '1000+', label: 'Học viên' },
    { icon: <BookOpen className='w-6 h-6' />, value: '50+', label: 'Khóa học' },
    { icon: <Trophy className='w-6 h-6' />, value: '100%', label: 'Hài lòng' },
    { icon: <Heart className='w-6 h-6' />, value: '24/7', label: 'Hỗ trợ' }
  ]

  const data = [
    {
      date: '03-06-2024',
      content:
        'Ngày khởi đầu của một hành trình mới - một hành trình đầy thách thức và khó khăn. Ngày mà Koine được sinh ra, mang trong mình sứ mệnh bảo bọc và giúp đỡ tất cả trẻ em trên khắp mọi miền đất nước.'
    },
    {
      date: '15-06-2024',
      content: 'Koine chập chững bước từng bước trên hành trình gây dựng một nền tảng giáo dục tốt nhất cho trẻ em.'
    },
    {
      date: '30-06-2024',
      content: 'Fanpage đầu tiên của Koine được tạo ra, đánh dấu sự xuất hiện của Koine trên mạng xã hội.'
    },
    {
      date: '04-07-2024',
      content:
        'Koine chính thức xuất hiện trên website, góp phần giúp trẻ em tiếp cận kiến thức một cách dễ dàng hơn. Đồng thời cũng bắt đầu tiếp nhận những góp ý từ tất cả mọi người.'
    },
    {
      date: '10-07-2024',
      content:
        'Koine bắt đầu đăng tải những bài viết đầu tiên, bao gồm những kiến thức bổ ích và những câu chuyện chia sẻ do chính những thành viên của Koine đã từng trải qua.'
    }
  ]

  return (
    <main>
      <Image
        src={images.aboutBanner}
        alt='Banner'
        width={1920}
        height={400}
        quality={100}
        className='h-[30vh] w-full object-cover'
      />

      <section className='py-20 bg-gradient-to-b from-white to-gray-50/50'>
        <div className='container'>
          <div className='max-w-3xl mx-auto text-center mb-16'>
            <h2 className='text-primary font-semibold text-lg mb-4'>Về chúng tôi</h2>
            <h1 className='text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-[#FF597D] to-secondary text-transparent bg-clip-text'>
              Hành trình phát triển và những điều cần biết về Koine
            </h1>
            <p className='text-gray-600 text-lg leading-relaxed'>
              Mang trong mình một sứ mệnh cao cả, Koine đã và đang không ngừng phát triển để giúp đỡ trẻ em trên khắp
              mọi miền đất nước.
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'>
            {stats.map((stat, index) => (
              <div
                key={index}
                className='relative group p-6 bg-white rounded-2xl border border-gray-100
                  hover:shadow-lg hover:shadow-primary/5 transition-all duration-300'
              >
                <div className='flex flex-col items-center text-center'>
                  <div
                    className='w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center 
                    text-primary mb-4 group-hover:scale-110 transition-transform duration-300'
                  >
                    {stat.icon}
                  </div>
                  <div
                    className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary 
                    text-transparent bg-clip-text mb-2'
                  >
                    {stat.value}
                  </div>
                  <div className='text-gray-600 font-medium'>{stat.label}</div>
                </div>

                <div
                  className='absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/5 
                  to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20 bg-white relative overflow-hidden'>
        <div className='container relative'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>Hành trình phát triển</h2>
            <div className='w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full' />
          </div>

          <div className='relative'>
            <h3 className='text-[120px] font-bold text-primary/10 absolute -top-20 -left-6 select-none'>2024</h3>

            <div className='relative'>
              <Timeline className='md:pl-28'>
                {data.map((e, index) => (
                  <TimelineItem key={index} className='group'>
                    <TimelineConnector />
                    <TimelineHeader>
                      <TimelineTime className='group-hover:text-primary transition-colors'>{e.date}</TimelineTime>
                      <TimelineIcon className='group-hover:bg-primary group-hover:border-primary transition-colors' />
                    </TimelineHeader>
                    <TimelineContent
                      className='bg-white/50 backdrop-blur-sm rounded-xl p-4
                      border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300'
                    >
                      <div className='md:hidden font-semibold text-sm sm:text-xl text-primary mb-2'>{e.date}</div>
                      <div className='text-gray-600 text-sm sm:text-base leading-relaxed'>{e.content}</div>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          </div>
        </div>
      </section>

      <Team />

      <View />

      <Information />
    </main>
  )
}

export default AboutPage

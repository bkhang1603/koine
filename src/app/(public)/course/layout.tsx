import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trang tổng hợp các bài học, khóa học về giáo dục giới tính cho trẻ em',
  description:
    'Koine sẽ cung cấp cho bạn những bài học, khóa học về giáo dục giới tính ở trẻ em, thanh thiếu niên. Góp phần chung tay bảo vệ trẻ em khỏi nguy cơ xâm hại tình dục.'
}

function CourseLayout({ children }: { children: React.ReactNode }) {
  return <div className='pt-[60px] md:pt-[100px] container'>{children}</div>
}

export default CourseLayout

import CourseList from '@/components/public/parent/course/course-list'
import images from '@/assets/images'
import Image from 'next/image'
import CourseFilter from '@/components/public/parent/course/course-filter'
import { searchParams } from '@/types/query'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Sparkles } from 'lucide-react'
import { CourseMobileFilter } from '@/components/public/parent/course/course-mobile-filter'

export default function CoursePage({ searchParams }: { searchParams?: searchParams }) {
  return (
    <main>
      <Image
        src={images.courseBanner}
        alt='Course banner'
        width={1920}
        height={400}
        quality={100}
        className='h-[20vh] sm:h-[25vh] md:h-[30vh] w-full object-cover'
        priority
      />

      {/* Mobile: Filter Trigger & Custom Course Card - Enhanced Design */}
      <div className='container mt-6'>
        <div className='md:hidden space-y-3'>
          {/* Filter Button */}
          <CourseMobileFilter />

          {/* Custom Course Card */}
          <Card className='overflow-hidden border-0 shadow-md'>
            {/* Top Gradient Banner */}
            <div className='h-1.5 bg-gradient-to-r from-primary via-purple-500 to-secondary'></div>

            <div className='p-4 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='bg-primary/10 p-2 rounded-full'>
                  <Sparkles className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <h3 className='font-medium text-sm'>Tạo khóa học riêng</h3>
                  <p className='text-xs text-muted-foreground mt-0.5'>Tùy chỉnh nội dung theo nhu cầu</p>
                </div>
              </div>
              <Button
                asChild
                size='sm'
                className='whitespace-nowrap bg-gradient-to-r from-primary to-secondary hover:opacity-90'
              >
                <Link href='/custom-course'>
                  <Plus className='w-3 h-3 mr-1' />
                  Bắt đầu
                </Link>
              </Button>
            </div>
          </Card>

          {/* Optional: Quick Filter Categories */}
          {/* <div className='overflow-x-auto pb-2 -mx-4 px-4'>
            <div className='flex items-center gap-2'>
              {['Mới nhất', 'Phổ biến', 'Cho trẻ em', 'Cho phụ huynh', 'Miễn phí'].map((cat) => (
                <Button
                  key={cat}
                  variant='outline'
                  size='sm'
                  className='rounded-full whitespace-nowrap text-xs py-0 px-3 h-8 border-primary/20 hover:border-primary'
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div> */}
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mt-4 md:mt-8 container'>
        {/* Desktop: Sidebar with Filter */}
        <div className='md:col-span-1 hidden md:block'>
          <CourseFilter />

          {/* Custom Course Card - Desktop Version */}
          <Card className='p-4 mt-6 bg-muted/50'>
            <div className='flex items-center gap-2 text-primary mb-2'>
              <Sparkles className='w-5 h-5' />
              <h3 className='font-medium'>Tạo khóa học riêng</h3>
            </div>
            <p className='text-sm text-muted-foreground mb-4'>Tự do thiết kế nội dung học tập theo nhu cầu của bạn</p>
            <Button asChild className='w-full'>
              <Link href='/custom-course'>
                <Plus className='w-4 h-4 mr-2' />
                Bắt đầu ngay
              </Link>
            </Button>
          </Card>
        </div>

        {/* Course List spans all columns on mobile, 3 columns on desktop */}
        <div className='col-span-1 md:col-span-3'>
          <CourseList searchParams={searchParams} />
        </div>
      </div>

      {/* Promotional Banner */}
      <section className='container py-20'>
        <Image
          src={images.coursePoster}
          alt='Course poster'
          width={1920}
          height={400}
          quality={100}
          className='w-full object-cover rounded-2xl'
        />
      </section>
    </main>
  )
}

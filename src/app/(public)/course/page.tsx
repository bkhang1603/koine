import CourseList from '@/components/public/parent/course/course-list'
import images from '@/assets/images'
import Image from 'next/image'
import CourseFilter from '@/components/public/parent/course/course-filter'
import { searchParams } from '@/types/query'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Sparkles } from 'lucide-react'

function CoursePage({ searchParams }: { searchParams?: searchParams }) {
  return (
    <main>
      <Image
        src={images.courseBanner}
        alt='Course banner'
        width={1920}
        height={400}
        quality={100}
        className='h-[30vh] w-full object-cover'
      />

      <div className='grid grid-cols-3 md:grid-cols-4 gap-6 mt-8 container'>
        <div className='md:col-span-1 hidden md:block'>
          <CourseFilter />

          {/* Custom Course Card */}
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

        <CourseList searchParams={searchParams} />
      </div>

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

export default CoursePage

'use client'

import { useAppStore } from '@/components/app-provider'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import configRoute from '@/config/route'
import { handleErrorApi } from '@/lib/utils'
import { useActiveCourseMutation, useGetUserCoursesQuery } from '@/queries/useCourse'
import { CreditCard, PlayCircle } from 'lucide-react'
import Link from 'next/link'

function EnrollButton({ id }: { id: string }) {
  const role = useAppStore((state) => state.role)
  const enrollMutation = useActiveCourseMutation()
  const { data } = useGetUserCoursesQuery({ enabled: !!role })
  const isEnrolled = data?.payload.data.some((course) => course.id === id) ?? false

  const handleEnroll = async () => {
    if (enrollMutation.isPending) return

    try {
      await enrollMutation.mutateAsync({
        courseId: id,
        childId: null
      })

      toast({
        title: 'Đăng ký khóa học thành công',
        description: 'Chúc mừng bạn đã đăng ký khóa học thành công'
      })
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  return (
    <>
      {role && !isEnrolled && (
        <Button
          onClick={handleEnroll}
          variant={'default'}
          className='w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl
                flex items-center justify-center gap-2 text-base font-semibold shadow-lg
                shadow-primary/25 transition-all duration-300 hover:shadow-xl
                hover:shadow-primary/30 hover:-translate-y-0.5'
          size='lg'
        >
          <CreditCard className='w-5 h-5' />
          Đăng ký ngay
        </Button>
      )}
      {!role && (
        <Link href={configRoute.login}>
          <Button
            variant={'default'}
            className='w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl
                  flex items-center justify-center gap-2 text-base font-semibold shadow-lg
                  shadow-primary/25 transition-all duration-300 hover:shadow-xl
                  hover:shadow-primary/30 hover:-translate-y-0.5'
            size='lg'
          >
            <CreditCard className='w-5 h-5' />
            Đăng ký ngay
          </Button>
        </Link>
      )}
      {isEnrolled && (
        <Link href={`${configRoute.learn}/${id}`}>
          <Button
            variant={'default'}
            className='w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl
                  flex items-center justify-center gap-2 text-base font-semibold shadow-lg
                  shadow-primary/25 transition-all duration-300 hover:shadow-xl
                  hover:shadow-primary/30 hover:-translate-y-0.5'
            size='lg'
          >
            <PlayCircle className='w-5 h-5' />
            Tham gia khóa học
          </Button>
        </Link>
      )}
    </>
  )
}

export default EnrollButton

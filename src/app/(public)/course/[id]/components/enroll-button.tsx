'use client'

import { useAppStore } from '@/components/app-provider'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import configRoute from '@/config/route'
import { handleErrorApi } from '@/lib/utils'
import { useActiveCourseMutation, useGetUserCoursesQuery } from '@/queries/useCourse'
import Link from 'next/link'

function EnrollButton({ id }: { id: string }) {
  const role = useAppStore((state) => state.role)
  const enrollMutation = useActiveCourseMutation()
  const { data } = useGetUserCoursesQuery()
  const isEnrolled = data?.payload.data.some((course) => course.id === id)

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
        <Button onClick={handleEnroll} variant={'default'} className='w-full mb-4' size='lg'>
          Đăng ký ngay
        </Button>
      )}
      {!role && (
        <Link href={configRoute.login}>
          <Button variant={'default'} className='w-full mb-4' size='lg'>
            Đăng ký ngay
          </Button>
        </Link>
      )}
      {isEnrolled && (
        <Link href={`${configRoute.learn}/${id}`}>
          <Button variant={'default'} className='w-full mb-4' size='lg'>
            Tham gia khóa học
          </Button>
        </Link>
      )}
    </>
  )
}

export default EnrollButton

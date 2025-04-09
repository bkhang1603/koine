'use client'

import { Button } from '@/components/ui/button'
import { GraduationCap } from 'lucide-react'
import { useAuthModal } from '@/components/auth/auth-modal-provider'
import { useAppStore } from '@/components/app-provider'
import { useEnrollCourseMutation, useGetUserCoursesQuery } from '@/queries/useCourse'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface EnrollButtonProps {
  id: string
  className?: string
}

export default function EnrollButton({ id, className }: EnrollButtonProps) {
  const isAuth = useAppStore((state) => state.isAuth)
  const { showLoginModal } = useAuthModal()
  const enrollMutation = useEnrollCourseMutation()
  const router = useRouter()

  // Check if the course is already enrolled and free
  const { data } = useGetUserCoursesQuery({ enabled: isAuth })
  const isEnrolled = data?.payload.data.some((course) => course.id === id)

  const handleEnroll = async () => {
    if (!isAuth) {
      showLoginModal()
      return
    }

    try {
      await enrollMutation.mutateAsync(id)
      toast({
        description: 'Đăng ký khóa học thành công'
      })
      router.push(`/learn/${id}`)
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  return (
    <div>
      {isEnrolled && (
        <Button className={className} asChild>
          <Link href={`/learn/${id}`}>
            <GraduationCap className='w-4 h-4 mr-2' />
            Tiếp tục học
          </Link>
        </Button>
      )}

      {!isEnrolled && (
        <Button className={className} onClick={handleEnroll} disabled={enrollMutation.isPending || isEnrolled}>
          <GraduationCap className='w-4 h-4 mr-2' />
          {enrollMutation.isPending ? 'Đang xử lý...' : 'Đăng ký học'}
        </Button>
      )}
    </div>
  )
}

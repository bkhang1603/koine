'use client'

import { Button } from '@/components/ui/button'
import { GraduationCap } from 'lucide-react'
import { useAuthModal } from '@/components/auth/auth-modal-provider'
import { useAppStore } from '@/components/app-provider'
import { useEnrollCourseMutation } from '@/queries/useCourse'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface EnrollButtonProps {
  id: string
  className?: string
}

export default function EnrollButton({ id, className }: EnrollButtonProps) {
  const isAuth = useAppStore((state) => state.isAuth)
  const { showLoginModal } = useAuthModal()
  const enrollMutation = useEnrollCourseMutation()
  const router = useRouter()

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
    <Button className={className} onClick={handleEnroll} disabled={enrollMutation.isPending}>
      <GraduationCap className='w-4 h-4 mr-2' />
      {enrollMutation.isPending ? 'Đang xử lý...' : 'Đăng ký học'}
    </Button>
  )
}

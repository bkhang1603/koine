'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useEnrollCourseMutation } from '@/queries/useCourse'

function EnrollButton({ id }: { id: string }) {
  const enrollMutation = useEnrollCourseMutation()

  const handleEnroll = async () => {
    if (enrollMutation.isPending) return

    try {
      await enrollMutation.mutateAsync(id)

      toast({
        title: 'Đăng ký khóa học thành công',
        description: 'Chúc mừng bạn đã đăng ký khóa học thành công'
      })
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  return (
    <Button onClick={handleEnroll} variant={'default'} className='w-full mb-4' size='lg'>
      Đăng ký ngay
    </Button>
  )
}

export default EnrollButton

'use client'

import { Button } from '@/components/ui/button'
import { GraduationCap } from 'lucide-react'

interface EnrollButtonProps {
  id: string
  className?: string
}

export default function EnrollButton({ className }: EnrollButtonProps) {
  return (
    <Button className={className}>
      <GraduationCap className='w-4 h-4 mr-2' />
      Đăng ký học
    </Button>
  )
}

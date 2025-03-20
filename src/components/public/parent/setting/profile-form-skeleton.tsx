import { Skeleton } from '@/components/ui/skeleton'

export function ProfileFormSkeleton() {
  return (
    <div className='space-y-8'>
      {/* Avatar section */}
      <div className='flex flex-col sm:flex-row gap-8'>
        <div className='flex flex-col items-center gap-4'>
          <Skeleton className='h-32 w-32 rounded-full' />
          <Skeleton className='h-9 w-28' />
        </div>

        <div className='flex-1 space-y-4'>
          {/* Thông tin cơ bản */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-24' /> {/* Label */}
              <Skeleton className='h-10 w-full' /> {/* Input */}
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-24' /> {/* Label */}
              <Skeleton className='h-10 w-full' /> {/* Input */}
            </div>
          </div>

          {/* Email & điện thoại */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-16' /> {/* Label */}
              <Skeleton className='h-10 w-full' /> {/* Input */}
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-28' /> {/* Label */}
              <Skeleton className='h-10 w-full' /> {/* Input */}
            </div>
          </div>
        </div>
      </div>

      {/* Địa chỉ */}
      <div className='space-y-2'>
        <Skeleton className='h-5 w-20' /> {/* Label */}
        <Skeleton className='h-10 w-full' /> {/* Input */}
      </div>

      {/* Giới thiệu */}
      <div className='space-y-2'>
        <Skeleton className='h-5 w-24' /> {/* Label */}
        <Skeleton className='h-32 w-full' /> {/* Textarea */}
      </div>

      {/* Button */}
      <div className='flex justify-end'>
        <Skeleton className='h-10 w-28' /> {/* Button */}
      </div>
    </div>
  )
}

import { useState, useRef } from 'react'
import { toast } from '@/components/ui/use-toast'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Upload, FileVideo } from 'lucide-react'
import { useUploadRecordMutation } from '@/queries/useUpload' // Hook tải video lên (giả sử bạn có một hook như vậy)
import { useUpdateEventMutation } from '@/queries/useEvent'

interface VideoUploadProps {
  initialPreview?: string
  disabled?: boolean
  eventId: string
}

const VideoUpload: React.FC<VideoUploadProps> = ({ initialPreview, disabled = false, eventId }) => {
  const [preview, setPreview] = useState<string | null>(initialPreview || null)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadVideoMutation = useUploadRecordMutation() // Hook upload video
  const updateEventInfo = useUpdateEventMutation()
  const [isUploading, setIsUploading] = useState(false) // State theo dõi trạng thái upload

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("aloaloalo")
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 50 * 1024 * 1024) {
        // Max size 50MB
        toast({
          description: 'Kích thước file không được vượt quá 50MB',
          variant: 'destructive'
        })
        return
      }
      const videoUrl = URL.createObjectURL(selectedFile)
      setFile(selectedFile)
      setPreview(videoUrl)

      // Bắt đầu tải video lên
      setIsUploading(true)

      const formData = new FormData()
      formData.append('file', selectedFile)

      try {
        // Gọi API upload video (giả sử bạn có một hook hoặc API như useUploadVideoMutation)
        const uploadResult = await uploadVideoMutation.mutateAsync(formData)
        console.log('url ', uploadResult.payload.data)
        if (uploadResult.payload.data) {
          const res = await updateEventInfo.mutateAsync({
            body: { recordUrl: uploadResult.payload.data },
            eventId
          })
          toast({
            description: 'Video đã được tải lên thành công',
            variant: 'success'
          })
        } else {
          throw new Error('Không thể tải video lên')
        }
      } catch (uploadError) {
        toast({
          description: 'Có lỗi xảy ra khi tải video lên',
          variant: 'destructive'
        })
      } finally {
        setIsUploading(false) // Kết thúc quá trình upload
      }
    }
  }

  return (
    <div className='flex gap-2 items-start justify-start'>
      <div className='aspect-square w-[100px] h-[100px] rounded-md border border-dashed'>
        {preview ? (
          <video className='w-full h-full' controls>
            <source src={preview} type='video/mp4' />
            Trình duyệt không hỗ trợ.
          </video>
        ) : (
          <Avatar className='w-full h-full'>
            <AvatarFallback>
              <FileVideo className='w-6 h-6' color='gray' />
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      <input
        type='file'
        accept='video/*'
        className='hidden'
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled || isUploading} // Vô hiệu hóa khi đang upload
      />
      <button
        className='flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed'
        type='button'
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || isUploading} // Vô hiệu hóa khi đang upload
      >
        <Upload className='h-4 w-4 text-muted-foreground' />
        <span className='sr-only'>Tải video lên</span>
      </button>
    </div>
  )
}

export default VideoUpload

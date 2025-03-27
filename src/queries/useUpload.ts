import uploadApiRequest from '@/apiRequests/upload'
import { useMutation } from '@tanstack/react-query'

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: uploadApiRequest.uploadImage
  })
}

export const useUploadRecordMutation = () => {
  return useMutation({
    mutationFn: uploadApiRequest.uploadRecord
  })
}

import http from '@/lib/http'
import { UploadImageResType, UploadVideoResType } from '@/schemaValidations/upload.schema'

const uploadApiRequest = {
  uploadImage: (formData: FormData) => http.post<UploadImageResType>('/buckets/image', formData),
  uploadVideo: (formData: FormData) => http.post<UploadVideoResType>('/buckets/video', formData)
}

export default uploadApiRequest

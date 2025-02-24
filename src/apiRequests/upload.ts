import http from '@/lib/http'
import { UploadImageResType } from '@/schemaValidations/upload.schema'

const uploadApiRequest = {
  uploadImage: (formData: FormData) => http.post<UploadImageResType>('/buckets/image', formData)
}

export default uploadApiRequest

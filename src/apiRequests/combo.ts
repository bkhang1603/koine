import http from '@/lib/http'
import {
  CreateComboBodyResType,
  CreateComboBodyType,
  GetComboDetailResType,
  GetComboListResType,
  DeleteComboResType,
  UpdateComboBodyType,
  UpdateComboBodyResType
} from '@/schemaValidations/admin.schema'
import { OnlyMessageResType } from '@/schemaValidations/special.schema'

const comboApiRequest = {
  getComboList: ({
    page_index,
    page_size,
    keyword
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    keyword?: string | string[] | undefined
  }) =>
    http.get<GetComboListResType>(
      `/combos?page_index=${page_index}&page_size=${page_size}${keyword ? `&keyword=${keyword}` : ''}`
    ),
  getComboDetail: (id: string) => http.get<GetComboDetailResType>(`/combos/${id}`),
  createCombo: (body: CreateComboBodyType) => http.post<CreateComboBodyResType>('/combos', body),
  updateCombo: (id: string, body: UpdateComboBodyType) => http.put<UpdateComboBodyResType>(`/combos/${id}`, body),
  deleteCombo: (id: string) => http.delete<DeleteComboResType>(`/combos/${id}`),
  addCourseToCombo: (comboId: string, courseId: string) =>
    http.post<OnlyMessageResType>(`/combos/${comboId}/course/${courseId}`, {}),
  removeCourseFromCombo: (comboId: string, courseId: string) =>
    http.delete<OnlyMessageResType>(`/combos/${comboId}/course/${courseId}`)
}

export default comboApiRequest

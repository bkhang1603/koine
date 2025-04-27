import http from '@/lib/http'
import {
  GetReportListResType,
  GetReportDetailResType,
  UpdateReportResolveResType,
  UpdateReportResolveBodyType,
  GetReasonResType
} from '@/schemaValidations/admin.schema'

const reportApiRequest = {
  getReportList: ({
    page_size,
    page_index,
    status,
    type
  }: {
    page_size: number
    page_index: number
    status: string
    type: string
  }) =>
    http.get<GetReportListResType>(
      `/reports?${status ? `s=${status}&` : ''}${type ? `t=${type}&` : ''}${page_size ? `page_size=${page_size}&` : ''}${page_index ? `page_index=${page_index}&` : ''}`
    ),
  getReportDetail: (id: string) => http.get<GetReportDetailResType>(`/reports/${id}`),
  updateReportResolve: (id: string, body: UpdateReportResolveBodyType) =>
    http.put<UpdateReportResolveResType>(`/reports/resolve/${id}`, body),
  getReason: () => http.get<GetReasonResType>(`/reasons`)
}

export default reportApiRequest

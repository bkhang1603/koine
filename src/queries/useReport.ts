import reportApiRequest from '@/apiRequests/report'
import { UpdateReportResolveBodyType } from '@/schemaValidations/admin.schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useReportListQuery = ({
  page_size,
  page_index,
  status,
  type
}: {
  page_size: number
  page_index: number
  status: string
  type: string
}) => {
  return useQuery({
    queryKey: ['report-list', page_size, page_index, status, type],
    queryFn: () => reportApiRequest.getReportList({ page_size, page_index, status, type })
  })
}

export const useReportDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ['report-detail', id],
    queryFn: () => reportApiRequest.getReportDetail(id),
    enabled: !!id
  })
}

export const useUpdateReportResolveQuery = (id: string, body: UpdateReportResolveBodyType) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => reportApiRequest.updateReportResolve(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report-list'] })
      queryClient.invalidateQueries({ queryKey: ['report-detail', id] })
    }
  })
}

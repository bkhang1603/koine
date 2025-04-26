import http from '@/lib/http'
import {
  GetUserDetailAdminResType,
  GetUserListAdminResType,
  GetDashboardStatisticsResType,
  GetDashboardExpertResType,
  GetDashboardContentCreatorResType,
  GetDashboardSupporterResType
} from '@/schemaValidations/admin.schema'

const dashboardApiRequest = {
  getUserListAdmin: ({
    page_index,
    page_size,
    keyword
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    keyword?: string | string[] | undefined
  }) =>
    http.get<GetUserListAdminResType>(
      `/users?page_index=${page_index}&page_size=${page_size}${keyword ? `&keyword=${keyword}` : ''}`
    ),
  getUserDetailAdmin: ({ userId }: { userId: string }) => http.get<GetUserDetailAdminResType>(`users/${userId}`),
  getDashboardStatistics: ({
    range_type,
    start_date,
    end_date
  }: {
    range_type: 'DAY' | 'THIS_MONTH' | '3_MONTH' | '6_MONTH' | '1_YEAR' | '2_YEARS' | '3_YEARS'
    start_date?: string
    end_date?: string
  }) => {
    const url = `/admin/dashboard?range_type=${range_type}${range_type === 'DAY' && start_date ? `&start_date=${start_date}` : ''}${range_type === 'DAY' && end_date ? `&end_date=${end_date}` : ''}`
    return http.get<GetDashboardStatisticsResType>(url)
  },
  getDashboardExpertStatistics: ({
    range_type,
    start_date,
    end_date
  }: {
    range_type: 'DAY' | 'THIS_MONTH' | '3_MONTH' | '6_MONTH' | '1_YEAR' | '2_YEARS' | '3_YEARS'
    start_date?: string
    end_date?: string
  }) => {
    const url = `/admin/dashboard-expert?range_type=${range_type}${range_type === 'DAY' && start_date ? `&start_date=${start_date}` : ''}${range_type === 'DAY' && end_date ? `&end_date=${end_date}` : ''}`
    return http.get<GetDashboardExpertResType>(url)
  },
  getDashboardContentCreator: ({
    range_type,
    start_date,
    end_date
  }: {
    range_type: 'DAY' | 'THIS_MONTH' | '3_MONTH' | '6_MONTH' | '1_YEAR' | '2_YEARS' | '3_YEARS'
    start_date?: string
    end_date?: string
  }) => {
    const url = `/admin/dashboard-content?range_type=${range_type}${range_type === 'DAY' && start_date ? `&start_date=${start_date}` : ''}${range_type === 'DAY' && end_date ? `&end_date=${end_date}` : ''}`
    return http.get<GetDashboardContentCreatorResType>(url)
  },
  getDashboardSupporter: ({
    range_type,
    start_date,
    end_date
  }: {
    range_type: 'DAY' | 'THIS_MONTH' | '3_MONTH' | '6_MONTH' | '1_YEAR' | '2_YEARS' | '3_YEARS'
    start_date?: string
    end_date?: string
  }) => {
    const url = `/admin/dashboard-supporter?range_type=${range_type}${range_type === 'DAY' && start_date ? `&start_date=${start_date}` : ''}${range_type === 'DAY' && end_date ? `&end_date=${end_date}` : ''}`
    return http.get<GetDashboardSupporterResType>(url)
  }
}

export default dashboardApiRequest

import userApiRequest from '@/apiRequests/user'
import dashboardApiRequest from '@/apiRequests/dashboard'
import { useQuery } from '@tanstack/react-query'

export const useUsersAdminQuery = ({
  keyword,
  page_size,
  page_index
}: {
  keyword: string
  page_size: number
  page_index: number
}) => {
  return useQuery({
    queryKey: ['courses', keyword, page_size, page_index],
    queryFn: () =>
      userApiRequest.getUserListAdmin({
        keyword,
        page_size,
        page_index
      })
  })
}

export const useUserDetailAdminQuery = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ['user-detail', userId],
    queryFn: () => userApiRequest.getUserDetailAdmin({ userId }),
    enabled: !!userId
  })
}

export const useDashboardStatisticsQuery = ({
  range_type,
  start_date,
  end_date
}: {
  range_type: 'DAY' | 'THIS_MONTH' | '3_MONTH' | '6_MONTH' | '1_YEAR' | '2_YEARS' | '3_YEARS'
  start_date?: string
  end_date?: string
}) => {
  return useQuery({
    queryKey: ['dashboard-statistics', range_type, start_date, end_date],
    queryFn: () =>
      dashboardApiRequest.getDashboardStatistics({
        range_type,
        start_date,
        end_date
      })
  })
}

export const useDashboardExpertStatisticsQuery = ({
  range_type,
  start_date,
  end_date
}: {
  range_type: 'DAY' | 'THIS_MONTH' | '3_MONTH' | '6_MONTH' | '1_YEAR' | '2_YEARS' | '3_YEARS'
  start_date?: string
  end_date?: string
}) => {
  return useQuery({
    queryKey: ['dashboard-expert-statistics', range_type, start_date, end_date],
    queryFn: () =>
      dashboardApiRequest.getDashboardExpertStatistics({
        range_type,
        start_date,
        end_date
      })
  })
}

export const useDashboardContentCreatorQuery = ({
  range_type,
  start_date,
  end_date
}: {
  range_type: 'DAY' | 'THIS_MONTH' | '3_MONTH' | '6_MONTH' | '1_YEAR' | '2_YEARS' | '3_YEARS'
  start_date?: string
  end_date?: string
}) => {
  return useQuery({
    queryKey: ['dashboard-content-creator', range_type, start_date, end_date],
    queryFn: () =>
      dashboardApiRequest.getDashboardContentCreator({
        range_type,
        start_date,
        end_date
      })
  })
}

export const useDashboardSupporterQuery = ({
  range_type,
  start_date,
  end_date
}: {
  range_type: 'DAY' | 'THIS_MONTH' | '3_MONTH' | '6_MONTH' | '1_YEAR' | '2_YEARS' | '3_YEARS'
  start_date?: string
  end_date?: string
}) => {
  return useQuery({
    queryKey: ['dashboard-supporter', range_type, start_date, end_date],
    queryFn: () =>
      dashboardApiRequest.getDashboardSupporter({
        range_type,
        start_date,
        end_date
      })
  })
}

export const useDashboardCourseDetailQuery = ({ courseId }: { courseId: string }) => {
  return useQuery({
    queryKey: ['dashboard-course-detail', courseId],
    queryFn: () => dashboardApiRequest.getDashboardCourseDetail({ courseId })
  })
}

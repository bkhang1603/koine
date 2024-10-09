import accountApiRequest from '@/apiRequests/account'
import { useQuery } from '@tanstack/react-query'

export const useAccountProfile = ({ enabled }: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['account-profile'],
    queryFn: accountApiRequest.getAccount,
    enabled
  })
}

export const useCourseByAccount = ({ enabled }: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['course-by-account'],
    queryFn: accountApiRequest.getCourseAccount,
    enabled
  })
}

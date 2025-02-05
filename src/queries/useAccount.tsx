import accountApiRequest from '@/apiRequests/account'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

export const useAccountProfileById = () => {
  return useQuery({
    queryKey: ['account-profile-by-id'],
    queryFn: accountApiRequest.getAccountProfile
  })
}

export const useUpdateAccountProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: accountApiRequest.updateAccountProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['account-profile-by-id']
      })
    }
  })
}

import accountApiRequest from '@/apiRequests/account'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAccountProfile = ({ enabled }: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['account-profile'],
    queryFn: accountApiRequest.getAccount,
    enabled
  })
}

export const useCourseByAccount = () => {
  return useQuery({
    queryKey: ['course-by-account'],
    queryFn: accountApiRequest.getAccountCourse
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

export const useGetAccountAddress = () => {
  return useQuery({
    queryKey: ['account-address'],
    queryFn: accountApiRequest.getAccountAddress
  })
}

export const useAddAccountAddressMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: accountApiRequest.addAccountAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['account-address']
      })
    }
  })
}

export const useUpdateAccountAddressMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: accountApiRequest.updateAccountAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['account-address']
      })
    }
  })
}

export const useDeleteAccountAddressMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: accountApiRequest.deleteAccountAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['account-address']
      })
    }
  })
}

export const useGetAccountOrders = () => {
  return useQuery({
    queryKey: ['account-orders'],
    queryFn: accountApiRequest.getAccountOrders
  })
}

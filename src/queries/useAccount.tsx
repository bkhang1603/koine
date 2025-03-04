import accountApiRequest from '@/apiRequests/account'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAccountProfile = ({ enabled }: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['account-profile'],
    queryFn: accountApiRequest.getAccount,
    enabled
  })
}

export const useCourseByAccount = ({ page_size, page_index }: { page_size?: number; page_index?: number }) => {
  return useQuery({
    queryKey: ['course-by-account', page_size, page_index],
    queryFn: () => accountApiRequest.getAccountCourse({ page_size, page_index })
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

export const useGetAccountOrders = ({
  status,
  page_index,
  page_size
}: {
  status: 'PROCESSING' | 'DELIVERING' | 'CANCELLED' | 'COMPLETED'
  page_index: number
  page_size: number
}) => {
  return useQuery({
    queryKey: ['account-orders', status, page_index, page_size],
    queryFn: () => accountApiRequest.getAccountOrders({ status, page_index, page_size })
  })
}

export const useGetChildAccount = () => {
  return useQuery({
    queryKey: ['child-account'],
    queryFn: accountApiRequest.getChildAccount
  })
}

export const useGetChildAccountById = (id: string) => {
  return useQuery({
    queryKey: ['child-account-by-id', id],
    queryFn: () => accountApiRequest.getChildAccountById(id)
  })
}

export const useSuggestCoursesFree = () => {
  return useQuery({
    queryKey: ['suggest-courses-free'],
    queryFn: accountApiRequest.getSuggestCoursesFree
  })
}

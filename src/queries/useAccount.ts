import { OrderStatusValues } from './../constants/type'
import accountApiRequest from '@/apiRequests/account'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAccountProfile = ({ enabled }: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['account-profile-by-id'],
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
  status: (typeof OrderStatusValues)[number]
  page_index: number
  page_size: number
}) => {
  return useQuery({
    queryKey: ['account-orders', status, page_index, page_size],
    queryFn: () => accountApiRequest.getAccountOrders({ status, page_index, page_size })
  })
}

export const useSuggestCoursesFree = () => {
  return useQuery({
    queryKey: ['suggest-courses-free'],
    queryFn: accountApiRequest.getSuggestCoursesFree
  })
}

// Register child account
export const useRegisterChildAccountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: accountApiRequest.registerChildAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['child-account']
      })
    }
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

export const useGetAccountStore = () => {
  return useQuery({
    queryKey: ['account-store'],
    queryFn: accountApiRequest.getAccountStore
  })
}

export const useGetAccountNotifications = ({ page_index, page_size }: { page_index: number; page_size: number }) => {
  return useQuery({
    queryKey: ['account-notifications', page_index, page_size],
    queryFn: () => accountApiRequest.getAccountNotifications({ page_index, page_size })
  })
}

export const useUpdateAccountNotificationMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: accountApiRequest.updateAccountNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-notifications'] })
    }
  })
}

export const useUpdateAccountNotificationsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: accountApiRequest.updateAccountNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-notifications'] })
    }
  })
}

// Still learning course
export const useGetStillLearningCourse = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['still-learning-course'],
    queryFn: accountApiRequest.stillLearningCourse,
    enabled
  })
}

// List child account
export const useGetListChildAccount = () => {
  return useQuery({
    queryKey: ['list-child-account'],
    queryFn: accountApiRequest.getListChildAccount
  })
}

// List child account need review
export const useGetListOrderNeedReview = () => {
  return useQuery({
    queryKey: ['list-order-need-review'],
    queryFn: accountApiRequest.getListOrderNeedReview
  })
}

export const useUpdateVisibleCourseForChildMutation = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: accountApiRequest.updateVisibleCourseForChild,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['child-account-by-id', id] })
    }
  })
}

export const useGetCourseDetailForChild = ({ courseId, childId }: { courseId: string; childId: string }) => {
  return useQuery({
    queryKey: ['course-detail-for-child', courseId, childId],
    queryFn: () => accountApiRequest.getCourseDetailForChild({ courseId, childId })
  })
}

export const useCreateOrderNeedReviewMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: accountApiRequest.createOrderNeedReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-order-need-review'] })
    }
  })
}

export const useGetChildProfileQuery = ({ enabled }: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['account-profile-child'],
    queryFn: accountApiRequest.getChildProfile,
    enabled
  })
}

export const useGetMyOrdersReviews = () => {
  return useQuery({
    queryKey: ['list-order-need-review'],
    queryFn: accountApiRequest.getMyOrdersReviews
  })
}

export const useCreateTicketMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.createTicket
  })
}

export const useCreateReportMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.createReport
  })
}

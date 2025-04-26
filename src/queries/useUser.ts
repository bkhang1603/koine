import userApiRequest from '@/apiRequests/user'
import { CreateUserBodyType, UpdateRequestSupportBodyType } from '@/schemaValidations/admin.schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
    queryKey: ['users', keyword, page_size, page_index],
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

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: CreateUserBodyType) => userApiRequest.createUser(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
    }
  })
}

export const useRequestSupportListQuery = ({
  page_index,
  page_size,
  keyword,
  isResolve
}: {
  page_index?: number | undefined
  page_size?: number | undefined
  keyword?: string | string[] | undefined
  isResolve?: boolean | undefined
}) => {
  return useQuery({
    queryKey: ['request-support-list', page_index, page_size, keyword, isResolve],
    queryFn: () =>
      userApiRequest.getRequestSupportList({
        page_index,
        page_size,
        keyword,
        isResolve
      })
  })
}

export const useUpdateRequestSupportMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateRequestSupportBodyType }) =>
      userApiRequest.updateRequestSupport(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['request-support-list']
      })
    }
  })
}

export const useBanUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => userApiRequest.banUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
    }
  })
}

export const useUnBanUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => userApiRequest.unBanUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
    }
  })
}

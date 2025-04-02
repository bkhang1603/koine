import userApiRequest from '@/apiRequests/user'
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

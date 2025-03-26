import http from '@/lib/http'
import { GetUserDetailAdminResType, GetUserListAdminResType } from '@/schemaValidations/admin.schema'

const userApiRequest = {
  getUserListAdmin: ({
    page_index,
    page_size,
    keyword
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    keyword?: string | string[] | undefined
  }) => http.get<GetUserListAdminResType>(`/users?page_index=${page_index}&page_size=${page_size}&keyword=${keyword}`),
  getUserDetailAdmin: ({ userId }: { userId: string }) => http.get<GetUserDetailAdminResType>(`users/${userId}`)
}

export default userApiRequest

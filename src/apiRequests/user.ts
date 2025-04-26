import http from '@/lib/http'
import {
  CreateUserResType,
  CreateUserBodyType,
  GetUserDetailAdminResType,
  GetUserListAdminResType,
  GetRequestSupportListResType,
  UpdateRequestSupportBodyType,
  UpdateRequestSupportResType,
  BanUserResType,
  UnBanUserResType
} from '@/schemaValidations/admin.schema'

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
  getUserDetailAdmin: ({ userId }: { userId: string }) => http.get<GetUserDetailAdminResType>(`users/${userId}`),
  createUser: (body: CreateUserBodyType) => http.post<CreateUserResType>('/users', body),
  getRequestSupportList: ({
    page_index,
    page_size,
    keyword,
    isResolve
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    keyword?: string | string[] | undefined
    isResolve?: boolean | undefined
  }) =>
    http.get<GetRequestSupportListResType>(
      `/request-supports?page_index=${page_index}&page_size=${page_size}${keyword ? `&keyword=${keyword}` : ''}${isResolve ? `&isResolve=${isResolve}` : ''}`
    ),
  updateRequestSupport: (id: string, body: UpdateRequestSupportBodyType) =>
    http.put<UpdateRequestSupportResType>(`/request-supports/${id}`, body),
  banUser: (userId: string) => http.put<BanUserResType>(`/users/${userId}/ban`, {}),
  unBanUser: (userId: string) => http.put<UnBanUserResType>(`/users/${userId}/unban`, {})
}

export default userApiRequest

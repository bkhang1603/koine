import http from '@/lib/http'
import {
  AccountAddressBodyType,
  AccountAddressResType,
  AccountOneAddressResType,
  AccountProfileBodyType,
  AccountProfileResType,
  AccountResType,
  CourseByAccountResType
} from '@/schemaValidations/account.schema'

const accountApiRequest = {
  getAccount: () => http.get<AccountResType>('/users/profile'),
  getCourseAccount: () => http.get<CourseByAccountResType>('/courses/my-course'),
  getAccountProfile: () => http.get<AccountProfileResType>('/users/profile'),
  updateAccountProfile: (body: AccountProfileBodyType) => http.put<AccountProfileResType>('/users/profile', body),
  getAccountAddress: () => http.get<AccountAddressResType>('/delivery-infos'),
  addAccountAddress: (body: AccountAddressBodyType) => http.post<AccountOneAddressResType>('/delivery-infos', body),
  updateAccountAddress: ({ id, ...body }: { id: string } & AccountAddressBodyType) =>
    http.put<AccountOneAddressResType>(`/delivery-infos/${id}`, body),
  deleteAccountAddress: (id: string) => http.delete(`/delivery-infos/${id}`)
}

export default accountApiRequest

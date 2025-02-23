import http from '@/lib/http'
import {
  AccountAddressResType,
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
  getAccountAddress: () => http.get<AccountAddressResType>('/delivery-infos')
}

export default accountApiRequest

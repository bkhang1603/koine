import http from '@/lib/http'
import {
  AccountAddressBodyType,
  AccountAddressResType,
  AccountOneAddressResType,
  AccountOrderResType,
  AccountProfileBodyType,
  AccountProfileResType,
  AccountResType,
  AccountStoreResType,
  CourseByAccountResType,
  MyChildAccountByIdResType,
  MyChildAccountResType,
  RegisterChildAccountBodyType,
  RegisterChildAccountResType,
  SuggestCoursesFreeResType
} from '@/schemaValidations/account.schema'

const accountApiRequest = {
  getAccount: () => http.get<AccountResType>('/users/profile'),
  getAccountCourse: ({ page_size, page_index }: { page_size?: number; page_index?: number }) =>
    http.get<CourseByAccountResType>(`/users/my-course?page_size=${page_size}&page_index=${page_index}`),
  getAccountProfile: () => http.get<AccountProfileResType>('/users/profile'),
  updateAccountProfile: (body: AccountProfileBodyType) => http.put<AccountProfileResType>('/users/profile', body),
  getAccountAddress: () => http.get<AccountAddressResType>('/delivery-infos'),
  addAccountAddress: (body: AccountAddressBodyType) => http.post<AccountOneAddressResType>('/delivery-infos', body),
  updateAccountAddress: ({ id, ...body }: { id: string } & AccountAddressBodyType) =>
    http.put<AccountOneAddressResType>(`/delivery-infos/${id}`, body),
  deleteAccountAddress: (id: string) => http.delete(`/delivery-infos/${id}`),
  getAccountOrders: ({
    status,
    page_index,
    page_size
  }: {
    status: 'PROCESSING' | 'DELIVERING' | 'CANCELLED' | 'COMPLETED'
    page_index: number
    page_size: number
  }) =>
    http.get<AccountOrderResType>(`/orders/my-orders?status=${status}&page_index=${page_index}&page_size=${page_size}`),
  getChildAccount: () => http.get<MyChildAccountResType>('/users/my-child-course'),
  getChildAccountById: (id: string) => http.get<MyChildAccountByIdResType>(`/users/my-child-course/${id}`),
  getSuggestCoursesFree: () => http.get<SuggestCoursesFreeResType>('/courses/suggest-courses-free'),
  registerChildAccount: (body: RegisterChildAccountBodyType) =>
    http.post<RegisterChildAccountResType>('/auth/register-child', body),
  getAccountNotifications: () => http.get<any>('/notification/user'),
  getAccountStore: () => http.get<AccountStoreResType>('/courses/my-store')
}

export default accountApiRequest

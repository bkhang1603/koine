import { OrderStatusValues } from '@/constants/type'
import http from '@/lib/http'
import {
  AccountAddressBodyType,
  AccountAddressResType,
  AccountNotificationsResType,
  AccountOneAddressResType,
  AccountOrderResType,
  AccountProfileBodyType,
  AccountProfileResType,
  AccountResType,
  AccountStoreResType,
  CourseByAccountResType,
  CourseDetailForChildResType,
  CreateOrderNeedReviewBodyType,
  ListChildAccountNeedReviewResType,
  ListChildAccountResType,
  MyChildAccountByIdResType,
  MyChildAccountResType,
  ProfileChildResType,
  RegisterChildAccountBodyType,
  RegisterChildAccountResType,
  SuggestCoursesFreeResType,
  UpdateVisibleCourseForChildBodyType
} from '@/schemaValidations/account.schema'
import { OnlyMessageResType } from '@/schemaValidations/special.schema'

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
    status?: (typeof OrderStatusValues)[number]
    page_index: number
    page_size: number
  }) =>
    http.get<AccountOrderResType>(
      `/orders/my-orders?${status ? `status=${status}&` : ''}&page_index=${page_index}&page_size=${page_size}`
    ),
  getChildAccount: () => http.get<MyChildAccountResType>('/users/my-child-course'),
  getChildAccountById: (id: string) => http.get<MyChildAccountByIdResType>(`/users/my-child-course/${id}`),
  getSuggestCoursesFree: () => http.get<SuggestCoursesFreeResType>('/courses/suggest-courses-free'),
  registerChildAccount: (body: RegisterChildAccountBodyType) =>
    http.post<RegisterChildAccountResType>('/auth/register-child', body),
  getAccountNotifications: ({ page_index, page_size }: { page_index: number; page_size: number }) =>
    http.get<AccountNotificationsResType>(`/notification?page_index=${page_index}&page_size=${page_size}`),
  updateAccountNotification: (id: string) => http.put<AccountNotificationsResType>(`/notification/read/${id}`, {}),
  updateAccountNotifications: () => http.put<AccountNotificationsResType>(`/notification/read`, {}),
  getAccountStore: () => http.get<AccountStoreResType>('/courses/my-store'),
  stillLearningCourse: () => http.get(`/user-progresses/still-learning`),
  getListChildAccount: () => http.get<ListChildAccountResType>(`/users/my-child`),
  getListOrderNeedReview: () => http.get<ListChildAccountNeedReviewResType>('/orders/purchased-not-reviewed'),
  createOrderNeedReview: (body: CreateOrderNeedReviewBodyType) =>
    http.post<OnlyMessageResType>(`/orders/purchased-not-reviewed`, body),
  updateVisibleCourseForChild: (body: UpdateVisibleCourseForChildBodyType) =>
    http.put<OnlyMessageResType>(`/course-visibilities`, body),
  getCourseDetailForChild: ({ courseId, childId }: { courseId: string; childId: string }) =>
    http.get<CourseDetailForChildResType>(`/users/my-child-course-progress/${childId}/course/${courseId}`),
  getChildProfile: () => http.get<ProfileChildResType>('users/profile-child')
}

export default accountApiRequest

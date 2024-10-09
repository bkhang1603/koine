import http from '@/lib/http'
import { AccountResType, CourseByAccountResType } from '@/schemaValidations/account.schema'

const accountApiRequest = {
  getAccount: () => http.get<AccountResType>('/users/profile'),
  getCourseAccount: () => http.get<CourseByAccountResType>('/courses/my-course')
}

export default accountApiRequest

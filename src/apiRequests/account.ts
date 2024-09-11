import http from '@/lib/http'
import { AccountResType } from '@/schemaValidations/account.schema'

const accountApiRequest = {
  getAccount: () => http.get<AccountResType>('/users/profile')
}

export default accountApiRequest

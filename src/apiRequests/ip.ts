import http from '@/lib/http'
import { IpRes } from '@/schemaValidations/ip.schema'

const ipApiRequest = {
  getIp: () => http.get<IpRes>('/api/get-ip', { baseUrl: '' })
}

export default ipApiRequest

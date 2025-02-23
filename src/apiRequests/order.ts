import http from '@/lib/http'
import { OrderBody, OrderBodyResType } from '@/schemaValidations/order.schema'

const orderApiRequest = {
  getOrders: () => http.get('/orders'),
  createOrder: (data: OrderBody) => http.post<OrderBodyResType>('/orders', data)
}

export default orderApiRequest

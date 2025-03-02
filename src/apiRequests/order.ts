import http from '@/lib/http'
import { OrderBody, OrderBodyResType, OrderDetailResType } from '@/schemaValidations/order.schema'

const orderApiRequest = {
  getOrders: () => http.get('/orders'),
  getOrderById: (id: string) => http.get<OrderDetailResType>(`/orders/${id}`),
  createOrder: (data: OrderBody) => http.post<OrderBodyResType>('/orders', data)
}

export default orderApiRequest

import http from '@/lib/http'
import { GetOrderDetailAdminResType, GetOrderListAdminResType } from '@/schemaValidations/admin.schema'
import { OrderBody, OrderBodyResType, OrderDetailResType } from '@/schemaValidations/order.schema'

const orderApiRequest = {
  getOrders: () => http.get('/orders'),
  getOrderById: (id: string) => http.get<OrderDetailResType>(`/orders/${id}`),
  createOrder: (data: OrderBody) => http.post<OrderBodyResType>('/orders', data),
  getAdminOrders: (pageSize: number, pageIndex: number, status?: string) =>
    http.get<GetOrderListAdminResType>(
      `/orders?${status ? `status=${status}` : ``}page_size=${pageSize}&page_index=${pageIndex}`
    ),
  getAdminOrderById: (id: string) => http.get<GetOrderDetailAdminResType>(`/orders/${id}`)
}

export default orderApiRequest

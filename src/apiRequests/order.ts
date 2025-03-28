import http from '@/lib/http'
import { GetOrderDetailAdminResType, GetOrderListAdminResType } from '@/schemaValidations/admin.schema'
import {
  CancelOrderBody,
  CancelOrderBodyRes,
  OrderBody,
  OrderBodyResType,
  OrderDetailResType,
  RePurchaseOrderRes,
  UpdatePaymentMethodBody,
  UpdatePaymentMethodBodyRes
} from '@/schemaValidations/order.schema'

const orderApiRequest = {
  getOrders: () => http.get('/orders'),
  getOrderById: (id: string) => http.get<OrderDetailResType>(`/orders/${id}`),
  createOrder: (data: OrderBody) => http.post<OrderBodyResType>('/orders', data),
  cancelOrder: ({ id, body }: { id: string; body: CancelOrderBody }) =>
    http.put<CancelOrderBodyRes>(`/orders/${id}`, { note: body.note }),
  rePurchaseOrder: ({ id }: { id: string }) => http.post<RePurchaseOrderRes>(`/orders/re-purchase/${id}`, {}),
  updatePaymentMethod: ({ id, body }: { id: string; body: UpdatePaymentMethodBody }) =>
    http.put<UpdatePaymentMethodBodyRes>(`/orders/pay-method/${id}`, { payMethod: body.payMethod }),
  getAdminOrders: (pageSize: number, pageIndex: number, status?: string) =>
    http.get<GetOrderListAdminResType>(
      `/orders?${status ? `status=${status}` : ``}page_size=${pageSize}&page_index=${pageIndex}`
    ),
  getAdminOrderById: (id: string) => http.get<GetOrderDetailAdminResType>(`/orders/${id}`)
}

export default orderApiRequest

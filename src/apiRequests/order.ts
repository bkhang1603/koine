import http from '@/lib/http'
import {
  CancelOrderBody,
  CancelOrderBodyRes,
  OrderBody,
  OrderBodyResType,
  OrderDetailResType,
  RefundOrderResType,
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
  getRefundOrders: ({ page_size, page_index }: { page_size: number; page_index: number }) =>
    http.get<RefundOrderResType>(`/orders/refund?page_size=${page_size}&page_index=${page_index}`)
}

export default orderApiRequest

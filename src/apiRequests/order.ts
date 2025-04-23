import http from '@/lib/http'
import {
  GetOrderDetailAdminResType,
  GetOrderListAdminResType,
  GetRefundRequestByIdResType,
  GetRefundRequestsResType,
  GetReturnOrdersResType,
  UpdateRefundRequestResType,
  UpdateRefundRequestBodyType
} from '@/schemaValidations/admin.schema'
import {
  CancelOrderBody,
  CancelOrderBodyRes,
  CreateRefundOrderBody,
  CreateRefundOrderBodyRes,
  CreateReturnOrderBody,
  CreateReturnOrderBodyRes,
  OrderBody,
  OrderBodyResType,
  OrderDetailResType,
  RefundOrderResType,
  RePurchaseOrderRes,
  UpdatePaymentMethodBody,
  UpdatePaymentMethodBodyRes
} from '@/schemaValidations/order.schema'
import { OnlyMessageResType } from '@/schemaValidations/special.schema'

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
    http.get<RefundOrderResType>(`/orders/my-refund?page_size=${page_size}&page_index=${page_index}`),
  createRefundOrder: ({ orderId, body }: { orderId: string; body: CreateRefundOrderBody }) =>
    http.post<CreateRefundOrderBodyRes>(`/orders/refund/${orderId}/request-refund`, body),
  createReturnOrder: ({ orderId, body }: { orderId: string; body: CreateReturnOrderBody }) =>
    http.post<CreateReturnOrderBodyRes>(`/orders/exchange/${orderId}/request-exchange`, body),
  getAdminOrders: (pageSize: number, pageIndex: number, keyword?: string, status?: string, userId?: string) =>
    http.get<GetOrderListAdminResType>(
      `/orders?${keyword ? `keyword=${keyword}&` : ''}${status ? `status=${status}&` : ''}${userId ? `userId=${userId}&` : ''}page_size=${pageSize}&page_index=${pageIndex}`
    ),
  getAdminOrderById: (id: string) => http.get<GetOrderDetailAdminResType>(`/orders/detail/${id}`),
  confirmDeliveryOrder: ({ id }: { id: string }) =>
    http.put<OnlyMessageResType>(`/deliveries/simulate-delivery/{orderId}?orderId=${id}`, {}),
  getRefundRequests: ({ page_size, page_index }: { page_size: number; page_index: number }) =>
    http.get<GetRefundRequestsResType>(`/orders/refund?page_size=${page_size}&page_index=${page_index}`),
  getRefundRequestById: (id: string) => http.get<GetRefundRequestByIdResType>(`/orders/${id}`),
  getReturnOrders: ({ page_size, page_index }: { page_size: number; page_index: number }) =>
    http.get<GetReturnOrdersResType>(`/orders/my-exchange?page_size=${page_size}&page_index=${page_index}`),
  updateRefundRequest: ({ id, body }: { id: string; body: UpdateRefundRequestBodyType }) =>
    http.put<UpdateRefundRequestResType>(`/orders/refund/${id}/resolve-refund`, body)
}

export default orderApiRequest

import http from '@/lib/http'

const orderApiRequest = {
  getOrders: () => http.get('/orders'),
  createOrderNow: ({ data }: { data: any }) => http.post('/orders', data),
  createOrderByCart: ({ data }: { data: any }) => http.post('/orders/cart-detail-ids', data),
  updateOrder: ({ id, data }: { id: string; data: any }) => http.put(`/orders/${id}`, data),
  deleteOrder: ({ id }: { id: string }) => http.delete(`/orders/${id}`)
}

export default orderApiRequest

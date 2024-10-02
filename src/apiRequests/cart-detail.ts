import http from '@/lib/http'
import { CartDetailResType } from '@/schemaValidations/cart-detail.schema'

const cartDetailApiRequest = {
  getCart: () => http.get<CartDetailResType>('/cart-details'),
  addToCart: (data: any) => http.post('/cart-details', data),
  updateCart: (data: any) => http.put('/cart-details', data),
  deleteCart: (id: string) => http.delete(`/cart-details/${id}`)
}

export default cartDetailApiRequest

import http from '@/lib/http'
import {
  AddCartDetailReqType,
  CartDetailResType,
  UpdateCartDetailReqType
} from '@/schemaValidations/cart-detail.schema'

const cartDetailApiRequest = {
  getCart: () => http.get<CartDetailResType>('/cart-details'),
  addToCart: ({ data }: { data: AddCartDetailReqType }) => http.post('/cart-details', data),
  updateCart: ({ id, data }: { id: string; data: UpdateCartDetailReqType }) => http.put(`/cart-details/${id}`, data),
  deleteCart: ({ id }: { id: string }) => http.delete(`/cart-details/${id}`)
}

export default cartDetailApiRequest

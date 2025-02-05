import http from '@/lib/http'
import {
  AddCartDetailReqType,
  CartDetailResType,
  UpdateCartDetailListReqType,
  UpdateCartDetailReqType
} from '@/schemaValidations/cart-detail.schema'

const cartDetailApiRequest = {
  getCart: () => http.get<CartDetailResType>('/carts'),
  addToCart: ({ data }: { data: AddCartDetailReqType }) => http.post('/carts', data),
  updateCart: ({ data }: { data: UpdateCartDetailReqType }) => http.put(`/carts`, data),
  deleteCart: ({ id }: { id: string }) => http.delete(`/carts/${id}`),
  deleteCartList: ({ data }: { data: UpdateCartDetailListReqType }) => http.put('/carts/delete-list', data)
}

export default cartDetailApiRequest

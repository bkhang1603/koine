import http from '@/lib/http'
import {
  AddCartDetailReqType,
  CartDetailResType,
  UpdateCartDetailReqType
} from '@/schemaValidations/cart-detail.schema'
import { OnlyMessageResType } from '@/schemaValidations/special.schema'

const cartDetailApiRequest = {
  getCart: () => http.get<CartDetailResType>('/carts'),
  addToCart: ({ data }: { data: AddCartDetailReqType }) => http.post<OnlyMessageResType>('/carts', data),
  updateCart: ({ data }: { data: UpdateCartDetailReqType }) => http.put<OnlyMessageResType>(`/carts`, data),
  deleteCart: ({ id }: { id: string }) => http.delete<OnlyMessageResType>(`/carts/${id}`),
  deleteMultipleCart: ({ ids }: { ids: string[] | string }) =>
    http.put<OnlyMessageResType>(`/carts/delete-multiple`, { arrayCartDetailIds: ids })
}

export default cartDetailApiRequest

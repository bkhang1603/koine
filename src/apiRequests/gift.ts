import http from '@/lib/http'
import {
  CreateGiftBody,
  CreateGiftBodyRes,
  GetReceivedGiftsRes,
  GetSentGiftsRes,
  RefundGiftRes
} from '@/schemaValidations/gift.schema'

const giftApiRequest = {
  createGift: (body: CreateGiftBody) => http.post<CreateGiftBodyRes>('/gifts', body),
  getReceivedGifts: () => http.get<GetReceivedGiftsRes>('/gifts/available'),
  getSentGifts: () => http.get<GetSentGiftsRes>('/gifts/sent'),
  redeemGift: () => http.put('/gifts/receive', {}),
  // Hoàn lại gift trong thời gian người nhận chưa sử dụng
  refundGift: (id: string) => http.post<RefundGiftRes>(`/gifts/${id}/recall`, {})
}

export default giftApiRequest

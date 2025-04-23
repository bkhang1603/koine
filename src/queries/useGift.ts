import giftApiRequest from '@/apiRequests/gift'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetReceivedGifts = () => {
  return useQuery({
    queryKey: ['received-gifts'],
    queryFn: giftApiRequest.getReceivedGifts
  })
}

export const useGetSentGifts = () => {
  return useQuery({
    queryKey: ['sent-gifts'],
    queryFn: giftApiRequest.getSentGifts
  })
}

export const useRedeemGift = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: giftApiRequest.redeemGift,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['received-gifts'] })
      queryClient.invalidateQueries({ queryKey: ['sent-gifts'] })
    }
  })
}

export const useRefundGift = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: giftApiRequest.refundGift,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['received-gifts'] })
      queryClient.invalidateQueries({ queryKey: ['sent-gifts'] })
    }
  })
}

export const useCreateGift = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: giftApiRequest.createGift,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['received-gifts'] })
      queryClient.invalidateQueries({ queryKey: ['sent-gifts'] })
      queryClient.invalidateQueries({ queryKey: ['account-store'] })
    }
  })
}

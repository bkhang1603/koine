import cartDetailApiRequest from '@/apiRequests/cart-detail'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCartDetailQuery = () => {
  return useQuery({
    queryKey: ['cartDetails'],
    queryFn: () => cartDetailApiRequest.getCart()
  })
}

export const useCartDetailCreateMutation = () => {
  return useMutation({
    mutationFn: cartDetailApiRequest.addToCart
  })
}

export const useCartDetailUpdateMutation = () => {
  return useMutation({
    mutationFn: cartDetailApiRequest.updateCart
  })
}

export const useCartDetailDeleteMutation = () => {
  return useMutation({
    mutationFn: cartDetailApiRequest.deleteCart
  })
}

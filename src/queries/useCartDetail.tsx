import cartDetailApiRequest from '@/apiRequests/cart-detail'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'

export const useCartDetailQuery = () => {
  return useQuery({
    queryKey: ['cartDetails'],
    queryFn: () => cartDetailApiRequest.getCart()
  })
}

export const useCartDetailCreateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cartDetailApiRequest.addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cartDetails']
      })
    }
  })
}

export const useCartDetailUpdateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cartDetailApiRequest.updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cartDetails']
      })
    }
  })
}

export const useCartDetailDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cartDetailApiRequest.deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cartDetails']
      })
    }
  })
}

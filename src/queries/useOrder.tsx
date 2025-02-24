import orderApiRequest from '@/apiRequests/order'
import { useMutation } from '@tanstack/react-query'

export const useCreateOrderMutation = () => {
  //   return useMutation({
  //     mutationFn: () => {
  //       return new Promise((resolve) => {
  //         setTimeout(() => {
  //           resolve({ data: 'success', message: 'Order created' })
  //         }, 1000)
  //       })
  //     }
  //   })

  return useMutation({
    mutationFn: orderApiRequest.createOrder
  })
}

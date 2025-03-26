import orderApiRequest from '@/apiRequests/order'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

export const useGetOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: orderApiRequest.getOrders
  })
}

export const useGetOrder = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => orderApiRequest.getOrderById(id)
  })
}

export const useCancelOrderMutation = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: orderApiRequest.cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders', id]
      })
    }
  })
}

// re purchase order
export const useRePurchaseOrderMutation = () => {
  return useMutation({
    mutationFn: orderApiRequest.rePurchaseOrder
  })
}

export const useUpdatePaymentMethodMutation = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: orderApiRequest.updatePaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['order', id]
      })
    }
  })
}

// get order cho admin
export const useGetAdminOrdersQuery = (pageSize: number, pageIndex: number, status: string) => {
  return useQuery({
    queryKey: ['adminOrders', status, pageSize, pageIndex],
    queryFn: () => orderApiRequest.getAdminOrders(pageSize, pageIndex, status)
  })
}

export const useGetAdminOrderQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApiRequest.getAdminOrderById(id)
  })
}
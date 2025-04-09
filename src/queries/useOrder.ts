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
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: orderApiRequest.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cartDetails']
      })
    }
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
        queryKey: ['orders', id]
      })
    }
  })
}

export const useGetRefundOrders = ({ page_size, page_index }: { page_size: number; page_index: number }) => {
  return useQuery({
    queryKey: ['refund-orders', page_size, page_index],
    queryFn: () => orderApiRequest.getRefundOrders({ page_size, page_index })
  })
}

export const useCreateRefundOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: orderApiRequest.createRefundOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders']
      })
    }
  })
}

// get order cho admin
export const useGetAdminOrdersQuery = (pageSize: number, pageIndex: number, keyword?: string, status?: string) => {
  return useQuery({
    queryKey: ['adminOrders', keyword, status, pageSize, pageIndex],
    queryFn: () => orderApiRequest.getAdminOrders(pageSize, pageIndex, keyword, status)
  })
}

export const useGetAdminOrderQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApiRequest.getAdminOrderById(id)
  })
}

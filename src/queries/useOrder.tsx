import orderApiRequest from '@/apiRequests/order'
import { useMutation, useQuery } from '@tanstack/react-query'

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
    queryKey: ['order', id],
    queryFn: () => orderApiRequest.getOrderById(id)
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
